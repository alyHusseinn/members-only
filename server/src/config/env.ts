import dotenv from 'dotenv';

dotenv.config();

const env = {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT,
  API_PREFIX: process.env.API_PREFIX
};

export default env;
