import {
  Button,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');

  return (
    <Button
      size="md"
      fontSize="lg"
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      color="current"
      marginLeft="2"
      w={10}
      h={10}
      onClick={toggleColorMode}
    >
      {text}
    </Button>
  );
};
