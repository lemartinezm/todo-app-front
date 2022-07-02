import { Flex, Link, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IRegister } from '../../models/Auth/auth.model';
import { register } from '../../services/auth.service';
import { ErrorToast, SuccessToast } from '../../utils';
import { RegisterForm } from './components/RegisterForm';

export function Register() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const navigate = useNavigate();

  function handleRegister(values: IRegister) {
    setIsLoading(true);

    register({
      username: values.username,
      email: values.email,
      password: values.password
    })
      .then(res => {
        SuccessToast(toast, res.message);
        setTimeout(() => {
          navigate('/');
        }, 1500);
      })
      .catch(err => {
        ErrorToast(toast, err.response.data.message);
      });

    setIsLoading(false);
  }
  return (
    <Flex flexDir='column' minH='100vh' justify='center' align='center'>
      <Text fontSize='2xl' >
        Sign up
      </Text>

      <RegisterForm
        isLoading={isLoading}
        onSubmit={handleRegister}
      />

      <Flex>
        <Link as={NavLink} to='/login'>
          Already have an account? Sign in.
        </Link>
      </Flex>

    </Flex>
  );
}
