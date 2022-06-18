
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Badge, Checkbox, Flex, Spacer, Text } from '@chakra-ui/react';
import { ITodo } from '../../../models/Todo/todo.model';

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
        {todo.description}
      </AccordionPanel>
    </AccordionItem>

  );
}
