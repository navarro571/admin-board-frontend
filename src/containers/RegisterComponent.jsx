import {
  Container, Stack
} from '@chakra-ui/react';
import RegisterForm from '../components/RegisterForm';

export const RegisterComponent = () => {
  return (
    <Stack h="100vh" w="100wh" justifyContent="center" alignItems="center">
      <Container bg="c4" shadow="base" w="400px" borderRadius="sm" padding="15px">
        <RegisterForm />
      </Container>
    </Stack>
  );
};
