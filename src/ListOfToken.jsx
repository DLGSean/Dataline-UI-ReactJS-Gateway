import React from 'react';
import { Table, Container, Card, Badge } from 'react-bootstrap';

function ListOfToken({ items }) {
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
                  <th>Token</th>
                  <th>Date Created</th>
                  <th>Date Expiration</th>
                  <th>Active</th>
                </tr>
              </thead>
              <tbody>
                {items && items.length > 0 ? (
                  items.map((item, index) => (
                    <tr key={item.tokenId || index}>
                      <td>{index + 1}</td>
                      <td>{item.tokenId}</td>
                      <td>{item.accountId}</td>
                      <td>{item.accountName}</td>
                      <td style={{ wordBreak: 'break-all' }}>{item.token}</td>
                      <td>{item.dateCreated}</td>
                      <td>{item.expirationDate}</td>
                      <td>
                        {item.active ? (
                          <Badge bg="success">Active</Badge>
                        ) : (
                          <Badge bg="secondary">Inactive</Badge>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No tokens found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ListOfToken;
