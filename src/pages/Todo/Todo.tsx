import React, { useContext, useEffect, useState } from 'react';

import { Button, Flex, useDisclosure, Text, useToast, Spinner } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { CustomConfetti } from '../../components';
import { CustomDrawer } from '../../components/Drawer/CustomDrawer';

import { ITodo, Meta, TodoPriority } from '../../models/Todo/todo.model';
import { TodoList, EditTodoForm, ConfirmDelete, NewTodoForm } from './components';
import { createTodo, deleteTodoById, getMyTodos, updateTodoById } from '../../services/todo.service';
import { LoginContext } from '../../context/LoginContext';
import { ErrorToast, SuccessToast } from '../../utils';
import { ITodoResponse } from '../../services/interfaces/todo';

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [todos, setTodos] = useState<ITodo[]>(initialTodos);
  const [meta, setMeta] = useState<Meta>({
    currentPage: 1,
    documentsPerPage: 1,
    totalDocuments: 1,
    totalPages: 1
  });
  const [operation, setOperation] = useState<TodoOperations>(TodoOperations.ADD);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token } = useContext(LoginContext);
  const toast = useToast();

  useEffect(() => {
    getMyTodos(token, undefined, meta.currentPage)
      .then((res: ITodoResponse) => {
        setTodos(res.todos ? res.todos : []);
        setMeta(res.todos ? res.meta : {});
        setIsLoading(false);
        clearTimeout(); // TODO: corregir el error de timeout que se muestra en consola aún si la petición es exitosa
      })
      .catch(err => console.log(err));
  }, [isLoading]);

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
  async function handleCompleted(todoCompleted: any) {
    await updateTodoById(todoCompleted._id, {
      completed: !todoCompleted.completed
    }, token)
      .then(res => {
        const temp: ITodo[] = [...todos];
        const index: number = temp.indexOf(todoCompleted);
        temp[index].completed = !temp[index].completed;
        setTodos(temp);
        SuccessToast(toast, res.message);
      })
      .catch(err => {
        ErrorToast(toast, err.response.data.message);
      });
  }

  // For create ToDo
  async function handleCreateTodo(values: any) {
    await createTodo({
      name: values.name,
      description: values.description,
      deadline: values.deadline,
      priority: values.priority
    }, token)
      .then(res => {
        onClose();
        SuccessToast(toast, res.message);
        setIsLoading(true);
      })
      .catch(err => {
        ErrorToast(toast, err.response.data.message);
      });
  }

  // For update ToDo
  async function handleUpdateTodo(values: any) {
    await updateTodoById(todoToUpdate._id, {
      name: values.name,
      description: values.description,
      deadline: values.deadline,
      priority: values.priority
    }, token)
      .then(res => {
        const temp: ITodo[] = [...todos];
        const index = temp.indexOf(todoToUpdate);
        temp[index].name = values.name;
        temp[index].description = values.description;
        temp[index].priority = values.priority;
        temp[index].deadline = values.deadline;
        setTodos(temp);
        onClose();
        SuccessToast(toast, res.message);
      })
      .catch(err => {
        ErrorToast(toast, err.response.data.message);
      });
  }

  async function handleDeleteTodo() {
    await deleteTodoById(token, todoToUpdate._id)
      .then(res => {
        const temp: ITodo[] = [...todos];
        const index: number = temp.indexOf(todoToUpdate);
        temp.splice(index, 1);
        setTodos(temp);
        onClose();
        SuccessToast(toast, res.message);
      })
      .catch(err => {
        ErrorToast(toast, err.response.data.message);
      });
  }

  function handleUpdatePagination(toPage: number) {
    const temp = { ...meta };
    temp.currentPage = toPage;
    setMeta(temp);
    setIsLoading(true);
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
      {
        isLoading
          ? <Flex flexDir='column' justify='center' align='center' h='100%' w='100%' overflowY='auto'>
            <Text>Getting Todos</Text>
            <Spinner />
          </Flex>
          : <Flex
            h='100%'
            flexDir='column'
            justifyContent='center'
            alignItems='center'
            w='100%'
            overflowY='auto'
            boxSizing='border-box'
          >
            {
              todos.length >= 1
                ? <Flex
                  flexDir='column'
                  justify='center'
                  w='100%'
                  h='100%'
                  px='16px'
                  gap='16px'
                  overflow='auto'
                >
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
                  <TodoList todos={todos} meta={meta} onUpdatePagination={handleUpdatePagination} />
                </Flex>
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
                renderForm(operation, todoToUpdate, handleCreateTodo, handleUpdateTodo)
              }
            </CustomDrawer>

            <ConfirmDelete
              isOpen={operation === 'delete' && isOpen}
              onClose={onClose}
              onDelete={handleDeleteTodo}
            />
          </Flex>
      }
    </todoContext.Provider>

  );
};

/**
 * Conditional render for forms
 * @param operation
 * @param todoToUpdate
 * @param onCreate
 * @param onUpdate
 * @returns
 */
function renderForm(operation: string, todoToUpdate: ITodo, onCreate: (values: any) => any, onUpdate: (values: any) => any) {
  if (operation === TodoOperations.ADD) return <NewTodoForm onSubmit={onCreate} />;
  else if (operation === TodoOperations.EDIT) return <EditTodoForm todoToUpdate={todoToUpdate} onSubmit={onUpdate} />;
  else return null;
}
