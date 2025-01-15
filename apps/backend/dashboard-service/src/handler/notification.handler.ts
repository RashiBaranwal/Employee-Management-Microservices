import { Context } from 'hono';
import Notification from '../models/Notification';

// @desc    Create notification
// route    POST /api/v1/notification
// access   private
export const createNotificationHandler = async (c: Context) => {
  try {
    const { title, description } = await c.req.json();

    if (!title || !description) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const notification = new Notification({ title, description });
    await notification.save();
    console.log(notification);
    return c.json({ message: 'Notification created.' }, 201);
  } catch (error) {
    console.log('Error creating notification', error);
    return c.json({ error: 'Error creating notification' }, 500);
  }
};

// @desc    Fetch all notifications
// route    GET /api/v1/notifications
// access   private
export const getAllNotificationsHandler = async (c: Context) => {
  try {
    const notifications = await Notification.find();
    return c.json(notifications, 200);
  } catch (error) {
    console.log('Error fetching notifications', error);
    return c.json({ error: 'Error fetching notifications' }, 500);
  }
};

// @desc    Fetch single notification by ID
// route    GET /api/v1/notification/:id
// access   private
export const getNotificationByIdHandler = async (c: Context) => {
  try {
    const { id } = c.req.param();
    const notification = await Notification.findById(id);

    if (!notification) {
      return c.json({ error: 'Notification not found' }, 404);
    }

    return c.json(notification, 200);
  } catch (error) {
    console.log('Error fetching notification', error);
    return c.json({ error: 'Error fetching notification' }, 500);
  }
};

// @desc    Update notification by ID
// route    PUT /api/v1/notification/:id
// access   private
export const updateNotificationHandler = async (c: Context) => {
  try {
    const { id } = c.req.param();
    const { title, description } = await c.req.json();

    if (!title || !description) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const notification = await Notification.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!notification) {
      return c.json({ error: 'Notification not found' }, 404);
    }

    console.log(notification);
    return c.json({ message: 'Notification updated.' }, 200);
  } catch (error) {
    console.log('Error updating notification', error);
    return c.json({ error: 'Error updating notification' }, 500);
  }
};

// @desc    Delete notification by ID
// route    DELETE /api/v1/notification/:id
// access   private
export const deleteNotificationHandler = async (c: Context) => {
  try {
    const { id } = c.req.param();

    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
      return c.json({ error: 'Notification not found' }, 404);
    }

    console.log(notification);
    return c.json({ message: 'Notification deleted.' }, 200);
  } catch (error) {
    console.log('Error deleting notification', error);
    return c.json({ error: 'Error deleting notification' }, 500);
  }
};
