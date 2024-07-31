import 'reflect-metadata';
import os from 'os';
import path from 'path';
import fs from 'fs';
import { DataSource } from 'typeorm';

import { Product } from './modules/products/entity';
import { User } from './modules/users/entity';
const targetDir = path.join(os.homedir(), '.config', 'super-terminal');
fs.mkdirSync(targetDir, { recursive: true });
export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database:
    process.env.SUPER_TERMINAL_DB || path.join(targetDir, 'database.sqlite'),
  synchronize: true,
  logging: ['error'],
  entities: [Product, User],
  migrations: [],
  subscribers: [],
});
export const ProductRepository = AppDataSource.getRepository(Product);
export const UserRepository = AppDataSource.getRepository(User);
