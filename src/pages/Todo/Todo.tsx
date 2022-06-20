import React, { useState } from 'react';

import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { TodoList } from './components/TodoList';
import { CustomDrawer } from '../../components/Drawer/CustomDrawer';
import { NewTodoForm } from './components/NewTodoForm';

import { ITodo } from '../../models/Todo/todo.model';

// fakeData
const initialTodos: ITodo[] = [];

// To avoid pass props component by component
interface ITodoContext {
  todos: ITodo[],
  setTodos: Function,
  onOpen: Function
}

export const todoContext = React.createContext<ITodoContext>({
  todos: [],
  setTodos: () => {},
  onOpen: () => {}
});

/**
 * TodoPage
 * @returns TodoPage
 */
export function Todo() {
  const [todos, setTodos] = useState<ITodo[]>(initialTodos);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <todoContext.Provider value={{
      todos,
      setTodos,
      onOpen
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
            aria-label='a'
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
          <TodoList todos={todos} updateTodos={setTodos} />
        </Box>

        <CustomDrawer
          isOpen={isOpen}
          onClose={onClose}
          title='New ToDo'
        >
          <NewTodoForm todos={todos} updateTodos={setTodos} />
        </CustomDrawer>
      </Flex>
    </todoContext.Provider>

  );
};
