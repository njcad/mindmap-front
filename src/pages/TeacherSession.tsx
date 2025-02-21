import { useState, useEffect } from "react";
import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getQuestions } from "../services/SessionServices";
import { BlueButton } from "../components/application/BlueButton";
import { OutlineButton } from "../components/application/OutlineButton";

interface Question {
  text: string;
}

export const TeacherSession = () => {
  const { sessionId } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await getQuestions();
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <Box p={20} w="70%" letterSpacing="tight">
      <VStack align="stretch">
        <VStack align="stretch" spaceY="0px">
          <Text fontWeight="bold">MindMap</Text>
          <Text color="gray.400">{sessionId}</Text>
        </VStack>

        <Box>
          <Heading size="3xl" mt={10}>
            {questions[currentQuestionIndex]?.text || "Loading..."}
          </Heading>
        </Box>

        <Box mt={10}>
          <Text color="gray.400" mb={4}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Text>
          <OutlineButton
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            mr={4}
          >
            previous
          </OutlineButton>
          <BlueButton
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            next
          </BlueButton>
        </Box>
      </VStack>
    </Box>
  );
};
