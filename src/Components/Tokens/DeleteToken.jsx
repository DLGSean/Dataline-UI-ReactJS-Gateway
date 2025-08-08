import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import Header from '../Header';
import Footer from '../Footer';
import authFetch from '../Utils/authFetch'; // ✅ Use reusable fetch

function DeleteToken() {
  const { tokenId } = useParams();
  const { state } = useLocation(); // You can pass token details via navigate
  const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const token = localStorage.getItem('token'); // 🔐 Get the token
    setIsDeleting(true);
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await authFetch(
        `${apiUrl}/MYOBExoSync/DeleteToken/${tokenId}`,
        { method: 'DELETE' },
        navigate
      );

      if (!response) return; // handled 401

      const text = await response.text(); // ✅ Get text from Response

      // Manually check success from response
      if (text.toLowerCase().includes("found")  || text.toLowerCase().includes("error")) {
        throw new Error(response || 'Delete failed');
      }
      

      setDeleted(true);
      setTimeout(() => navigate('/tokens'), 2000);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsDeleting(false);
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
            <Card.Title className="text-center text-danger mb-4">
              <i className="bi bi-trash3-fill me-2"></i>Delete Token
            </Card.Title>

            {deleted && (
              <Alert variant="success" className="text-center">
                ✅ Token successfully deleted! Redirecting...
              </Alert>
            )}

            {error && (
              <Alert variant="danger" className="text-center">
                ❌ {error}
              </Alert>
            )}

            {!deleted && (
              <>
                <p className="text-center mb-4">
                Are you sure you want to delete:
                    <br />
                    <strong>Token ID:</strong> {tokenId}
                    <br />
                    <strong>Account ID:</strong> {state?.accountId ?? '[N/A]'}
                    <br />
                    <strong>Account Name:</strong> {state?.accountName ?? '[N/A]'}
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
                    <i className="bi bi-trash me-2"></i> {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                  </Button>
                  <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </div>
  );
}

export default DeleteToken;
