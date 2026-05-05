import { z } from 'zod';

export const loginSchema = z.object({
  login: z.email({ error: 'Email inválido!' }),
  password: z.string().min(8, 'Senha curta.'),
});

export type LoginForm = z.infer<typeof loginSchema>;
