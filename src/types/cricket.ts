export interface Player {
    id: string;
    name: string;
    runs?: number;
    balls?: number;
    wickets?: number;
    overs?: string;
}

export interface TeamStats {
    name: string;
    score: number;
    wickets: number;
    overs: string;
    runRate: number;
    logo: string;
    players: Player[];
}

export interface MatchDetails {
    id: string;
    teamA: TeamStats;
    teamB: TeamStats;
    status: 'live' | 'completed' | 'upcoming';
    venue: string;
    lastOvers: string[];
    toss?: string;
    result?: string;
    matchType: string;
    series?: string;
}

export interface NewsArticle {
    id: string;
    title: string;
    summary: string;
    content: string;
    author: string;
    date: string;
    image: string;
    category: 'news' | 'feature' | 'analysis' | 'match-report';
    tags: string[];
}

export interface FeaturedVideo {
    id: string;
    title: string;
    thumbnail: string;
    duration: string;
    url: string;
    date: string;
}

export interface SeriesInfo {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    format: string;
    teams: string[];
}
