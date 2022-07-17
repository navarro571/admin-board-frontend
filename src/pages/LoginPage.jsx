import React from 'react';
import {
  Box,
  Container,
  FormControl, FormLabel, Input, Stack, Text,
} from '@chakra-ui/react';

function LoginPage () {
  return (
    <Stack h="100vh" w="100wh" justifyContent="center" alignItems="center">
      <Container bg="c4" shadow="base" h="450px" w="400px"  borderRadius="sm">
        <FormControl display="flex" flexDirection="column" paddingY={5} h="100%" w="100%" justifyContent="space-evenly">
          { /** Image */}
          <Box h="150px" w="100%" bg="c4" shadow="base" borderRadius="sm"></Box>
          {/** Form */}
          <Stack alignItems="left">
            <Box>
              <FormLabel color="white" htmlFor='email'>Email</FormLabel>
              <Input bg="white" id='email' type='email' />
            </Box>
            <Box>
              <FormLabel color="white" htmlFor='email'>Password</FormLabel>
              <Input bg="white" id='email' type='email' />
            </Box>
            <Box>
              <Input bg="btn_success" border="none" color="white" marginTop="5px" type='Submit' value="Sign in" />
            </Box>
          </Stack>
        </FormControl>
      </Container>
    </Stack>
  );
}

export default LoginPage;
