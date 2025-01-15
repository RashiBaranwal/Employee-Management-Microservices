import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  type: string;
  _id: mongoose.Types.ObjectId;
  gender: string;
}

export interface ITask extends Document {
  title: string;
  description: string;
  username: string;
  startdate: Date;
  enddate: Date;
  status: string;
}

export interface INotification extends Document {
  title: string;
  description: string;
  createdAt: Date;
}
