interface Question {
  text: string;
}

export const getQuestions = async (): Promise<Question[]> => {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/questions', {
        method: "GET",
    });
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }
    const data = await response.json();
    return data.questions;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

export const saveQuestions = async (questions: Question[]): Promise<void> => {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(questions),
    });

    if (!response.ok) {
      throw new Error('Failed to save questions');
    }

    const data = await response.json();
    console.log(data.message); // Log success message
  } catch (error) {
    console.error('Error saving questions:', error);
    throw error;
  }
};


export const uploadQuestionsFile = async (file: File): Promise<Question[]> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
  
      const response = await fetch('http://127.0.0.1:5000/api/questions/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload file');
      }
  
      const data = await response.json();
      return data.questions;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

export const setCurrentQuestion = async (sessionId: string, questionIndex: number) => {
  const response = await fetch(`http://127.0.0.1:5000/api/session/${sessionId}/set-question`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ questionIndex })
  });
  if (!response.ok) throw new Error('Failed to set question');
  return response.json();
};

export const getCurrentQuestion = async (sessionId: string) => {
  const response = await fetch(`http://127.0.0.1:5000/api/session/${sessionId}/current-question`);
  if (!response.ok) throw new Error('Failed to get current question');
  return response.json();
};

export const submitAnswer = async (sessionId: string, studentId: string, submission: string, questionIndex: number) => {
  const response = await fetch(`http://127.0.0.1:5000/api/session/${sessionId}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ studentId, submission, questionIndex })
  });
  if (!response.ok) throw new Error('Failed to submit answer');
  return response.json();
};

export const getSubmissions = async (sessionId: string) => {
  const response = await fetch(`http://127.0.0.1:5000/api/session/${sessionId}/submissions`);
  if (!response.ok) throw new Error('Failed to get submissions');
  return response.json();
};