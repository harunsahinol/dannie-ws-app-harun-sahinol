//src/config/database.ts
import { Database } from 'arangojs';
import dotenv from 'dotenv';

dotenv.config();

const db = new Database({
  url: process.env.DB_URL || 'http://localhost:8529',
  databaseName: process.env.DB_NAME || 'messages',
  auth: {
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'test123'
  }
});

export default db;