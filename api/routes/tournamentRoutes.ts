import express from 'express';
import Tournament from '../models/Tournament';
import { auth, adminAuth } from '../middleware/auth';
import mongoose from 'mongoose';

const router = express.Router();

interface AuthRequest extends express.Request {
  user?: any;
}

// Get all tournaments
router.get('/', async (req, res) => {
  try {
    const tournaments = await Tournament.find().sort({ startDate: -1 });
    res.json(tournaments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tournaments' });
  }
});

// Get tournament by ID
router.get('/:id', async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id)
      .populate('participants', 'username')
      .populate('brackets.matches.player1Id', 'username')
      .populate('brackets.matches.player2Id', 'username')
      .populate('brackets.matches.winnerId', 'username');
    
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }
    res.json(tournament);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tournament' });
  }
});

// Admin: Create new tournament
router.post('/', adminAuth, async (req, res) => {
  try {
    const tournament = new Tournament(req.body);
    await tournament.save();
    res.status(201).json(tournament);
  } catch (error) {
    res.status(500).json({ message: 'Error creating tournament' });
  }
});

// Admin: Update tournament
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }
    res.json(tournament);
  } catch (error) {
    res.status(500).json({ message: 'Error updating tournament' });
  }
});

// Join tournament
router.post('/:id/join', auth, async (req: AuthRequest, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }

    if (tournament.participants.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already joined tournament' });
    }

    tournament.participants.push(req.user._id);
    await tournament.save();
    res.json(tournament);
  } catch (error) {
    res.status(500).json({ message: 'Error joining tournament' });
  }
});

// Admin: Update match result
router.put('/:id/matches/:matchId', adminAuth, async (req, res) => {
  try {
    const { winnerId, score1, score2 } = req.body;
    const tournament = await Tournament.findById(req.params.id);
    
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }

    // Find and update the match
    for (const bracket of tournament.brackets) {
      const match = bracket.matches.find(m => m._id?.toString() === req.params.matchId);
      if (match) {
        match.winnerId = winnerId;
        match.score1 = score1;
        match.score2 = score2;
        break;
      }
    }

    await tournament.save();
    res.json(tournament);
  } catch (error) {
    res.status(500).json({ message: 'Error updating match result' });
  }
});

// Admin: Generate next round
router.post('/:id/next-round', adminAuth, async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }

    const currentRound = tournament.brackets.length;
    const winners = tournament.brackets[currentRound - 1].matches
      .map(match => match.winnerId)
      .filter(Boolean);

    if (winners.length < 2) {
      return res.status(400).json({ message: 'Not enough winners to generate next round' });
    }

    const nextRound = {
      round: currentRound + 1,
      matches: [] as Array<{
        _id: mongoose.Types.ObjectId;
        player1Id: mongoose.Types.ObjectId;
        player2Id: mongoose.Types.ObjectId;
        winnerId?: mongoose.Types.ObjectId;
        score1?: number;
        score2?: number;
      }>
    };

    // Create matches for next round
    for (let i = 0; i < winners.length; i += 2) {
      if (i + 1 < winners.length && winners[i] && winners[i + 1]) {
        nextRound.matches.push({
          _id: new mongoose.Types.ObjectId(),
          player1Id: winners[i]!,
          player2Id: winners[i + 1]!
        });
      }
    }

    tournament.brackets.push(nextRound);
    await tournament.save();
    res.json(tournament);
  } catch (error) {
    res.status(500).json({ message: 'Error generating next round' });
  }
});

export default router; 