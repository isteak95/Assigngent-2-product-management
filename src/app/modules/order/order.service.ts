import OrderModel from './order.model';
import { IOrder } from './order.interface';

export const createOrder = async (orderData: IOrder) => {
  const order = new OrderModel(orderData);
  return await order.save();
};

export const getAllOrders = async () => {
  return await OrderModel.find().populate('productId');
};

export const getOrdersByEmail = async (email: string) => {
  return await OrderModel.find({ email }).populate('productId');
};
