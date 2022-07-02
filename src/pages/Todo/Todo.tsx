import React, { useState } from 'react';

import { Box, Button, Flex, useDisclosure, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { CustomConfetti } from '../../components';
import { CustomDrawer } from '../../components/Drawer/CustomDrawer';
import { NewTodoForm } from './components/NewTodoForm';

import { ITodo, TodoPriority } from '../../models/Todo/todo.model';
import { TodoList } from './components/TodoList';
import { EditTodoForm } from './components/EditTodoForm';
import { ConfirmDelete } from './components/ConfirmDelete';

// Operations enum
export enum TodoOperations {
  ADD = 'add',
  EDIT = 'edit',
  DELETE = 'delete',
  COMPLETED = 'completed',
}

const initialTodos: ITodo[] = [];

interface ITodoContext {
  todos: ITodo[],
  setTodos: Function,
  onOpen: Function,
  setOperation: Function,
  setTodoToUpdate: Function,
  handleCompleted: (e?: any) => any
}

export const todoContext = React.createContext<ITodoContext>({
  todos: [],
  setTodos: () => { },
  onOpen: () => { },
  setOperation: () => { },
  setTodoToUpdate: () => { },
  handleCompleted: () => { }
});

/**
 * TodoPage
 * @returns TodoPage
 */
export function Todo() {
  const [todos, setTodos] = useState<ITodo[]>(initialTodos);
  const [operation, setOperation] = useState<TodoOperations>(TodoOperations.ADD);
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

  // For setCompleted
  function handleCompleted(todoCompleted: any) {
    const temp: ITodo[] = [...todos];
    const index: number = temp.indexOf(todoCompleted);
    temp[index].completed = !temp[index].completed;
    setTodos(temp);
  }

  return (
    <todoContext.Provider value={{
      todos,
      setTodos,
      onOpen,
      setOperation,
      setTodoToUpdate,
      handleCompleted
    }}>
      <Flex
        minH='100vh'
        flexDir='column'
        justifyContent='center'
        alignItems='center'
        w='100%'
      >
        {
          todos.length >= 1
            ? <Box w='800px'>
              <Flex flexDir='column' alignItems='flex-end' w='800px'>
                <Button
                  bgColor='blue.500'
                  _hover={{ bgColor: 'blue.700' }}
                  leftIcon={<AddIcon />}
                  w='fit-content'
                  onClick={() => {
                    setOperation(TodoOperations.ADD);
                    onOpen();
                  }}
                >
                  Add ToDo
                </Button>
              </Flex>
              <TodoList todos={todos} />
            </Box>
            : <Flex flexDir='column' alignItems='center'>
              <CustomConfetti />
              <Text>
                You don&apos;t have pending ToDos
              </Text>
              <Button
                bgColor='blue.500'
                _hover={{ bgColor: 'blue.700' }}
                leftIcon={<AddIcon />}
                w='fit-content'
                onClick={() => {
                  setOperation(TodoOperations.ADD);
                  onOpen();
                }}
              >
                Add ToDo
              </Button>
            </Flex>
        }

        <CustomDrawer
          isOpen={(operation === TodoOperations.ADD || operation === TodoOperations.EDIT) && isOpen}
          onClose={onClose}
          title={`${operation === TodoOperations.ADD ? 'New' : 'Edit'} ToDo`}
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

/**
 * Conditional render for forms
 * @param operation
 * @param todos
 * @param setTodos
 * @param todoToUpdate
 * @param onClose
 * @returns
 */
function renderForm(operation: string, todos: ITodo[], setTodos: Function, todoToUpdate: ITodo, onClose: Function) {
  if (operation === TodoOperations.ADD) return <NewTodoForm todos={todos} updateTodos={setTodos} onClose={onClose} />;
  else if (operation === TodoOperations.EDIT) return <EditTodoForm todoToUpdate={todoToUpdate} todos={todos} onClose={onClose} updateTodos={setTodos} />;
  else return null;
}
