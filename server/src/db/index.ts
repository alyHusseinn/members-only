import mongoose from 'mongoose';
import 'dotenv/config';
const MONGO_URL = process.env.MONGO_URL as string;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('Connect to MongoDB has been established successfully');
  })
  .catch((err) => {
    console.log(err);
  });
