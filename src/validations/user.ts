import { z } from "zod";

const userValidationSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1),
  username: z.string({ required_error: "Username is required" }).min(1),
});

type UserDTO = z.infer<typeof userValidationSchema>;

export { userValidationSchema };
export type { UserDTO };
