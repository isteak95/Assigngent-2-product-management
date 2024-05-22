import { Router } from 'express';
import * as OrderController from './order.controllers';

const router = Router();

router.post('/create-order', OrderController.createOrder);
router.get('/all-order', OrderController.getAllOrders);
router.get('/orders', OrderController.getOrdersByEmail);

export default router;
