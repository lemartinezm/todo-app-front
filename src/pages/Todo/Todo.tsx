import React, { useState } from 'react';

import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { TodoList } from './components/TodoList';
import { CustomDrawer } from '../../components/Drawer/CustomDrawer';
import { NewTodoForm } from './components/NewTodoForm';

import { ITodo, TodoPriority } from '../../models/Todo/todo.model';
import { EditTodoForm } from './components/EditTodoForm';
import { ConfirmDelete } from './components/ConfirmDelete';

// fakeData
const initialTodos: ITodo[] = [];

// To avoid pass props component by component
interface ITodoContext {
  todos: ITodo[],
  setTodos: Function,
  onOpen: Function,
  setOperation: Function,
  setTodoToUpdate: Function
}

export const todoContext = React.createContext<ITodoContext>({
  todos: [],
  setTodos: () => { },
  onOpen: () => { },
  setOperation: () => { },
  setTodoToUpdate: () => { }
});

/**
 * TodoPage
 * @returns TodoPage
 */
export function Todo() {
  const [todos, setTodos] = useState<ITodo[]>(initialTodos);
  const [operation, setOperation] = useState<'add' | 'edit' | 'delete'>('add');
  const { isOpen, onOpen, onClose } = useDisclosure();

  // For update the todo
  const [todoToUpdate, setTodoToUpdate] = useState<ITodo>({
    _id: '',
    name: '',
    description: '',
    createdAt: new Date(),
    deadline: new Date(),
    completed: false,
    creator: 'Unknown',
    priority: TodoPriority.NORMAL,
    __v: 1
  });

  return (
    <todoContext.Provider value={{
      todos,
      setTodos,
      onOpen,
      setOperation,
      setTodoToUpdate
    }}>
      <Flex
        minH='100vh'
        flexDir='column'
        justifyContent='center'
        alignItems='center'
        w='100%'
      >
        <Flex flexDir='column' alignItems='flex-end' w='800px'>
          <Button
            bgColor='blue.500'
            _hover={{ bgColor: 'blue.700' }}
            leftIcon={<AddIcon />}
            w='fit-content'
            onClick={onOpen}
          >
            Add ToDo
          </Button>
        </Flex>
        <Box w='800px'>
          <TodoList todos={todos} />
        </Box>

        <CustomDrawer
          isOpen={(operation === 'add' || operation === 'edit') && isOpen}
          onClose={onClose}
          title='New ToDo'
        >
          {
            renderForm(operation, todos, setTodos, todoToUpdate, onClose)
          }
        </CustomDrawer>

        <ConfirmDelete
          isOpen={operation === 'delete' && isOpen}
          onClose={onClose}
          todos={todos}
          updateTodos={setTodos}
          todoToUpdate={todoToUpdate}
        />
      </Flex>
    </todoContext.Provider>

  );
};

function renderForm(operation: string, todos: ITodo[], setTodos: Function, todoToUpdate: ITodo, onClose: Function) {
  if (operation === 'add') return <NewTodoForm todos={todos} updateTodos={setTodos} onClose={onClose} />;
  else if (operation === 'edit') return <EditTodoForm todoToUpdate={todoToUpdate} todos={todos} onClose={onClose} updateTodos={setTodos} />;
  else return null;
}
