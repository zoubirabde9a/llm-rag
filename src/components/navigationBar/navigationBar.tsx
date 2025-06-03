import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import {
  NavigationContainer,
  MainNavSection,
  SubNavSection,
  LogoContainer,
  NavItemButton,
  SubNavItemButton,
  NavIcon,
  NavText,
  SubNavText,
  CurrentItemHeader,
} from './navigationBarStyles';
import {
  navigationItems,
  NavigationState,
  initialNavigationState,
  getCurrentItem,
} from './navigationBarLogic';

interface NavigationBarProps {
  onNavigate?: (itemId: string) => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ onNavigate }) => {
  const theme = useTheme();
  const [navState, setNavState] = useState<NavigationState>(initialNavigationState);

  const handleItemClick = (itemId: string) => {
    setNavState(prev => ({
      ...prev,
      selectedItemId: itemId,
      selectedSubItemId: null,
    }));
    onNavigate?.(itemId);
  };

  const handleSubItemClick = (subItemId: string) => {
    setNavState(prev => ({
      ...prev,
      selectedSubItemId: subItemId,
    }));
    onNavigate?.(subItemId);
  };

  const currentItem = getCurrentItem(navigationItems, navState.selectedItemId);

  return (
    <NavigationContainer>
      <MainNavSection>
        <LogoContainer>
          <Box
            component="img"
            src="/logo.png"
            alt="Company Logo"
            sx={{
              width: '40px',
              height: '40px',
              filter: theme.palette.mode === 'dark' ? 'brightness(0.8)' : 'none',
            }}
          />
        </LogoContainer>

        {navigationItems.map((item) => (
          <NavItemButton
            key={item.id}
            selected={navState.selectedItemId === item.id}
            onClick={() => handleItemClick(item.id)}
          >
            <NavIcon>{item.icon}</NavIcon>
            <NavText>{item.label}</NavText>
          </NavItemButton>
        ))}
      </MainNavSection>

      {currentItem && currentItem.subItems && (
        <SubNavSection>
          <CurrentItemHeader>
            {currentItem.icon} {currentItem.label}
          </CurrentItemHeader>

          {currentItem.subItems.map((subItem) => (
            <SubNavItemButton
              key={subItem.id}
              selected={navState.selectedSubItemId === subItem.id}
              onClick={() => handleSubItemClick(subItem.id)}
            >
              <NavIcon>{subItem.icon}</NavIcon>
              <SubNavText>{subItem.label}</SubNavText>
            </SubNavItemButton>
          ))}
        </SubNavSection>
      )}
    </NavigationContainer>
  );
};

export default NavigationBar; 