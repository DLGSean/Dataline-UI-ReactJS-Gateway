import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import Header from '../Header';
import Footer from '../Footer';
import authFetch from '../Utils/authFetch'; // ✅ Import authFetch

function UpdateAdministrator() {
  const { administratorId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    administratorId: '',
    username: '',
    password: '',
    active: true,
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (state) {
      setForm({
        administratorId: state.administratorId || '',
        username: state.username || '',
        password: '',
        active: state.active ?? true,
      });
    }
  }, [state]);

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    if (!form.administratorId || parseInt(form.administratorId) <= 0) {
      alert("❌ Administrator ID must be a positive number.");
      return;
    }

    if (!form.username.trim()) {
      alert("❌ Username is required.");
      return;
    }

    const body = {
      administratorId: parseInt(form.administratorId),
      username: form.username,
      active: form.active,
    };

    if (form.password.trim()) {
      body.password = form.password;
    }

    try {
      const responseText = await authFetch(`${apiUrl}/Administrator/UpdateAdministrator`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      }, navigate); // ✅ Handles 401 internally

      if (!responseText) return;

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        navigate('/administrators');
      }, 1500);
    } catch (error) {
      console.error('Error updating administrator:', error);
      alert("An error occurred while updating the administrator.");
    }
  };

  const handleCancel = () => {
    navigate('/administrators');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
       <Container className="flex-grow-1 my-5 pt-5 mt-5">
        <Card className="shadow mx-auto" style={{ maxWidth: '600px' }}>
          <Card.Body>
            <Card.Title className="text-center mb-4 fs-4 d-flex justify-content-center align-items-center">
              <i className="bi bi-pencil-square text-warning me-2 fs-3"></i>
              <span>Update Administrator</span>
            </Card.Title>

            {submitted && (
              <Alert variant="success" className="text-center">
                ✅ Administrator successfully updated!
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Administrator ID</Form.Label>
                <Form.Control
                  type="number"
                  value={form.administratorId}
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={form.username}
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={form.password}
                  onChange={(e) => updateField("password", e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={form.active ? "true" : "false"}
                  onChange={(e) => updateField('active', e.target.value === "true")}
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </Form.Select>
              </Form.Group>

              <div className="d-flex justify-content-center gap-3 mt-4">
                <Button type="submit" variant="warning" className="px-4">
                  <i className="bi bi-save2 me-2"></i>
                  Update
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

export default UpdateAdministrator;
