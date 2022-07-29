import { Button, Flex } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { FormMultiText, FormTextInput } from '../../../components/Inputs/FormInputs';

const initialValues: any = {
  teamName: '',
  participants: [],
  todos: []
};

const validationSchema = Yup.object().shape({
  teamName: Yup.string().required('Name is required'),
  participants: Yup.array().nullable(),
  todos: Yup.array().nullable()
});

export type NewTeamFormProps = {
  onSubmit: (values: any) => any
}

export function NewTeamForm({
  onSubmit
}: NewTeamFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <Flex flexDir='column' gap='30px'>
          <FormTextInput
            name='teamName'
            label='Name'
            placeholder='Write the team name'
            type='text'
          />

          <FormMultiText
            name='participants'
            label='Participants'
            placeholder='Write username to add'
          />

          <FormMultiText
            name='todos'
            label='Todos'
            placeholder='Write todo ID to add'
          />

          <Button type='submit'>
            Create Team
          </Button>
        </Flex>
      </Form>
    </Formik>
  );
}
