import cron from 'node-cron';
import Notification from '../models/Notification';

// a job to run every day at midnight
cron.schedule('0 0 * * *', async () => {
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  try {
    const result = await Notification.deleteMany({ createdAt: { $lt: oneDayAgo } });
    console.log(`${result.deletedCount} notifications deleted.`);
  } catch (error) {
    console.error('Error deleting old notifications:', error);
  }
});
