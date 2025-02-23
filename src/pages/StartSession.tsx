import { OutlineButton } from "../components/application/OutlineButton";
import { BlueButton } from "../components/application/BlueButton";
import { Box, Heading, Input, HStack, Button, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  saveQuestions,
  uploadQuestionsFile,
} from "../services/SessionServices";

interface Question {
  text: string;
}

export const StartSession = () => {
  const navigate = useNavigate();
  const sessionID = "awesome-tiger";
  const toast = useToast();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const newQuestions = await uploadQuestionsFile(file);
      setQuestions([...questions, ...newQuestions]);

      toast({
        title: "Success",
        description: `Added ${newQuestions.length} questions`,
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Upload failed",
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

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
        <Box mt={4} mb={6}>
          <input
            type="file"
            accept=".txt,.docx,.pdf"
            onChange={handleFileUpload}
            style={{ display: "none" }}
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button
              as="span"
              variant="outline"
              mr={3}
              loading={isUploading}
              loadingText="Uploading..."
            >
              Upload Questions File
            </Button>
          </label>
          <Text fontSize="sm" color="gray.500" mt={1}>
            Supported formats: .txt, .docx, .pdf
          </Text>
        </Box>

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
