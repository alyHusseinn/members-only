// src/index.js
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import './db';
import { default as clubsRouter } from 'routes/club';
import { default as postsRouter } from 'routes/post';
import { default as usersRouter } from 'routes/user';
import { default as authRouter } from 'routes/auth';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use('/api/club', clubsRouter);
app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);
app.use('/api', authRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
