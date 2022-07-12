import { DeleteIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup, Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';

export type ConfirmDeleteProps = {
  isOpen: boolean,
  onClose: any,
  onDelete: () => any,
}

export function ConfirmDelete({
  isOpen,
  onClose,
  onDelete
}: ConfirmDeleteProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete ToDo</ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody>
          Delete this ToDo? This action can&apos;t be undone.
        </ModalBody>
        <ModalFooter>
          <ButtonGroup >
            <Button
              leftIcon={<DeleteIcon />}
              bgColor='red.500'
              _hover={{ bgColor: 'red.700' }}
              onClick={() => onDelete()}
            >
              Confirm
            </Button>
            <Button
              bgColor='blue.500'
              _hover={{ bgColor: 'blue.700' }}
              onClick={() => onClose()}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
