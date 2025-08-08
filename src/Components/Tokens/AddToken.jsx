import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import Header from '../Header';
import Footer from '../Footer';

function AddToken() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    accountId: '',
    accountName: '',
    expirationDate: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.accountId || parseInt(form.accountId) <= 0) {
      alert("❌ Account ID must be a positive number.");
      return;
    }

    if (!form.accountName.trim()) {
      alert("❌ Account Name is required.");
      return;
    }

    if (!form.expirationDate) {
      alert("❌ Expiration Date is required.");
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const token = localStorage.getItem('token'); // 🔐 Get JWT token

      const response = await fetch(`${apiUrl}/MYOBExoSync/AddToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // ✅ Add token to header
        },
        body: JSON.stringify({
          accountId: parseInt(form.accountId),
          accountName: form.accountName,
          expirationDate: form.expirationDate,
        })
      });

      if (!response.ok) {
        const error = await response.text();
        alert("❌ Failed to add token: " + error);
        return;
      }

      setSubmitted(true);
      setForm({
        accountId: '',
        accountName: '',
        expirationDate: '',
      });

      setTimeout(() => {
        setSubmitted(false);
        navigate('/tokens');
      }, 1500);
    } catch (error) {
      console.error('Error submitting token:', error);
      alert("An error occurred while submitting the token.");
    }
  };

  const handleCancel = () => {
    setForm({
      accountId: '',
      accountName: '',
      expirationDate: ''
    });
    navigate('/tokens');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
       <Container className="flex-grow-1 my-5 pt-5 mt-5">
        <Card className="shadow mx-auto" style={{ maxWidth: '600px' }}>
          <Card.Body>
            <Card.Title className="text-center mb-4 fs-4 d-flex justify-content-center align-items-center">
              <i className="bi bi-key-fill text-primary me-2 fs-3"></i>
              <span>Add New Token</span>
            </Card.Title>

            {submitted && (
              <Alert variant="success" className="text-center">
                ✅ Token successfully added!
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Account ID</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      placeholder="Enter Account ID"
                      value={form.accountId}
                      onChange={(e) => updateField('accountId', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Account Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Account Name"
                      value={form.accountName}
                      onChange={(e) => updateField('accountName', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Expiration Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={form.expirationDate}
                      onChange={(e) => updateField('expirationDate', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex justify-content-center gap-3 mt-4">
                <Button type="submit" variant="primary" className="px-4">
                  <i className="bi bi-plus-circle me-2"></i>
                  Add Token
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

export default AddToken;
