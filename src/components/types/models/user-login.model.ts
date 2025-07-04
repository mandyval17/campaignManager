import { z } from 'zod';

export const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password must be at least 1 character long"),
});

export type TUserLogin = z.infer<typeof UserLoginSchema>; 