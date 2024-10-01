import { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "../contexts/WebSocketContext";
import { Message, User } from "../types";

interface UseWebSocketReturn {
  messages: Message[];
  users: User[];
  sendMessage: (content: string) => void;
}

export const useWebSocket = (username: string): UseWebSocketReturn => {
  const { socket } = useContext(WebSocketContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === "message") {
          const messageWithTimestamp = {
            ...data,
            timestamp: new Date(data.timestamp),
          };
          setMessages((prev) => [...prev, messageWithTimestamp]);

        } else if (data.type === "userList") {
          setUsers(data.users.map((username: string) => ({ username, status: 'online' })));

        } else if (data.type === "userStatus") {
          setUsers((prevUsers) => {
            return prevUsers.map(user => 
              user.username === data.username
                ? { ...user, status: data.status }
                : user
            );
          });
        }
      };

      socket.send(JSON.stringify({ type: "login", username }));
    }
  }, [socket, username]);

  const sendMessage = (content: string) => {
    if (socket) {
      socket.send(
        JSON.stringify({
          type: "message",
          content,
          timestamp: new Date().toISOString(),
        })
      );
    }
  };

  return { messages, users, sendMessage };
};
