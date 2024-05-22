import { z } from 'zod';

export const OrderSchema = z.object({
  email: z.string().email(),
  productId: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().positive().int(),
});
