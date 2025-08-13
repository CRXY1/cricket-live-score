import { Schema, model } from 'mongoose';
import { IMatch, IInnings, IBallByBall } from '../types';

const ballByBallSchema = new Schema<IBallByBall>({
  over: { type: Number, required: true },
  ball: { type: Number, required: true },
  batsman: { type: String, required: true },
  bowler: { type: String, required: true },
  runs: { type: Number, default: 0 },
  extras: {
    wide: { type: Number, default: 0 },
    noBall: { type: Number, default: 0 },
    bye: { type: Number, default: 0 },
    legBye: { type: Number, default: 0 },
    penalty: { type: Number, default: 0 }
  },
  wicket: {
    type: {
      type: String,
      enum: ['bowled', 'caught', 'lbw', 'stumped', 'run-out', 'hit-wicket']
    },
    fielder: String
  },
  commentary: String,
  timestamp: { type: Date, default: Date.now }
});

const inningsSchema = new Schema<IInnings>({
  teamId: { type: String, required: true },
  battingOrder: [{ type: String }],
  bowlingOrder: [{ type: String }],
  score: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  overs: { type: Number, default: 0 },
  balls: { type: Number, default: 0 },
  extras: {
    wide: { type: Number, default: 0 },
    noBall: { type: Number, default: 0 },
    bye: { type: Number, default: 0 },
    legBye: { type: Number, default: 0 },
    penalty: { type: Number, default: 0 }
  },
  runRate: { type: Number, default: 0 },
  ballByBall: [ballByBallSchema],
  playerStats: [{
    playerId: { type: String, required: true },
    runs: { type: Number, default: 0 },
    balls: { type: Number, default: 0 },
    fours: { type: Number, default: 0 },
    sixes: { type: Number, default: 0 },
    isOut: { type: Boolean, default: false },
    dismissalType: String,
    overs: { type: Number, default: 0 },
    runsConceded: { type: Number, default: 0 },
    wicketsTaken: { type: Number, default: 0 },
    maidens: { type: Number, default: 0 }
  }]
});

const matchSchema = new Schema<IMatch>({
  matchNumber: String,
  title: {
    type: String,
    required: [true, 'Match title is required'],
    trim: true
  },
  teamA: {
    type: String,
    required: [true, 'Team A is required']
  },
  teamB: {
    type: String,
    required: [true, 'Team B is required']
  },
  venue: {
    type: String,
    required: [true, 'Venue is required']
  },
  city: String,
  country: String,
  matchType: {
    type: String,
    enum: ['Test', 'ODI', 'T20', 'T10', 'The Hundred'],
    required: true
  },
  seriesId: String,
  status: {
    type: String,
    enum: ['scheduled', 'live', 'completed', 'abandoned', 'cancelled'],
    default: 'scheduled'
  },
  toss: {
    winner: String,
    decision: {
      type: String,
      enum: ['bat', 'bowl']
    }
  },
  innings: [inningsSchema],
  currentInning: { type: Number, default: 0 },
  result: {
    winner: String,
    margin: String,
    resultType: {
      type: String,
      enum: ['normal', 'draw', 'tie', 'no-result', 'abandoned'],
      default: 'normal'
    }
  },
  weather: String,
  pitch: String,
  startTime: {
    type: Date,
    required: true
  },
  endTime: Date,
  isLive: {
    type: Boolean,
    default: false
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  commentary: [String]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
matchSchema.index({ status: 1 });
matchSchema.index({ isLive: 1 });
matchSchema.index({ startTime: 1 });
matchSchema.index({ teamA: 1, teamB: 1 });
matchSchema.index({ seriesId: 1 });

// Virtual for match duration
matchSchema.virtual('duration').get(function() {
  if (this.endTime && this.startTime) {
    return Math.round((this.endTime.getTime() - this.startTime.getTime()) / (1000 * 60 * 60)); // hours
  }
  return null;
});

// Middleware to update lastUpdated
matchSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

export const Match = model<IMatch>('Match', matchSchema);
