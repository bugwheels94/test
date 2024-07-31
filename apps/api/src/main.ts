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
const apiRouter = express.Router();
app.use('/api', apiRouter);
apiRouter.use(cors());

apiRouter.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
apiRouter.use(bodyParser.json());
apiRouter.use(passport);

apiRouter.use(router);
apiRouter.use(productRouter);

apiRouter.use('/assets', express.static(path.join(__dirname, 'assets')));

apiRouter.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});
app.use(express.static(path.join(__dirname, '..', 'ui')));

const port = Number(process.env.NX_PUBLIC_PORT) || 3000;
const host = process.env.NX_PUBLIC_HOST || 'localhost';
AppDataSource.initialize().then(async () => {
  const server = app.listen(port, host, () => {
    console.log(`Listening at http://${host}:${port}`);
  });
  server.on('error', console.error);
});
