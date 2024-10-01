import React, { useState } from "react";
import { useWebSocket } from "../hooks/useWebSocket";
import ChatMessage from "./ChatMessage";
import UserList from "./UserList";

interface ChatRoomProps {
  username: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ username }) => {
  const [inputMessage, setInputMessage] = useState('');
  const { messages, users, sendMessage } = useWebSocket(username);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  // Sort messages by timestamp
  const sortedMessages = [...messages].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {sortedMessages.map((message, index) => (
            <ChatMessage key={index} message={message} isOwnMessage={message.username === username} />
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="p-4 bg-white">
          <div className="flex">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send
            </button>
          </div>
        </form>
      </div>
      <div className="w-64 p-4 border-l">
        <UserList users={users} />
      </div>
    </div>
  );
};

export default ChatRoom;
