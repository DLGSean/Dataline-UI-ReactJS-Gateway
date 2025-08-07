import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SearchAdministrator from "./SearchAdministrator";
import ListOfAdministrator from './ListOfAdministrator';
import authFetch from "../Utils/authFetch"; // ✅ Reusable fetch

function BodyAdministrator() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [data, updateData] = useState({ items: [] });

  const fetchTheData = async (filters) => {
    const params = new URLSearchParams();
    if (filters.accountId) params.append("accountId", filters.accountId);
    if (filters.accountName) params.append("accountName", filters.accountName);
    if (filters.active !== null && filters.active !== undefined) {
      params.append("active", filters.active);
    }

    try {
      const result = await authFetch(`${apiUrl}/Administrator/GetAdministrator?${params.toString()}`, {
        method: 'GET',
      }, navigate); // ✅ handles token and 401
      if (!result) return;
      const parsed = JSON.parse(result);
      updateData({ items: parsed });
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const onFilterChange = (filters) => {
    fetchTheData(filters);
  };

  const handleEdit = (item) => {
    navigate(`/update-administrator/${item.administratorId}`, { state: item });
  };

  const handleDelete = (item) => {
    navigate(`/delete-administrator/${item.administratorId}`, { state: item });
  };

  return (
    <Container className="my-5">
      <SearchAdministrator onDateChange={onFilterChange} />
      <ListOfAdministrator
        items={data.items}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Container>
  );
}

export default BodyAdministrator;
