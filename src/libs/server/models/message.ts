import { MESSAGE } from "@/constants/message";
import { Message } from "@/types/models/message";

import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema<Message>(
  {
    issueId: { type: String, required: true },
    sender: {
      type: String,
      enum: {
        values: [MESSAGE.SENDER_TYPES.CLIENT, MESSAGE.SENDER_TYPES.USER],
        message: "Transaction Type is not supported",
      },
      required: true,
    },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Messages =
  (mongoose.models.Messages as mongoose.Model<Message, {}, {}, {}, Message>) ||
  mongoose.model<Message>("Messages", messageSchema);

export { Messages };
