import mongoose from 'mongoose';
import ENV from './env';

mongoose
  .connect(ENV.MONGO_URL!)
  .then(() => {
    console.log('Connect to MongoDB has been established successfully');
  })
  .catch((err) => {
    console.log(err);
  });
