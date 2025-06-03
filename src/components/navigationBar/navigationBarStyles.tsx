import { styled } from '@mui/material/styles';
import { Box, ListItemButton } from '@mui/material';

export const NavigationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(18, 18, 18, 0.95)' : 'rgba(245, 245, 245, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRight: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
}));

export const MainNavSection = styled(Box)(({ theme }) => ({
  width: '80px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2, 0),
  borderRight: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
}));

export const SubNavSection = styled(Box)(({ theme }) => ({
  width: '200px',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
}));

export const LogoContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(4),
  padding: theme.spacing(1),
}));

export const NavItemButton = styled(ListItemButton)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(1.5),
  margin: theme.spacing(0.5, 0),
  borderRadius: theme.spacing(1),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(0, 0, 0, 0.05)',
    transform: 'translateY(-2px)',
    boxShadow: `0 0 15px ${theme.palette.primary.main}40`,
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.15)'
      : 'rgba(0, 0, 0, 0.08)',
    boxShadow: `0 0 20px ${theme.palette.primary.main}60`,
  },
}));

export const SubNavItemButton = styled(ListItemButton)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1.5),
  margin: theme.spacing(0.5, 0),
  borderRadius: theme.spacing(1),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.05)',
    transform: 'translateX(5px)',
    boxShadow: `0 0 15px ${theme.palette.secondary.main}40`,
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.15)'
      : 'rgba(0, 0, 0, 0.08)',
    boxShadow: `0 0 20px ${theme.palette.secondary.main}60`,
  },
}));

export const NavIcon = styled(Box)(({ theme }) => ({
  fontSize: '1.5rem',
  marginBottom: theme.spacing(0.5),
  color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
}));

export const NavText = styled(Box)(({ theme }) => ({
  fontSize: '0.75rem',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(0.5),
}));

export const SubNavText = styled(Box)(({ theme }) => ({
  fontSize: '0.875rem',
  marginLeft: theme.spacing(1),
  color: theme.palette.text.primary,
}));

export const CurrentItemHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  color: theme.palette.primary.main,
  fontSize: '1.1rem',
  fontWeight: 500,
})); 