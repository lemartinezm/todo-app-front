import { Avatar, Button, Divider, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export function NavBar() {
  const navigate = useNavigate();
  return (
    <Flex w='250px' bgColor='red' flexDir='column' justifyContent='space-between'>
      <Flex flexDir='column' gap='16px'>
        <Text fontSize='xl'>
          Todo Teams App
        </Text>
        <Divider />
        <Flex flexDirection='column' gap='32px'>
          <Button onClick={() => navigate('/')} >
            Home
          </Button>
          <Button onClick={() => navigate('/todos')} >
            Todos
          </Button>
          <Button onClick={() => navigate('/teams')} >
            Teams
          </Button>
        </Flex>

      </Flex>
      <Flex>
        <Avatar />
      </Flex>
    </Flex>
  );
}
