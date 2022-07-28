import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Badge, Button, ButtonGroup, Checkbox, Grid, GridItem, Spacer, Text } from '@chakra-ui/react';
import { ITodo } from '../../models/Todo/todo.model';

export type TodoItemProps = {
  /**
   * Todo to print
   */
  todo: ITodo;
  onOpen: any;
  onOpenModal: any;
  setTodoToUpdate: any;
  handleCompleted: any;
}

export function TodoItem({
  todo,
  onOpen,
  onOpenModal,
  setTodoToUpdate,
  handleCompleted
}: TodoItemProps) {
  return (
    <AccordionItem>
      <AccordionButton>
        <Grid templateColumns='1.5fr 0.5fr 0.5fr 0.3fr' gap='16px' w='100%' mr='20px'>
          <GridItem as={Text} align='left' justifySelf='flex-start' alignSelf='center'>
            {todo.name}
          </GridItem>
          <GridItem justifySelf='flex-start' alignSelf='center'>
            <Badge variant={todo.priority}>
              {todo.priority}
            </Badge>
          </GridItem>
          <GridItem as={Text} justifySelf='flex-start' alignSelf='center'>
            {new Date(todo.deadline).toLocaleDateString()}
          </GridItem>
          <GridItem justifySelf='flex-start' alignSelf='center'>
            <Checkbox display='flex' alignItems='center' isChecked={todo.completed} onChange={() => handleCompleted(todo)} />
          </GridItem>
        </Grid>
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
              onOpenModal();
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
