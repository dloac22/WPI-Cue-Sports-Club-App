import React from "react";
import { Card, Table } from "react-bootstrap";

const Leaderboard = () => {
    // hard coded data, need to fetch from database
    const LeaderboardData = [
        { position: 1, name: "Player 1", gd: +9 },
        { position: 2, name: "Player 2", gd: +8 },
        { position: 3, name: "Player 3", gd: +5 },
        { position: 4, name: "Player 4", gd: 0 },
        { position: 5, name: "Player 5", gd: -8 },
    ]
    return (
        <Card className="mt-4 bg-light">
            <Card.Header className = "text-center mb-4">Leaderboard</Card.Header>
            <Card.Body>
                <div className = "d-flex justify-content-between mb-2">
                    <div>NAME</div>
                    <div>GD</div>
                </div>

                {LeaderboardData.map((player) => (
                    <div 
                    key = {player.position}
                    className = "d-flex justify-content-between mb-2"
                    >
                        <div>{player.position}. {player.name}</div>
                        <div>{player.gd}</div>
                    </div>
                ))}
            </Card.Body>
        </Card>
    ); 
};

export default Leaderboard;