"use client";

import styles from "./chatInput.module.css";

import { Button } from "@/components/button/button";

import { Input } from "antd";
import { useState } from "react";

type ChatInputProps = {
  onSendMessage: (message: string) => void;
};

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    onSendMessage(message);
    setMessage("");
  };

  return (
    <div className={styles.container}>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className={styles.input}
        onPressEnter={sendMessage}
      />
      <Button onClick={sendMessage} className={styles.button}>
        Send
      </Button>
    </div>
  );
};

export { ChatInput };
