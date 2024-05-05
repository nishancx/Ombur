import { Users } from "@/libs/server/models/user";
import { connectDB } from "@/libs/server/mongo";
import NextAuth, { User } from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn(args) {
      createUser({ user: args.user });
      return true;
    },
  },
  trustHost: true,
});

const createUser = async ({ user }: { user: User }) => {
  await connectDB();

  const preExistingUser = await Users.findOne({ email: user.email });

  if (!preExistingUser) {
    const createUserPayload = {
      name: user.name,
      email: user.email,
      avatar: user.image,
    };

    await Users.create(createUserPayload);
  }
};
