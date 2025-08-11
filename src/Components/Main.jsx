import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Container, Card, Row, Col, Spinner } from 'react-bootstrap';
import '../index.css';
import authFetch from './Utils/authFetch';
import { useNavigate } from 'react-router-dom';
import { HubConnectionBuilder } from '@microsoft/signalr';

function Main() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [tokenStats, setTokenStats] = useState({ total: 0, notexpired: 0, expired: 0 });
  const [adminStats, setAdminStats] = useState({ total: 0, active: 0, inactive: 0 });
  const [loadingTokens, setLoadingTokens] = useState(true);
  const [loadingAdmins, setLoadingAdmins] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchTokenStats = async () => {
      try {
        const res = await authFetch(`${apiUrl}/MYOBExoSync/GetTokenStats`);
        const data = await res.json();
        setTokenStats({
          total: data.total || 0,
          notexpired: data.notexpired || 0,
          expired: data.expired || 0,
        });
      } catch (error) {
        console.error('Token stats error:', error);
      } finally {
        setLoadingTokens(false);
      }
    };

    const fetchAdminStats = async () => {
      try {
        const res = await authFetch(`${apiUrl}/Administrator/GetAdministratorStats`);
        const data = await res.json();
        setAdminStats({
          total: data.total || 0,
          active: data.active || 0,
          inactive: data.inactive || 0,
        });
      } catch (error) {
        console.error('Admin stats error:', error);
      } finally {
        setLoadingAdmins(false);
      }
    };

    // Initial data load
    fetchTokenStats();
    fetchAdminStats();

    // SignalR setup
    const hubBaseUrl = import.meta.env.VITE_HUB_BASE_URL || apiUrl.replace('/api', '');

    const connection = new HubConnectionBuilder()
      .withUrl(`${hubBaseUrl}/tokenStatsHub`, { withCredentials: true })
      .withAutomaticReconnect()
      .build();

    // const connection = new HubConnectionBuilder()
    //   .withUrl(`${apiUrl.replace('/api', '')}/tokenStatsHub`)
    //   .withAutomaticReconnect()
    //   .build();

    connection
      .start()
      .then(() => {
        console.log('✅ Connected to SignalR Hub');
        setIsConnected(true);

        connection.on('TokenStatsUpdated', () => {
          console.log('🔁 TokenStatsUpdated event received');
          fetchTokenStats(); // Refresh token stats on update
        });
      })
      .catch(error => {
        console.error('SignalR connection error:', error);
      });

    return () => {
      connection.stop();
      setIsConnected(false);
    };
  }, [apiUrl]);

  const cardStyles = {
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.3s ease',
    padding: '1.5rem',
  };

  const titleStyles = {
    fontWeight: '600',
    fontSize: '1.25rem',
    marginBottom: '15px',
    color: '#4f1069',
  };

  const statNumberStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#343a40',
  };

  const statLabelStyle = {
    fontSize: '0.95rem',
    fontWeight: '500',
  };

  const renderTokenCard = () => (
    <Card style={cardStyles} className="text-center hover-scale">
      <Card.Body>
        <Card.Title style={titleStyles}>
          <i className="bi bi-key me-2"></i>Total Tokens
        </Card.Title>
        {loadingTokens ? (
          <Spinner animation="border" />
        ) : (
          <>
            <div style={statNumberStyle}>{tokenStats.total}</div>
            <div className="d-flex justify-content-around mt-3 flex-wrap gap-2">
              <div
                className="text-success"
                style={{ ...statLabelStyle, cursor: 'pointer' }}
                onClick={() => navigate('/tokens?filter=notexpired')}
              >
                Not Expired: {tokenStats.notexpired}
              </div>
              <div
                className="text-danger"
                style={{ ...statLabelStyle, cursor: 'pointer' }}
                onClick={() => navigate('/tokens?filter=expired')}
              >
                Expired: {tokenStats.expired}
              </div>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );

  const renderAdminCard = () => (
    <Card style={cardStyles} className="text-center hover-scale">
      <Card.Body>
        <Card.Title style={titleStyles}>
          <i className="bi bi-people me-2"></i>Total Administrators
        </Card.Title>
        {loadingAdmins ? (
          <Spinner animation="border" />
        ) : (
          <>
            <div style={statNumberStyle}>{adminStats.total}</div>
            <div className="d-flex justify-content-around mt-3 flex-wrap gap-2">
              <div className="text-success" style={statLabelStyle}>
                Active: {adminStats.active}
              </div>
              <div className="text-danger" style={statLabelStyle}>
                Inactive: {adminStats.inactive}
              </div>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header />

      <Container className="main-content flex-grow-1 px-3 d-flex flex-column align-items-center">
        <div className="text-center mb-5">
          <h1 className="fw-bold display-6 display-md-5">Welcome to Data Line Gateway</h1>
          <p className="lead text-muted mb-1">Your secure gateway to token management.</p>
          <p className="text-muted small">
            SignalR Status: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
          </p>
        </div>

        <Row className="w-100 justify-content-center gy-4">
          <Col xs={12} sm={12} md={6} lg={4}>
            {renderTokenCard()}
          </Col>
          <Col xs={12} sm={12} md={6} lg={4}>
            {renderAdminCard()}
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
}

export default Main;
