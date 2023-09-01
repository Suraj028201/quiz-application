import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../styles/report-page.css';

const ReportPage = () => {

  const questions  = useSelector((state) => state.allQuestions);
  const { answers } = useSelector((state) => state.userAnswers);
  const  { score }  = useSelector((state) => state.userScore);

  useEffect(() => {
    console.log(questions, 'questions');
    console.log(answers, 'answers', score);
  },[questions])

  return (
    <div className='report-page'>
      <h4>{ typeof(score.score) === 'number' ? <>Your score is { score.score }</> : <>{score}</> }</h4>
      <table className="result-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Correct Answer</th>
            <th>Your Answer</th>
          </tr>
        </thead>
        <tbody>
          {questions?.map((question, index) => (
            <tr key={index}>
              <td>{question.question}</td>
              <td>{question.correct_answer}</td>
              <td className={`${question.correct_answer === answers[index] ? 'correct-answer' : ''}`}>{answers[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ReportPage;