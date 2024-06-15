"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarValidation = void 0;
const zod_1 = require("zod");
const createCarValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        description: zod_1.z
            .string()
            .min(1, "Description is required")
            .max(200, "Description cannot exceed 200 characters"),
        color: zod_1.z
            .string()
            .min(1, "Color is required")
            .max(25, "Color cannot exceed 25 characters"),
        isElectric: zod_1.z.boolean(),
        status: zod_1.z.enum(["available", "unavailable"]).default("available"),
        features: zod_1.z.array(zod_1.z.string()).min(1, "At least one feature is required"),
        pricePerHour: zod_1.z
            .number()
            .positive("Price per hour must be a positive number"),
        isDeleted: zod_1.z.boolean().default(false),
    }),
});
exports.CarValidation = {
    createCarValidationSchema,
};
