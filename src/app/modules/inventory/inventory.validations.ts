import { z } from 'zod';

export const InventorySchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().positive().int(),
  inStock: z.boolean(),
});
