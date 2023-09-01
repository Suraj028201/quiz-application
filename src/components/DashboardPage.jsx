import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { QUIZ_URL } from '../environment/environment';
import '../styles/dashboard-page.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { questionsListAction, userAnswersAction, userScoreAction } from '../store/actions';

const DashboardPage = () => {

    const  questions  = useSelector((state) => state.allQuestions);
    const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
    const [answeredQuestions, setAnsweredQuestions] = useState(Array(questions?.length).fill(false));
    const [visitedQuestions, setVisitedQuestions] = useState(Array(questions?.length).fill(false));
    const [userAnswers, setUserAnswers] = useState(Array(questions?.length).fill(''));
    const [selectedOption, setSelectedOption] = useState(null);
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
      setSelectedOption(userAnswers[questionNumber - 1]);
      const updatedVisitedQuestions = [...visitedQuestions];
      updatedVisitedQuestions[currentQuestionNumber - 1] = true;
      setVisitedQuestions(updatedVisitedQuestions);
      setCurrentQuestionNumber(questionNumber);
    };

    const renderQuestionButtons = () => {
      const buttons = [];
      for (let i = 1; i <= questions?.length; i++) {
        buttons.push(
          <button
            key={i}
            className={`question-button ${currentQuestionNumber === i ? 'active' : ''} ${answeredQuestions[i - 1] ? 'answered' : 'jj'} ${  !answeredQuestions[i - 1] && visitedQuestions[i - 1] ? 'visited' : ''}`}
            onClick={() => handleQuestionClick(i)}
            >
            {i}
          </button>
        );
      }
      return buttons;
    };

    const handleOptionSelect = (option) => {
      const updatedAnswers = [...answeredQuestions];
      updatedAnswers[currentQuestionNumber - 1] = true;
      setAnsweredQuestions(updatedAnswers);
      setSelectedOption(option);
      const newUserAnswers = [...userAnswers];
      newUserAnswers[currentQuestionNumber - 1] = option;
      setUserAnswers(newUserAnswers);
    };

    const handleAssignmentSubmit = () => {
      let score = 0;
      questions?.map((question, index) => {
        if(question.correct_answer === userAnswers[index]){
          score++;
        }
      })
      dispatch(userScoreAction(score));
      dispatch(userAnswersAction(userAnswers));
      navigate('/report');
    };


    return (
      <div className="dashboard-container">
        <div className="question-column">
          {renderQuestionButtons()}
        </div>
        <div className="question-content">
          <div className="timer-container">
            {timeRemaining > 0 && (
              <p className='timer'>Time remaining: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</p>
            )}
          </div>
          <div className="card">
            <h1>Question {currentQuestionNumber} :</h1>
            <h2 className="question">{questions && questions[currentQuestionNumber-1]?.question}</h2>
            <div className="options">
            {questions && questions[currentQuestionNumber-1]?.incorrect_answers.map((option, index) => (
              <label key={index} className="option">
              <input
                type="radio"
                name="answer"
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionSelect(option)}/>
                  {option}
              </label>
            ))}
            <label className="option">
              <input
                type="radio"
                name="answer"
                value={questions[currentQuestionNumber-1]?.correct_answer}
                checked={selectedOption === questions[currentQuestionNumber-1]?.correct_answer}
                onChange={() => handleOptionSelect(questions[currentQuestionNumber-1]?.correct_answer)}/>
                  {questions[currentQuestionNumber-1]?.correct_answer}
              </label>
            </div>
            <button className="submit-button" onClick={() => {handleQuestionClick(currentQuestionNumber+1)}}>Next</button>
          </div>
          <button className="submit-button" onClick={handleAssignmentSubmit}>Submit Assignment</button>
        </div>
      </div>
    );
}

export default DashboardPage;