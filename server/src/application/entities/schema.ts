import { z } from "zod";

export const customerSchema = z.object({
  name: z
    .string({
      required_error: "O nome é obrigatório",
    })
    .min(3, {
      message: "O nome deve ter no mínimo 3 caracteres",
    })
    .max(255, {
      message: "O nome deve ter no máximo 255 caracteres",
    }),
  email: z
    .string({
      required_error: "O email é obrigatório",
    })
    .email(),
  phone: z
    .string({
      required_error: "O telefone é obrigatório",
    })
    .min(10, {
      message: "O telefone deve ter no mínimo 10 dígitos",
    })
    .max(11, {
      message: "O telefone deve ter no máximo 11 dígitos",
    })
    .refine((value) => !isNaN(Number(value)), {
      message: "O telefone deve conter apenas números",
    })
});

export type ICustomer = z.infer<typeof customerSchema>;