import { User } from "@/types";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

const Users =
  mongoose.models.Users || mongoose.model<User>("Users", userSchema);

export { Users };
