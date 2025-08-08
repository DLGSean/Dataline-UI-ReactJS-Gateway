import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import Header from '../Header';
import Footer from '../Footer';
import authFetch from '../Utils/authFetch'; // ✅ Reusable fetch with token

function UpdateToken() {
  const { tokenId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    tokenId: '',
    accountId: '',
    accountName: '',
    expirationDate: '',
    active: true,
    refresh: false
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (state) {
      setForm({
        tokenId: state.tokenId || '',
        accountId: state.accountId || '',
        accountName: state.accountName || '',
        expirationDate: state.expirationDate ? state.expirationDate.split('T')[0] : '',
        active: state.active ?? true,
        refresh: false
      });
    }
  }, [state]);

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.tokenId || parseInt(form.tokenId) <= 0) {
      alert("❌ Token ID must be a positive number.");
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
      const response = await authFetch(
        `${apiUrl}/MYOBExoSync/UpdateToken`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tokenId: parseInt(form.tokenId),
            accountName: form.accountName,
            expirationDate: form.expirationDate,
            active: form.active,
            refresh: form.refresh
          })
        },
        navigate
      );

      if (!response) return; // authFetch handled 401 already

      const text = await response.text(); // ✅ Get text from Response

      if (text.toLowerCase().includes("error")) {
        alert("❌ Failed to update token: " + text);
        return;
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        navigate('/tokens');
      }, 1500);
    } catch (error) {
      console.error('Error updating token:', error);
      alert("An error occurred while updating the token.");
    }
  };

  const handleCancel = () => {
    navigate('/tokens');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Container className="flex-grow-1 my-5 pt-5 mt-5">
        <Card className="shadow mx-auto" style={{ maxWidth: '600px' }}>
          <Card.Body>
            <Card.Title className="text-center mb-4 fs-4 d-flex justify-content-center align-items-center">
              <i className="bi bi-pencil-square text-warning me-2 fs-3"></i>
              <span>Update Token</span>
            </Card.Title>

            {submitted && (
              <Alert variant="success" className="text-center">
                ✅ Token successfully updated!
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Token ID</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={form.tokenId}
                  onChange={(e) => updateField('tokenId', e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Account ID</Form.Label>
                <Form.Control
                  type="text"
                  value={form.accountId}
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Account Name</Form.Label>
                <Form.Control
                  type="text"
                  value={form.accountName}
                  onChange={(e) => updateField('accountName', e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Expiration Date</Form.Label>
                <Form.Control
                  type="date"
                  value={form.expirationDate}
                  onChange={(e) => updateField('expirationDate', e.target.value)}
                  required
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

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Refresh token"
                  checked={form.refresh}
                  onChange={(e) => updateField('refresh', e.target.checked)}
                />
              </Form.Group>

              <div className="d-flex justify-content-center gap-3 mt-4">
                <Button type="submit" variant="warning" className="px-4">
                  <i className="bi bi-save2 me-2"></i>Update Token
                </Button>
                <Button variant="secondary" className="px-4" onClick={handleCancel}>
                  <i className="bi bi-x-circle me-2"></i>Cancel
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

export default UpdateToken;
