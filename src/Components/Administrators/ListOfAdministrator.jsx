import React, { useState } from 'react';
import { Table, Container, Card, Badge, Button, Pagination, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return isNaN(date)
    ? ''
    : date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
};

function ListOfAdministrator({ items = [], onEdit, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddAdministrator = () => {
    navigate('/add-administrator');
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    return (
      <Pagination className="justify-content-center mt-3">
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {pages}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    );
  };

  return (
    <Container className="mt-4">
      <Card className="shadow">
        <Card.Body>

          {/* Title and Add Button */}
          <Row className="align-items-center mb-4">
            <Col>
              <h5 className="mb-0">List of Tokens</h5>
            </Col>
            <Col className="text-end">
              <Button variant="success" onClick={handleAddAdministrator}>
                <i className="bi bi-plus-lg me-1"></i> Add Administrator
              </Button>
            </Col>
          </Row>
		  
          <div className="table-responsive">
            <Table striped bordered hover responsive>
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Administrator ID</th>
                  <th>User Name</th>
                  <th>Date Created</th>
                  <th>Date Update</th>
                  <th>Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.length > 0 ? (
                  paginatedItems.map((item, index) => (
                    <tr key={item.administratorId || index}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{item.administratorId}</td>
                      <td>{item.username}</td>
                      <td>{formatDate(item.dateCreated)}</td>
                      <td>{formatDate(item.dateUpdate)}</td>
                      <td>
                        {item.active ? (
                          <Badge bg="success">Active</Badge>
                        ) : (
                          <Badge bg="secondary">Inactive</Badge>
                        )}
                      </td>
                      <td className="text-nowrap">
                        <div className="d-flex flex-wrap gap-2">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => onEdit(item)}
                          >
                            <i className="bi bi-pencil me-1"></i> Edit
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => onDelete(item)}
                          >
                            <i className="bi bi-trash me-1"></i> Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-muted">
                      No administrators found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          {items.length > itemsPerPage && renderPagination()}
        </Card.Body>
      </Card>
      {/* Optional Total Count */}
      <div className="text-end text-muted mt-2">
        Total Administrators: <strong>{items.length}</strong>
      </div>
    </Container>
  );
}

export default ListOfAdministrator;
