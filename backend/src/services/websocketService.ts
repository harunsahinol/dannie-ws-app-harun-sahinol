//src/services/websocketService.ts
import WebSocket from "ws";
import { IncomingMessage } from "http";
import { saveMessage } from "../models/message";
import logger from "../utils/logger";
import { WebSocketMessage } from "../types";

const activeUsers = new Set<string>();

export const handleWebSocket = (ws: WebSocket, req: IncomingMessage) => {
  let username: string = "";

  ws.on("message", async (message: string) => {
    try {
      const data: WebSocketMessage = JSON.parse(message);

      switch (data.type) {
        case "login":
          username = data.username || ""; // Fallback to empty string
          activeUsers.add(username);
          broadcastUserList();
          break;
        case "message":
          if (username && data.content) {
            await saveMessage(username, data.content);
            broadcast(
              JSON.stringify({
                type: "message",
                username,
                content: data.content,
              })
            );
          }
          break;
      }
    } catch (error) {
      logger.error("Error processing WebSocket message:", error);
    }
  });

  ws.on("close", () => {
    if (username) {
      // Broadcast user status as offline
      broadcast(
        JSON.stringify({
          type: "userStatus",
          username,
          status: "offline",
        })
      );

      activeUsers.delete(username);
    }
  });
};

function broadcast(message: string) {
  (global as any).wss.clients.forEach((client: WebSocket) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

function broadcastUserList() {
  broadcast(
    JSON.stringify({ type: "userList", users: Array.from(activeUsers) })
  );
}
