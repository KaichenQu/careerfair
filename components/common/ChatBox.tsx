"use client";

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
  const [isLoading, setIsLoading] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 400, height: 600 });
  const [isResizing, setIsResizing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { text: input, isUser: true }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/opensql?input=${encodeURIComponent(input)}`
      );
      const data = await response.json();

      // Format SQL query
      const sqlQuery = data.sql_query;
      const results = data.results;
      let formattedResponse = `SQL Query:\n${sqlQuery}\n\nResults:`;

      if (Array.isArray(results)) {
        // Filter out password fields and format array results
        formattedResponse += results
          .map((item, index) => {
            const filteredFields = Object.entries(item)
              .filter(([key]) => !key.toLowerCase().includes("password"))
              .map(([key, value]) => {
                const formattedKey = key
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");
                return `  ${formattedKey}: ${value}`;
              })
              .join("\n");
            return `\n\n${index + 1}:\n${filteredFields}`;
          })
          .join("\n");
      } else if (results && typeof results === "object") {
        // Filter out password fields and format single object
        formattedResponse +=
          "\n\n" +
          Object.entries(results)
            .filter(([key]) => !key.toLowerCase().includes("password"))
            .map(([key, value]) => {
              const formattedKey = key
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
              return `${formattedKey}: ${value}`;
            })
            .join("\n");
      } else {
        formattedResponse += "\nNo results found.";
      }

      setMessages((prev) => [
        ...prev,
        { text: formattedResponse, isUser: false },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, there was an error processing your request.",
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const formatMessage = (text: string) => {
    if (!text.includes("SQL Query:")) return text;

    const [sqlPart, resultsPart] = text.split("\n\nResults:");

    return (
      <>
        <div className="sql-query">{sqlPart.replace("SQL Query:\n", "")}</div>
        {resultsPart.split("\n\n").map((item, index) => {
          if (!item.trim()) return null;

          const [itemNum, ...fields] = item.split("\n");
          return (
            <div key={index} className="result-item">
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                {itemNum.trim()}
              </Typography>
              {fields.map((field, fieldIndex) => {
                const [label, value] = field.split(": ");
                return (
                  <div key={fieldIndex}>
                    <span className="field-label">{label.trim()}</span>
                    <span className="field-value">{value}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </>
    );
  };

  const startResizing = (mouseDownEvent: React.MouseEvent) => {
    mouseDownEvent.preventDefault();
    setIsResizing(true);

    const startWidth = dimensions.width;
    const startHeight = dimensions.height;
    const startX = mouseDownEvent.pageX;
    const startY = mouseDownEvent.pageY;

    const handleMouseMove = (mouseMoveEvent: MouseEvent) => {
      const newWidth = Math.max(
        300,
        startWidth + mouseMoveEvent.pageX - startX
      );
      const newHeight = Math.max(
        400,
        startHeight + mouseMoveEvent.pageY - startY
      );
      setDimensions({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    if (isResizing) {
      document.body.style.userSelect = "none";
      document.body.style.cursor = "nwse-resize";
    } else {
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    }

    return () => {
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
  }, [isResizing]);

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
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
            display: isOpen ? "flex" : "none",
            flexDirection: "column",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            marginBottom: "1rem",
            position: "absolute",
            bottom: "60px",
            right: 0,
            cursor: isResizing ? "nwse-resize" : "default",
            "& .resize-handle": {
              position: "absolute",
              right: 0,
              bottom: 0,
              width: "15px",
              height: "15px",
              cursor: "nwse-resize",
              background: "transparent",
              "&::after": {
                content: '""',
                position: "absolute",
                right: "3px",
                bottom: "3px",
                width: "8px",
                height: "8px",
                borderRight: "2px solid rgba(0,0,0,0.2)",
                borderBottom: "2px solid rgba(0,0,0,0.2)",
              },
            },
            userSelect: isResizing ? "none" : "auto",
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
                    p: 2,
                    backgroundColor: message.isUser ? "#3b82f6" : "#f3f4f6",
                    color: message.isUser ? "white" : "black",
                    whiteSpace: "pre-wrap",
                    fontFamily: message.isUser
                      ? "inherit"
                      : "'Segoe UI', system-ui, sans-serif",
                    maxWidth: "100%",
                    overflowX: "auto",
                    borderRadius: "12px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    border: message.isUser
                      ? "none"
                      : "1px solid rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{
                      wordBreak: "break-word",
                      lineHeight: 1.8,
                      fontSize: message.isUser ? "0.9rem" : "0.95rem",
                      paddingLeft: message.isUser ? 0 : 1,
                      "& .sql-query": {
                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        fontFamily: "monospace",
                        fontSize: "0.9rem",
                        margin: "8px 0",
                        display: "block",
                      },
                      "& .result-item": {
                        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                        paddingBottom: "8px",
                        marginBottom: "8px",
                      },
                      "& .field-label": {
                        color: "#4B5563",
                        fontWeight: 500,
                      },
                      "& .field-value": {
                        marginLeft: "8px",
                      },
                    }}
                  >
                    {isLoading && !message.isUser
                      ? "Processing..."
                      : formatMessage(message.text)}
                  </Typography>
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
          <div className="resize-handle" onMouseDown={startResizing} />
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