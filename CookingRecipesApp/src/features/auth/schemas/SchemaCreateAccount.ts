import { z } from 'zod';

export const schemaCreateAccount = z.object({
  name: z
    .string()
    .min(1, 'O nome é obrigatório.')
    .min(6, 'O nome deve ter pelo menos 6 caracteres.'),
  login: z.string().min(1, 'O e-mail é obrigatório.').email('Digite um e-mail válido.'),
  password: z
    .string()
    .min(1, 'A senha é obrigatória.')
    .min(8, 'A senha deve ter no mínimo 8 caracteres.'),
});

export type CreateAccountForm = z.infer<typeof schemaCreateAccount>;
