import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .max(35, { message: "Name can't be 35 cheracter" }),
    email: z.string().email({ message: "Invalid email address" }),
    role: z.enum(["user", "admin"]).default("user"),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(25, { message: " Password can't be 25 cheracter" }),
    phone: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits long" }),
    address: z.string().min(1, { message: "Address is required" }),
  }),
});

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(25, { message: " Password can't be 25 cheracter" }),
  }),
});

export const UserValidation = {
  userValidationSchema,
  loginUserValidationSchema,
};
