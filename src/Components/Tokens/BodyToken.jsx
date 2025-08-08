import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import SearchToken from "./SearchToken";
import ListOfToken from "./ListOfToken";
import authFetch from "../Utils/authFetch"; // ✅ Case-sensitive import

function BodyToken() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [data, updateData] = useState({ items: [] });

  const fetchTheData = async (filters = {}) => {
    const params = new URLSearchParams();

    if (filters.from) params.append("expirationFrom", filters.from);
    if (filters.to) params.append("expirationTo", filters.to);
    if (filters.accountId) params.append("accountId", filters.accountId);
    if (filters.accountName) params.append("accountName", filters.accountName);
    if (filters.active !== null && filters.active !== undefined) {
      params.append("active", filters.active);
    }

    try {
      const result = await authFetch(
        `${apiUrl}/MYOBExoSync/GetToken?${params.toString()}`,
        { method: "GET" },
        navigate
      );

      if (!result) return; // Already redirected on 401
      const parsed = await result.json(); // ✅ FIXED: Correctly parse response
      updateData({ items: parsed });
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const onDateChangeApp = (filters) => {
    fetchTheData(filters);
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
      <ListOfToken
        items={data.items}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Container>
  );
}

export default BodyToken;
