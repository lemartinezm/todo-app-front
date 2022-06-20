import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react';

export type CustomDrawerProps = {
  isOpen: boolean,
  onClose: () => void,
  title: string,
  children: any
}

export function CustomDrawer({
  isOpen,
  onClose,
  title,
  children
}: CustomDrawerProps) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement='right'
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth='1px'>
          {title}
        </DrawerHeader>

        <DrawerBody>
          {children}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
