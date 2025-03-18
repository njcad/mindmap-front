import { useState, useEffect } from "react";
import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import {
  getQuestions,
  setCurrentQuestion,
  getSubmissions,
} from "../services/SessionServices";
import { BlueButton } from "../components/application/BlueButton";
import { OutlineButton } from "../components/application/OutlineButton";
import { Question } from "../assets/interfaces";


export const TeacherSession = () => {
  const { sessionId } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [submissions, setSubmissions] = useState<Record<string, any>>({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const id = sessionId ? sessionId : "";
        const fetchedQuestions = await getQuestions(id);
        setQuestions(fetchedQuestions);
        setCurrentQuestion(id, fetchedQuestions[currentQuestionIndex].id);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  // Poll for submissions every few seconds
  useEffect(() => {
    if (!sessionId) return;

    const pollSubmissions = async () => {
      try {
        if (questions.length > 0) {
          const responses = await getSubmissions(questions[currentQuestionIndex].id);
          setSubmissions(responses);
        }
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    const interval = setInterval(pollSubmissions, 5000);
    return () => clearInterval(interval);
  }, [sessionId, currentQuestionIndex, questions]);

  const handleNextQuestion = async () => {
    if (!sessionId || currentQuestionIndex >= questions.length - 1) return;
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    try {
      setCurrentQuestion(sessionId, questions[currentQuestionIndex + 1].id);
    } catch (error) {
      console.error(error)
    }
  };

  const handlePreviousQuestion = async () => {
    if (!sessionId || currentQuestionIndex <= 0) return;
    setCurrentQuestionIndex(currentQuestionIndex - 1);
    try {
      setCurrentQuestion(sessionId, questions[currentQuestionIndex - 1].id);
    } catch (error) {
      console.error(error)
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

        {/* Display submissions */}
        <Box mt={8} flex={1} maxH="calc(60vh - 80px)" overflowY="auto">
          <Heading size="md" mb={4}>
            Submissions
          </Heading>
          {Object.entries(submissions).map(([studentId, submission]) => (
            <Box
              key={studentId}
              p={4}
              bg="gray.100"
              _dark={{ bg: "gray.700" }}
              mb={2}
              borderRadius="md"
            >
              <Text fontWeight="bold">Student {studentId}</Text>
              <Text mt={2}>{submission}</Text>
            </Box>
          ))}
        </Box>
      </VStack>
    </Box>
  );
};
