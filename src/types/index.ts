export interface Team {
    name: string;
    score: number;
    overs: number;
}

export interface Score {
    teamA: Team;
    teamB: Team;
    currentInnings: number;
    totalOvers: number;
}

export interface Match {
    id: string;
    date: string;
    location: string;
    scores: Score;
    status: 'live' | 'completed' | 'upcoming';
}