import jwt from 'jsonwebtoken';
import { env } from '../validations/env';

const secretKey = env.JWT_SECRET;

export const generateToken = (userId: string) => {
  const token = jwt.sign({ id: userId }, secretKey, {
    expiresIn: '1d', // Expires in 1 day
  });
  return token;
};
