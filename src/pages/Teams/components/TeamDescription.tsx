import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { Avatar, Button, Flex, Grid, GridItem, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { CustomDrawer } from '../../../components';
import { LoginContext } from '../../../context/LoginContext';
import { ITeam } from '../../../models/Teams/teams.model';
import { ITodo } from '../../../models/Todo/todo.model';
import { updateTeam } from '../../../services/teams.service';
import { createTodo } from '../../../services/todo.service';
import { ErrorToast, SuccessToast } from '../../../utils';
import { NewTodoForm, TodoList } from '../../Todo/components';
import { EditTeamForm } from './EditTeamForm';

export type TeamDescriptionProps = {
  team: ITeam;
  updateCurrentPage: (e?: any) => any;
  setIsLoading: any;
}

export function TeamDescription({ team, updateCurrentPage, setIsLoading }: TeamDescriptionProps) {
  const [todos, setTodos] = useState<ITodo[]>(team.todos);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenEditTeam, onOpen: onOpenEditTeam, onClose: onCloseEditTeam } = useDisclosure();
  const { token } = useContext(LoginContext);
  const toast = useToast();

  useEffect(() => {
    setTodos(team.todos);
  }, [team]);

  // For create ToDo
  async function handleCreateTodo(values: any) {
    await createTodo({
      name: values.name,
      description: values.description,
      deadline: values.deadline,
      priority: values.priority,
      teamId: team._id
    }, token)
      .then(res => {
        onClose();
        setIsLoading(true);
        SuccessToast(toast, res.message);
      })
      .catch(err => {
        ErrorToast(toast, err.response.data.message);
      });
  }

  async function handleUpdateTeam(values: any) {
    await updateTeam(token, {
      updatedTeam: {
        _id: team._id,
        ...values
      }
    })
      .then(res => {
        onCloseEditTeam();
        setIsLoading(true);
        SuccessToast(toast, res.message);
      });
  }

  return (
    <Flex flexDir='column' pt='16px' w='100%'>
      <Text fontSize='2xl' display='flex' alignItems='center' >
        {team.name} <EditIcon ml='16px' boxSize='16px' cursor='pointer' onClick={() => onOpenEditTeam()} />
      </Text>

      <Tabs w='100%'>
        <TabList>
          <Tab>Todos</Tab>
          <Tab>Participants</Tab>
        </TabList>
        <TabPanels>
          <TabPanel as={Flex} flexDir='column'>
            {
              todos.length > 0
                ? <>
                  <Button
                    bgColor='blue.500'
                    _hover={{ bgColor: 'blue.700' }}
                    leftIcon={<AddIcon />}
                    w='fit-content'
                    onClick={() => {
                      onOpen();
                    }}
                  >
                    Add ToDo
                  </Button>
                  <TodoList
                    todos={todos}
                    setTodos={(e: any) => {
                      setTodos(e);
                      setIsLoading(true);
                    }}
                    meta={team.meta}
                    onUpdatePagination={(toPage: number) => updateCurrentPage(toPage)}
                  />
                </>
                : <Flex flexDir='column' alignItems='center' justify='center'>
                  <Text>
                    You don&apos;t have pending ToDos
                  </Text>
                  <Button
                    bgColor='blue.500'
                    _hover={{ bgColor: 'blue.700' }}
                    leftIcon={<AddIcon />}
                    w='fit-content'
                    onClick={() => {
                      onOpen();
                    }}
                  >
                    Add ToDo
                  </Button>
                </Flex>
            }
          </TabPanel>
          <TabPanel as={Flex} flexDirection='column' gap='16px'>
            <Grid fontWeight={500} templateColumns='0.3fr 1fr 1fr'>
              <GridItem></GridItem>
              <GridItem as={Text}>User</GridItem>
              <GridItem as={Text}>Email</GridItem>
            </Grid>
            <Flex flexDir='column' gap='16px'>
              {
                team.participants.map((participant) => (
                  <Grid key={participant.username} templateColumns='0.3fr 1fr 1fr'>
                    <GridItem alignSelf='center'>
                      <Avatar name={participant.username} />
                    </GridItem>
                    <GridItem alignSelf='center'>
                      <Text w='100px'>{participant.username}</Text>
                    </GridItem>
                    <GridItem alignSelf='center'>
                      <Text w='200px'>{participant.email}</Text>
                    </GridItem>
                  </Grid>
                ))
              }
            </Flex>

          </TabPanel>
        </TabPanels>
      </Tabs>
      <CustomDrawer
        isOpen={isOpen}
        onClose={onClose}
        title='Create New ToDo'
      >
        <NewTodoForm onSubmit={handleCreateTodo} />
      </CustomDrawer>

      <CustomDrawer
        isOpen={isOpenEditTeam}
        onClose={onCloseEditTeam}
        title='Edit Team'
      >
        <EditTeamForm team={team} onSubmit={handleUpdateTeam} />
      </CustomDrawer>
    </Flex>
  );
}
