import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

const Drills: React.FC = () => {
  const [selectedDrill, setSelectedDrill] = useState<string | null>(null);

  const drills = [
    { id: '1', name: 'Straight Shot Practice', difficulty: 'Beginner' },
    { id: '2', name: 'Cut Shot Drills', difficulty: 'Intermediate' },
    { id: '3', name: 'Bank Shot Practice', difficulty: 'Advanced' },
    { id: '4', name: 'Position Play', difficulty: 'Intermediate' },
  ];

  return (
    <Container>
      <h1 className="mb-4">Practice Drills</h1>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Available Drills</Card.Title>
              <div className="list-group">
                {drills.map((drill) => (
                  <button
                    key={drill.id}
                    className={`list-group-item list-group-item-action ${
                      selectedDrill === drill.id ? 'active' : ''
                    }`}
                    onClick={() => setSelectedDrill(drill.id)}
                  >
                    {drill.name}
                    <span className="badge bg-secondary float-end">
                      {drill.difficulty}
                    </span>
                  </button>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Drill Details</Card.Title>
              {selectedDrill ? (
                <div>
                  <h4>{drills.find(d => d.id === selectedDrill)?.name}</h4>
                  <p>Start your practice session with this drill.</p>
                  <Button variant="primary">Start Drill</Button>
                </div>
              ) : (
                <p>Select a drill to view details and start practicing.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Drills;
