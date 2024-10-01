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


app.use(cors({
    origin: "https://auth.localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Enable CORS for WebSocket
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://auth.localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});
app.use(express.json());

// WebSocket server
const PORT = process.env.PORT || 4004;

let httpServer = server.listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new WebSocket.Server({ server, path: '/ws' });
(global as any).wss = wss;

wss.on('connection', (ws, req) => {
  console.log('New WebSocket connection', req.url);
  handleWebSocket(ws, req);
});

wss.on('error', (error) => {
  console.error('WebSocket server error:', error);
});// REST API routes
app.post('/api/messages', postMessage);
app.get('/api/messages', getMessages);



