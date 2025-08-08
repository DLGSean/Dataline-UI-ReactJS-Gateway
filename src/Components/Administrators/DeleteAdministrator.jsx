import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import Header from '../Header';
import Footer from '../Footer';
import authFetch from '../Utils/authFetch'; // ✅ Import authFetch

function DeleteAdministrator() {
  const { administratorId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;

      const responseText = await authFetch(`${apiUrl}/Administrator/DeleteAdministrator/${administratorId}`, {
        method: 'DELETE'
      }, navigate); // ✅ navigate for 401 redirect

      if (!responseText) {
        // authFetch already handled redirect or error
        return;
      }

      setDeleted(true);
      setTimeout(() => navigate('/administrators'), 2000);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsDeleting(false);
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
            <Card.Title className="text-center text-danger mb-4">
              <i className="bi bi-trash3-fill me-2"></i>Delete Administrator
            </Card.Title>

            {deleted && (
              <Alert variant="success" className="text-center">
                ✅ Administrator successfully deleted! Redirecting...
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
                  <strong>Administrator ID:</strong> {administratorId}
                  <br />
                  <strong>Username:</strong> {state?.username ?? '[N/A]'}
                </p>

                <div className="d-flex justify-content-center gap-3">
                  <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
                    <i className="bi bi-trash me-2"></i>
                    {isDeleting ? 'Deleting...' : 'Yes, Delete'}
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

export default DeleteAdministrator;
