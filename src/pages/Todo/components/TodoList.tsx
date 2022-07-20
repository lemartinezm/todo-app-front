import { Accordion, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
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
        <Grid templateColumns='1.5fr 0.5fr 0.5fr 0.3fr' gap='16px' py='8px' pl='16px' pr='56px' w='100%'>
          <GridItem as={Text}>
            Title
          </GridItem>
          <GridItem as={Text}>
            Priority
          </GridItem>
          <GridItem as={Text}>
            Deadline
          </GridItem>
          <GridItem as={Text}>
            Done
          </GridItem>
        </Grid>
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
