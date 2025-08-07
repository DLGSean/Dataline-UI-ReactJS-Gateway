import { Row, Col, Container, Card, Form, Button } from 'react-bootstrap';
import { useState } from 'react';

const SearchAdministrator = ({ onDateChange }) => {
  const [form, setForm] = useState({
    accountName: '',
    active: ''
  });

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onDateChange({
      ...form,
      active: form.active === "" ? null : form.active === "true"
    });
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-sm p-4 rounded-4">
        <Card.Title className="text-center mb-4 fs-4 d-flex justify-content-center align-items-center">
          <span>Search Administrators</span>
        </Card.Title>

        <Form onSubmit={onSubmit}>
          <Row className="mb-4">
            <Col md={6} sm={12} className="mb-3 mb-md-0">
              <Form.Group controlId="accountName">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={form.accountName}
                  onChange={(e) => updateField("accountName", e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={4} sm={12}>
              <Form.Group controlId="activeStatus">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={form.active}
                  onChange={(e) => updateField("active", e.target.value)}
                >
                  <option value="">All</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col className="d-flex justify-content-center">
              <Button variant="primary" type="submit" className="px-4">
                <i className="bi bi-search me-2"></i>
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default SearchAdministrator;
