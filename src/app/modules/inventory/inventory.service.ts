import InventoryModel from './inventory.model';

export const checkProductExists = async (productId: string) => {
  const product = await InventoryModel.findById(productId);
  return !!product;
};

export const getAvailableQuantity = async (productId: string) => {
  const product = await InventoryModel.findById(productId);
  return product ? product.quantity : 0;
};

export const updateInventory = async (
  productId: string,
  orderedQuantity: number,
) => {
  const product = await InventoryModel.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  if (product.quantity < orderedQuantity) {
    throw new Error('Insufficient quantity available in inventory');
  }

  product.quantity -= orderedQuantity;
  product.inStock = product.quantity > 0;
  await product.save();
};
