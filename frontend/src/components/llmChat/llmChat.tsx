import React from 'react';
import { Send as SendIcon, EmojiEmotions as EmojiIcon } from '@mui/icons-material';
import { Box, IconButton, TextField, Popper, Paper } from '@mui/material';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';
import useChatLogic from './useChatLogic';
import {
  ChatContainer,
  ChatMessages,
  MessageBubble,
  InputContainer,
  StyledTextField,
  SendButton,
  EmojiButton,
} from './llmChat.styles';

const LLMChat: React.FC = () => {
  const {
    messages,
    inputValue,
    setInputValue,
    isEmojiPickerOpen,
    setIsEmojiPickerOpen,
    messagesEndRef,
    handleSendMessage,
    handleEmojiSelect,
    formatMessage,
  } = useChatLogic();

  const emojiButtonRef = React.useRef<HTMLButtonElement>(null);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <ChatContainer>
      <ChatMessages>
        {messages.map((message) => (
          <MessageBubble 
            key={message.id} 
            isUser={message.isUser}
            dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
          />
        ))}
        <div ref={messagesEndRef} />
      </ChatMessages>

      <InputContainer elevation={3}>
        <EmojiButton
          ref={emojiButtonRef}
          onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
        >
          <EmojiIcon />
        </EmojiButton>

        <StyledTextField
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          multiline
          maxRows={4}
          variant="outlined"
        />

        <SendButton
          onClick={() => handleSendMessage(inputValue)}
          disabled={!inputValue.trim()}
        >
          <SendIcon />
        </SendButton>

        <Popper
          open={isEmojiPickerOpen}
          anchorEl={emojiButtonRef.current}
          placement="top-start"
          style={{ zIndex: 1300 }}
        >
          <Paper elevation={3}>
            <EmojiPicker
              onEmojiClick={handleEmojiSelect}
              theme={Theme.DARK}
              width={350}
              height={400}
            />
          </Paper>
        </Popper>
      </InputContainer>
    </ChatContainer>
  );
};

export default LLMChat; 