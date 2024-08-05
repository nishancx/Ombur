import { MESSAGE } from "@/constants/message";

type Message = {
  _id: string;
  issueId: string;
  sender: typeof MESSAGE.SENDER_TYPES.CLIENT | typeof MESSAGE.SENDER_TYPES.USER;
  clientId: string;
  userId: string
  text: string;
  createdAt: Date;
  updatedAt: Date;
};

export type { Message };
