import { AUTH } from "@/constants/auth";
import { User } from "next-auth";

type SessionType = (typeof AUTH.SESSION_TYPES)[keyof typeof AUTH.SESSION_TYPES];

export type { User as AuthUser, SessionType };
