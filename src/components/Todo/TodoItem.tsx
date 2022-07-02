import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Badge, Button, ButtonGroup, Checkbox, Flex, Spacer, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { ITodo } from '../../models/Todo/todo.model';
import { todoContext, TodoOperations } from '../../pages/Todo/Todo';

export type TodoItemProps = {
  /**
   * Todo to print
   */
  todo: ITodo
}

export function TodoItem({
  todo
}: TodoItemProps) {
  const { setOperation, setTodoToUpdate, onOpen, handleCompleted } = useContext(todoContext); // For drawer and updates defined in the parent (TodoPage)
  return (
    <AccordionItem>
      <AccordionButton>
        <Flex justifyContent='space-between' alignItems='center' w='100%' mr='20px'>
          <Checkbox isChecked={todo.completed} onChange={() => {
            handleCompleted(todo);
          }} />
          <Text w='250px'>
            {todo.name}
          </Text>

          <Badge variant={todo.priority}>
            {todo.priority}
          </Badge>

          <Text>
            {todo.deadline.toLocaleDateString()}
          </Text>
        </Flex>
        <Spacer />
        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel>
        <Text>
          {todo.description}
        </Text>
        <ButtonGroup justifyContent='center' w='100%'>
          <Button
            bgColor='blue.500'
            _hover={{ bgColor: 'blue.700' }}
            leftIcon={<EditIcon />}
            onClick={() => {
              setOperation(TodoOperations.EDIT);
              onOpen();
              setTodoToUpdate(todo);
            }}
          >
            Edit ToDo
          </Button>
          <Button
            leftIcon={<DeleteIcon />}
            bgColor='red.500'
            _hover={{ bgColor: 'red.700' }}
            onClick={() => {
              setOperation(TodoOperations.DELETE);
              onOpen();
              setTodoToUpdate(todo);
            }}
          >
            Delete ToDo
          </Button>
        </ButtonGroup>
      </AccordionPanel>
    </AccordionItem>

  );
}
