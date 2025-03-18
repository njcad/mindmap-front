import { useNavigate } from "react-router-dom";
import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import { BlueButton } from "../components/application/BlueButton";
import { OutlineButton } from "../components/application/OutlineButton";
import { BackgroundAnimation } from "../components/application/BackgroundAnimation";
import { useState } from "react";
import LoginWidget from "../components/login";

// The default page on the app, handling log ins, sign ups, and creating sessions
export function Home() {
  const navigate = useNavigate();
  const handleStartSession = () => {
    navigate("/start-session");
  };
  const handleJoinSession = () => {
    navigate("/join-session");
  };

  const logout = () => {
    // Remove user ID from cache only when user forces a log out
    localStorage.removeItem('user_id');
    updateUserId(null)
  }

  // Defaults to null if the item does not exist
  const [userId, updateUserId] = useState(localStorage.getItem('user_id'));


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
        {/* If not logged in, display login/signup components, otherwise enable session controls */}
        {userId !== null ?
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
            <OutlineButton
              onClick={logout}
              size="lg"
              px="8"
              py="6"
              fontSize="xl"
            >
              Log Out
            </OutlineButton>
          </Box>
        </HStack> : <HStack mt="10px" justify="center" spaceX="20px">
          <LoginWidget isSignUp={false} updateUserId={updateUserId} />
          <LoginWidget isSignUp={true} updateUserId={updateUserId} />
        </HStack>
        }
      </Box>
    </>
  );
}
