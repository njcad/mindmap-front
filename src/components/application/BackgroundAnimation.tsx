import { Box } from "@chakra-ui/react";
import Lottie from "lottie-react";
import backgroundAnimation from "../../assets/lottieLines.json"; // Import your Lottie JSON file

export function BackgroundAnimation() {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      w="100vw"
      h="100vh"
      zIndex="-1"
      overflow="auto"
      opacity={0.1}
    >
      <Lottie
        animationData={backgroundAnimation}
        loop={true}
        style={{ width: "100%", height: "100%" }}
      />
    </Box>
  );
}
