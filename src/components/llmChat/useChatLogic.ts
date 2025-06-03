import { useState, useCallback, useRef, useEffect } from 'react';
import { EmojiClickData } from 'emoji-picker-react';

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface EmojiPickerProps {
  onEmojiSelect: (emoji: EmojiClickData) => void;
  isOpen: boolean;
  onClose: () => void;
}

const useChatLogic = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = useCallback((content: string) => {
    if (!content.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm a simulated AI response. Replace this with actual API integration.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  }, []);

  const handleEmojiSelect = useCallback((emoji: EmojiClickData) => {
    setInputValue(prev => prev + emoji.emoji);
    setIsEmojiPickerOpen(false);
  }, []);

  const formatMessage = useCallback((content: string) => {
    // Convert URLs to clickable links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return content.replace(urlRegex, url => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
  }, []);

  return {
    messages,
    inputValue,
    setInputValue,
    isEmojiPickerOpen,
    setIsEmojiPickerOpen,
    messagesEndRef,
    handleSendMessage,
    handleEmojiSelect,
    formatMessage,
  };
};

export default useChatLogic; 