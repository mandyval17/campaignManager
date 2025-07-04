import { z } from 'zod';

export const UserJwtPayloadSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TUserJwtPayload = z.infer<typeof UserJwtPayloadSchema>; 