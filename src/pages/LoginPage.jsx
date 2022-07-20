import React from 'react';
import {
  Stack,
} from '@chakra-ui/react';
import LoginContainer from '../containers/LoginContainer';

function LoginPage() {

  return (
    <Stack h="100vh" w="100wh" justifyContent="center" alignItems="center">
      <LoginContainer />
    </Stack>
  );
}

export default LoginPage;
