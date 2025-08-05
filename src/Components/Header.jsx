import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/main">Data Line Gateway</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          {/* Left side nav links */}
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/tokens" className={({ isActive }) => isActive ? 'active' : ''}>
              Tokens
            </Nav.Link>
            <Nav.Link as={NavLink} to="/users" className={({ isActive }) => isActive ? 'active' : ''}>
              Users
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
              About
            </Nav.Link>
          </Nav>

          {/* Right side logout button */}
          <Nav className="ms-auto">
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
