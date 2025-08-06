import SearchToken from "./SearchToken";
import ListOfToken from './ListOfToken';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Container, Button, Row, Col } from 'react-bootstrap';

function BodyToken() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [data, updateData] = useState({ items: [] });

    const fetchTheData = (filters) => {
        const token = localStorage.getItem('token'); // 🔐 Get the token
        const params = new URLSearchParams();

        if (filters.from) params.append("expirationFrom", filters.from);
        if (filters.to) params.append("expirationTo", filters.to);
        if (filters.accountId) params.append("accountId", filters.accountId);
        if (filters.accountName) params.append("accountName", filters.accountName);
        if (filters.active !== null) {
            params.append("active", filters.active);
            }

        fetch(`${apiUrl}/MYOBExoSync/GetToken?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // ✅ Include token
                }
            })
            .then((response) => response.text())
            .then((result) => {
            const data = result ? JSON.parse(result) : [];
            updateData({ items: data });
            })
            .catch((error) => {
            console.error("Fetch error:", error);
            });
        };

        const onDateChangeApp = (filters) => {
        fetchTheData(filters);
    };

  const handleAddToken = () => {
     navigate('/add-token');
  };

  const handleEdit = (item) => {
    navigate(`/update-token/${item.tokenId}`, { state: item });
  };

  const handleDelete = (item) => {
    navigate(`/delete-token/${item.tokenId}`, { state: item });
  };

  return (
    <Container className="my-5">
      <SearchToken onDateChange={onDateChangeApp} />
      <hr />

      <Row className="mb-3">
        <Col className="text-end">
          <Button variant="success" onClick={handleAddToken}>
            + Add Token
          </Button>
        </Col>
      </Row>

      <ListOfToken
        items={data.items}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <div className="text-end text-muted mt-2">
        Total Tokens: <strong>{data.items.length}</strong>
      </div>
    </Container>
  );
}

export default BodyToken;
