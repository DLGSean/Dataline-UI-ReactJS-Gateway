import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    setIsLogin(true); // Default to login
  }, []);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidated(true);

    if (!email || !password || (!isLogin && (!fullName || !confirmPassword))) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (isLogin) {
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
          setError('Invalid email or password.');
        } else {
          setError('Something went wrong. Please try again.');
        }
      } catch (err) {
        console.error('Login error:', err);
        setError('Network error. Please try again.');
      }
    } else {
      // Register mode (placeholder - no backend call here)
      console.log('Register:', { fullName, email, password });
      alert('Registration functionality not yet implemented.');
    }
  };

  return (
    <Container fluid className="min-vh-100 d-flex justify-content-center align-items-center bg-login">
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={10} md={6} lg={4}>
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <img
                  src="/dataline-logo.png"
                  alt="Logo"
                  className="img-fluid"
                  style={{ maxHeight: '80px' }}
                />
                <h4 className="mt-3">{isLogin ? 'Login' : 'Register'} to Dataline Gateway</h4>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                {!isLogin && (
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </Form.Group>
                )}

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                {!isLogin && (
                  <Form.Group className="mb-3" controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                )}

                <div className="d-grid mb-2">
                  <Button className="btn-login-gradient" type="submit">
                    {isLogin ? 'Login' : 'Register'}
                  </Button>
                </div>

                {isLogin && (
                  <div className="text-center mb-3">
                    <a href="#" className="text-decoration-none">Forgot password?</a>
                  </div>
                )}
              </Form>

              <div className="text-center">
                <small>
                  {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                  <span
                    className="text-primary fw-semibold"
                    style={{ cursor: 'pointer' }}
                    onClick={toggleMode}
                  >
                    {isLogin ? 'Register' : 'Login'}
                  </span>
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
