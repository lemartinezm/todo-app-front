import { Accordion, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { CustomDrawer } from '../../../components/Drawer/CustomDrawer';
import { TodoItem } from '../../../components/Todo/TodoItem';
import { ITodo, TodoPriority } from '../../../models/Todo/todo.model';
import { EditTodoForm } from './EditTodoForm';

export type TodoListProps = {
  todos: ITodo[],
  updateTodos: Function
}

export function TodoList({
  todos,
  updateTodos
}: TodoListProps) {
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
  // For drawer
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {
        todos.length >= 1
          ? <Flex flexDir='column'>
            <Flex gap='70px'>
              <Text>
                Done
              </Text>
              <Text w='250px'>
                Title
              </Text>
              <Text>
                Priority
              </Text>
              <Text>
                Deadline
              </Text>
            </Flex>
            <Accordion allowToggle>
              {
                todos.map(todo => (
                  <TodoItem todo={todo}
                    key={todo._id}
                    onOpen={onOpen}
                    setTodoToUpdate={setTodoToUpdate}
                  />
                ))
              }
            </Accordion >

            <CustomDrawer
              isOpen={isOpen}
              onClose={onClose}
              title='Edit ToDo'
            >
              <EditTodoForm
                todoToUpdate={todoToUpdate}
                todos={todos}
                onClose={onClose}
                updateTodos={updateTodos}
              />
            </CustomDrawer>
          </Flex>
          : <Text>
            You don&apos;t have pending ToDos
          </Text>
      }
    </>
  );
};
