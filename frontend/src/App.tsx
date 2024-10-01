import React, { useState } from "react";
import { WebSocketProvider } from "./contexts/WebSocketContext";
import LoginPage from "./components/LoginPage";
import ChatRoom from "./components/ChatRoom";

const App: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  const handleLogin = (name: string) => {
    setUsername(name);
  };

  return (
    <WebSocketProvider>
      {username ? (
        <ChatRoom username={username} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </WebSocketProvider>
  );
};

export default App;
