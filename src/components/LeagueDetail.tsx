import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Badge, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

interface Match {
  _id: string;
  player1Id: {
    _id: string;
    username: string;
    skillLevel: string;
  };
  player2Id: {
    _id: string;
    username: string;
    skillLevel: string;
  };
  score1: number;
  score2: number;
  week: number;
  matchDate: string;
  status: string;
  handicap: {
    player1Handicap: number;
    player2Handicap: number;
    reason: string;
  };
}

interface League {
  _id: string;
  name: string;
  term: string;
  year: number;
  status: string;
}

const LeagueDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [league, setLeague] = useState<League | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeagueData = async () => {
      try {
        const [leagueResponse, matchesResponse] = await Promise.all([
          axios.get(`/api/leagues/${id}`),
          axios.get(`/api/leagues/${id}/matches`)
        ]);
        setLeague(leagueResponse.data);
        setMatches(matchesResponse.data);
      } catch (error) {
        console.error('Error fetching league data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagueData();
  }, [id]);

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
    return <div>Loading league details...</div>;
  }

  if (!league) {
    return <div>League not found</div>;
  }

  return (
    <div className="container mt-4">
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>{league.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {league.term} {league.year} - {getStatusBadge(league.status)}
          </Card.Subtitle>
        </Card.Body>
      </Card>

      <h3>Matches</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Week</th>
            <th>Date</th>
            <th>Player 1</th>
            <th>Score</th>
            <th>Player 2</th>
            <th>Status</th>
            <th>Handicap</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match._id}>
              <td>{match.week}</td>
              <td>{new Date(match.matchDate).toLocaleDateString()}</td>
              <td>
                {match.player1Id.username}
                <Badge bg="info" className="ms-2">{match.player1Id.skillLevel}</Badge>
                {match.handicap.player1Handicap > 0 && (
                  <Badge bg="warning" className="ms-2">+{match.handicap.player1Handicap}</Badge>
                )}
              </td>
              <td>
                {match.status === 'completed' ? (
                  `${match.score1} - ${match.score2}`
                ) : (
                  'vs'
                )}
              </td>
              <td>
                {match.player2Id.username}
                <Badge bg="info" className="ms-2">{match.player2Id.skillLevel}</Badge>
                {match.handicap.player2Handicap > 0 && (
                  <Badge bg="warning" className="ms-2">+{match.handicap.player2Handicap}</Badge>
                )}
              </td>
              <td>
                <Badge bg={match.status === 'completed' ? 'success' : 'primary'}>
                  {match.status}
                </Badge>
              </td>
              <td>
                {match.handicap.reason && (
                  <small className="text-muted">{match.handicap.reason}</small>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default LeagueDetail; 