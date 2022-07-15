import React from 'react';
import {
  Box, Text,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../components/ColorModeSwitcher';

function LoginPage () {
  return (
    <Box>
      <ColorModeSwitcher />
      <Text>Initial Text</Text>
    </Box>
  );
}

export default LoginPage;
