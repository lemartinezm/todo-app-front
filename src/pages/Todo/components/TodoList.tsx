import { Accordion, Button, ButtonGroup, Flex, Grid, GridItem, IconButton, Select, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { CustomDrawer } from '../../../components';
import { TodoItem } from '../../../components/Todo/TodoItem';
import { LoginContext } from '../../../context/LoginContext';
import { ITodo, Meta, TodoPriority } from '../../../models/Todo/todo.model';
import { deleteTodoById, updateTodoById } from '../../../services/todo.service';
import { ErrorToast, SuccessToast } from '../../../utils';
import { ConfirmDelete } from './ConfirmDelete';
import { EditTodoForm } from './EditTodoForm';

export type TodoListProps = {
  todos: ITodo[];
  setTodos: any;
  meta: Meta;
  onUpdatePagination?: (toPage: number) => any;
}

export function TodoList({
  todos,
  setTodos,
  meta,
  onUpdatePagination = () => { }
}: TodoListProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();
  const { token } = useContext(LoginContext);
  const toast = useToast();

  // For update the todo
  const [todoToUpdate, setTodoToUpdate] = useState<ITodo>({
    _id: '',
    name: '',
    description: '',
    createdAt: new Date(),
    deadline: new Date(),
    completed: false,
    creator: 'Unknown',
    priority: TodoPriority.NORMAL,
    __v: 1
  });

  // For update ToDo
  async function handleUpdateTodo(values: any) {
    await updateTodoById(todoToUpdate._id, {
      name: values.name,
      description: values.description,
      deadline: values.deadline,
      priority: values.priority
    }, token)
      .then(res => {
        const temp: ITodo[] = [...todos];
        const index = temp.indexOf(todoToUpdate);
        temp[index].name = values.name;
        temp[index].description = values.description;
        temp[index].priority = values.priority;
        temp[index].deadline = values.deadline;
        setTodos(temp);
        onClose();
        SuccessToast(toast, res.message);
      })
      .catch(err => {
        console.log(err);
        ErrorToast(toast, err.response);
      });
  }

  // For setCompleted
  async function handleCompleted(todoCompleted: any) {
    await updateTodoById(todoCompleted._id, {
      completed: !todoCompleted.completed
    }, token)
      .then(res => {
        const temp: ITodo[] = [...todos];
        const index: number = temp.indexOf(todoCompleted);
        temp[index].completed = !temp[index].completed;
        setTodos(temp);
        SuccessToast(toast, res.message);
      })
      .catch(err => {
        ErrorToast(toast, err.response.data.message);
      });
  }

  async function handleDeleteTodo() {
    await deleteTodoById(token, todoToUpdate._id)
      .then(res => {
        const temp: ITodo[] = [...todos];
        const index: number = temp.indexOf(todoToUpdate);
        temp.splice(index, 1);
        setTodos(temp);
        onCloseModal();
        SuccessToast(toast, res.message);
      })
      .catch(err => {
        ErrorToast(toast, err.response.data.message);
      });
  }

  return (
    <Flex flexDir='column' w='100%' maxH='calc(100% - 56px)' overflowY='auto'>
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
              onOpen={onOpen}
              onOpenModal={onOpenModal}
              setTodoToUpdate={setTodoToUpdate}
              handleCompleted={handleCompleted}
            />
          ))
        }
      </Accordion >

      {/* Pagination */}
      <Flex justify='space-between'>
        <Text>
          Showing {todos.length} of {meta.totalDocuments}
        </Text>
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
        <Flex>
          <Select value={meta.currentPage} onChange={(e) => {
            e.preventDefault();
            onUpdatePagination(parseInt(e.target.value));
          }} >
            {
              [...Array(meta.totalPages)].map((x, i) => (
                <option key={`option-${i}`} value={i + 1}>
                  {i + 1}
                </option>
              ))
            }
          </Select>
        </Flex>
        <CustomDrawer
          isOpen={isOpen}
          onClose={onClose}
          title={'Edit ToDo'}
        >
          <EditTodoForm todoToUpdate={todoToUpdate} onSubmit={handleUpdateTodo} />
        </CustomDrawer>
        <ConfirmDelete
          isOpen={isOpenModal}
          onClose={onCloseModal}
          onDelete={handleDeleteTodo}
        />
      </Flex>

    </Flex>
  );
};
