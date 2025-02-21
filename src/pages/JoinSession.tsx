import { Box, Input } from "@chakra-ui/react";
import { BlueButton } from "../components/application/BlueButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const JoinSession = () => {
  const [sessionID, setSessionID] = useState("");
  const navigate = useNavigate();

  const handleSessionIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSessionID = e.target.value;
    console.log("Session ID changed:", newSessionID);
    setSessionID(newSessionID);
  };

  const handleJoinClick = () => {
    if (sessionID) {
      navigate(`/session/${sessionID}/student`);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      px={4}
    >
      <Box
        w="100%"
        maxW="500px"
        p={8}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
      >
        <Input
          placeholder="Enter session ID"
          size="xl"
          mb={4}
          value={sessionID}
          onChange={handleSessionIDChange}
        />
        <BlueButton w="100%" disabled={!sessionID} onClick={handleJoinClick}>
          join
        </BlueButton>
      </Box>
    </Box>
  );
};
