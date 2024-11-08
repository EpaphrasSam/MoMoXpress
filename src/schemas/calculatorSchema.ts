import { z } from "zod";
import { validatePhoneNumber } from "@/helpers/phoneValidation";
import { Telco } from "@/types/telcoTypes";

export const calculatorSchema = z
  .object({
    senderPhone: z
      .string()
      .min(10, "Phone number must be 10 digits")
      .max(10, "Phone number must be 10 digits"),
    receiverPhone: z
      .string()
      .min(10, "Phone number must be 10 digits")
      .max(10, "Phone number must be 10 digits"),
    amount: z
      .string()
      .min(1, "Amount is required")
      .transform(Number)
      .refine((val) => val > 0, "Amount must be greater than 0"),
  })
  .refine((data) => data.senderPhone !== data.receiverPhone, {
    message: "Sender and receiver phone numbers cannot be the same",
    path: ["receiverPhone"],
  });

export type CalculatorFormData = z.infer<typeof calculatorSchema>;

export const createCalculatorValidation = (
  selectedTelco: Telco,
  receiverTelco: Telco | null
) => {
  return calculatorSchema.superRefine((data, ctx) => {
    if (!validatePhoneNumber(data.senderPhone, selectedTelco.name)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Invalid ${selectedTelco.name} number`,
        path: ["senderPhone"],
      });
    }

    if (!receiverTelco) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please select receiver's telco",
        path: ["receiverPhone"],
      });
    } else if (!validatePhoneNumber(data.receiverPhone, receiverTelco.name)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Invalid ${receiverTelco.name} number`,
        path: ["receiverPhone"],
      });
    }
  });
};
