import {
  Button, useColorMode, useColorModeValue, Box, Container, FormControl, FormLabel, Input, Stack, Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const RegisterComponent = props => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmpassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = process.env.REACT_APP_BE_URL;
    if(password != confirmPassword) {
      alert("Password not match");
      return;
    }
    const response = await fetch(url + "/api/v1/users", {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        lastname: lastname,
        email: email,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const body = await response.json();
    if (body.statusCode == 200) {
      navigate("/");
    }
  }
  return (
    <Stack h="100vh" w="100wh" justifyContent="center" alignItems="center">
      <Container bg="c4" shadow="base" w="400px" borderRadius="sm" padding="15px">
        <form onSubmit={handleSubmit}>
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
