import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface User {
  _id: string;
  username: string;
  skillLevel: string;
}

interface MatchFormProps {
  leagueId: string;
  onMatchCreated: () => void;
}

const MatchForm: React.FC<MatchFormProps> = ({ leagueId, onMatchCreated }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedPlayer1, setSelectedPlayer1] = useState('');
  const [selectedPlayer2, setSelectedPlayer2] = useState('');
  const [matchDate, setMatchDate] = useState<Date | null>(new Date());
  const [week, setWeek] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (selectedPlayer1 === selectedPlayer2) {
      setError('Players must be different');
      return;
    }

    try {
      await axios.post(`/api/leagues/${leagueId}/matches`, {
        player1Id: selectedPlayer1,
        player2Id: selectedPlayer2,
        week,
        matchDate
      });

      setSuccess('Match created successfully');
      onMatchCreated();
      // Reset form
      setSelectedPlayer1('');
      setSelectedPlayer2('');
      setWeek(1);
    } catch (error) {
      setError('Error creating match');
      console.error('Error creating match:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-4">
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Player 1</Form.Label>
            <Form.Select
              value={selectedPlayer1}
              onChange={(e) => setSelectedPlayer1(e.target.value)}
              required
            >
              <option value="">Select Player 1</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username} ({user.skillLevel})
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Player 2</Form.Label>
            <Form.Select
              value={selectedPlayer2}
              onChange={(e) => setSelectedPlayer2(e.target.value)}
              required
            >
              <option value="">Select Player 2</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username} ({user.skillLevel})
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Week</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={week}
              onChange={(e) => setWeek(parseInt(e.target.value))}
              required
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Match Date</Form.Label>
            <DatePicker
              selected={matchDate}
              onChange={(date) => setMatchDate(date)}
              className="form-control"
              dateFormat="MMMM d, yyyy"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="submit">
        Create Match
      </Button>
    </Form>
  );
};

export default MatchForm; 