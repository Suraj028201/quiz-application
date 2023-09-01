import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login-page.css';
import { useDispatch } from 'react-redux';
import { userDetailsAction, questionsListAction } from '../store/actions';
import axios from 'axios';
import { QUIZ_URL } from '../environment/environment';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(QUIZ_URL);
      dispatch(questionsListAction(response.data.results));
    } catch (error) {
      console.log('Error in fetching question: ', error);
    }
  }

  const handleSubmit = () => {
    if (email.trim() !== '') {
      localStorage.setItem('email', email); // Store email in localStorage
      dispatch(userDetailsAction(email));
      // fetchQuestions(); we can use thisif we want to fetch question before user lands on dashboard to improve user experiance
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-container">
      <div>
        <p>1) As soon as you login, you will land on dashboard page</p>
        <p>2) Your 30min time will start immidiatly after landing on dashboard</p>
        <p>3) After 30min assignment will automatically get submitted</p>
        <p>4) Nevigate to next question by clicking on the question number</p>
        <p>4) Answerd question will be green, visited will be yellow, and not visited will be white</p>
      </div>    
      <div className="login-box">
        <h1>Login</h1>
        <input
          className='email-input'
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
