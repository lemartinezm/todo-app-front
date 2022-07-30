import { Avatar, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Icon, IconButton, Text, useDisclosure } from '@chakra-ui/react';
import { useContext } from 'react';
import { BiMenu } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';
import { ItemBar } from './NavBar';
import { FiHome, FiList, FiLogOut, FiUsers } from 'react-icons/fi';

export function MobileNavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { user } = useContext(LoginContext);
  return (
    <>
      <Icon as={BiMenu} boxSize='25px' onClick={() => onOpen()} position='absolute' top='16px' left='16px' zIndex={20} />

      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent bgColor='blue.400'>
          <DrawerCloseButton />
          <DrawerHeader>
            <Text fontSize='2xl' fontWeight='bold'>
              TDT App
            </Text>
          </DrawerHeader>
          <Divider />
          <DrawerBody as={Flex} flexDir='column' w='fit-content' justifyContent='space-between' py='16px'>
            <Flex flexDir='column' gap='16px'>
              <Flex flexDirection='column' gap='32px'>
                <ItemBar label='Home' icon={<FiHome />} to='/home' onClick={onClose} />
                <ItemBar label='Todos' icon={<FiList />} to='/todos' onClick={onClose} />
                <ItemBar label='Teams' icon={<FiUsers />} to='/teams' onClick={onClose} />
              </Flex>
            </Flex>
          </DrawerBody>
          <DrawerFooter as={Flex} align='center' gap='16px' px='16px' justifyContent='flex-start'>
            <Avatar boxSize='32px' name={user?.username} />
            <Text>
              {user?.username}
            </Text>

            <IconButton variant='ghost' boxSize='25px' minW='25px' aria-label='logout' icon={<FiLogOut />} onClick={() => {
              localStorage.removeItem('token');
              navigate(0);
            }} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
