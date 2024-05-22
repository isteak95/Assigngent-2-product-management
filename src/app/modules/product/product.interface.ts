import { Document } from 'mongoose';

interface Variant {
  type: string;
  value: string;
}

interface Inventory {
  quantity: number;
  inStock: boolean;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: Variant[];
  inventory: Inventory;
}

export interface IOrder extends Document {
  email: string;
  productId: string;
  price: number;
  quantity: number;
}
