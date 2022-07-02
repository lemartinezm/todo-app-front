export function ErrorToast(toast: any, description: string) {
  toast({
    title: 'Something went wrong',
    description,
    status: 'error',
    duration: 5000,
    isClosable: true
  });
}

export function SuccessToast(toast: any, description: string) {
  toast({
    title: 'Operation completed',
    description,
    status: 'success',
    duration: 5000,
    isClosable: true
  });
};
