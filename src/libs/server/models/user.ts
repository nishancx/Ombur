import { User } from "@/types/models/user";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Users =
  mongoose.models.Users || mongoose.model<User>("Users", userSchema);

export { Users };
