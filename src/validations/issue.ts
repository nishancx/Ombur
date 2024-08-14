import { MESSAGE } from "@/constants/message";
import { z } from "zod";

const issueValidationSchema = z.object({
  title: z.string({ required_error: "Title is required" }).min(3),
  description: z.string({ required_error: "Description is required" }).min(3),
  type: z.string({ required_error: "Type is required" }),
  clientId: z.string({ required_error: "Client ID is required" }),
  userId: z.string({ required_error: "User ID is required" }),
});
type IssueDTO = z.infer<typeof issueValidationSchema>;

const createMessageValidationSchema = z.object({
  text: z.string({ required_error: "Message text is required" }).min(1),
  sender: z.enum([
    MESSAGE.SENDER_TYPE_INDEX.CLIENT,
    MESSAGE.SENDER_TYPE_INDEX.USER,
  ]),
  issueId: z.string({ required_error: "Issue ID is required" }),
  userId: z.string({ required_error: "User ID is required" }),
  clientId: z.string({ required_error: "Client ID is required" }),
});
type CreateMessageDTO = z.infer<typeof createMessageValidationSchema>;

export { issueValidationSchema, createMessageValidationSchema };
export type { IssueDTO, CreateMessageDTO };
