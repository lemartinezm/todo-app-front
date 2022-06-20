import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Badge, Button, ButtonGroup, Checkbox, Flex, Spacer, Text } from '@chakra-ui/react';
import { ITodo } from '../../models/Todo/todo.model';

export type TodoItemProps = {
  todo: ITodo
}

export function TodoItem({
  todo
}: TodoItemProps) {
  return (
    <AccordionItem>
      <AccordionButton>
        <Flex gap='70px' alignItems='center'>
          <Checkbox isChecked={todo.completed} />
          <Text w='250px'>
            {todo.name}
          </Text>

          <Badge variant={todo.priority}>
            {todo.priority}
          </Badge>

          <Text>
            {todo.finishBefore.toLocaleDateString()}
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
            aria-label='a'
            bgColor='blue.500'
            _hover={{ bgColor: 'blue.700' }}
            leftIcon={<EditIcon />}
          >
            Edit ToDo
          </Button>
          <Button
            aria-label='a'
            leftIcon={<DeleteIcon />}
            bgColor='red.500'
            _hover={{ bgColor: 'red.700' }}
          >
            Delete ToDo
          </Button>
        </ButtonGroup>
      </AccordionPanel>
    </AccordionItem>

  );
}
