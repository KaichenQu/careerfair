'use client';

import React, { useState, useRef, useEffect } from "react";
import {
  Paper,
  TextField,
  Box,
  Typography,
  IconButton,
  Fade,
} from "@mui/material";
import { Chat as ChatIcon, Close as CloseIcon } from "@mui/icons-material";

interface Message {
  text: string;
  isUser: boolean;
}

const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { text: input, isUser: true }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "processing...", isUser: false },
      ]);
    }, 500);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "2rem",
        right: "6rem",
        zIndex: 999,
      }}
    >
      <Fade in={isOpen}>
        <Paper
          elevation={3}
          sx={{
            width: "300px",
            height: "400px",
            display: isOpen ? "flex" : "none",
            flexDirection: "column",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            marginBottom: "1rem",
            position: "absolute",
            bottom: "60px",
            right: 0,
          }}
        >
          <Box
            sx={{
              p: 2,
              background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Chat Assistant</Typography>
            <IconButton
              size="small"
              onClick={toggleChat}
              sx={{ color: "white" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  alignSelf: message.isUser ? "flex-end" : "flex-start",
                  maxWidth: "80%",
                }}
              >
                <Paper
                  sx={{
                    p: 1,
                    backgroundColor: message.isUser ? "#3b82f6" : "#f3f4f6",
                    color: message.isUser ? "white" : "black",
                  }}
                >
                  <Typography variant="body2">{message.text}</Typography>
                </Paper>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: 2,
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <TextField
              fullWidth
              size="small"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              variant="outlined"
            />
          </Box>
        </Paper>
      </Fade>

      <IconButton
        onClick={toggleChat}
        sx={{
          width: 50,
          height: 50,
          backgroundColor: "#3b82f6",
          color: "white",
          "&:hover": {
            backgroundColor: "#2563eb",
          },
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        }}
      >
        <ChatIcon />
      </IconButton>
    </Box>
  );
};

export default ChatBox;
