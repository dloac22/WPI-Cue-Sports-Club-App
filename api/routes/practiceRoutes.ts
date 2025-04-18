import express from 'express';
import Practice from '../models/Practice';
import { auth } from '../middleware/auth';

const router = express.Router();

interface AuthRequest extends express.Request {
  user?: any;
}

// Get user's practice sessions
router.get('/', auth, async (req: AuthRequest, res) => {
  try {
    const practices = await Practice.find({ userId: req.user._id })
      .sort({ date: -1 });
    res.json(practices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching practice sessions' });
  }
});

// Create new practice session
router.post('/', auth, async (req: AuthRequest, res) => {
  try {
    const practice = new Practice({
      ...req.body,
      userId: req.user._id
    });
    await practice.save();
    res.status(201).json(practice);
  } catch (error) {
    res.status(500).json({ message: 'Error creating practice session' });
  }
});

// Get practice session by ID
router.get('/:id', auth, async (req: AuthRequest, res) => {
  try {
    const practice = await Practice.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!practice) {
      return res.status(404).json({ message: 'Practice session not found' });
    }
    res.json(practice);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching practice session' });
  }
});

// Update practice session
router.put('/:id', auth, async (req: AuthRequest, res) => {
  try {
    const practice = await Practice.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!practice) {
      return res.status(404).json({ message: 'Practice session not found' });
    }
    res.json(practice);
  } catch (error) {
    res.status(500).json({ message: 'Error updating practice session' });
  }
});

// Delete practice session
router.delete('/:id', auth, async (req: AuthRequest, res) => {
  try {
    const practice = await Practice.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!practice) {
      return res.status(404).json({ message: 'Practice session not found' });
    }
    res.json({ message: 'Practice session deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting practice session' });
  }
});

// Get practice statistics
router.get('/stats/overview', auth, async (req: AuthRequest, res) => {
  try {
    const practices = await Practice.find({ userId: req.user._id });
    
    const stats = {
      totalSessions: practices.length,
      totalDuration: practices.reduce((sum, p) => sum + p.duration, 0),
      averageAccuracy: practices.reduce((sum, p) => sum + (p.metrics?.accuracy || 0), 0) / practices.length,
      averageConsistency: practices.reduce((sum, p) => sum + (p.metrics?.consistency || 0), 0) / practices.length,
      averagePower: practices.reduce((sum, p) => sum + (p.metrics?.power || 0), 0) / practices.length,
      mostCommonDrills: practices
        .flatMap(p => p.drills)
        .reduce((acc, drill) => {
          acc[drill.name] = (acc[drill.name] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching practice statistics' });
  }
});

export default router; 