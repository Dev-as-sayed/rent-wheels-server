"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;
const bookinValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date format",
        }),
        user: zod_1.z.string(),
        car: zod_1.z.string(),
        startTime: zod_1.z.string().regex(timeFormat, "Invalid time format"),
        endTime: zod_1.z.string().optional(),
        totalCost: zod_1.z.number().default(0),
        isBooked: zod_1.z.enum(["unconfirmed", "confirmed"]).default("unconfirmed"),
    }),
});
exports.BookingValidation = {
    bookinValidationSchema,
};
