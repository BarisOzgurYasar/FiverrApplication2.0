import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';

const app = express();
dotenv.config();
mongoose.set('strictQuery', true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('connected to mongoDB');
  } catch (error) {
    console.log(error);
  }
};

app.use('/api/users', userRoute);

app.listen(8800, () => {
  connect();
  console.log('backend server is runnig');
});
