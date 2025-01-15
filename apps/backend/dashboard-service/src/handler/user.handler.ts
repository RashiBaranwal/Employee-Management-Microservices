import { Context } from 'hono';
import User from '../models/User';
import { IUser } from '../../types';
import { comparePassword, hashPassword } from '../utils/password';
import { generateToken } from '../utils/generateToken';
import { deleteCookie, setCookie } from 'hono/cookie';

// @desc    Create user
// route    POST /api/v1/user
// access   private

export const createUserHandler = async (c: Context) => {
  const { username, email, password, type ,gender } = await c.req.json();

  if (!username || !email || !password || !type || !gender) {
    return c.json({ error: 'Missing required field' }, 400);
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return c.json({ error: 'User already exists' }, 400);
  }

  const hashedPassword = await hashPassword(password);

  const newUser: IUser = new User({ username, email, password: hashedPassword, type, gender });
  // const newUser: User = { username, email, password: hashedPassword ,type};
  await newUser.save();

  const token = generateToken(newUser._id.toString());
  setCookie(c, 'token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 2592000,
  });

  return c.json({ user: { username, email } }, 201);
};

// @desc    Login user
// route    POST /api/v1/user/login
// access   public

export const loginUserHandler = async (c: Context) => {
  const { email, password } = await c.req.json();

  if (!email || !password) {
    return c.json({ error: 'Missing required field' }, 400);
  }

  const user = await User.findOne({ email });

  if (!user) {
    return c.json({ error: 'Invalid credentials' }, 401);
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    return c.json({ error: 'Invalid credentials' }, 401);
  }

  const token = generateToken(user._id.toString());
  setCookie(c, 'token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 2592000, // for 1 hour
  });

  return c.json({ user: { username: user.username, email: user.email, gender: user.gender ,type:user.type} }, 200);
};

// @desc    Logout user
// route    POST /api/v1/logout
// access   private

export const logoutUserHandler = (c: Context) => {
  deleteCookie(c, 'token', { httpOnly: true });
  return c.json({ message: 'Logged out successfully' }, 200);
};
