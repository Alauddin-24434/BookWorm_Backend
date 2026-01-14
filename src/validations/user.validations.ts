import z from "zod";

const registration = z.object({
  name: z
    .string("Name is required")
    .min(2, "Name must be at least 2 characters long")
    .max(25, "Name must be at most 25 characters long"),
  email: z
    .string("Eamil is required")
    .email("Please provide a valid email address"),
  password: z
    .string("Password is required")
    .min(8, "Password must be at least 8 characters long")

});

const login = z.object({
  email: z
    .string("Eamil is required")
    .email("Please provide a valid email address"),
  password: z
    .string("Password is required")
    .min(8, "Password must be at least 8 characters long")
});

export const uservalidations = {
  registration,
  login
};
