//src/types/index.ts
export interface Message {
  username: string;
  content: string;
  timestamp: Date;
}

export interface WebSocketMessage {
  type: 'login' | 'message';
  username?: string;
  content?: string;
}