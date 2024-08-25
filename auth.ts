import { Clients } from "@/libs/server/models/client";
import { connectDB } from "@/libs/server/mongo";
import { AuthUser } from "@/types/auth";
import { createUserServerAction } from "@/app/user/issues/serverActions";
import { Users } from "@/libs/server/models/user";

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const CredentialsProviderConfig = CredentialsProvider({
  name: "Credentials",
  credentials: {
    username: { label: "Username", type: "text", placeholder: "Username" },
    name: { label: "Name", type: "text", placeholder: "Name" },
  },
  async authorize(credentials, req) {
    await createUserServerAction({
      name: credentials.name as string,
      username: credentials.username as string,
    });

    return {
      email: credentials.username as string,
      name: credentials.name as string,
    };
  },
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, CredentialsProviderConfig],
  callbacks: {
    async signIn(args) {
      if (args.account?.provider === "google") {
        await createClient({ user: args.user });
        return true;
      }

      return true;
    },
    async session({ session }) {
      const email = session.user.email;

      if (!!email && email.includes("@")) {
        const client = await Clients.findOne({ email });

        if (!!client) {
          return {
            user: { ...session.user, id: client._id },
            expires: new Date().toDateString(),
          };
        }
      }

      if (!!email && email.includes("-")) {
        const user = await Users.findOne({ username: session.user.email });

        if (!!user) {
          return {
            user: { username: email, name: session.user.name, id: user._id },
            expires: new Date().toDateString(),
          };
        }
      }

      return {
        user: {},
        expires: new Date().toDateString(),
      };
    },
  },
  trustHost: true,
});

const createClient = async ({ user }: { user: AuthUser }) => {
  await connectDB();

  const preExistingClient = await Clients.findOne({ email: user.email });

  if (!preExistingClient) {
    const createClientPayload = {
      name: user.name,
      email: user.email,
      avatar: user.image,
    };

    await Clients.create(createClientPayload);
  }
};
