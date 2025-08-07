import React from 'react';
import { Container, Card } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';

function About() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Fixed Header */}
      <div className="fixed-top z-3 shadow">
        <Header />
      </div>

      {/* Main Content */}
      <Container className="flex-grow-1 pt-5 mt-5">
        <Card className="shadow-sm">
          <Card.Body>
            <h2 className="mb-4">About Dataline API Gateway</h2>
            <p>
              The <strong>Dataline API Gateway</strong> serves as a centralized entry point for managing, authenticating,
              and routing API requests across various backend services.
            </p>
            <p>It includes features such as:</p>
            <ul>
              <li>Secure token-based authentication using JWT</li>
              <li>Administrator access and user control</li>
              <li>Logging, monitoring, and API activity tracking</li>
              <li>Efficient request forwarding and load distribution</li>
            </ul>
            <p>
              This platform is designed to simplify backend integrations while ensuring scalability, security, and maintainability.
            </p>
            <p>Built using:</p>
            <ul>
              <li>React + Vite (Frontend)</li>
              <li>.NET Core Web API (Backend)</li>
              <li>Bootstrap 5 (UI Framework)</li>
            </ul>
          </Card.Body>
        </Card>
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default About;
