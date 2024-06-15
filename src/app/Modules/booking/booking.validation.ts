import { optional, z } from "zod";

const timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;

const bookinValidationSchema = z.object({
  body: z.object({
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    user: z.string(),
    car: z.string(),
    startTime: z.string().regex(timeFormat, "Invalid time format"),
    endTime: z.string().optional(),
    totalCost: z.number().default(0),
    isBooked: z.enum(["unconfirmed", "confirmed"]).default("unconfirmed"),
  }),
});

export const BookingValidation = {
  bookinValidationSchema,
};
