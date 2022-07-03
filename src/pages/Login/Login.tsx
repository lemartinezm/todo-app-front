import { Flex, Link, Text, useToast } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';
import { ILogin } from '../../models/Auth/auth.model';
import { login } from '../../services/auth.service';
import { getUserInfo } from '../../services/user.service';
import { ErrorToast } from '../../utils';
import { LoginForm } from './components/LoginForm';

export function Login() {
  const navigate = useNavigate();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setToken, setUser } = useContext(LoginContext);

  async function handleSubmit(values: ILogin) {
    setIsLoading(true);
    // First obtain the token with login function
    await login({
      email: values.email,
      password: values.password,
      remember: values.remember
    })
      .then(async (data) => {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        // Then obtain the user info with getUserInfo
        await getUserInfo(data.token)
          .then(res => {
            setUser(res.users[0]);
          })
          .catch(() => {
            setUser(null);
            setToken('');
            localStorage.removeItem('token');
          });
        navigate('/dashboard');
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
