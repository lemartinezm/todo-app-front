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
      <Flex flexDir='column'>
        <Flex justifyContent='space-between' py='8px' px='16px'>
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
    </>
  );
};
