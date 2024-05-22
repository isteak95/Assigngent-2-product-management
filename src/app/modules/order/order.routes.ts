import { Router } from 'express';
import * as OrderController from './order.controllers';

const router = Router();

router.post('/', OrderController.createOrder);
router.get('/', OrderController.getAllOrders);
router.get('/orders', OrderController.getOrdersByEmail);

export default router;
