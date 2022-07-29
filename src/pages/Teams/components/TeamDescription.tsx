import { Avatar, Flex, Grid, GridItem, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ITeam } from '../../../models/Teams/teams.model';
import { ITodo } from '../../../models/Todo/todo.model';
import { TodoList } from '../../Todo/components';

export type TeamDescriptionProps = {
  team: ITeam;
  updateCurrentPage: (e?: any) => any;
}

export function TeamDescription({ team, updateCurrentPage }: TeamDescriptionProps) {
  const [todos, setTodos] = useState<ITodo[]>(team.todos);

  useEffect(() => {
    setTodos(team.todos);
  }, [team]);

  return (
    <Flex flexDir='column' pt='16px' w='100%'>
      <Text fontSize='2xl' >
        {team.name}
      </Text>
      <Tabs w='100%'>
        <TabList>
          <Tab>Todos</Tab>
          <Tab>Participants</Tab>
        </TabList>
        <TabPanels>
          <TabPanel as={Flex}>
            <TodoList
              todos={todos}
              setTodos={setTodos}
              meta={team.meta}
              onUpdatePagination={(toPage: number) => updateCurrentPage(toPage)}
            />
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
    </Flex>
  );
}
