import { MESSAGE } from "@/constants/message";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      type: (typeof MESSAGE.SENDER_TYPE_INDEX)[keyof typeof MESSAGE.SENDER_TYPE_INDEX];
    } & DefaultSession["user"];
  }
}
