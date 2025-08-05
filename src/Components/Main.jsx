import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Container } from 'react-bootstrap';

function Main() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header stays at top */}
      <Header />

      {/* Welcome Message in center */}
      <Container className="flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <h1 className="display-5">Welcome to Data Line Gateway</h1>
          <p className="lead">Your secure gateway to token management.</p>
        </div>
      </Container>

      {/* Footer stays at bottom */}
      <Footer />
    </div>
  );
}

export default Main;
