import { Hono } from 'hono';
import { createUserHandler, loginUserHandler, logoutUserHandler } from '../handler/user.handler';
import { authorize } from '../middleware/auth.middleware';
import { authenticateMiddleware } from '../middleware/authentication.middleware';

const userRouter = new Hono();

userRouter.use(authorize);

userRouter.post('/create', authorize, createUserHandler);
userRouter.post('/login', loginUserHandler);
userRouter.post('/logout', authenticateMiddleware, logoutUserHandler);

export default userRouter;
