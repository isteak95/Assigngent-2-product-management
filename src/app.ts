import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import productRoutes from './app/modules/product/product.routers';
import orderRoutes from './app/modules/order/order.routes';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// routers ----------

// Use product routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('hello wrold');
});

app.all('*', (req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'route is not found' });
});

export default app;
