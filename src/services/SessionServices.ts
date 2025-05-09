interface Question {
  id: string;
  text: string;
}

export const signup = async (username: string, password: string, isTeacher: boolean): Promise<string> => {
  try {
    const response = await fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: username, password: password, isTeacher: isTeacher}),
    });
    if (!response.ok) {
      throw new Error('Incorrect login');
    }
    const data = await response.json()
    localStorage.setItem('user_id', data.user_id)
    return data.user_id;
  } catch (error) {
    throw error;
  }
}

export const login = async (username: string, password: string): Promise<string> => {
  try {
    const response = await fetch('http://localhost:5000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username: username, password: password}),
    });
    if (!response.ok) {
      throw new Error('Incorrect login');
    }
    const data = await response.json();
    localStorage.setItem('user_id', data.user_id);
    return data.user_id;
  } catch (error) {
    throw error;
  }
}

export const getSession = async (): Promise<string> => {
  try {
    const response = await fetch('http://localhost:5000/api/make_session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user_id: localStorage.getItem('user_id')}),
      });
    const data = await response.json();
    return data.session_id;
  } catch (error) {
    throw error;
  }
}

export const getQuestions = async (session_id: string): Promise<Question[]> => {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/get_questions', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"session_id": session_id})
    });
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }
    const data = await response.json();
    const qs = data.questions.map((q: any) => {return {"id": q.question_id, "text": q.question_text}});
    return qs;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

export const saveQuestions = async (questions: Question[], sessionID: string): Promise<string[]> => {
  const question_array = questions.map((q) => {return {"question_text": q.text, "session_id": sessionID}})
  try {
      const response = await fetch('http://localhost:5000/api/save_questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(question_array),
    });

    if (!response.ok) {
      throw new Error('Failed to save questions');
    }

    const data = await response.json();
    console.log(`uploaded ${data.count} questions`)
    const qs = data.questions.map((q: any) => {return {"id": q.question_id, "text": q.text}});
    return qs;
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

export const setCurrentQuestion = async (sessionId: string, questionId: string) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/set_question`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'session_id': sessionId, 'question_id': questionId })
    });
    const data = await response.json();
    return data.session;
  } catch (error) {
    console.error('Failed to set question', error);
    throw error;
  }
};

export const getCurrentQuestion = async (sessionId: string) => {
  const response = await fetch(`http://127.0.0.1:5000/api/current_question`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'session_id': sessionId })
  });
  if (!response.ok) throw new Error('Failed to get current question');
  const data = await response.json();
  return data.question;
};

export const submitAnswer = async (sessionId: string, studentId: string, submission: string) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'session_id': sessionId, 'user_id': studentId, 'text': submission})
    });
    const data = await response.json();
    return data;
  } catch (e) {
    throw e;
  }
};

export const getSubmissions = async (questionId: string) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/get_submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({'question_id': questionId})
    });
    const responses = await response.json();
    return responses;
  } catch (e) {
    throw e;
  }
};