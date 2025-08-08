import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

function LoginHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('administratorId');
    navigate('/');
  };

  return (
    <Navbar className="custom-navbar" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/main" className="d-flex align-items-center gap-2">
        <img
          src="/dataline-logo.png"
          alt="Logo"
          height="30"
          className="d-inline-block align-top"
        />
        <span>Data Line Gateway</span>
      </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default LoginHeader;
