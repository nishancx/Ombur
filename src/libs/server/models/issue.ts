import { Issue } from "@/types";
import mongoose, { Schema } from "mongoose";

const issueSchema = new Schema<Issue>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    clientId: { type: String, required: true },
    userId: { type: String, required: true },
    resolved: { type: Boolean, default: false },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Issues =
  mongoose.models.Issues || mongoose.model<Issue>("Issues", issueSchema);

export { Issues };
