import { Clients } from "@/libs/server/models/client";
import { connectDB } from "@/libs/server/mongo";
import { AuthUser } from "@/types/auth";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn(args) {
      await createClient({ user: args.user });
      return true;
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
