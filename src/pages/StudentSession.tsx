import { useState, useEffect } from "react";
import { Box, Heading, VStack, Textarea, Button, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getQuestions } from "../services/SessionServices";
import { BlueButton } from "../components/application/BlueButton";
interface Question {
  text: string;
}

export const StudentSession = () => {
  const { sessionId } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answer, setAnswer] = useState("");

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

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) return;

    try {
      // TODO: Implement backend service call to submit answer
      await fetch("/api/submit-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          questionIndex: currentQuestionIndex,
          answer: answer.trim(),
        }),
      });

      setAnswer(""); // Clear answer after submission
    } catch (error) {
      console.error("Error submitting answer:", error);
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

        <Box mt={4}>
          <Textarea
            value={answer}
            onChange={handleAnswerChange}
            placeholder="I think..."
            size="lg"
            minH="200px"
          />
        </Box>

        <BlueButton
          onClick={handleSubmitAnswer}
          disabled={!answer.trim()}
          w="20%"
        >
          submit
        </BlueButton>
      </VStack>
    </Box>
  );
};
