import mongoose, { Schema } from 'mongoose';
import { INotification } from '../../types';

const NotificationSchema: Schema = new Schema<INotification>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Notification = mongoose.model<INotification>('Notification', NotificationSchema);
export default Notification;
