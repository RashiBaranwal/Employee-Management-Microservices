import { Context } from 'hono';
import jwt from 'jsonwebtoken';
import { getCookie } from 'hono/cookie';
import { env } from '../validations/env';

const secretKey = env.JWT_SECRET;

export const authenticateMiddleware = async (c: Context, next: () => Promise<void>) => {
  const token = getCookie(c, 'token');

  if (!token) {
    return c.json({ error: 'No token provided' }, 401);
  }

  try {
    const decoded = jwt.verify(token, secretKey) as { id: string };
    c.req.userId = decoded.id;
    await next();
  } catch (error) {
    return c.json({ error: 'Invalid token' }, 401);
  }
};
