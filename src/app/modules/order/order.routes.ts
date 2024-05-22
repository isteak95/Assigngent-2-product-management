import { Router } from 'express';
import * as OrderController from './order.controllers';

const router = Router();

// create a product
router.post('/', OrderController.createOrder);

// get all produtct
router.get('/', OrderController.getAllOrders);

// get product by email
router.get('/orders', OrderController.getOrdersByEmail);

export default router;
