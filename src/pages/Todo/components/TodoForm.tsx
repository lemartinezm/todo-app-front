import { Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { FormSelectInput, FormTextareaInput, FormTextInput } from '../../../components/Inputs/FormInputs';
import { TodoPriority } from '../../../models/Todo/todo.model';

const initialValues: any = {
  name: '',
  description: '',
  priority: '',
  finishBefore: null
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().nullable(),
  priority: Yup.string().nullable(),
  finishBefore: Yup.date().nullable()
});

export function TodoForm() {
  function onSubmit(values: any) {
    alert(JSON.stringify(values));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <FormTextInput
          name='name'
          label='ToDo title'
          placeholder='ToDo title'
          type='text'
        />

        <FormTextareaInput
          label='Description'
          name='description'
          placeholder='Insert ToDo description here'
        />

        <FormSelectInput
          label='Priority'
          name='priority'
          placeholder='Select Todo priority'
          values={[TodoPriority.LOW, TodoPriority.NORMAL, TodoPriority.HIGH]}
        />

        <Button type='submit'>
          Create Todo
        </Button>
      </Form>
    </Formik>
  );
}
