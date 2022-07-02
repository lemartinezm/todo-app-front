import { Button, Flex } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { FormTextInput } from '../../../components';
import { IRegister } from '../../../models/Auth/auth.model';

const registerSchema = Yup.object().shape({
  username: Yup.string().min(6, 'Username too short').required('Username is required'),
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().min(8, 'Password too short').required('Password is required'),
  confirm: Yup.string().equals([Yup.ref('password')], 'Passwords must match').required('Please, confirm your password')
});

const initialValues: IRegister = {
  username: '',
  email: '',
  password: '',
  confirm: ''
};

export type RegisterFormProps = {
  isLoading: boolean;
  onSubmit: (values: IRegister) => any
}

export function RegisterForm({ isLoading, onSubmit }: RegisterFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <Flex flexDir='column' gap='20px' w={{ base: '300px', sm: '400px' }} p={{ base: '10px', sm: 'none' }}>
          <FormTextInput
            label='Username'
            name='username'
            placeholder='Insert username'
            type='text'
          />

          <FormTextInput
            label='Email'
            name='email'
            placeholder='example@email.com'
            type='text'
          />

          <FormTextInput
            label='Password'
            name='password'
            placeholder='Insert your password'
            type='password'
          />

          <FormTextInput
            label='Confirm password'
            name='confirm'
            placeholder='Confirm your password'
            type='password'
          />

          <Button type='submit' isLoading={isLoading} >
            Sign up
          </Button>
        </Flex>
      </Form>
    </Formik>
  );
}
