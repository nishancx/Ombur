"use client";

import styles from "./chatInput.module.css";

import { Button } from "@/components/button/button";

import { Input } from "antd";
import { useState } from "react";

type ChatInputProps = {
  onSendMessage: ({ text }: { text: string }) => void;
};

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [messageText, setMessageText] = useState("");

  const sendMessage = () => {
    if (!messageText) return;

    onSendMessage({ text: messageText });
    setMessageText("");
  };

  return (
    <div className={styles.container}>
      <Input
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
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
