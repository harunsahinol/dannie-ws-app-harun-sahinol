import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
  isOwnMessage: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isOwnMessage }) => {
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${isOwnMessage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
        <p className="font-bold">{message.username}</p>
        <p>{message.content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
