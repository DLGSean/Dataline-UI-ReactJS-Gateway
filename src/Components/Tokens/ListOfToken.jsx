import React, { useState } from 'react';
import { Table, Container, Card, Badge, Button, Pagination } from 'react-bootstrap';

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return isNaN(date) ? '' : date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

function ListOfToken({ items = [], onEdit, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const paginatedItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        {pages}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
      </Pagination>
    );
  };

  return (
    <Container className="mt-4">
      <Card className="shadow">
        <Card.Body>
          <Card.Title className="mb-4 text-center">List of Tokens</Card.Title>
          <div className="table-responsive">
            <Table striped bordered hover responsive>
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Token ID</th>
                  <th>Account ID</th>
                  <th>Account Name</th>
                  <th style={{ minWidth: '150px' }}>Token</th>
                  <th>Date Created</th>
                  <th>Date Expiration</th>
                  <th>Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.length > 0 ? (
                  paginatedItems.map((item, index) => (
                    <tr key={item.tokenId || index}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{item.tokenId}</td>
                      <td>{item.accountId}</td>
                      <td>{item.accountName}</td>
                      <td style={{ wordBreak: 'break-all', fontFamily: 'monospace' }}>
                        {item.token}
                      </td>
                      <td>{formatDate(item.dateCreated)}</td>
                      <td>{formatDate(item.expirationDate)}</td>
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
                    <td colSpan="9" className="text-center text-muted">
                      No tokens found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          {items.length > itemsPerPage && renderPagination()}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ListOfToken;
