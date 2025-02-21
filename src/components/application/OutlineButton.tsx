import { Button, ButtonProps } from "@chakra-ui/react";

export function OutlineButton({ children, ...props }: ButtonProps) {
  return (
    <Button
      bg="none"
      variant="outline"
      borderColor="black"
      p={6}
      mt="20px"
      fontWeight="medium"
      fontSize="lg"
      letterSpacing="tight"
      boxShadow="lg"
      _light={{
        _hover: { bg: "black", color: "white" },
      }}
      _dark={{
        borderColor: "white",
        _hover: { bg: "white", color: "black" },
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
