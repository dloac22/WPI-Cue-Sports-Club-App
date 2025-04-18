import { Card } from 'react-bootstrap';

const UpcomingMatches = () => {
  // fetch data from database here
  const matchData = {
    league: "League C-D Term 2027",
    matches: [
      { week: "Week 1", opponent: "PLAYER 3" },
      { week: "Week 2", opponent: "PLAYER 5" }
    ]
  };

  return (
    <Card className="mb-4" style={{ backgroundColor: '#f44336', color: 'white' }}>
      <Card.Body>
        <h2 className="text-center mb-4">UPCOMING MATCH</h2>
        <div className="text-center mb-2">
          {matchData.league}
        </div>
        
        <div className="overflow-auto" style={{ maxHeight: '200px' }}>
          {matchData.matches.map((match, index) => (
            <div key={index} className="d-flex justify-content-between mb-3">
              <div>
                <div>{match.week}</div>
                <div>User's Name</div>
              </div>
              <div className="text-end">
                <div>&nbsp;</div>
                <div>{match.opponent}</div>
              </div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default UpcomingMatches;