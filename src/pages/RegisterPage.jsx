import React from 'react';
import {
  Box, Text,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../components/ColorModeSwitcher';
import { RegisterComponent } from '../components/RegisterComponent';

function RegisterPage () {
  return (
    <Box>
      <RegisterComponent />
    </Box>
  );
}

export default RegisterPage;
