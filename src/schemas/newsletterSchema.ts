import { z } from "zod";

export const newsletterSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .regex(/^\d+$/, "Invalid phone number format"),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
