import { Flex, Text } from '@chakra-ui/react';
import { ITeam } from '../../models/Teams/teams.model';

export type TeamItemProps = {
  team: ITeam;
  setTeamIndex: (e?: any) => any;
}

export function TeamItem({ team, setTeamIndex }: TeamItemProps) {
  return (
    <Flex
      flexDir='column'
      rounded='5px'
      bgColor='gray.100'
      p='16px'
      onClick={() => setTeamIndex()}
      cursor='pointer'
    >
      <Text fontSize='lg'>
        {team.name}
      </Text>
      <Flex flexDir='column'>
        <Text>
          Todos: {team.todos.length}
        </Text>
        <Text>
          Participants: {team.participants.length}
        </Text>
      </Flex>
    </Flex>
  );
}
