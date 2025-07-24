import axios from 'axios';
import { MatchDetails, NewsArticle, FeaturedVideo } from '../types/cricket';

// For development, we'll use mock data until we have a real API
const MOCK_DATA = true;

const API_BASE_URL = 'https://api.cricket.com'; // Replace with the actual API endpoint

const mockNewsData: NewsArticle[] = [
    {
        id: '1',
        title: "Kohli's Masterclass Powers India to Victory",
        summary: "Virat Kohli's unbeaten 112 leads India to a thrilling 7-wicket victory over Australia at the MCG",
        content: "In a spectacular display of batting prowess, Virat Kohli reminded the cricket world why he's considered one of the greatest of all time. Chasing Australia's total of 284, India looked in trouble at 145/3 before Kohli took charge. His unbeaten 112 off 98 balls, studded with 12 fours and 2 sixes, guided India home with 4 balls to spare. The knock was vintage Kohli - calculated aggression mixed with clinical precision...",
        author: "Ravi Shastri",
        date: "2025-07-23",
        image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "match-report",
        tags: ["India", "Australia", "ODI", "Virat Kohli"]
    },
    {
        id: '2',
        title: 'T20 World Cup 2025: Complete Schedule Revealed',
        summary: 'ICC announces fixtures for the most anticipated cricket tournament with matches across 8 venues',
        content: 'The International Cricket Council today unveiled the complete schedule for the T20 World Cup 2025, set to be held across India from October 15 to November 20. The tournament will feature 16 teams competing in 45 matches across 8 iconic venues including Eden Gardens, Wankhede Stadium, and the newly renovated Narendra Modi Stadium...',
        author: 'Harsha Bhogle',
        date: '2025-07-22',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        category: 'news',
        tags: ['T20 World Cup', 'ICC', 'Schedule']
    },
    {
        id: '4',
        title: 'Babar Azam Creates History with Record-Breaking Century',
        summary: 'Pakistan captain becomes youngest to score 15 ODI centuries, surpassing Virat Kohli\'s record',
        content: 'Pakistan captain Babar Azam etched his name in cricket history books with a sublime century against New Zealand at Karachi. The elegant right-hander reached the milestone in just 103 balls, becoming the youngest player ever to score 15 ODI centuries at the age of 28 years and 234 days, breaking Virat Kohli\'s previous record...',
        author: 'Wasim Akram',
        date: '2025-07-20',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        category: 'match-report',
        tags: ['Pakistan', 'Babar Azam', 'Record', 'Century']
    },
    {
        id: '5',
        title: 'Women\'s Cricket Revolution: Record TV Viewership',
        summary: 'Women\'s T20I series between India and England breaks all previous viewership records',
        content: 'The ongoing Women\'s T20I series between India and England has shattered all previous television viewership records for women\'s cricket. The opening match attracted over 50 million viewers globally, marking a watershed moment for the women\'s game. Star performances from Smriti Mandhana and Nat Sciver-Brunt have captivated audiences worldwide...',
        author: 'Lisa Sthalekar',
        date: '2025-07-19',
        image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        category: 'feature',
        tags: ['Women\'s Cricket', 'India', 'England', 'T20I']
    },
    {
        id: '6',
        title: 'IPL 2025 Mega Auction: MI Retains Bumrah for ₹18 Crore',
        summary: 'Mumbai Indians make Jasprit Bumrah their most expensive retention ahead of mega auction',
        content: 'Mumbai Indians have made a statement of intent by retaining pace ace Jasprit Bumrah for a whopping ₹18 crore ahead of the IPL 2025 mega auction. The five-time champions also retained captain Rohit Sharma (₹16 crore) and explosive all-rounder Hardik Pandya (₹15 crore). The retention list showcases MI\'s commitment to their core Indian players...',
        author: 'Sunil Gavaskar',
        date: '2025-07-18',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        category: 'news',
        tags: ['IPL', 'Mumbai Indians', 'Jasprit Bumrah', 'Auction']
    },
    {
        id: '7',
        title: 'New Zealand Complete Historic Series Whitewash',
        summary: 'Black Caps achieve remarkable 3-0 victory over South Africa in Test series',
        content: 'New Zealand cricket team etched their names in history books by completing a stunning 3-0 Test series whitewash against South Africa at home. The victory marks New Zealand\'s first-ever clean sweep against the Proteas in a Test series. Captain Tim Southee led from the front with exceptional bowling performances throughout the series...',
        author: 'Ian Smith',
        date: '2025-07-17',
        image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        category: 'match-report',
        tags: ['New Zealand', 'South Africa', 'Test', 'Series']
    },
    {
        id: '8',
        title: 'Ben Stokes Announces ODI Retirement',
        summary: 'England all-rounder calls time on 50-over career to focus on Test cricket',
        content: 'England Test captain Ben Stokes has announced his retirement from One Day International cricket with immediate effect. The 32-year-old all-rounder wants to concentrate on Test cricket and manage his workload better. Stokes finishes his ODI career with 2,919 runs and 74 wickets in 105 matches, including the match-winning performance in the 2019 World Cup final...',
        author: 'Michael Atherton',
        date: '2025-07-16',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        category: 'news',
        tags: ['England', 'Ben Stokes', 'Retirement', 'ODI']
    }
];

