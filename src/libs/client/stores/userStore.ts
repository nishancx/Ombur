import { Valtio_User } from "@/types";
import { proxy } from "valtio";

const userStore: Valtio_User = proxy<Valtio_User>({
  user: undefined,
  setUser: ({ user }) => (userStore.user = user),
});

export { userStore };
