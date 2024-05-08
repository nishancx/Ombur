import mongoose, { Schema } from "mongoose";

type Issue = {
  title: string;
  description: string;
  clientId: string;
  userId: string;
  resolved: boolean;
  type: string;
};

const issueSchema = new Schema<Issue>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  clientId: { type: String, required: true },
  userId: { type: String, required: true },
  resolved: { type: Boolean, default: false },
  type: { type: String, required: true },
});

const Issues =
  mongoose.models.Issues || mongoose.model<Issue>("Issues", issueSchema);

export { Issues };
export type { Issue };
