import { styled } from '@mui/material/styles';
import { TextField, Button, Box } from '@mui/material';
import { keyframes } from '@mui/system';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const QueryContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: '800px',
  margin: '2rem auto',
  padding: '1rem',
  borderRadius: '4px',
  background: theme.palette.mode === 'dark' 
    ? 'rgba(30, 30, 30, 0.8)' 
    : 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  boxShadow: `0 0 20px ${theme.palette.primary.main}40`,
  transition: 'all 0.3s ease-in-out',
  animation: `${fadeIn} 0.6s ease-out forwards`,
  '&:hover': {
    boxShadow: `0 0 30px ${theme.palette.primary.main}60`,
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(0, 0, 0, 0.2)' 
      : 'rgba(255, 255, 255, 0.9)',
    borderRadius: '4px',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' 
        ? 'rgba(0, 0, 0, 0.3)' 
        : 'rgba(255, 255, 255, 1)',
    },
    '&.Mui-focused': {
      boxShadow: `0 0 15px ${theme.palette.primary.main}40`,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: `${theme.palette.primary.main}40`,
      transition: 'all 0.3s ease-in-out',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
  },
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: '1rem',
  padding: '0.25rem 1.0rem',
  minWidth: '120px',
  borderRadius: '0px',
  color: theme.palette.primary.main,
  border: `1px solid ${theme.palette.primary.main}40`,
  backgroundColor: 'transparent',
  fontWeight: 500,
  fontSize: '0.9rem',
  textTransform: 'none',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: `${theme.palette.primary.main}10`,
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 15px ${theme.palette.primary.main}30`,
  },
  '&:active': {
    transform: 'scale(0.98)',
  },
  '&.Mui-disabled': {
    borderColor: `${theme.palette.primary.main}20`,
    color: `${theme.palette.primary.main}40`,
  }
})); 