import { AUTH } from "@/constants/auth";

import { Session, User } from "next-auth";

type SessionType = (typeof AUTH.SESSION_TYPES)[keyof typeof AUTH.SESSION_TYPES];

type AuthUser = User & {
  type: SessionType;
};

type AuthSession = Session & {
  user: AuthUser;
};

export type { AuthUser, AuthSession, SessionType };
