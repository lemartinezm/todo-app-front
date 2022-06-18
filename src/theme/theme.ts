// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react';
import { components } from './components';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  white: '#fff'
};

export const theme = extendTheme({ colors, components });
