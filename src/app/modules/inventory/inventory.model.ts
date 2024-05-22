import { Schema, model } from 'mongoose';
import { IInventory } from './inventory.interface';

const InventorySchema: Schema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

export default model<IInventory>('Inventory', InventorySchema);
