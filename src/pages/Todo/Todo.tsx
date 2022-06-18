import { Box, Flex } from '@chakra-ui/react';
import { TodoList } from './components/TodoList';

export function Todo() {
  return (
    <Flex minW='100vw' minH='100vh' justifyContent='center' alignItems='center'>
      <Box w='800px'>
        <TodoList />
      </Box>
    </Flex>
  );
};
