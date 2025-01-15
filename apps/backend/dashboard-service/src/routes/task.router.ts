import { Hono } from 'hono';
import {
  createTaskHandler,
  getSingleTaskHandler,
  getAllTaskHandler,
  updateTaskHandler,
  deleteTaskHandler,
} from '../handler/task.handler';
import { authorize } from '../middleware/auth.middleware';

const taskRouter = new Hono();

taskRouter.post('/create', authorize, createTaskHandler);
taskRouter.get('/:id', authorize, getSingleTaskHandler);
taskRouter.get('/', authorize, getAllTaskHandler);
taskRouter.put('/:id', authorize, updateTaskHandler);
taskRouter.delete('/:id', authorize, deleteTaskHandler);

export default taskRouter;
