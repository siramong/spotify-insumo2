import { z } from "zod";
import { ErrorMessages } from "@/lib/Constants/ErrorMessages";

export const registerSchema = z.object({
  name: z.string().min(1, { message: ErrorMessages.name.required }).min(4, { message: ErrorMessages.name.length }),
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
    .regex(/(?=.*[!@#$%^&*])/, { message: ErrorMessages.password.special }),
});
        