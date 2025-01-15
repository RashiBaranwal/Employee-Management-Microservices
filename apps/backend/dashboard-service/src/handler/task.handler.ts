import Task from '../models/Task';
import { Context } from 'hono';

// @desc    Create task
// route    POST /api/v1/task
// access   private

export const createTaskHandler = async (c: Context) => {
  try {
    const { title, description, username, enddate } = await c.req.json();

    const requiredFields = { title, description, username, enddate };

    for (const [field, value] of Object.entries(requiredFields)) {
      if (!value) {
        return c.json({ error: `Missing required field: ${field}` }, 400);
      }
    }

    const task = new Task({ title, description, username, enddate });
    await task.save();
    console.log(task);
    return c.json({ message: 'Task Alloted' }, 201);
  } catch (error) {
    console.log('Error creating task', error);
    return c.json({ error: 'Error creating task' }, 500);
  }
};

// @desc    get single task comment
// route    GET /api/v1/task/:id
// access   private

export const getSingleTaskHandler = async (c: Context) => {
  try {
    const { id } = c.req.param();
    const task = await Task.findById(id);
    if (!task) {
      return c.json({ error: 'Task not found' }, 404);
    }
    return c.json(task, 200);
  } catch (error) {
    console.log('Error fetching task:', error);
    return c.json({ error: 'Failed to fetch task' }, 500);
  }
};

// @desc    get all task comment
// route    GET /api/v1/task/
// access   private

export const getAllTaskHandler = async (c: Context) => {
  try {
    const tasks = await Task.find();
    if (!tasks || tasks.length === 0) {
      return c.json({ error: 'No tasks found' }, 200);
    }
    return c.json(tasks, 200);
  } catch (error) {
    console.log('Error fetching tasks:', error);
    return c.json({ error: 'Failed to fetch tasks' }, 500);
  }
};

// @desc    Update Single task
// route    PUT /api/v1/task/:id
// access   private

export const updateTaskHandler = async (c: Context) => {
  try {
    const { id } = c.req.param();
    const updateData = await c.req.json();
    const updatedTask = await Task.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedTask) {
      return c.json({ error: 'Task not found' }, 404);
    }
    return c.json(updatedTask, 200);
  } catch (error) {
    console.log('Error updating task:', error);
    return c.json({ error: 'Failed to update task' }, 500);
  }
};

// @desc    Delete Single Task
// route    DELETE /api/v1/task/:id
// access   private

export const deleteTaskHandler = async (c: Context) => {
  try {
    const { id } = c.req.param();
    const deleteTask = await Task.findByIdAndDelete(id);
    if (!deleteTask) {
      return c.json({ error: 'Task not found' }, 404);
    }
    return c.json({ message: 'Task deleted successfully' }, 200);
  } catch (error) {
    console.log('Error deleting Task:', error);
    return c.json({ error: 'Failed to delete Task' }, 500);
  }
};
