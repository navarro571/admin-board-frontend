import {
  Button, useColorMode, useColorModeValue, Box, Container, FormControl, FormLabel, Input, Stack, Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';

export const RegisterComponent = props => {
  const [name, setName] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const baseUrl = "http://localhost:8000/api/v1/"
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const submitRegisterPage = async (e) => {
    const data = {
      name: name,
      lastname: lastname,
      email: email,
      password: password,
      role: 1
    };
    const response = await fetch(baseUrl + "users", {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',

      body: JSON.stringify(data)
    });
    debugger
  }
  return (
    <Stack h="100vh" w="100wh" justifyContent="center" alignItems="center">
      <Container bg="c4" shadow="base" w="400px" borderRadius="sm" padding="15px">
        <form onSubmit={submitRegisterPage}>
          { /** Image */}
          <Box h="150px" w="100%" bg="c4" shadow="base" borderRadius="sm"></Box>
          {/** Form */}
          <Stack alignItems="left">
            <FormControl isRequired>
              <FormLabel color="white" htmlFor='name'>Name</FormLabel>
              <Input onChange={e => setName(e.target.value)} bg="white" id='name' type='text' />
            </FormControl>
            <FormControl>
              <FormLabel color="white" htmlFor='lastname'>Lastname</FormLabel>
              <Input onChange={e => setLastname(e.target.value)} bg="white" id='lastname' type='text' />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="white" htmlFor='email'>Email</FormLabel>
              <Input onChange={e => setEmail(e.target.value)} bg="white" id='email' type='email' />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="white" htmlFor='password'>Password</FormLabel>
              <Input onChange={e => setPassword(e.target.value)} bg="white" id='password' type='password' />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="white" htmlFor='confirmpassword'>Confirm Password</FormLabel>
              <Input onChange={e => setConfirmpassword(e.target.value)} bg="white" id='confirmpassword' type='password' />
            </FormControl>
            <FormControl>
              <Input bg="btn_success" border="none" color="white" marginTop="5px" type='submit' value="Register" />
            </FormControl>
          </Stack>
        </form>
      </Container>
    </Stack>
  );
};
