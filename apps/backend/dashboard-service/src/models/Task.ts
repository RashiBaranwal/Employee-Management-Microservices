import mongoose, { Schema } from 'mongoose';
import { ITask } from '../../types';

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  username: { type: String, required: true },
  startdate: { type: Date, default: Date.now() },
  enddate: { type: Date, required: true },
  status: { type: String, default: 'pending' }
});

const Task = mongoose.model<ITask>('Task', TaskSchema);
export default Task;
