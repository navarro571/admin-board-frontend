import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';

const LoginForm = () => {
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

    const handleRegister = () => {
        navigate("/register");
    }
  return (
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
            <Stack flexDirection={'row'} justifyContent={'space-between'}>
              <Input
                type="submit"
                width="40%"
                marginTop={0}
                cursor={'pointer'}
                _hover={{ background: 'btn_success_hover' }}
                bg="btn_success"
                border="none"
                color="white"
                value="Sign in"
              />
              <Input
                type="button"
                width="40%"
                marginTop="0px !important"
                cursor={'pointer'}
                _hover={{ background: 'btn_black_hover' }}
                bg="btn_black"
                border="none"
                color="white"
                value="Register"
                onClick={handleRegister}
              />
            </Stack>
          </Stack>
        </Stack>
      </form>
  )
}

export default LoginForm;