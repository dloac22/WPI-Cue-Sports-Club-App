import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';

const Practice: React.FC = () => {
  const [sessionTime, setSessionTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const startSession = () => {
    setIsActive(true);
    // Start timer logic here
  };

  const endSession = () => {
    setIsActive(false);
    setSessionTime(0);
  };

  return (
    <Container>
      <h1 className="mb-4">Practice Session</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Current Session</Card.Title>
              <div className="text-center mb-4">
                <h2>{Math.floor(sessionTime / 60)}:{(sessionTime % 60).toString().padStart(2, '0')}</h2>
                <div className="mb-3">
                  {!isActive ? (
                    <Button variant="success" onClick={startSession}>
                      Start Session
                    </Button>
                  ) : (
                    <Button variant="danger" onClick={endSession}>
                      End Session
                    </Button>
                  )}
                </div>
              </div>
              <Card.Title>Progress</Card.Title>
              <ProgressBar now={45} label={`${45}%`} className="mb-3" />
              <p>Shots made: 45/100</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Session Stats</Card.Title>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <strong>Accuracy:</strong> 75%
                </li>
                <li className="mb-2">
                  <strong>Best Streak:</strong> 15 shots
                </li>
                <li className="mb-2">
                  <strong>Average Time:</strong> 2.5s per shot
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Practice;
