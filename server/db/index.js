// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongoose = require('mongoose');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('Connect to MongoDB has been established successfully');
  })
  .catch((err) => {
    console.log(err);
  });
