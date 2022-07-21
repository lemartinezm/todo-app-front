import { Avatar, Divider, Flex, IconButton, Text } from '@chakra-ui/react';
import { FiHome, FiList, FiLogOut, FiUsers } from 'react-icons/fi';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';
import { MotionFlex } from '../Motion';

export function NavBar() {
  const navigate = useNavigate();
  const { user } = useContext(LoginContext);

  return (
    <MotionFlex w='fit-content' bgColor='blue.400' flexDir='column' justifyContent='space-between' py='16px'>
      <Flex flexDir='column' gap='16px'>
        <Text fontSize='xl' pl='16px'>
          TDT App
        </Text>
        <Divider />
        <Flex flexDirection='column' gap='32px' pl='16px'>
          <ItemBar label='Home' icon={<FiHome />} to='/home' />
          <ItemBar label='Todos' icon={<FiList />} to='/todos' />
          <ItemBar label='Teams' icon={<FiUsers />} to='/teams' />
        </Flex>
      </Flex>

      <Flex align='center' gap='16px'>
        <Avatar boxSize='40px' name={user?.username} />
        <Text>
          {user?.username}
        </Text>
        <IconButton aria-label='logout' icon={<FiLogOut />} onClick={() => {
          localStorage.removeItem('token');
          navigate(0);
        }} />
      </Flex>

    </MotionFlex>
  );
}

type ItemBarProps = {
  label: string;
  icon?: JSX.Element;
  to: string;
}

function ItemBar({ label, icon, to }: ItemBarProps) {
  const navigate = useNavigate();
  return (
    <MotionFlex
      w='100%'
      gap='10px'
      justifyContent='flex-start'
      alignItems='center'
      cursor='pointer'
      onClick={() => navigate(to)}
      whileHover={{ color: '#ff13aa' }}
      // @ts-ignore
      transition={{ duration: 0.2 }}
    >
      {icon} {label}
    </MotionFlex>
  );
}
