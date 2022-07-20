import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';

function LoginContainer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = process.env.REACT_APP_BE_URL;
    const res = await fetch(url + "/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password
      }),
      headers: {
        "Content-Type": "application/json",
      }
    });
    if(res.status != 200) {
      console.log("unauthorized");
      return;
    }
    const data = await res.json();
    navigate("/home", { state: data });
  }

  return (
    <Container bg="c4" shadow="base" h="450px" w="400px" borderRadius="sm">
      <form onSubmit={handleSubmit} style={{ height: '100%' }}>
        <Stack flexDirection="column" h="100%" justifyContent="center" gap={3}>
          {/** Image */}
          <Box h="150px" w="100%" bg="c4" shadow="base" borderRadius="sm"></Box>
          {/** Form */}
          <Stack alignItems="left" gap={1}>
            <FormControl isRequired>
              <FormLabel color="white" htmlFor="email">
                Email
              </FormLabel>
              <Input
                bg="white"
                onChange={ e => setEmail(e.target.value) }
                id="email"
                type="email"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="white" htmlFor="password">
                Password
              </FormLabel>
              <Input
                bg="white"
                onChange={ (e) => setPassword(e.target.value) }
                id="password"
                type="password"
              />
            </FormControl>
            <Input
              type="submit"
              width="100%"
              cursor={'pointer'}
              _hover={{ background: 'btn_success_hover' }}
              bg="btn_success"
              border="none"
              color="white"
              value="Sign in"
            />
          </Stack>
        </Stack>
      </form>
    </Container>
  );
}

export default LoginContainer;
