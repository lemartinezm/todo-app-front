import { Flex, Link, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ILogin } from '../../models/Auth/auth.model';
import { login } from '../../services/auth.service';
import { ErrorToast } from '../../utils';
import { LoginForm } from './components/LoginForm';

export function Login() {
  const navigate = useNavigate();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleSubmit(values: ILogin) {
    setIsLoading(true);
    login({
      email: values.email,
      password: values.password,
      remember: values.remember
    })
      .then(data => {
        localStorage.setItem('token', data.token);
        navigate('/');
      })
      .catch(err => {
        ErrorToast(toast, err.response.data.message);
        console.log(err);
      });
    setIsLoading(false);
  }

  return (
    <Flex flexDir='column' align='center' justify='center' minH='100vh' w='100%'>
      <Text fontSize='2xl' >
        Sign in
      </Text>

      <LoginForm
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />

      <Flex>
        <Link as={NavLink} to='/register'>
          You don&apos;t have an account? Sign up.
        </Link>
      </Flex>
    </Flex>
  );
};
