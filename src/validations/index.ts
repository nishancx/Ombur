import { z } from "zod";

const userValidationSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(3),
  clientEmail: z
    .string({ required_error: "Client email is required" })
    .email("Please enter a valid email"),
});

type UserDTO = z.infer<typeof userValidationSchema>;

export { userValidationSchema };
export type { UserDTO };
