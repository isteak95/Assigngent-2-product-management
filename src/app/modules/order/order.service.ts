import OrderModel from './order.model';
import { IOrder } from './order.interface';

// create order

export const createOrder = async (orderData: IOrder) => {
  const order = new OrderModel(orderData);
  await order.save();
  return order;
};

// get order

export const getAllOrders = async () => {
  return OrderModel.find();
};

// get order by email

export const getOrdersByEmail = async (email: string) => {
  return OrderModel.find({ email });
};
