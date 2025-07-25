import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFollowedTeams } from '../contexts/FollowedTeamsContext';
import { fetchLiveScores } from '../services/api';
import { MatchDetails } from '../types/cricket';

// Team name mapping for followed teams
const teamNameMap: { [key: string]: string } = {
  '1': 'IND',
  '2': 'AUS', 
  '3': 'ENG',
  '4': 'PAK',
  '5': 'SA',
  '6': 'NZ',
  '7': 'SL',
  '8': 'BAN',
  '9': 'WI'
};

const FavouriteTeams: React.FC = () => {
  const { followedTeams } = useFollowedTeams();
  const [matches, setMatches] = useState<MatchDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const matchData = await fetchLiveScores();
        setMatches(matchData);
      } catch (error) {
        console.error('Error fetching match data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
  }, []);

  // Filter matches for followed teams
  const favouriteMatches = matches.filter(match => {
    const followedTeamNames = followedTeams.map(id => teamNameMap[id]);
    return followedTeamNames.includes(match.teamA.name) || followedTeamNames.includes(match.teamB.name);
  });

  // Group matches by status
  const liveMatches = favouriteMatches.filter(m => m.status === 'live');
  const upcomingMatches = favouriteMatches.filter(m => m.status === 'upcoming');
  const completedMatches = favouriteMatches.filter(m => m.status === 'completed');

  // Combined matches for display (live + completed)
  const displayMatches = [...liveMatches, ...completedMatches];

  // Slider navigation functions
  const nextSlide = () => {
    const maxSlide = Math.max(0, displayMatches.length - 3); // Show 3 on desktop
    setCurrentSlide(prev => Math.min(prev + 1, maxSlide));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  const nextSlideMobile = () => {
    setCurrentSlide(prev => Math.min(prev + 1, displayMatches.length - 1));
  };

  const prevSlideMobile = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

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

  // Handle Summary button click
  const handleSummaryClick = (matchId: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [matchId]: !prev[matchId]
    }));
  };

  // Handle Full Scorecard button click
  const handleFullScorecard = (match: MatchDetails) => {
    navigate(`/scorecard/${match.id}`, { state: { match } });
  };

  const MatchCard: React.FC<{ match: MatchDetails }> = ({ match }) => {
    const isExpanded = expandedCards[match.id] || false;
    
    return (
    <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg dark:shadow-2xl border border-gray-100 dark:border-dark-700 overflow-hidden hover:shadow-xl dark:hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Match Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
              {match.matchType}
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
          {/* Team A */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center p-2">
                <img 
                  src={match.teamA.logo} 
                  alt={match.teamA.name}
                  className="w-6 h-6 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = '/api/placeholder/24/24';
                  }}
                />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-100">{match.teamA.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{match.teamA.name}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg text-gray-800 dark:text-gray-100">
                {match.teamA.score}/{match.teamA.wickets}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{match.teamA.overs} overs</div>
            </div>
          </div>

          {/* VS Divider */}
          <div className="flex items-center justify-center">
            <div className="bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-500 h-px flex-1"></div>
            <span className="mx-4 text-gray-500 dark:text-gray-400 font-semibold">VS</span>
            <div className="bg-gradient-to-r from-gray-400 to-gray-300 dark:from-gray-500 dark:to-gray-600 h-px flex-1"></div>
          </div>

          {/* Team B */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center p-2">
                <img 
                  src={match.teamB.logo} 
                  alt={match.teamB.name}
                  className="w-6 h-6 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = '/api/placeholder/24/24';
                  }}
                />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-100">{match.teamB.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{match.teamB.name}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg text-gray-800 dark:text-gray-100">
                {match.teamB.score}/{match.teamB.wickets}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{match.teamB.overs} overs</div>
            </div>
          </div>
        </div>

        {/* Match Links */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-dark-600">
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => handleSummaryClick(match.id)}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-1"
            >
              <span>Summary</span>
              <svg 
                className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button 
              onClick={() => handleFullScorecard(match)}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-1"
            >
              <span>Full Scorecard</span>
              <svg 
                className="w-3 h-3"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="border-t border-gray-200 dark:border-dark-600 pt-4 mt-4 transition-all duration-200 ease-in-out">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[match.teamA, match.teamB].map((team, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm truncate">
                      {team.name} Players
                    </h3>
                    {team.players.map(player => (
                      <div key={player.id} className="bg-gray-50 dark:bg-gray-700 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                        <span className="font-medium text-sm truncate block text-gray-800 dark:text-gray-200">{player.name}</span>
                        {player.runs !== undefined && (
                          <span className="text-xs text-gray-600 dark:text-gray-400 ml-2">
                            {player.runs}({player.balls})
                          </span>
                        )}
                        {player.wickets !== undefined && (
                          <span className="text-xs text-gray-600 dark:text-gray-400 ml-2">
                            {player.wickets}/{player.overs} overs
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 text-sm">Last Few Overs</h3>
                <div className="flex flex-wrap gap-2">
                  {match.lastOvers.map((over, idx) => (
                    <div key={idx} className="bg-gray-50 dark:bg-gray-700 p-2 rounded text-xs hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 text-gray-800 dark:text-gray-200">
                      {over}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    );
  };

  if (loading) {
    return (
      <section className="mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gradient-to-r from-pink-500 to-violet-600 w-1 h-8 rounded-full"></div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-violet-600 dark:from-pink-400 dark:to-violet-400 bg-clip-text text-transparent">
            Favourite Teams
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-pink-200 to-violet-200 dark:from-pink-800 dark:to-violet-800"></div>
        </div>
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-r from-pink-500 to-violet-600 w-1 h-8 rounded-full"></div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-violet-600 dark:from-pink-400 dark:to-violet-400 bg-clip-text text-transparent">
          Favourite Teams
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-pink-200 to-violet-200 dark:from-pink-800 dark:to-violet-800"></div>
      </div>

      {/* All Matches in Slider */}
      {displayMatches.length > 0 && (
        <div className="mb-8 relative">
          {/* Desktop Navigation Arrows */}
          <div className="hidden md:block">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-dark-800 shadow-lg rounded-full p-3 hover:bg-gray-50 dark:hover:bg-dark-700 disabled:opacity-50 disabled:cursor-not-allowed z-10 border border-gray-200 dark:border-dark-600"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide >= Math.max(0, displayMatches.length - 3)}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-dark-800 shadow-lg rounded-full p-3 hover:bg-gray-50 dark:hover:bg-dark-700 disabled:opacity-50 disabled:cursor-not-allowed z-10 border border-gray-200 dark:border-dark-600"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Desktop Slider */}
          <div className="hidden md:block">
            <div className="overflow-hidden" style={{ paddingLeft: '2.125rem' }}>
              <div 
                className="flex transition-transform duration-300 ease-in-out gap-6"
                style={{ transform: `translateX(-${currentSlide * (100/3)}%)` }}
              >
                {displayMatches.map(match => (
                  <div key={match.id} className="flex-shrink-0" style={{ width: '31.5%' }}>
                    <MatchCard match={match} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Slider */}
          <div className="md:hidden relative">
            {/* Mobile Navigation Arrows */}
            {displayMatches.length > 1 && (
              <>
                <button
                  onClick={prevSlideMobile}
                  disabled={currentSlide === 0}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white dark:bg-dark-800 shadow-lg rounded-full p-2 hover:bg-gray-50 dark:hover:bg-dark-700 disabled:opacity-50 disabled:cursor-not-allowed z-10 border border-gray-200 dark:border-dark-600"
                >
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlideMobile}
                  disabled={currentSlide >= displayMatches.length - 1}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white dark:bg-dark-800 shadow-lg rounded-full p-2 hover:bg-gray-50 dark:hover:bg-dark-700 disabled:opacity-50 disabled:cursor-not-allowed z-10 border border-gray-200 dark:border-dark-600"
                >
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
            
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {displayMatches.map(match => (
                  <div key={match.id} className="w-full flex-shrink-0 px-4">
                    <MatchCard match={match} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {displayMatches.length === 0 && (
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
