import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useAuth } from '../context/authContext';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    skillLevel: 'Intermediate',
    preferredGame: '8-Ball',
    bio: 'Pool enthusiast and competitive player',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Update profile in backend
    console.log('Profile update:', profile);
  };

  return (
    <Container>
      <h1 className="mb-4">Profile</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Edit Profile</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Skill Level</Form.Label>
                  <Form.Select
                    value={profile.skillLevel}
                    onChange={(e) => setProfile({ ...profile, skillLevel: e.target.value })}
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Professional</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Preferred Game</Form.Label>
                  <Form.Select
                    value={profile.preferredGame}
                    onChange={(e) => setProfile({ ...profile, preferredGame: e.target.value })}
                  >
                    <option>8-Ball</option>
                    <option>9-Ball</option>
                    <option>10-Ball</option>
                    <option>Straight Pool</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Statistics</Card.Title>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <strong>Total Practice Hours:</strong> 45
                </li>
                <li className="mb-2">
                  <strong>Tournaments Played:</strong> 12
                </li>
                <li className="mb-2">
                  <strong>Best Finish:</strong> 2nd Place
                </li>
                <li className="mb-2">
                  <strong>Member Since:</strong> January 2023
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
