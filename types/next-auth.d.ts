import NextAuth, { DefaultSession } from "next-auth";
import { MESSAGE } from "@/constants/message";
import { SessionType } from "@/types/auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      type: SessionType;
    } & DefaultSession["user"];
  }
}
