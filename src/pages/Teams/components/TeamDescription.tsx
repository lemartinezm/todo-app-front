import { Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ITeam } from '../../../models/Teams/teams.model';
import { ITodo } from '../../../models/Todo/todo.model';
import { TodoList } from '../../Todo/components';

export type TeamDescriptionProps = {
  team: ITeam
}

export function TeamDescription({ team }: TeamDescriptionProps) {
  const [todos, setTodos] = useState<ITodo[]>(team.todos);

  useEffect(() => {
    setTodos(team.todos);
  }, [team]);

  return (
    <Flex flexDir='column' pt='16px'>
      <Text fontSize='2xl' >
        {team.name}
      </Text>
      <Text>
        Participants: {team.participants.length}
      </Text>
      <TodoList
        todos={todos}
        setTodos={setTodos}
        meta={{
          currentPage: 1,
          documentsPerPage: 1,
          totalDocuments: 1,
          totalPages: 1
        }} />
    </Flex>
  );
}
