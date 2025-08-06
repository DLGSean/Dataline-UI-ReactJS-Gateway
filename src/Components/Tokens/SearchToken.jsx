import { Row, Col, Container, Card, Form, Button } from 'react-bootstrap';
import { useState } from 'react';

const SearchToken = ({ onDateChange }) => {
  const [form, setForm] = useState({
    from: "",
    to: "",
    accountId: "",
    accountName: "",
    active: ""
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
      <Card className="shadow p-4">
        <Card.Title className="text-center mb-4 fs-4">Search Tokens</Card.Title>
        <Form onSubmit={onSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="accountId">
                <Form.Label>Account ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Account ID"
                  value={form.accountId}
                  onChange={(e) => updateField("accountId", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="accountName">
                <Form.Label>Account Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Account Name"
                  value={form.accountName}
                  onChange={(e) => updateField("accountName", e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="fromDate">
                <Form.Label>From Expiration Date</Form.Label>
                <Form.Control
                  type="date"
                  value={form.from}
                  onChange={(e) => updateField("from", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="toDate">
                <Form.Label>To Expiration Date</Form.Label>
                <Form.Control
                  type="date"
                  value={form.to}
                  onChange={(e) => updateField("to", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
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

        <div className="text-center mt-4">
          <Button variant="primary" type="submit" className="px-5">
            <i className="bi bi-search me-2"></i> {/* Icon */}
            Search
          </Button>
        </div>
        </Form>
      </Card>
    </Container>
  );
};

export default SearchToken;
