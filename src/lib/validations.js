import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name (at least 2 characters).")
    .max(100, "Full name must be under 100 characters."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(8, "Please enter a valid mobile number (at least 8 digits).")
    .max(22, "Mobile number is too long.")
    .regex(/^[+\d\s\-()]{8,22}$/, "Use digits, spaces, or + country code only."),
  programmeSlug: z
    .string()
    .trim()
    .min(1, "Please select a NEXTMIND programme."),
  educationLevel: z
    .string()
    .trim()
    .min(2, "Please select your current education level."),
  occupation: z
    .string()
    .trim()
    .max(120, "Occupation must be under 120 characters.")
    .optional()
    .or(z.literal("")),
});

export const enquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name (at least 2 characters).")
    .max(100, "Full name must be under 100 characters."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(8, "Please enter a valid phone number (at least 8 digits).")
    .max(22, "Phone number is too long.")
    .regex(/^[+\d\s\-()]{8,22}$/, "Use digits, spaces, or + country code only."),
  programmeInterest: z
    .string()
    .trim()
    .min(2, "Please select the programme you are interested in."),
  educationLevel: z
    .string()
    .trim()
    .min(2, "Please select your current education level."),
  preferredContactMethod: z
    .string()
    .trim()
    .min(2, "Please select how you prefer to be contacted."),
  message: z
    .string()
    .trim()
    .max(1000, "Message must be under 1000 characters.")
    .optional()
    .or(z.literal("")),
});

export const enquiryStatusUpdateSchema = z.object({
  id: z.string().min(1, "Enquiry ID is required."),
  status: z.enum(["NEW", "CONTACTED", "ADVISING_SCHEDULED", "RESOLVED"]),
});

export const registrationStatusUpdateSchema = z.object({
  id: z.string().min(1, "Registration ID is required."),
  status: z.enum(["CONFIRMED", "IN_REVIEW", "ENROLLED", "CANCELLED"]),
});

