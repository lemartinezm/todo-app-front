import { Accordion, Button, ButtonGroup, Flex } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { TodoItem } from '../../../components/composed/Todo/TodoItem';
import { ITodo, TodoPriority } from '../../../models/Todo/todo.model';

// fakeData
const todos: ITodo[] = [
  {
    _id: '1',
    name: 'Entregar el trabajo al profesor Martinez',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, rem. Recusandae laborum aliquid aut animi natus deleniti corrupti, ipsam, maiores perspiciatis eius, sed cum odit enim molestias ex adipisci exercitationem.',
    createdAt: new Date(),
    finishBefore: new Date(2022, 5, 20),
    priority: TodoPriority.NORMAL,
    completed: false,
    creator: '1',
    __v: 1
  },
  {
    _id: '2',
    name: 'Second Todo',
    description: 'Esta es una tarea de prueba',
    createdAt: new Date(),
    finishBefore: new Date(2022, 5, 21),
    priority: TodoPriority.NORMAL,
    completed: false,
    creator: '1',
    __v: 1
  },
  {
    _id: '3',
    name: 'Third Todo',
    description: 'Esta es una tarea de prueba',
    createdAt: new Date(),
    finishBefore: new Date(2022, 6, 20),
    priority: TodoPriority.NORMAL,
    completed: false,
    creator: '1',
    __v: 1
  }
];

export function TodoList() {
  return (
    <Flex flexDir='column'>
      <ButtonGroup justifyContent='flex-end'>
        <Button
          aria-label='a'
          bgColor='blue.500'
          _hover={{ bgColor: 'blue.700' }}
          leftIcon={<EditIcon />}
        >
          Edit ToDos
        </Button>
        <Button
          aria-label='a'
          leftIcon={<DeleteIcon />}
          bgColor='red.500'
          _hover={{ bgColor: 'red.700' }}
        >
          Delete ToDos
        </Button>
      </ButtonGroup>

      <Accordion allowToggle>
        {
          todos.map(todo => (
            <TodoItem todo={todo} key={todo._id} />
          ))
        }
      </Accordion>

    </Flex>
  );
};
