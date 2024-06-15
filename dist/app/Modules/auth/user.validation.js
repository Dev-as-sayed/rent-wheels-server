"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(1, { message: "Name is required" })
            .max(35, { message: "Name can't be 35 cheracter" }),
        email: zod_1.z.string().email({ message: "Invalid email address" }),
        role: zod_1.z.enum(["user", "admin"]).default("user"),
        password: zod_1.z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" })
            .max(25, { message: " Password can't be 25 cheracter" }),
        phone: zod_1.z
            .string()
            .min(10, { message: "Phone number must be at least 10 digits long" }),
        address: zod_1.z.string().min(1, { message: "Address is required" }),
    }),
});
const loginUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email({ message: "Invalid email address" }),
        password: zod_1.z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" })
            .max(25, { message: " Password can't be 25 cheracter" }),
    }),
});
exports.UserValidation = {
    userValidationSchema,
    loginUserValidationSchema,
};
