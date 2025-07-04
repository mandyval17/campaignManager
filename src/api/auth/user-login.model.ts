import { z } from 'zod';

export const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type TUserLogin = z.infer<typeof UserLoginSchema>; 