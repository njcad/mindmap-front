import { useNavigate } from "react-router-dom";
import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import { BlueButton } from "../components/application/BlueButton";
import { OutlineButton } from "../components/application/OutlineButton";
import { BackgroundAnimation } from "../components/application/BackgroundAnimation";
import { useState } from "react";
import LoginWidget from "../components/login";

export function Home() {
  const navigate = useNavigate();
  const handleStartSession = () => {
    navigate("/start-session");
  };
  const handleJoinSession = () => {
    navigate("/join-session");
  };
  const [userId, updateUserId] = useState(null);


  return (
    <>
      <BackgroundAnimation />
      <Box py="240px" pl="120px" letterSpacing="tight" overflow="hidden">
        <Box>
          <Heading fontSize={["6xl", "8xl"]} fontWeight="extrabold">
            MindMap
          </Heading>
          <Text
            mt="50px"
            fontSize={["xl", "2xl"]}
            color="gray.400"
            maxW="600px"
          >
            Transform your classroom discussions into engaging, collaborative
            mind mapping experiences
          </Text>
        </Box>

        <HStack mt="10px" align="flex-start">
          <Box
            transform="translateY(0)"
            transition="transform 0.3s"
            _hover={{ transform: "translateY(-5px)" }}
          >
            <BlueButton
              onClick={handleStartSession}
              size="lg"
              px="8"
              py="6"
              fontSize="xl"
            >
              start a session
            </BlueButton>
          </Box>
          <Box
            transform="translateY(0)"
            transition="transform 0.3s"
            _hover={{ transform: "translateY(-5px)" }}
          >
            <OutlineButton
              onClick={handleJoinSession}
              size="lg"
              px="8"
              py="6"
              fontSize="xl"
            >
              join a session
            </OutlineButton>
          </Box>
        </HStack>
        }
      </Box>
    </>
  );
}
