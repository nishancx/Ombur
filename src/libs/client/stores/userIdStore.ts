import { Valtio_UserId } from "@/types";
import { proxy } from "valtio";

const userIdStore: Valtio_UserId = proxy<Valtio_UserId>({
  // if userId is null, it means it's loading
  // if userId is undefined, it means client hasn't signed in
  userId: null,
  setUserId: ({ userId }) => (userIdStore.userId = userId),
});

export { userIdStore };
