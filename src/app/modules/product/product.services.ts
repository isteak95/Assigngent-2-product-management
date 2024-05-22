import ProductModel from './product.model';
import { IProduct } from './product.interface';

export const createProduct = async (productData: IProduct) => {
  const product = new ProductModel(productData);
  await product.save();
  return product;
};

export const getAllProducts = async () => {
  return ProductModel.find();
};

export const getProductById = async (id: string) => {
  return ProductModel.findById(id);
};

export const updateProductById = async (
  id: string,
  updateData: Partial<IProduct>,
) => {
  return ProductModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

export const deleteProductById = async (id: string) => {
  return ProductModel.findByIdAndDelete(id);
};
