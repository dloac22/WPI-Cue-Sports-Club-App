import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Home: React.FC = () => {
  return (
    <Container>
      <h1 className="mb-4">Welcome to WPI Cue Sports Club</h1>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Quick Stats</Card.Title>
              <Card.Text>
                View your practice statistics and track your progress.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Recent Drills</Card.Title>
              <Card.Text>
                Continue where you left off with your practice drills.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Upcoming Events</Card.Title>
              <Card.Text>
                Check out upcoming tournaments and club events.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
