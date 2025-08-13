import express from 'express';
import { Match } from '../models/Match';
import { authenticate, authorize, optionalAuth } from '../middleware/auth';
import { ApiResponse } from '../types';

const router = express.Router();

// Get all matches with pagination and filters
router.get('/', optionalAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;
    const matchType = req.query.matchType as string;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (status) filter.status = status;
    if (matchType) filter.matchType = matchType;

    const matches = await Match.find(filter)
      .sort({ startTime: -1 })
      .skip(skip)
      .limit(limit)
      .populate('teamA teamB seriesId');

    const total = await Match.countDocuments(filter);

    const response: ApiResponse = {
      success: true,
      message: 'Matches retrieved successfully',
      data: matches,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };

    res.json(response);
  } catch (error: any) {
    const response: ApiResponse = {
      success: false,
      message: 'Failed to retrieve matches',
      error: error.message
    };
    res.status(500).json(response);
  }
});

// Get live matches
router.get('/live', async (req, res) => {
  try {
    const liveMatches = await Match.find({ 
      status: 'live',
      isLive: true 
    })
    .populate('teamA teamB')
    .sort({ startTime: -1 });

    const response: ApiResponse = {
      success: true,
      message: 'Live matches retrieved successfully',
      data: liveMatches
    };

    res.json(response);
  } catch (error: any) {
    const response: ApiResponse = {
      success: false,
      message: 'Failed to retrieve live matches',
      error: error.message
    };
    res.status(500).json(response);
  }
});

// Get match by ID
router.get('/:id', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate('teamA teamB seriesId');

    if (!match) {
      const response: ApiResponse = {
        success: false,
        message: 'Match not found'
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse = {
      success: true,
      message: 'Match retrieved successfully',
      data: match
    };

    res.json(response);
  } catch (error: any) {
    const response: ApiResponse = {
      success: false,
      message: 'Failed to retrieve match',
      error: error.message
    };
    res.status(500).json(response);
  }
});

// Create new match (Admin/Editor only)
router.post('/', authenticate, authorize('admin', 'editor'), async (req, res) => {
  try {
    const match = new Match(req.body);
    await match.save();

    const response: ApiResponse = {
      success: true,
      message: 'Match created successfully',
      data: match
    };

    res.status(201).json(response);
  } catch (error: any) {
    const response: ApiResponse = {
      success: false,
      message: 'Failed to create match',
      error: error.message
    };
    res.status(400).json(response);
  }
});

// Update match (Admin/Editor only)
router.put('/:id', authenticate, authorize('admin', 'editor'), async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!match) {
      const response: ApiResponse = {
        success: false,
        message: 'Match not found'
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse = {
      success: true,
      message: 'Match updated successfully',
      data: match
    };

    res.json(response);
  } catch (error: any) {
    const response: ApiResponse = {
      success: false,
      message: 'Failed to update match',
      error: error.message
    };
    res.status(400).json(response);
  }
});

export default router;
