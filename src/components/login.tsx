import { signup, login } from '../services/SessionServices';
import { useState, ChangeEvent, FormEvent } from 'react';

interface loginProps {
    isSignUp: boolean,
    updateUserId: Function
  }
  

const LoginWidget = (props: loginProps) => {
  const isSignUp = props.isSignUp;
  const updateUserId = props.updateUserId;
  const buttonText = isSignUp ? "Sign Up" : "Log In";
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isTeacher, setIsTeacher] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (email === '' || password === '') {
      setError('Please fill in both fields.');
      return;
    }

    try {
        let user_id;
        if (isSignUp) {
            user_id = await signup(email, password, isTeacher)
        } else {
            user_id = await login(email, password)
        }
        console.log('logged in user: ' + user_id)
        updateUserId(user_id)
    } catch (error) {
        throw error;
    }

    // Reset error if successful login
    setError('');
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleIsTeacherChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setIsTeacher(e.target.checked);
  };

  return (
    <div className="login-widget">
      <h2>{buttonText}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        {isSignUp ? <div>
          <label>Create Teacher Account?</label>
          <input
            type="checkbox"
            checked={isTeacher}
            onChange={handleIsTeacherChange}
            required
          />
        </div> : <></>}
        <button type="submit">{buttonText}</button>
      </form>
    </div>
  );
};

export default LoginWidget;
