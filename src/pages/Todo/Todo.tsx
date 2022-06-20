import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { TodoList } from './components/TodoList';
import { CustomDrawer } from '../../components/Drawer/CustomDrawer';
import { TodoForm } from './components/TodoForm';

export function Todo() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
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
        <TodoList />
      </Box>

      <CustomDrawer
        isOpen={isOpen}
        onClose={onClose}
        title='Add ToDo'
      >
        <TodoForm />
      </CustomDrawer>
    </Flex>
  );
};
