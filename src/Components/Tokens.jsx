import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Container } from 'react-bootstrap';
import Body from '../Body';
function Tokens() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header stays at top */}
      <Header />

      {/* Welcome Message in center */}
      <Container className="flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="text-center" style={{ maxWidth: '100%', width: '100%' }}>
          <Body/>
        </div>
      </Container>

      {/* Footer stays at bottom */}
      <Footer />
    </div>
  );
}

export default Tokens;
