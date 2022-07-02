export function ErrorToast(toast: any, description: string) {
  toast({
    title: 'Something went wrong',
    description,
    status: 'error',
    duration: 5000,
    isClosable: true
  });
}
