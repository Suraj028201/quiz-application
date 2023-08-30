import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login-page.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (email.trim() !== '') {
      localStorage.setItem('email', email); // Store email in localStorage
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-container">
      <div>
        <p>1) As soon as you login, you will land on dashboard page</p>
        <p>2) Your 30min time will start immidiatly after landing on dashboard</p>
        <p>3) After 30min assignment will automatically get submitted</p>
      </div>    
      <div className="login-box">
        <h1>Login</h1>
        <input
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
