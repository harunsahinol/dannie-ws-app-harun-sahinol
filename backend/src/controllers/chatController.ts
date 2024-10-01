//src/controllers/chatControllers.ts
import { Request, Response } from 'express';
import { saveMessage, getRecentMessages } from '../models/message';
import logger from '../utils/logger';

export const postMessage = async (req: Request, res: Response) => {
  try {
    const { username, content } = req.body;
    await saveMessage(username, content);
    res.status(201).json({ message: 'Message saved successfully' });
  } catch (error) {
    logger.error('Error saving message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await getRecentMessages();
    res.status(200).json(messages);
  } catch (error) {
    logger.error('Error retrieving messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};