const mockVideosData: FeaturedVideo[] = [
    {
        id: '1',
        title: 'Top 10 Catches of the Week',
        thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
        duration: '5:30',
        url: '#',
        date: '2025-07-23'
    },
    {
        id: '2',
        title: 'Kohli\'s Match-Winning 112 Highlights',
        thumbnail: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
        duration: '8:45',
        url: '#',
        date: '2025-07-23'
    },
    {
        id: '3',
        title: 'Bumrah\'s Comeback Story',
        thumbnail: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
        duration: '12:20',
        url: '#',
        date: '2025-07-21'
    },
    {
        id: '4',
        title: 'Women\'s Cricket Best Moments',
        thumbnail: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
        duration: '6:15',
        url: '#',
        date: '2025-07-19'
    }
];

const mockMatchData: MatchDetails[] = [
    {
        id: '1',
        teamA: {
            name: 'IND',
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
            name: 'AUS',
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
            name: 'ENG',
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
            name: 'SA',
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
    },
    {
        id: '3',
        teamA: {
            name: 'PAK',
            score: 198,
            wickets: 5,
            overs: '37.0',
            runRate: 5.35,
            logo: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Flag_of_Pakistan.svg',
            players: [
                { id: '7', name: 'Babar Azam', runs: 67, balls: 80 },
                { id: '8', name: 'Mohammad Rizwan', runs: 44, balls: 51 }
            ]
        },
        teamB: {
            name: 'NZ',
            score: 195,
            wickets: 9,
            overs: '40.2',
            runRate: 4.83,
            logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg',
            players: [
                { id: '9', name: 'Kane Williamson', runs: 59, balls: 70 },
                { id: '10', name: 'Trent Boult', wickets: 2, overs: '7.0' }
            ]
        },
        status: 'live',
        venue: 'National Stadium Karachi',
        lastOvers: ['1 1 0 4 0 2', 'W 0 1 1 1 0'],
        matchType: 'ODI',
        series: 'Pakistan vs New Zealand ODI Series 2025'
    },
    {
        id: '4',
        teamA: {
            name: 'SL',
            score: 142,
            wickets: 7,
            overs: '18.3',
            runRate: 7.67,
            logo: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_Sri_Lanka.svg',
            players: [
                { id: '11', name: 'Kusal Mendis', runs: 38, balls: 25 },
                { id: '12', name: 'Wanindu Hasaranga', runs: 27, balls: 15 }
            ]
        },
        teamB: {
            name: 'BAN',
            score: 140,
            wickets: 8,
            overs: '20.0',
            runRate: 7.00,
            logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Flag_of_Bangladesh.svg',
            players: [
                { id: '13', name: 'Shakib Al Hasan', runs: 41, balls: 32 },
                { id: '14', name: 'Mustafizur Rahman', wickets: 3, overs: '4.0' }
            ]
        },
        status: 'live',
        venue: 'R. Premadasa Stadium',
        lastOvers: ['4 1 1 0 6 1', '0 2 1 1 4 0'],
        matchType: 'T20I',
        series: 'Sri Lanka vs Bangladesh T20I Series 2025'
    },
    {
        id: '5',
        teamA: {
            name: 'WI',
            score: 289,
            wickets: 6,
            overs: '45.2',
            runRate: 6.38,
            logo: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_the_West_Indies_Federation_%281958%E2%80%931962%29.svg',
            players: [
                { id: '15', name: 'Chris Gayle', runs: 95, balls: 68 },
                { id: '16', name: 'Andre Russell', runs: 48, balls: 29 }
            ]
        },
        teamB: {
            name: 'IRE',
            score: 156,
            wickets: 8,
            overs: '32.4',
            runRate: 4.77,
            logo: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Flag_of_Ireland.svg',
            players: [
                { id: '17', name: 'Paul Stirling', runs: 42, balls: 38 },
                { id: '18', name: 'Tim Murtagh', wickets: 2, overs: '6.4' }
            ]
        },
        status: 'live',
        venue: 'Kensington Oval',
        lastOvers: ['6 4 1 1 2 0', '1 0 4 6 1 W'],
        matchType: 'ODI',
        series: 'West Indies vs Ireland ODI Series 2025'
    },
    {
        id: '6',
        teamA: {
            name: 'AFG',
            score: 178,
            wickets: 4,
            overs: '19.1',
            runRate: 9.29,
            logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg',
            players: [
                { id: '19', name: 'Mohammad Nabi', runs: 62, balls: 41 },
                { id: '20', name: 'Rashid Khan', runs: 28, balls: 18 }
            ]
        },
        teamB: {
            name: 'ZIM',
            score: 142,
            wickets: 7,
            overs: '18.5',
            runRate: 7.54,
            logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Flag_of_Zimbabwe.svg',
            players: [
                { id: '21', name: 'Brendan Taylor', runs: 54, balls: 42 },
                { id: '22', name: 'Sikandar Raza', runs: 33, balls: 26 }
            ]
        },
        status: 'live',
        venue: 'Sharjah Cricket Stadium',
        lastOvers: ['4 6 2 1 4 1', 'W 1 1 0 6 4'],
        matchType: 'T20I',
        series: 'Afghanistan vs Zimbabwe T20I Series 2025'
    },
];

export const fetchLiveScores = async (): Promise<MatchDetails[]> => {
    try {
        if (MOCK_DATA) {
            // Return mock data immediately without any network calls
            return Promise.resolve(mockMatchData);
        }
        const response = await axios.get(`${API_BASE_URL}/live-scores`);
        return response.data;
    } catch (error) {
        console.warn('API call failed, returning mock data:', error);
        // Return mock data as fallback
        return mockMatchData;
    }
};

export const fetchMatchDetails = async (matchId: string): Promise<MatchDetails> => {
    try {
        if (MOCK_DATA) {
            const match = mockMatchData.find(m => m.id === matchId);
            if (!match) throw new Error('Match not found');
            return Promise.resolve(match);
        }
        const response = await axios.get(`${API_BASE_URL}/matches/${matchId}`);
        return response.data;
    } catch (error) {
        console.warn('API call failed, returning mock data:', error);
        const match = mockMatchData.find(m => m.id === matchId);
        if (!match) throw new Error('Match not found');
        return match;
    }
};

export const fetchLatestNews = async (): Promise<NewsArticle[]> => {
    try {
        if (MOCK_DATA) {
            return Promise.resolve(mockNewsData);
        }
        const response = await axios.get(`${API_BASE_URL}/news`);
        return response.data;
    } catch (error) {
        console.warn('API call failed, returning mock data:', error);
        return mockNewsData;
    }
};

export const fetchFeaturedVideos = async (): Promise<FeaturedVideo[]> => {
    try {
        if (MOCK_DATA) {
            return Promise.resolve(mockVideosData);
        }
        const response = await axios.get(`${API_BASE_URL}/videos/featured`);
        return response.data;
    } catch (error) {
        console.warn('API call failed, returning mock data:', error);
        return mockVideosData;
    }
};