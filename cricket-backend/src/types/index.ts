import { Document } from 'mongoose';

// User and Authentication Types
export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'editor' | 'viewer';
  firstName?: string;
  lastName?: string;
  avatar?: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAuthToken(): string;
}

// Player Types
export interface IPlayer extends Document {
  _id: string;
  name: string;
  displayName?: string;
  team: string;
  role: 'batsman' | 'bowler' | 'all-rounder' | 'wicket-keeper';
  battingStyle?: 'right-handed' | 'left-handed';
  bowlingStyle?: 'right-arm fast' | 'left-arm fast' | 'right-arm medium' | 'left-arm medium' | 'off-break' | 'leg-break' | 'left-arm orthodox' | 'left-arm chinaman';
  dateOfBirth?: Date;
  nationality?: string;
  image?: string;
  stats: {
    matches: number;
    runs: number;
    wickets: number;
    catches: number;
    average?: number;
    strikeRate?: number;
    economy?: number;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Team Types
export interface ITeam extends Document {
  _id: string;
  name: string;
  shortName: string;
  code: string; // e.g., IND, AUS, ENG
  logo: string;
  country: string;
  founded?: Date;
  homeGround?: string;
  captain?: string;
  coach?: string;
  players: string[]; // Player IDs
  colors: {
    primary: string;
    secondary: string;
  };
  stats: {
    matchesPlayed: number;
    matchesWon: number;
    matchesLost: number;
    matchesDraw: number;
    winPercentage: number;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Match Types
export interface IBallByBall extends Document {
  over: number;
  ball: number;
  batsman: string;
  bowler: string;
  runs: number;
  extras?: {
    wide?: number;
    noBall?: number;
    bye?: number;
    legBye?: number;
    penalty?: number;
  };
  wicket?: {
    type: 'bowled' | 'caught' | 'lbw' | 'stumped' | 'run-out' | 'hit-wicket';
    fielder?: string;
  };
  commentary?: string;
  timestamp: Date;
}

export interface IInnings extends Document {
  teamId: string;
  battingOrder: string[]; // Player IDs
  bowlingOrder: string[]; // Player IDs
  score: number;
  wickets: number;
  overs: number;
  balls: number;
  extras: {
    wide: number;
    noBall: number;
    bye: number;
    legBye: number;
    penalty: number;
  };
  runRate: number;
  ballByBall: IBallByBall[];
  playerStats: {
    playerId: string;
    runs?: number;
    balls?: number;
    fours?: number;
    sixes?: number;
    isOut?: boolean;
    dismissalType?: string;
    overs?: number;
    runsConceded?: number;
    wicketsTaken?: number;
    maidens?: number;
  }[];
}

export interface IMatch extends Document {
  _id: string;
  matchNumber?: string;
  title: string;
  teamA: string; // Team ID
  teamB: string; // Team ID
  venue: string;
  city?: string;
  country?: string;
  matchType: 'Test' | 'ODI' | 'T20' | 'T10' | 'The Hundred';
  seriesId?: string;
  status: 'scheduled' | 'live' | 'completed' | 'abandoned' | 'cancelled';
  toss?: {
    winner: string; // Team ID
    decision: 'bat' | 'bowl';
  };
  innings: IInnings[];
  currentInning: number;
  result?: {
    winner?: string; // Team ID
    margin?: string;
    resultType: 'normal' | 'draw' | 'tie' | 'no-result' | 'abandoned';
  };
  weather?: string;
  pitch?: string;
  startTime: Date;
  endTime?: Date;
  isLive: boolean;
  lastUpdated: Date;
  commentary: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Series Types
export interface ISeries extends Document {
  _id: string;
  name: string;
  shortName?: string;
  description?: string;
  type: 'bilateral' | 'tournament' | 'league';
  format: 'Test' | 'ODI' | 'T20' | 'Mixed';
  teams: string[]; // Team IDs
  matches: string[]; // Match IDs
  venue?: string;
  startDate: Date;
  endDate: Date;
  status: 'upcoming' | 'ongoing' | 'completed';
  winner?: string; // Team ID
  pointsTable?: {
    teamId: string;
    played: number;
    won: number;
    lost: number;
    draw: number;
    points: number;
    nrr?: number; // Net Run Rate
  }[];
  sponsor?: string;
  logo?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// News Types
export interface INews extends Document {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author: string; // User ID
  category: 'breaking' | 'match-report' | 'analysis' | 'interview' | 'feature';
  tags: string[];
  featuredImage?: string;
  gallery?: string[];
  relatedMatches?: string[]; // Match IDs
  relatedTeams?: string[]; // Team IDs
  relatedPlayers?: string[]; // Player IDs
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  views: number;
  likes: number;
  shares: number;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

// Statistics Types
export interface IStatistic extends Document {
  _id: string;
  type: 'player' | 'team' | 'match' | 'series';
  entityId: string; // Player/Team/Match/Series ID
  category: string; // e.g., 'batting', 'bowling', 'fielding'
  statName: string; // e.g., 'runs', 'wickets', 'catches'
  value: number;
  period: {
    startDate: Date;
    endDate: Date;
  };
  format?: 'Test' | 'ODI' | 'T20' | 'All';
  createdAt: Date;
  updatedAt: Date;
}

// Upload Types
export interface IUpload extends Document {
  _id: string;
  originalName: string;
  filename: string;
  path: string;
  mimetype: string;
  size: number;
  uploadedBy: string; // User ID
  category: 'image' | 'video' | 'document';
  tags?: string[];
  alt?: string;
  caption?: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Socket Events
export interface SocketEvents {
  // Match updates
  'match:scoreUpdate': (matchId: string, scoreData: any) => void;
  'match:wicket': (matchId: string, wicketData: any) => void;
  'match:boundary': (matchId: string, boundaryData: any) => void;
  'match:over': (matchId: string, overData: any) => void;
  'match:statusChange': (matchId: string, status: string) => void;
  
  // Commentary
  'commentary:update': (matchId: string, commentary: string) => void;
  
  // Admin events
  'admin:userOnline': (userId: string) => void;
  'admin:userOffline': (userId: string) => void;
  'admin:notification': (notification: any) => void;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}
