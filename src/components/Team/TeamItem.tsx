import { Flex, Text } from '@chakra-ui/react';

export type TeamItemProps = {
  team: any;
  selectTeam: (e?: any) => any;
}

export function TeamItem({ team, selectTeam }: TeamItemProps) {
  return (
    <Flex
      flexDir='column'
      rounded='5px'
      bgColor='gray.100'
      p='16px'
      onClick={() => selectTeam(team)}
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
