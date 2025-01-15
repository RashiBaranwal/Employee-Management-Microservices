import { Hono } from 'hono';
import { cors } from 'hono/cors';
import connectDB from './config/db.config';
import taskRouter from './routes/task.router';
import userRouter from './routes/user.router';
import notificationRouter from './routes/notification.router';

const createServer = () => {
  const app = new Hono().basePath('/api/v1');
  connectDB();
  app.use(
    '*',
    cors({
      origin: '*',
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    })
  );
  app.route('/user', userRouter);
  app.route('/task', taskRouter);
  app.route('/notification', notificationRouter);
  return app;
};

export default createServer;
