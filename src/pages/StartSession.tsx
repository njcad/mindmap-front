import { OutlineButton } from "../components/application/OutlineButton";
import { BlueButton } from "../components/application/BlueButton";
import { Box, Heading, Input, HStack, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveQuestions } from "../services/SessionServices";
interface Question {
  text: string;
}

export const StartSession = () => {
  const navigate = useNavigate();
  const sessionID = "awesome-tiger";
  const handleLaunch = async () => {
    try {
      console.log(questions);
      // Save the questions to the backend
      await saveQuestions(questions);

      // Navigate to the teacher's session view
      navigate(`/session/${sessionID}/teacher`);
    } catch (error) {
      console.error("Error launching session:", error);
    }
  };
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([...questions, { text: newQuestion.trim() }]);
      setNewQuestion("");
    }
  };

  const handleStartEdit = (index: number, question: Question) => {
    setEditingIndex(index);
    setEditingText(question.text);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null && editingText.trim()) {
      const updatedQuestions = [...questions];
      updatedQuestions[editingIndex] = {
        ...updatedQuestions[editingIndex],
        text: editingText.trim(),
      };
      setQuestions(updatedQuestions);
      setEditingIndex(null);
      setEditingText("");
    }
  };

  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    setEditingIndex(null);
    setEditingText("");
  };

  return (
    <Box display="flex" h="100vh" p={40} letterSpacing="tight">
      <Box flex={1} position="sticky" top={40}>
        <Heading color="gray.400">Session ID</Heading>
        <Heading fontSize="4xl" mt={3}>
          awesome-tiger
        </Heading>
        <OutlineButton onClick={handleLaunch}>Launch</OutlineButton>
      </Box>

      <Box flex={1} maxH="calc(100vh - 80px)" overflowY="auto" px={2}>
        <Heading color="gray.400">Questions</Heading>

        <Box>
          {questions.map((question, index) => (
            <Box key={index} display="flex" flexDirection="column" my={3}>
              {editingIndex === index ? (
                <>
                  <Input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    mb={2}
                  />
                  <HStack>
                    <Button variant="ghost" size="sm" onClick={handleSaveEdit}>
                      save
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteQuestion(index)}
                    >
                      delete
                    </Button>
                  </HStack>
                </>
              ) : (
                <>
                  <Heading fontSize="2xl">{question.text}</Heading>
                  <HStack>
                    <Button
                      bg="gray.100"
                      color="black"
                      _hover={{ bg: "gray.300" }}
                      size="sm"
                      onClick={() => handleStartEdit(index, question)}
                      mt={2}
                      alignSelf="flex-start"
                    >
                      edit
                    </Button>
                    {/* TODO: add other buttons */}
                  </HStack>
                </>
              )}
            </Box>
          ))}
        </Box>
        <Box mt={6}>
          <Input
            placeholder="Enter a new question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            mb={2}
          />
        </Box>
        <BlueButton onClick={handleAddQuestion} disabled={!newQuestion.trim()}>
          add
        </BlueButton>
      </Box>
    </Box>
  );
};
