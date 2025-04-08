import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const TrainingTips = () => {
  // fetch data from database here based on user's skills level
  const tips = [
    {
      title: "Straight Shot Practice",
      description: "Focus on alignment and follow-through. Set up 10 balls in a straight line and aim to pocket each one cleanly.",
      difficulty: "Beginner"
    },
    {
      title: "Rail Shot Drill",
      description: "Practice shots along the rail to improve precision. Place 5 object balls 6 inches apart along the rail.",
      difficulty: "Intermediate"
    },
    {
      title: "Cut Shot Angles",
      description: "Work on various cut angles to improve position play. Start with 30-degree cuts and work your way to more severe angles.",
      difficulty: "Advanced"
    }
  ];

  const [currentTip, setCurrentTip] = useState(0);

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length);
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <h3 className="mb-3">Training Tips & Recommended Drills</h3>
        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h4>{tips[currentTip].title}</h4>
              <span className="badge bg-primary">{tips[currentTip].difficulty}</span>
            </div>
            <p>{tips[currentTip].description}</p>
          </Card.Body>
        </Card>
        <div className="d-flex justify-content-between mt-3">
          <Button variant="secondary" onClick={prevTip}>Previous</Button>
          <Button variant="primary" onClick={nextTip}>Next Tip</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TrainingTips;