import React from 'react';
import { useFollowedTeams } from '../contexts/FollowedTeamsContext';

// Mock data for matches - in a real app, this would come from an API
const mockMatches = [
  {
    id: '1',
    team1: { name: 'India', shortName: 'IND', flag: 'https://flagcdn.com/w80/in.png' },
    team2: { name: 'Australia', shortName: 'AUS', flag: 'https://flagcdn.com/w80/au.png' },
    status: 'live',
    score1: '287/5',
    score2: '156/8',
    overs1: '50.0',
    overs2: '32.4',
    format: 'ODI',
    venue: 'Melbourne Cricket Ground',
    date: 'Today',
    result: ''
  },
  {
    id: '2',
    team1: { name: 'England', shortName: 'ENG', flag: 'https://flagcdn.com/w80/gb-eng.png' },
    team2: { name: 'Pakistan', shortName: 'PAK', flag: 'https://flagcdn.com/w80/pk.png' },
    status: 'upcoming',
    score1: '',
    score2: '',
    overs1: '',
    overs2: '',
    format: 'T20I',
    venue: 'Lord\'s, London',
    date: 'Tomorrow, 7:00 PM',
    result: ''
  },
  {
    id: '3',
    team1: { name: 'South Africa', shortName: 'SA', flag: 'https://flagcdn.com/w80/za.png' },
    team2: { name: 'New Zealand', shortName: 'NZ', flag: 'https://flagcdn.com/w80/nz.png' },
    status: 'completed',
    score1: '245/8',
    score2: '248/6',
    overs1: '50.0',
    overs2: '49.2',
    format: 'ODI',
    venue: 'Cape Town',
    date: 'Yesterday',
    result: 'New Zealand won by 4 wickets'
  }
];

// Team name mapping for followed teams
const teamNameMap: { [key: string]: string } = {
  '1': 'India',
  '2': 'Australia', 
  '3': 'England',
  '4': 'Pakistan',
  '5': 'South Africa',
  '6': 'New Zealand',
  '7': 'Sri Lanka',
  '8': 'Bangladesh',
  '9': 'West Indies'
};

const FavouriteTeams: React.FC = () => {
  const { followedTeams } = useFollowedTeams();

  // Filter matches for followed teams
  const favouriteMatches = mockMatches.filter(match => {
    const followedTeamNames = followedTeams.map(id => teamNameMap[id]);
    return followedTeamNames.includes(match.team1.name) || followedTeamNames.includes(match.team2.name);
  });

  // Group matches by status
  const liveMatches = favouriteMatches.filter(m => m.status === 'live');
  const upcomingMatches = favouriteMatches.filter(m => m.status === 'upcoming');
  const completedMatches = favouriteMatches.filter(m => m.status === 'completed');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-600 dark:text-red-400 font-semibold text-sm">LIVE</span>
          </div>
        );
      case 'upcoming':
        return (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">UPCOMING</span>
          </div>
        );
      case 'completed':
        return (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-green-600 dark:text-green-400 font-semibold text-sm">COMPLETED</span>
          </div>
        );
      default:
        return null;
    }
  };

  const MatchCard: React.FC<{ match: any }> = ({ match }) => (
    <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg dark:shadow-2xl border border-gray-100 dark:border-dark-700 overflow-hidden hover:shadow-xl dark:hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Match Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
              {match.format}
            </span>
            {getStatusBadge(match.status)}
          </div>
          <div className="text-white/90 text-sm font-medium">
            {match.venue}
          </div>
        </div>
      </div>

      {/* Teams and Scores */}
      <div className="p-6">
        <div className="space-y-4">
          {/* Team 1 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center p-2">
                <img 
                  src={match.team1.flag} 
                  alt={match.team1.name}
                  className="w-6 h-6 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = '/api/placeholder/24/24';
                  }}
                />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-100">{match.team1.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{match.team1.shortName}</p>
              </div>
            </div>
            {match.score1 && (
              <div className="text-right">
                <div className="font-bold text-lg text-gray-800 dark:text-gray-100">{match.score1}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{match.overs1} overs</div>
              </div>
            )}
          </div>

          {/* VS Divider */}
          <div className="flex items-center justify-center">
            <div className="bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-500 h-px flex-1"></div>
            <span className="mx-4 text-gray-500 dark:text-gray-400 font-semibold">VS</span>
            <div className="bg-gradient-to-r from-gray-400 to-gray-300 dark:from-gray-500 dark:to-gray-600 h-px flex-1"></div>
          </div>

          {/* Team 2 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center p-2">
                <img 
                  src={match.team2.flag} 
                  alt={match.team2.name}
                  className="w-6 h-6 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = '/api/placeholder/24/24';
                  }}
                />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-100">{match.team2.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{match.team2.shortName}</p>
              </div>
            </div>
            {match.score2 && (
              <div className="text-right">
                <div className="font-bold text-lg text-gray-800 dark:text-gray-100">{match.score2}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{match.overs2} overs</div>
              </div>
            )}
          </div>
        </div>

        {/* Match Info */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-dark-600">
          {match.result ? (
            <p className="text-center text-green-600 dark:text-green-400 font-semibold">{match.result}</p>
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400">{match.date}</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section className="mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-r from-pink-500 to-violet-600 w-1 h-8 rounded-full"></div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-violet-600 dark:from-pink-400 dark:to-violet-400 bg-clip-text text-transparent">
          Favourite Teams
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-pink-200 to-violet-200 dark:from-pink-800 dark:to-violet-800"></div>
      </div>

      {/* Live Matches */}
      {liveMatches.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span>Live Now</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveMatches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Matches */}
      {upcomingMatches.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Upcoming</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMatches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      )}

      {/* Recent Results */}
      {completedMatches.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Recent Results</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedMatches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {favouriteMatches.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-700 dark:to-dark-600 rounded-2xl p-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">No matches for your favourite teams</h3>
            <p className="text-gray-600 dark:text-gray-400">Your followed teams don't have any matches scheduled at the moment.</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default FavouriteTeams;
