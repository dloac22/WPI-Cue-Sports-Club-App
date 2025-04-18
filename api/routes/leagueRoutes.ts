import express from 'express';
import League from '../models/League';
import Match from '../models/Match';
import { auth, adminAuth } from '../middleware/auth';
import User from '../models/User';

const router = express.Router();

interface AuthRequest extends express.Request {
  user?: any;
}

// Get all leagues
router.get('/', async (req, res) => {
  try {
    const leagues = await League.find().sort({ startDate: -1 });
    res.json(leagues);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leagues' });
  }
});

// Get league by ID
router.get('/:id', async (req, res) => {
  try {
    const league = await League.findById(req.params.id);
    if (!league) {
      return res.status(404).json({ message: 'League not found' });
    }
    res.json(league);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching league' });
  }
});

// Admin: Create new league
router.post('/', adminAuth, async (req, res) => {
  try {
    const league = new League(req.body);
    await league.save();
    res.status(201).json(league);
  } catch (error) {
    res.status(500).json({ message: 'Error creating league' });
  }
});

// Admin: Update league
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const league = await League.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!league) {
      return res.status(404).json({ message: 'League not found' });
    }
    res.json(league);
  } catch (error) {
    res.status(500).json({ message: 'Error updating league' });
  }
});

// Admin: End league
router.put('/:id/end', adminAuth, async (req, res) => {
  try {
    const league = await League.findById(req.params.id);
    if (!league) {
      return res.status(404).json({ message: 'League not found' });
    }
    league.status = 'completed';
    await league.save();
    res.json(league);
  } catch (error) {
    res.status(500).json({ message: 'Error ending league' });
  }
});

// Get league matches
router.get('/:id/matches', async (req, res) => {
  try {
    const matches = await Match.find({ leagueId: req.params.id })
      .populate('player1Id', 'username')
      .populate('player2Id', 'username')
      .sort({ week: 1, matchDate: 1 });
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching matches' });
  }
});

// Admin: Create match
router.post('/:id/matches', adminAuth, async (req, res) => {
  try {
    const league = await League.findById(req.params.id);
    if (!league) {
      return res.status(404).json({ message: 'League not found' });
    }

    const { player1Id, player2Id, week, matchDate } = req.body;
    
    // Get player skill levels
    const [player1, player2] = await Promise.all([
      User.findById(player1Id),
      User.findById(player2Id)
    ]);

    if (!player1 || !player2) {
      return res.status(404).json({ message: 'One or both players not found' });
    }

    // Calculate skill gap
    const skillLevels = ['beginner', 'intermediate', 'advanced', 'expert'];
    const skillGap = Math.abs(
      skillLevels.indexOf(player1.skillLevel) - 
      skillLevels.indexOf(player2.skillLevel)
    );

    // Find applicable handicap rule
    const handicapRule = league.handicapRules
      .sort((a, b) => b.skillGap - a.skillGap)
      .find(rule => rule.skillGap <= skillGap);

    let handicap = {
      player1Handicap: 0,
      player2Handicap: 0,
      reason: ''
    };

    if (handicapRule && skillGap > 0) {
      const lowerSkillPlayer = skillLevels.indexOf(player1.skillLevel) < skillLevels.indexOf(player2.skillLevel) 
        ? 'player1' 
        : 'player2';
      
      if (lowerSkillPlayer === 'player1') {
        handicap.player1Handicap = handicapRule.handicapRacks;
        handicap.reason = `${player1.username} (${player1.skillLevel}) vs ${player2.username} (${player2.skillLevel}) - ${handicapRule.handicapRacks} rack handicap`;
      } else {
        handicap.player2Handicap = handicapRule.handicapRacks;
        handicap.reason = `${player2.username} (${player2.skillLevel}) vs ${player1.username} (${player1.skillLevel}) - ${handicapRule.handicapRacks} rack handicap`;
      }
    }

    const match = new Match({
      leagueId: req.params.id,
      player1Id,
      player2Id,
      week,
      matchDate,
      handicap
    });

    await match.save();
    res.status(201).json(match);
  } catch (error) {
    res.status(500).json({ message: 'Error creating match' });
  }
});

// Admin: Update match score
router.put('/matches/:matchId', adminAuth, async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(
      req.params.matchId,
      { ...req.body, status: 'completed' },
      { new: true, runValidators: true }
    );
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }
    res.json(match);
  } catch (error) {
    res.status(500).json({ message: 'Error updating match' });
  }
});

export default router; 