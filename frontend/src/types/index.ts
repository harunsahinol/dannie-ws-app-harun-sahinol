export interface Message {
  username: string;
  content: string;
  timestamp: Date;
}

export interface User {
  username: string;
  status: 'online' | 'offline';

}