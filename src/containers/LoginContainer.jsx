import React from 'react';

import {
  Container,
} from '@chakra-ui/react';
import LoginForm from '../components/LoginForm';

function LoginContainer() {
  return (
    <Container bg="c4" shadow="base" h="450px" w="400px" borderRadius="sm">
      <LoginForm />
    </Container>
  );
}

export default LoginContainer;
