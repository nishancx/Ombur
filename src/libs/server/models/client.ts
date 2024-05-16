import { Client } from "@/types/models/client";
import mongoose, { Schema } from "mongoose";

const clientSchema = new Schema<Client>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String,
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Clients =
  mongoose.models.Clients || mongoose.model<Client>("Clients", clientSchema);

export { Clients };
