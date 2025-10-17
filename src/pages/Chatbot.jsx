import { useState, useRef, useEffect } from 'react';
import ToggleButton from '../components/ToggleButton';
import ChatWindow from '../components/ChatWindow';

export default function ChatbotUI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{
    id: 1,
    text: "Hello! I'm your AI assistant. How can I help you today?",
    sender: 'bot',
    timestamp: new Date()
  }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    const messageText = input.trim();
    if (!messageText) return;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    if (inputRef.current) {
      inputRef.current.blur();
    }

    setIsTyping(true);

    try {
      const response = await fetch("http://localhost:3001/api/chat/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          sessionId: "default",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to get response from AI service");
      }

      const botMessage = {
        id: Date.now() + 1,
        text: data.response || "No response from AI",
        sender: "bot",
        mimeType: data.mimeType || "text/plain",
        timestamp: new Date(data.timestamp || Date.now()),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat Error:", error);

      const errorMessage = {
        id: Date.now() + 1,
        text: error.message.includes("Service temporarily unavailable")
          ? "The AI service is currently unavailable. Please try again later."
          : "Sorry, something went wrong. Please try again.",
        sender: "bot",
        mimeType: "text/plain",
        timestamp: new Date(),
        isError: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {!isOpen && <ToggleButton onClick={() => setIsOpen(true)} />}
      
      <ChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        messages={messages}
        isTyping={isTyping}
        input={input}
        setInput={setInput}
        onSend={handleSend}
        inputRef={inputRef}
        messagesEndRef={messagesEndRef}
      />
    </>
  );
}