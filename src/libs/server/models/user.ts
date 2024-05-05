import mongoose, { Schema, model } from "mongoose";

type User = {
  name: string;
  email: string;
  avatar?: string;
  isDeleted?: boolean;
};

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
  isDeleted: { type: Boolean, default: false },
});

const Users =
  mongoose.models.Users || mongoose.model<User>("Users", userSchema);

export { Users };
export type { User };
