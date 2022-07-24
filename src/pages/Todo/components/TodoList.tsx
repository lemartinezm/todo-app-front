import { Accordion, Button, ButtonGroup, Flex, Grid, GridItem, IconButton, Text } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { TodoItem } from '../../../components/Todo/TodoItem';
import { ITodo, Meta } from '../../../models/Todo/todo.model';

export type TodoListProps = {
  todos: ITodo[];
  meta: Meta;
  onUpdatePagination?: (toPage: number) => any;
}

export function TodoList({
  todos,
  meta,
  onUpdatePagination = () => { }
}: TodoListProps) {
  return (
    <Flex flexDir='column' w='100%' >
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

      {/* Pagination */}
      <Flex justify='center'>
        <ButtonGroup>
          <IconButton
            aria-label='First page'
            icon={<FiChevronsLeft />}
            isDisabled={meta.currentPage === 1}
            onClick={() => onUpdatePagination(1)}
          />
          <IconButton
            aria-label='Previous page'
            icon={<FiChevronLeft />}
            isDisabled={meta.currentPage === 1}
            onClick={() => onUpdatePagination(meta.currentPage - 1)}
          />
          {
            meta.currentPage - 1 > 0
              ? <Button onClick={() => onUpdatePagination(meta.currentPage - 1)} >{meta.currentPage - 1}</Button>
              : null
          }
          <Button disabled>{meta.currentPage}</Button>
          {
            meta.currentPage < meta.totalPages
              ? <Button onClick={() => onUpdatePagination(meta.currentPage + 1)} >{meta.currentPage + 1}</Button>
              : null
          }
          {
            meta.currentPage + 1 < meta.totalPages
              ? <Button onClick={() => onUpdatePagination(meta.currentPage + 2)} >{meta.currentPage + 2}</Button>
              : null
          }
          <IconButton
            aria-label='Next page'
            icon={<FiChevronRight />}
            isDisabled={meta.currentPage === meta.totalPages}
            onClick={() => onUpdatePagination(meta.currentPage + 1)}
          />
          <IconButton
            aria-label='Last page'
            icon={<FiChevronsRight />}
            isDisabled={meta.currentPage === meta.totalPages}
            onClick={() => onUpdatePagination(meta.totalPages)}
          />
        </ButtonGroup>
      </Flex>

    </Flex>
  );
};
