import { Request, Response } from 'express';
import * as ProductService from '../product/product.services';
import { ProductSchema } from '../product/product.validations';
import ProductModel from '../product/product.model';

import { ZodError } from 'zod';

export const createProduct = async (req: Request, res: Response) => {
  try {
    ProductSchema.parse(req.body);

    const product = await ProductService.createProduct(req.body);
    res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      data: product,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({ error: err.errors });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message,
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: error.message,
    });
  }
};

export const updateProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const updatedProductData = req.body;

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true },
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: error.message,
    });
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: error.message,
    });
  }
};

export const searchProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    const products = await ProductModel.find({
      $or: [
        { name: new RegExp(searchTerm, 'i') },
        { description: new RegExp(searchTerm, 'i') },
        { category: new RegExp(searchTerm, 'i') },
        { tags: new RegExp(searchTerm, 'i') },
      ],
    });

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to search products',
      error: error.message,
    });
  }
};
