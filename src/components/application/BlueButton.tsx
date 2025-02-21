import { Button, ButtonProps } from "@chakra-ui/react";

export function BlueButton({ children, ...props }: ButtonProps) {
  return (
    <Button
      bg="primary"
      p={6}
      color="white"
      mt="20px"
      fontWeight="medium"
      fontSize="lg"
      letterSpacing="tight"
      boxShadow="lg"
      _hover={{ bg: "secondary" }}
      {...props}
    >
      {children}
    </Button>
  );
}
