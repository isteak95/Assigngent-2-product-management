import { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  searchProducts,
} from '../product/product.controller';

const router = Router();

// Create a new product
router.post('/', createProduct);

// Get all products
router.get('/', getAllProducts);

// Get a single product by ID
router.get('/:productId', getProductById);

// Update a product by ID
router.put('/:productId', updateProductById);

// Delete a product by ID
router.delete('/:productId', deleteProductById);

// Search for products
router.get('/search', searchProducts);

export default router;
