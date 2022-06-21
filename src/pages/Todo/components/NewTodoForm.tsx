import { Button, Flex } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { FormDatePicker, FormSelectInput, FormTextareaInput, FormTextInput } from '../../../components/Inputs/FormInputs';
import { ITodo, TodoPriority } from '../../../models/Todo/todo.model';

const initialValues: any = {
  name: '',
  description: '',
  priority: TodoPriority.NORMAL,
  deadline: new Date()
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().nullable(),
  priority: Yup.string().nullable(),
  deadline: Yup.date().nullable()
});

export type NewTodoFormProps = {
  todos: ITodo[],
  updateTodos: Function,
  onClose: any
}

export function NewTodoForm({
  todos,
  updateTodos,
  onClose
}: NewTodoFormProps) {
  function onSubmit(values: any) {
    const temp: ITodo[] = [...todos];
    temp.push({
      _id: (todos.length + 1).toString(),
      name: values.name,
      description: values.description,
      completed: false,
      priority: values.priority,
      createdAt: new Date(),
      deadline: values.deadline,
      creator: 'Unknown',
      __v: 1
    });
    updateTodos(temp);
    onClose();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <Flex flexDir='column' gap='30px'>
          <FormTextInput
            name='name'
            label='Title'
            placeholder='Write the title here'
            type='text'
          />

          <FormTextareaInput
            label='Description'
            name='description'
            placeholder='Write the description here'
          />

          <FormSelectInput
            label='Priority'
            name='priority'
            placeholder='Select priority'
            values={[TodoPriority.LOW, TodoPriority.NORMAL, TodoPriority.HIGH]}
            valuesLabels={[TodoPriority.LOW.toUpperCase(), TodoPriority.NORMAL.toUpperCase(), TodoPriority.HIGH.toUpperCase()]}
          />

          <FormDatePicker
            name='deadline'
            label='Deadline'
          />

          <Button type='submit'>
            Create Todo
          </Button>
        </Flex>
      </Form>
    </Formik>
  );
}
