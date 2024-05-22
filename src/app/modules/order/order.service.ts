import OrderModel from './order.model';
import { IOrder } from './order.interface';

export const createOrder = async (orderData: IOrder) => {
  const order = new OrderModel(orderData);
  await order.save();
  return order;
};

export const getAllOrders = async () => {
  return OrderModel.find();
};

export const getOrdersByEmail = async (email: string) => {
  return OrderModel.find({ email });
};
