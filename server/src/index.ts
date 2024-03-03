// src/index.js
import express, { Express, Request, Response } from 'express';
import './config/db';
import ENV from './config/env';
import routes from './routes';

const app: Express = express();
const port = ENV.PORT || 3000;

app.use(ENV.API_PREFIX!, routes);

app.get('/', (req: Request, res: Response) => {
  res.json({ msg: 'Wellcome Bitch!' });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
