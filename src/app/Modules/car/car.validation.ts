import { z } from "zod";

const createCarValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    description: z
      .string()
      .min(1, "Description is required")
      .max(200, "Description cannot exceed 200 characters"),
    color: z
      .string()
      .min(1, "Color is required")
      .max(25, "Color cannot exceed 25 characters"),
    isElectric: z.boolean(),
    status: z.enum(["available", "unavailable"]).default("available"),
    features: z.array(z.string()).min(1, "At least one feature is required"),
    pricePerHour: z
      .number()
      .positive("Price per hour must be a positive number"),
    isDeleted: z.boolean().default(false),
  }),
});

export const CarValidation = {
  createCarValidationSchema,
};
