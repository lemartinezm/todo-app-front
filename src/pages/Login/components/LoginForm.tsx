import { Button, Flex } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { FormTextInput } from '../../../components';
import { ILogin } from '../../../models/Auth/auth.model';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(8, 'Password too short').required('Password is required')
});

const initialValues: ILogin = {
  email: '',
  password: '',
  remember: false
};

export type LoginFormProps = {
  isLoading: boolean,
  onSubmit: (values: ILogin) => any
}

export function LoginForm({ isLoading = false, onSubmit }: LoginFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={onSubmit}
    >

      <Form>
        <Flex flexDir='column' gap='20px' w='400px'>
          <FormTextInput
            label='Email'
            name='email'
            placeholder='example@email.com'
            type='text'
          />

          <FormTextInput
            label='Password'
            name='password'
            placeholder='Enter your password'
            type='password'
          />

          <Button type='submit' isLoading={isLoading}>
            Submit
          </Button>
        </Flex>
      </Form>

    </Formik>
  );
}
