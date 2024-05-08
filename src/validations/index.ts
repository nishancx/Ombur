import { z } from "zod";

const userValidationSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(3),
});

type UserDTO = z.infer<typeof userValidationSchema>;

const issueValidationSchema = z.object({
  title: z.string({ required_error: "Title is required" }).min(3),
  description: z.string({ required_error: "Description is required" }).min(3),
  type: z.string({ required_error: "Type is required" }),
  clientId: z.string({ required_error: "Client ID is required" }),
  userId: z.string({ required_error: "User ID is required" }),
});

type IssueDTO = z.infer<typeof issueValidationSchema>;

export { userValidationSchema, issueValidationSchema };
export type { UserDTO, IssueDTO };
