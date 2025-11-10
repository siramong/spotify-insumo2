import { z } from "zod";
import { ErrorMessages } from "@/lib/Constants/ErrorMessages";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: ErrorMessages.email.required })
    .regex(/.+@.+\..+/, {
      message: ErrorMessages.email.invalid,
    }),
  password: z
    .string()
    .min(1, { message: ErrorMessages.password.required })
    .min(8, { message: ErrorMessages.password.length })
    .regex(/(?=.*[A-Z])/, { message: ErrorMessages.password.uppercase })
    .regex(/(?=.*[!@#$%^&*-_])/, { message: ErrorMessages.password.special }),
});