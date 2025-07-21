import axios from 'axios';
import { MatchDetails, NewsArticle, FeaturedVideo } from '../types/cricket';

// For development, we'll use mock data until we have a real API
const MOCK_DATA = true;

const API_BASE_URL = 'https://api.cricket.com'; // Replace with the actual API endpoint

const mockNewsData: NewsArticle[] = [
    {
        id: '1',
        title: "India Triumph in Thrilling Last-Over Finish",
        summary: "Virat Kohli leads India to victory with a masterful century",
        content: "In a spectacular display of batting...",
        author: "John Smith",
        date: "2025-07-20",
        image: "https://example.com/news1.jpg",
        category: "match-report",
        tags: ["India", "Australia", "ODI"]
    },
    {
        id: '2',
        title: 'T20 World Cup 2025: Schedule Announced',
        summary: 'ICC reveals complete schedule for upcoming T20 World Cup',
        content: 'The International Cricket Council today announced...',
        author: 'Jane Doe',
        date: '2025-07-19',
        image: 'https://example.com/news2.jpg',
        category: 'news',
        tags: ['T20 World Cup', 'ICC']
    }
];

const mockVideosData: FeaturedVideo[] = [
    {
        id: '1',
        title: 'Top 10 Catches of the Week',
        thumbnail: 'https://example.com/video1.jpg',
        duration: '5:30',
        url: 'https://example.com/video1',
        date: '2025-07-20'
    }
];

const mockMatchData: MatchDetails[] = [
    {
        id: '1',
        teamA: {
            name: 'India',
            score: 285,
            wickets: 4,
            overs: '42.3',
            runRate: 6.71,
            logo: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg',
            players: [
                { id: '1', name: 'Virat Kohli', runs: 82, balls: 68 },
                { id: '2', name: 'Rohit Sharma', runs: 56, balls: 42 }
            ]
        },
        teamB: {
            name: 'Australia',
            score: 248,
            wickets: 8,
            overs: '38.2',
            runRate: 6.47,
            logo: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_(converted).svg',
            players: [
                { id: '3', name: 'Steve Smith', runs: 45, balls: 52 },
                { id: '4', name: 'Pat Cummins', wickets: 3, overs: '8.2' }
            ]
        },
        status: 'live',
        venue: 'Melbourne Cricket Ground',
        lastOvers: ['1nb 4 1 W 0 2', '4 6 1 1 2 0', '0 W 1 4 0 1'],
        matchType: 'ODI',
        series: 'Australia vs India ODI Series 2025'
    },
    {
        id: '2',
        teamA: {
            name: 'England',
            score: 156,
            wickets: 2,
            overs: '15.4',
            runRate: 9.95,
            logo: 'https://upload.wikimedia.org/wikipedia/en/b/be/Flag_of_England.svg',
            players: [
                { id: '5', name: 'Jos Buttler', runs: 78, balls: 45 },
                { id: '6', name: 'Joe Root', runs: 34, balls: 28 }
            ]
        },
        teamB: {
            name: 'South Africa',
            score: 0,
            wickets: 0,
            overs: '0.0',
            runRate: 0,
            logo: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Flag_of_South_Africa.svg',
            players: []
        },
        status: 'live',
        venue: 'Lords Cricket Ground',
        lastOvers: ['4 6 1 4 1 6', '1 W 4 6 2 1'],
        matchType: 'T20I',
        series: 'England vs South Africa T20I Series 2025'
    }
];

export const fetchLiveScores = async (): Promise<MatchDetails[]> => {
    try {
        if (MOCK_DATA) {
            return mockMatchData;
        }
        const response = await axios.get(`${API_BASE_URL}/live-scores`);
        return response.data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        throw new Error('Error fetching live scores: ' + errorMessage);
    }
};

export const fetchMatchDetails = async (matchId: string): Promise<MatchDetails> => {
    try {
        if (MOCK_DATA) {
            const match = mockMatchData.find(m => m.id === matchId);
            if (!match) throw new Error('Match not found');
            return match;
        }
        const response = await axios.get(`${API_BASE_URL}/matches/${matchId}`);
        return response.data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        throw new Error('Error fetching match details: ' + errorMessage);
    }
};

export const fetchLatestNews = async (): Promise<NewsArticle[]> => {
    try {
        if (MOCK_DATA) {
            return mockNewsData;
        }
        const response = await axios.get(`${API_BASE_URL}/news`);
        return response.data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        throw new Error('Error fetching news: ' + errorMessage);
    }
};

export const fetchFeaturedVideos = async (): Promise<FeaturedVideo[]> => {
    try {
        if (MOCK_DATA) {
            return mockVideosData;
        }
        const response = await axios.get(`${API_BASE_URL}/videos/featured`);
        return response.data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        throw new Error('Error fetching videos: ' + errorMessage);
    }
};