import { Document } from 'mongoose';

export interface IInventory extends Document {
  productId: string;
  quantity: number;
  inStock: boolean;
}
