import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Container } from 'react-bootstrap';
import BodyToken from './BodyToken';

function MainTokens() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header stays at top */}
      <Header />

      {/* Main body fills remaining space and scrolls if needed */}
      <Container className="flex-grow-1 my-4">
        <BodyToken />
      </Container>

      {/* Footer stays at bottom */}
      <Footer />
    </div>
  );
}

export default MainTokens;
