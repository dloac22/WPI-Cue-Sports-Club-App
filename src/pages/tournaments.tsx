import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';

const Tournaments: React.FC = () => {
  const [selectedTournament, setSelectedTournament] = useState<string | null>(null);

  const tournaments = [
    {
      id: '1',
      name: 'Spring Championship',
      date: '2024-04-15',
      location: 'WPI Campus Center',
      status: 'Upcoming',
      participants: 32,
    },
    {
      id: '2',
      name: 'Summer Open',
      date: '2024-07-20',
      location: 'WPI Campus Center',
      status: 'Registration Open',
      participants: 24,
    },
    {
      id: '3',
      name: 'Fall Classic',
      date: '2024-10-05',
      location: 'WPI Campus Center',
      status: 'Registration Open',
      participants: 16,
    },
  ];

  return (
    <Container>
      <h1 className="mb-4">Tournaments</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Upcoming Tournaments</Card.Title>
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Participants</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tournaments.map((tournament) => (
                    <tr key={tournament.id}>
                      <td>{tournament.name}</td>
                      <td>{tournament.date}</td>
                      <td>{tournament.location}</td>
                      <td>
                        <span className={`badge bg-${
                          tournament.status === 'Upcoming' ? 'primary' : 'success'
                        }`}>
                          {tournament.status}
                        </span>
                      </td>
                      <td>{tournament.participants}/32</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => setSelectedTournament(tournament.id)}
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Tournament Details</Card.Title>
              {selectedTournament ? (
                <div>
                  <h4>
                    {tournaments.find((t) => t.id === selectedTournament)?.name}
                  </h4>
                  <p>
                    <strong>Date:</strong>{' '}
                    {tournaments.find((t) => t.id === selectedTournament)?.date}
                  </p>
                  <p>
                    <strong>Location:</strong>{' '}
                    {tournaments.find((t) => t.id === selectedTournament)?.location}
                  </p>
                  <p>
                    <strong>Status:</strong>{' '}
                    {tournaments.find((t) => t.id === selectedTournament)?.status}
                  </p>
                  <Button variant="primary" className="mt-3">
                    Register Now
                  </Button>
                </div>
              ) : (
                <p>Select a tournament to view details and register.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Tournaments;
