import { User } from "@/types/models";

type Valtio_User = {
  // if user is undefined, it means it's loading
  // if user is null, it means client hasn't signed in
  user: User | undefined | null;
  setUser: ({ user }: { user: User | undefined | null }) => void;
};

export type { Valtio_User };
