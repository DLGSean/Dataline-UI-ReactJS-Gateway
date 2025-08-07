import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Container } from 'react-bootstrap';
import BodyAdministrator from './BodyAdministrator';

function MainAdministrator() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-ligh">
      {/* Header stays at top */}
      <div className="fixed-top z-3 shadow">
        <Header />
      </div>

      {/* Main body fills remaining space and scrolls if needed */}
      <Container className="flex-grow-1 my-4">
        <BodyAdministrator />
      </Container>

      {/* Footer stays at bottom */}
      <Footer />
    </div>
  );
}

export default MainAdministrator;
