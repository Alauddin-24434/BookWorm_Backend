import z from "zod";

const registration = z.object({
  name: z
    .string("Name is required")
    .min(2, "Name must be at least 2 characters long")
    .max(25, "Name must be at most 25 characters long"),
  email: z
    .string("Eamil is required")
    .email("Please provide a valid email address"),
  profilePhoto: z.string("Profile photo is required"),
  password: z
    .string("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must be contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must be contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must be contain at least one number")
    .regex(
      /[\!@#\$%\^&\*\(\)_\+\-=\{\}\[\]|\\:;"'<>,\.\?\/~`]/,
      "Password must be contain at least one speacial character"
    ),
});

export const uservalidations = {
    registration
};
