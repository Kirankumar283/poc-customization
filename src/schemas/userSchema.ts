// schemas/user.schema.ts

import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  role: z.enum(["user", "admin", "moderator"], {
    message: "Please select a valid role",
  }),
});

export type UserFormValues = z.infer<typeof userSchema>;
