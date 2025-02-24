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
      <Box py="240px" textAlign="center" letterSpacing="tight">
        <Heading fontSize="8xl">MindMap</Heading>
        <Text mt="50px" fontSize="2xl" color="gray.400">
          the classroom tool to facilitate next-level discussion
        </Text>
        {userId !== null ? <HStack mt="10px" justify="center" spaceX="20px">
          <BlueButton onClick={handleStartSession}>start a session</BlueButton>
          <OutlineButton onClick={handleJoinSession}>
            join a session
          </OutlineButton>
        </HStack> : 
        <HStack mt="10px" justify="center" spaceX="20px">
          <LoginWidget isSignUp={false} updateUserId={updateUserId} />
          <LoginWidget isSignUp={true} updateUserId={updateUserId} />
        </HStack>
        }
      </Box>
    </>
  );
}
