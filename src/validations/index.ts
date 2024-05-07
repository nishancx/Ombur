import { z } from "zod";

const userValidationSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(3),
});

type UserDTO = z.infer<typeof userValidationSchema>;

export { userValidationSchema };
export type { UserDTO };
