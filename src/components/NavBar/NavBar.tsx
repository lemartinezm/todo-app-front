import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';
import { MotionFlex } from '../Motion';
import { Avatar, Divider, Flex, IconButton, Text } from '@chakra-ui/react';
import { FiHome, FiList, FiLogOut, FiUsers } from 'react-icons/fi';

export function NavBar() {
  const navigate = useNavigate();
  const { user } = useContext(LoginContext);

  return (
    <MotionFlex w='fit-content' bgColor='blue.400' flexDir='column' justifyContent='space-between' py='16px'>
      <Flex flexDir='column' gap='16px'>
        <Text fontSize='2xl' px='16px' fontWeight='bold'>
          TDT App
        </Text>
        <Divider />
        <Flex flexDirection='column' gap='32px' px='16px'>
          <ItemBar label='Home' icon={<FiHome />} to='/home' />
          <ItemBar label='Todos' icon={<FiList />} to='/todos' />
          <ItemBar label='Teams' icon={<FiUsers />} to='/teams' />
        </Flex>
      </Flex>

      <Flex align='center' gap='16px' px='16px'>
        <Avatar boxSize='32px' name={user?.username} />
        <Text>
          {user?.username}
        </Text>

        <IconButton variant='ghost' boxSize='25px' minW='25px' aria-label='logout' icon={<FiLogOut />} onClick={() => {
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
  onClick?: (e?: any) => any;
}

export function ItemBar({ label, icon, to, onClick = () => {} }: ItemBarProps) {
  const navigate = useNavigate();
  return (
    <MotionFlex
      w='100%'
      gap='10px'
      justifyContent='flex-start'
      alignItems='center'
      cursor='pointer'
      onClick={() => {
        navigate(to);
        onClick();
      }}
      whileHover={{ color: '#ff13aa' }}
      // @ts-ignore
      transition={{ duration: 0.2 }}
      fontSize='xl'
      fontWeight='bold'
    >
      {icon} {label}
    </MotionFlex>
  );
}
