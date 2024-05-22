import { Request, Response } from 'express';
import * as OrderService from './order.service';
import { OrderSchema } from './order.validations';
import { ZodError } from 'zod';
import * as InventoryService from '../inventory/inventory.service';

export const createOrder = async (req: Request, res: Response) => {
  try {
    // Validate request body
    OrderSchema.parse(req.body);

    const { email, productId, price, quantity } = req.body;

    // Check if the product exists in inventory
    const productExists = await InventoryService.checkProductExists(productId);
    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: 'Product not found in inventory',
      });
    }

    // Check if ordered quantity exceeds available quantity in inventory
    const availableQuantity =
      await InventoryService.getAvailableQuantity(productId);
    if (quantity > availableQuantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }

    // Reduce inventory quantity and update inStock status
    await InventoryService.updateInventory(productId, quantity);

    // Create the order
    const order = await OrderService.createOrder({
      email,
      productId,
      price,
      quantity,
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: order,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ success: false, error: error.errors });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to create order',
        error: error.message,
      });
    }
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderService.getAllOrders();
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message,
    });
  }
};

export const getOrdersByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const orders = await OrderService.getOrdersByEmail(email);
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully for user email!',
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders for user email',
      error: error.message,
    });
  }
};
