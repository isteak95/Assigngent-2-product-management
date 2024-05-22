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
router.post('/create-product', createProduct);

// Get all products
router.get('/all-product', getAllProducts);

// Get a single product by ID
router.get('/:productId', getProductById);

router.get('/search', searchProducts);

// Update a product by ID
router.put('/update/:productId', updateProductById);

// Delete a product by ID
router.delete('/delete/:productId', deleteProductById);

export default router;
