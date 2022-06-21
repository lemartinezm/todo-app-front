import { Accordion, Flex, Text } from '@chakra-ui/react';
import { TodoItem } from '../../../components/Todo/TodoItem';
import { ITodo } from '../../../models/Todo/todo.model';

export type TodoListProps = {
  todos: ITodo[]
}

export function TodoList({
  todos
}: TodoListProps) {
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
                  <TodoItem
                    todo={todo}
                    key={todo._id}
                  />
                ))
              }
            </Accordion >
          </Flex>
          : <Text>
            You don&apos;t have pending ToDos
          </Text>
      }
    </>
  );
};
