//src/utils/server.ts
import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import cors from 'cors';
import dotenv from 'dotenv';
import { handleWebSocket } from './services/websocketService';
import { postMessage, getMessages } from './controllers/chatController';
import logger from './utils/logger';

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// WebSocket server
const wss = new WebSocket.Server({ server });
(global as any).wss = wss;

wss.on('connection', handleWebSocket);

// REST API routes
app.post('/api/messages', postMessage);
app.get('/api/messages', getMessages);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});