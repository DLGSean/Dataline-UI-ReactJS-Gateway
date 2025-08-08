import React, { useEffect, useState } from 'react';
import {Button } from 'react-bootstrap';
import './LoginPanel.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(true);
  }, []);

  const handleToggle = (panel) => {
    setIsLogin(panel === 'login');
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidated(true);

    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/Login/Login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('administratorId', data.administratorId);
        navigate('/main');
      } else if (response.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-reg-panel">
        <input
          type="radio"
          name="active-log-panel"
          id="log-login-show"
          checked={isLogin}
          onChange={() => handleToggle('login')}
        />
        <input
          type="radio"
          name="active-log-panel"
          id="log-reg-show"
          checked={!isLogin}
          onChange={() => handleToggle('register')}
        />

        <div className="login-info-box" style={{ display: isLogin ? 'none' : 'block' }}>
          <h2>Have an account?</h2>
          <p>Login here using your username and password</p>
          <label htmlFor="log-login-show" className="px-4 btn btn-primary">
                   <i class="bi bi-person"></i> Login
          </label>
        </div>

        <div className="register-info-box" style={{ display: isLogin ? 'block' : 'none' }}>
          <h2>Don't have an account?</h2>
          <p>Register here using your details</p>
         
          <label htmlFor="log-reg-show" className="px-4 btn btn-primary">
              <i class="bi bi-door-open"></i> Register
          </label>
        </div>

        <div className={`white-panel ${!isLogin ? 'right-log' : ''}`}>
          {/* LOGIN FORM */}
          <div className={`login-show ${isLogin ? 'show-log-panel' : ''}`}>
            <h2>LOGIN</h2>
            <form onSubmit={handleSubmit} noValidate>
              <input
                type="text"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <input type="submit" value="Login" /> */}
              <div className="text-center mt-3">
                <Button variant="primary" type="submit" className="px-4">
                  <i className="bi bi-key me-2"></i>
                  Login
                </Button>
              </div>
              
              {error && <p className="error-message">{error}</p>}
            </form>
              <a href="#">Forgot password?</a>
          </div>

          {/* REGISTER FORM */}
          <div className={`register-show ${!isLogin ? 'show-log-panel' : ''}`}>
            <h2>REGISTER</h2>
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
            <input type="button" value="Register" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
