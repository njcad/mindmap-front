interface Question {
  text: string;
}

export const getQuestions = async (): Promise<Question[]> => {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/questions');
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
