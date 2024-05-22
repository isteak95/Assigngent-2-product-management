import { Schema, model } from 'mongoose';

const InventorySchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, default: true },
});

export default model('Inventory', InventorySchema);
