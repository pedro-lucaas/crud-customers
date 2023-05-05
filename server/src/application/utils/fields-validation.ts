import { ValidationError } from "@application/errors/validation-error";
import { z } from "zod";

export function fieldsValidation<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data) as T;
  } catch (error) {
    throw new ValidationError(error.errors[0].message);
  }
}