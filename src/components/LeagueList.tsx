import React, { useEffect, useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface League {
  _id: string;
  name: string;
  term: string;
  year: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'upcoming';
}

const LeagueList: React.FC = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await axios.get('/api/leagues');
        setLeagues(response.data);
      } catch (error) {
        console.error('Error fetching leagues:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge bg="success">Active</Badge>;
      case 'completed':
        return <Badge bg="secondary">Completed</Badge>;
      case 'upcoming':
        return <Badge bg="primary">Upcoming</Badge>;
      default:
        return null;
    }
  };

  if (loading) {
    return <div>Loading leagues...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Leagues</h2>
      <div className="row">
        {leagues.map((league) => (
          <div key={league._id} className="col-md-4 mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{league.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {league.term} {league.year}
                </Card.Subtitle>
                <Card.Text>
                  <div>Start: {new Date(league.startDate).toLocaleDateString()}</div>
                  <div>End: {new Date(league.endDate).toLocaleDateString()}</div>
                  <div>Status: {getStatusBadge(league.status)}</div>
                </Card.Text>
                <Link to={`/leagues/${league._id}`}>
                  <Button variant="primary">View League</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeagueList; 