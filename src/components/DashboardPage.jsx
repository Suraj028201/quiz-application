import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { QUIZ_URL } from '../environment/environment';
import '../styles/dashboard-page.css';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {

    const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds
    const questionCount = 15; // Number of questions
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const navigate = useNavigate();

    const fetchQuestions = () => {
      axios.get(QUIZ_URL).then((response) => {
          console.log(response.data.results);
      }).catch((error) => {
        console.log('Error in fetching question: ', error);
      })
    }

    useEffect(() => {
      fetchQuestions();
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
  
      return () => {
        clearInterval(timer);
      };
    }, [])

    useEffect(() => {
      if (timeRemaining === 0) {
        handleAssignmentSubmit();
      }
    }, [timeRemaining]);

    const handleQuestionClick = (questionNumber) => {
      setCurrentQuestion(questionNumber);
    };

    const handleAssignmentSubmit = () => {
      navigate('/report');
    };

    const renderQuestionButtons = () => {
      const buttons = [];
      for (let i = 1; i <= questionCount; i++) {
        buttons.push(
          <button
            key={i}
            className={`question-button ${currentQuestion === i ? 'active' : ''}`}
            onClick={() => handleQuestionClick(i)}>
            {i}
          </button>
        );
      }
      return buttons;
    };

    return (
      <div className="dashboard-container">
        <div className="question-column">
          {renderQuestionButtons()}
        </div>
        <div className="question-content">
          <h1>Question {currentQuestion}</h1>
          <p>This is the content of question {currentQuestion}.</p>
          {timeRemaining > 0 && (
            <p>Time remaining: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</p>
          )}
          <button className="submit-button" onClick={handleAssignmentSubmit}>Submit Assignment</button>
        </div>
      </div>
    );
}

export default DashboardPage;