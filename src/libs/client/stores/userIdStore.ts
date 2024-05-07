import { Valtio_UserId } from "@/types";
import { proxy } from "valtio";

const userIdStore: Valtio_UserId = proxy<Valtio_UserId>({
  userId: null,
  setUserId: ({ userId }) => (userIdStore.userId = userId),
});

export { userIdStore };
