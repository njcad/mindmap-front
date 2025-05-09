import { useState, useEffect } from "react";
import { Box, Heading, VStack, Textarea, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getCurrentQuestion, submitAnswer } from "../services/SessionServices";
import { BlueButton } from "../components/application/BlueButton";
import { Question } from "../assets/interfaces";

// Students interact with a session by submitting responses and seeing their assigned groups
export const StudentSession = () => {
  const { sessionId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Poll for current question
  useEffect(() => {
    if (!sessionId) return;

    const pollCurrentQuestion = async () => {
      try {
        const data = await getCurrentQuestion(sessionId);
        setCurrentQuestion(data);
      } catch (error) {
        console.error("Error fetching current question:", error);
      }
    };

    pollCurrentQuestion(); // Initial fetch
    const interval = setInterval(pollCurrentQuestion, 3000);
    return () => clearInterval(interval);
  }, [sessionId]);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  console.log(currentQuestion);

  const handleSubmitAnswer = async () => {
    if (!sessionId || !currentQuestion || !answer.trim() || isSubmitting)
      return;

    setIsSubmitting(true);
    try {
      const userId = localStorage.getItem('user_id');
      if (userId) {
        await submitAnswer(
          sessionId,
          userId,
          answer.trim(),
        );
        setAnswer(""); // Clear answer after submission
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    } finally {
      setIsSubmitting(false);
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
            {currentQuestion?.text || "Waiting for question..."}
          </Heading>
        </Box>

        <Box mt={4}>
          <Textarea
            value={answer}
            onChange={handleAnswerChange}
            placeholder="I think..."
            size="lg"
            minH="200px"
            disabled={!currentQuestion}
          />
        </Box>

        <BlueButton
          onClick={handleSubmitAnswer}
          disabled={!answer.trim() || isSubmitting || !currentQuestion}
          w="20%"
        >
          {isSubmitting ? "submitting..." : "submit"}
        </BlueButton>
      </VStack>
    </Box>
  );
};
