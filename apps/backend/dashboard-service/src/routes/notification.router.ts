import { Hono } from 'hono';
import {
  createNotificationHandler,
  getAllNotificationsHandler,
  getNotificationByIdHandler,
  updateNotificationHandler,
  deleteNotificationHandler,
} from '../handler/notification.handler';
import { authorize } from '../middleware/auth.middleware';

const notificationRouter = new Hono();

notificationRouter.use(authorize);

notificationRouter.post('/', createNotificationHandler);
notificationRouter.get('/', getAllNotificationsHandler);
notificationRouter.get('/:id', getNotificationByIdHandler);
notificationRouter.put('/:id', updateNotificationHandler);
notificationRouter.delete('/:id', deleteNotificationHandler);

export default notificationRouter;
