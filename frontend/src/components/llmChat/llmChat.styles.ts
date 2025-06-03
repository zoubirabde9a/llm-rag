import { styled } from '@mui/material/styles';
import { Box, Paper, TextField, IconButton } from '@mui/material';

export const ChatContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '600px',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '16px',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: `0 0 20px ${theme.palette.particleColor}40`,
  },
}));

export const ChatMessages = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: '20px',
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(180deg, rgba(26,26,46,0.8) 0%, rgba(45,45,77,0.8) 100%)'
    : 'linear-gradient(180deg, rgba(245,245,240,0.8) 0%, rgba(255,255,255,0.8) 100%)',
  backdropFilter: 'blur(10px)',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
    borderRadius: '4px',
  },
}));

export const MessageBubble = styled(Box)<{ isUser: boolean }>(({ theme, isUser }) => ({
  maxWidth: '80%',
  padding: '12px 16px',
  margin: '8px 0',
  borderRadius: '16px',
  position: 'relative',
  alignSelf: isUser ? 'flex-end' : 'flex-start',
  background: isUser 
    ? theme.palette.primary.main
    : theme.palette.mode === 'dark' 
      ? 'rgba(45,45,77,0.8)'
      : 'rgba(255,255,255,0.8)',
  color: isUser ? '#fff' : theme.palette.text.primary,
  boxShadow: `0 4px 12px ${theme.palette.particleColor}20`,
  '& a': {
    color: isUser ? '#fff' : theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export const InputContainer = styled(Paper)(({ theme }) => ({
  padding: '16px',
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  background: theme.palette.mode === 'dark' 
    ? 'rgba(45,45,77,0.8)'
    : 'rgba(255,255,255,0.8)',
  backdropFilter: 'blur(10px)',
  borderTop: `1px solid ${theme.palette.divider}`,
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
  '& .MuiOutlinedInput-root': {
    borderRadius: '24px',
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255,255,255,0.05)'
      : 'rgba(0,0,0,0.02)',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' 
        ? 'rgba(255,255,255,0.08)'
        : 'rgba(0,0,0,0.04)',
    },
    '&.Mui-focused': {
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}40`,
    },
  },
}));

export const SendButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'scale(1.05)',
  },
  transition: 'all 0.2s ease',
}));

export const EmojiButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main,
    transform: 'scale(1.1)',
  },
  transition: 'all 0.2s ease',
})); 