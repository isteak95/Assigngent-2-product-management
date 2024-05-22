import { z } from 'zod';

export const InventorySchema = z.object({
  productId: z.string(),
  quantity: z.number().positive(),
  inStock: z.boolean(),
});
