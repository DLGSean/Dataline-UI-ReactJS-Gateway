import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

function Header() {
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
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/tokens" className={({ isActive }) => isActive ? 'active' : ''}>
              Tokens
            </Nav.Link>
            <Nav.Link as={NavLink} to="/administrators" className={({ isActive }) => isActive ? 'active' : ''}>
              Administrators
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
              About
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Button variant="danger" onClick={handleLogout}>
                 <i className="fa fa-sign-out fa-lg nav-icon nav-logout me-1"></i> Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
