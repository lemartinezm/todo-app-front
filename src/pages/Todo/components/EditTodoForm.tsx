import { Button, Flex } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { FormDatePicker, FormSelectInput, FormTextareaInput, FormTextInput } from '../../../components/Inputs/FormInputs';
import { ITodo, TodoPriority } from '../../../models/Todo/todo.model';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().nullable(),
  priority: Yup.string().nullable(),
  deadline: Yup.date().nullable()
});

export type EditTodoFormProps = {
  todoToUpdate: ITodo,
  todos: ITodo[],
  updateTodos: Function,
  /**
   * To Close the drawer after update
   */
  onClose?: any
}

export function EditTodoForm({
  todoToUpdate,
  todos,
  updateTodos,
  onClose
}: EditTodoFormProps) {
  function onSubmit(values: any) {
    const temp: ITodo[] = [...todos];
    const index = temp.indexOf(todoToUpdate);
    temp[index].name = values.name;
    temp[index].description = values.description;
    temp[index].priority = values.priority;
    temp[index].deadline = values.deadline;
    updateTodos(temp);
    onClose();
  };

  return (
    <Formik
      initialValues={{
        name: todoToUpdate.name,
        description: todoToUpdate.description,
        priority: todoToUpdate.priority,
        deadline: todoToUpdate.deadline
      }}
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
            Update Todo
          </Button>
        </Flex>
      </Form>
    </Formik>
  );
}
