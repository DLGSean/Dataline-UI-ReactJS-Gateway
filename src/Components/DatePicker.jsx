import { Row, Col, Container, Card, Form, Button } from 'react-bootstrap';
import { useState } from 'react';

const DatePicker = ({ onDateChange }) => {
  const [form, setForm] = useState({
    from: "",
    to: "",
    accountId: "",
    accountName: "",
    expiration: "",
    active: false
  });

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onDateChange(form);
  };

  return (
    <Container className="mt-5">
      <Card className="shadow p-4">
        <Card.Title className="text-center mb-4">Search Details</Card.Title>
        <Form onSubmit={onSubmit}>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>From Date</Form.Label>
                <Form.Control
                  type="date"
                  value={form.from}
                  onChange={(e) => updateField("from", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>To Date</Form.Label>
                <Form.Control
                  type="date"
                  value={form.to}
                  onChange={(e) => updateField("to", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Date Expiration</Form.Label>
                <Form.Control
                  type="date"
                  value={form.expiration}
                  onChange={(e) => updateField("expiration", e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Account ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Account ID"
                  value={form.accountId}
                  onChange={(e) => updateField("accountId", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Account Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Account Name"
                  value={form.accountName}
                  onChange={(e) => updateField("accountName", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4} className="d-flex align-items-center">
              <Form.Check
                className="mt-4"
                type="checkbox"
                label="Active"
                checked={form.active}
                onChange={(e) => updateField("active", e.target.checked)}
              />
            </Col>
          </Row>

          <div className="d-grid gap-2 mx-auto w-100" style={{ maxWidth: '200px' }}>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default DatePicker;
