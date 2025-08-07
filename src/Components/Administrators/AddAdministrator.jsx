import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import Header from '../Header';
import Footer from '../Footer';
import authFetch from '../Utils/authFetch'; // ✅ Use authFetch

function AddAdministrator() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username.trim()) {
      alert("❌ Username is required.");
      return;
    }

    if (!form.password) {
      alert("❌ Password is required.");
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;

      const responseText = await authFetch(`${apiUrl}/Administrator/AddAdministrator`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      }, navigate); // ✅ redirect on 401

      if (!responseText) {
        // authFetch already handled the error or redirect
        return;
      }

      setSubmitted(true);
      setForm({ username: '', password: '' });

      setTimeout(() => {
        setSubmitted(false);
        navigate('/administrators');
      }, 1500);
    } catch (error) {
      console.error('Error submitting administrator:', error);
      alert("❌ Failed to add administrator: " + error.message);
    }
  };

  const handleCancel = () => {
    setForm({ username: '', password: '' });
    navigate('/administrators');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Container className="flex-grow-1 my-5">
        <Card className="shadow mx-auto" style={{ maxWidth: '600px' }}>
          <Card.Body>
            <Card.Title className="text-center mb-4 fs-4 d-flex justify-content-center align-items-center">
              <i className="bi bi-person-fill text-primary me-2 fs-3"></i>
              <span>Add New Administrator</span>
            </Card.Title>

            {submitted && (
              <Alert variant="success" className="text-center">
                ✅ Administrator successfully added!
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      value={form.username}
                      onChange={(e) => updateField('username', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={form.password}
                      onChange={(e) => updateField('password', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex justify-content-center gap-3 mt-4">
                <Button type="submit" variant="primary" className="px-4">
                  <i className="bi bi-plus-circle me-2"></i>
                  Add Administrator
                </Button>
                <Button variant="secondary" className="px-4" onClick={handleCancel}>
                  <i className="bi bi-x-circle me-2"></i>
                  Cancel
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </div>
  );
}

export default AddAdministrator;
