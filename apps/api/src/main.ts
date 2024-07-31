/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import { AppDataSource } from './data-source';
import router from './modules/users/controller';
import passport from './modules/auth/auth';
import productRouter from './modules/products/controller';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(passport);

app.use(router);
app.use(productRouter);

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

const port = Number(process.env.NX_PUBLIC_PORT) || 3333;
const host = process.env.NX_PUBLIC_HOST || 'localhost';
AppDataSource.initialize().then(async () => {
  const server = app.listen(port, host, () => {
    console.log(`Listening at http://${host}:${port}/api`);
  });
  server.on('error', console.error);
});
