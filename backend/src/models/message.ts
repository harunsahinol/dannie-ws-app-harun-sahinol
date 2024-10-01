//src/models/messages.ts
import db from '../config/database';
import { Message } from '../types';

const collection = db.collection('messages');

// Ensure the collection exists
const ensureCollectionExists = async () => {
  const exists = await collection.exists();
  if (!exists) {
    await collection.create();
    console.log("Collection 'messages' created.");
  }
};

// Call this function when your application starts
ensureCollectionExists().catch(error => {
  console.error("Error ensuring collection exists:", error);
});

export const saveMessage = async (username: string, content: string): Promise<void> => {
  await collection.save({ username, content, timestamp: new Date() });
};

export const getRecentMessages = async (limit: number = 50): Promise<Message[]> => {
  const query = `
    FOR message IN messages
    SORT message.timestamp DESC
    LIMIT @limit
    RETURN message
  `;
  const cursor = await db.query(query, { limit });
  return cursor.all();
};
