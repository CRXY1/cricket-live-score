import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { MatchDetails } from '../types/cricket';
import Footer from '../components/Footer';

interface LocationState {
  match?: MatchDetails;
}

const FullScorecard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState;
  
  const [match, setMatch] = useState<MatchDetails | null>(locationState?.match || null);
  const [loading, setLoading] = useState(!locationState?.match);
  const [activeTab, setActiveTab] = useState<'live' | 'scorecard' | 'commentary' | 'statistics' | 'info'>('live');
  const [activeInnings, setActiveInnings] = useState<'teamA' | 'teamB'>('teamA');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (!locationState?.match && id) {
      // In a real app, fetch match data by ID
      setLoading(false);
    }
  }, [id, locationState?.match]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Match not found</h2>
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-300">
      {/* Header Section */}
      <div className="bg-white dark:bg-dark-800 shadow-sm border-b border-gray-200 dark:border-dark-700">
        <div className="container mx-auto px-6 py-4">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Back to Live Scores</span>
          </button>

          {/* Match Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{match.matchType}</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{match.venue}</p>
              {match.series && (
                <p className="text-gray-500 dark:text-gray-500 text-sm">{match.series}</p>
              )}
            </div>
            <div className={`px-3 py-1 rounded text-xs font-semibold ${
              match.status === 'live' 
                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' 
                : match.status === 'completed'
                ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
            }`}>
              {match.status.toUpperCase()}
            </div>
          </div>

          {/* Quick Scores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 p-4 rounded-lg border border-gray-200 dark:border-slate-600 shadow-sm dark:shadow-lg dark:shadow-black/20">
              <div className="flex items-center space-x-3">
                <img 
                  src={match.teamA.logo || 'https://via.placeholder.com/32?text=Team'}
                  alt={`${match.teamA.name} logo`} 
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-200 dark:ring-slate-600"
                  onError={e => { (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/32?text=Team'; }}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-slate-100">{match.teamA.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-400">({match.teamA.overs} ov)</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900 dark:text-slate-100">
                    {match.teamA.score}/{match.teamA.wickets}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-slate-400">RR: {match.teamA.runRate.toFixed(2)}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 p-4 rounded-lg border border-gray-200 dark:border-slate-600 shadow-sm dark:shadow-lg dark:shadow-black/20">
              <div className="flex items-center space-x-3">
                <img 
                  src={match.teamB.logo || 'https://via.placeholder.com/32?text=Team'}
                  alt={`${match.teamB.name} logo`} 
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-200 dark:ring-slate-600"
                  onError={e => { (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/32?text=Team'; }}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-slate-100">{match.teamB.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-400">({match.teamB.overs} ov)</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900 dark:text-slate-100">
                    {match.teamB.score}/{match.teamB.wickets}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-slate-400">RR: {match.teamB.runRate.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Match Status */}
          {match.result && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-4">
              <p className="text-blue-800 dark:text-blue-200 font-medium text-sm">{match.result}</p>
            </div>
          )}

          {/* Required/Current Run Rate */}
          {match.status === 'live' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                <p className="text-xs text-gray-600 dark:text-gray-400">Current RR</p>
                <p className="font-bold text-green-600 dark:text-green-400">{Math.max(match.teamA.runRate, match.teamB.runRate).toFixed(2)}</p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded">
                <p className="text-xs text-gray-600 dark:text-gray-400">Required RR</p>
                <p className="font-bold text-orange-600 dark:text-orange-400">{(Math.max(match.teamA.runRate, match.teamB.runRate) + 2).toFixed(2)}</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                <p className="text-xs text-gray-600 dark:text-gray-400">Target</p>
                <p className="font-bold text-blue-600 dark:text-blue-400">{Math.max(match.teamA.score, match.teamB.score) + 50}</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded">
                <p className="text-xs text-gray-600 dark:text-gray-400">Need</p>
                <p className="font-bold text-purple-600 dark:text-purple-400">{Math.abs(match.teamA.score - match.teamB.score)} runs</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700 sticky top-0 z-10">
        <div className="container mx-auto px-6">
          {/* Desktop Tabs */}
          <div className="hidden md:flex space-x-0 overflow-x-auto">
            {[
              { id: 'live', label: 'Live Score', icon: '🔴' },
              { id: 'scorecard', label: 'Scorecard', icon: '📊' },
              { id: 'commentary', label: 'Commentary', icon: '💬' },
              { id: 'statistics', label: 'Statistics', icon: '📈' },
              { id: 'info', label: 'Match Info', icon: 'ℹ️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Dropdown */}
          <div className="md:hidden relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 rounded-lg border border-gray-200 dark:border-gray-600"
            >
              <div className="flex items-center space-x-2">
                <span>
                  {activeTab === 'live' ? '🔴' :
                   activeTab === 'scorecard' ? '📊' :
                   activeTab === 'commentary' ? '💬' :
                   activeTab === 'statistics' ? '📈' : 'ℹ️'}
                </span>
                <span>
                  {activeTab === 'live' ? 'Live Score' :
                   activeTab === 'scorecard' ? 'Scorecard' :
                   activeTab === 'commentary' ? 'Commentary' :
                   activeTab === 'statistics' ? 'Statistics' : 'Match Info'}
                </span>
              </div>
              <svg 
                className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <div className={`absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg overflow-hidden z-20 transition-all duration-300 ease-in-out ${
              isDropdownOpen 
                ? 'opacity-100 visible transform translate-y-0 scale-100' 
                : 'opacity-0 invisible transform -translate-y-2 scale-95'
            }`}>
              {[
                { id: 'live', label: 'Live Score', icon: '🔴' },
                { id: 'scorecard', label: 'Scorecard', icon: '📊' },
                { id: 'commentary', label: 'Commentary', icon: '💬' },
                { id: 'statistics', label: 'Statistics', icon: '📈' },
                { id: 'info', label: 'Match Info', icon: 'ℹ️' }
              ].map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-l-4 border-blue-500'
                      : 'text-gray-700 dark:text-gray-200'
                  } ${index === 0 ? 'rounded-t-lg' : ''} ${index === 4 ? 'rounded-b-lg' : ''}`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isDropdownOpen ? 'slideInFromTop 0.3s ease-out forwards' : 'none'
                  }}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className="ml-auto">
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Backdrop to close dropdown when clicking outside */}
            {isDropdownOpen && (
              <div 
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-6 py-6">
        {/* Live Score Tab */}
        {activeTab === 'live' && (
          <div className="space-y-6">
            {/* Current Partnership */}
            <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Current Partnership</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    {match.teamA.players[0]?.name || 'Batsman 1'}
                  </h4>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                    {match.teamA.players[0]?.runs || 0}*
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    ({match.teamA.players[0]?.balls || 0} balls)
                  </p>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    {match.teamA.players[1]?.name || 'Batsman 2'}
                  </h4>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">
                    {match.teamA.players[1]?.runs || 0}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    ({match.teamA.players[1]?.balls || 0} balls)
                  </p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Partnership: <span className="font-semibold">{(match.teamA.players[0]?.runs || 0) + (match.teamA.players[1]?.runs || 0)} runs</span> in {(match.teamA.players[0]?.balls || 0) + (match.teamA.players[1]?.balls || 0)} balls
                </p>
              </div>
            </div>

            {/* Recent Overs */}
            <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent Overs</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {match.lastOvers.map((over, index) => (
                  <div key={index} className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Over {index + 1}</p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{over}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Scorecard Tab */}
        {activeTab === 'scorecard' && (
          <div className="space-y-6">
            {/* Innings Selector */}
            <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
              <div className="flex border-b border-gray-200 dark:border-dark-700">
                <button
                  onClick={() => setActiveInnings('teamA')}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                    activeInnings === 'teamA'
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                >
                  {match.teamA.name} - {match.teamA.score}/{match.teamA.wickets} ({match.teamA.overs})
                </button>
                <button
                  onClick={() => setActiveInnings('teamB')}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                    activeInnings === 'teamB'
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                >
                  {match.teamB.name} - {match.teamB.score}/{match.teamB.wickets} ({match.teamB.overs})
                </button>
              </div>

              {/* Batting Scorecard */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {activeInnings === 'teamA' ? match.teamA.name : match.teamB.name} Batting
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-dark-700">
                        <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Batsman</th>
                        <th className="text-center py-3 px-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">R</th>
                        <th className="text-center py-3 px-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">B</th>
                        <th className="text-center py-3 px-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">4s</th>
                        <th className="text-center py-3 px-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">6s</th>
                        <th className="text-center py-3 px-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">SR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(activeInnings === 'teamA' ? match.teamA.players : match.teamB.players)
                        .filter(player => player.runs !== undefined)
                        .map((player, index) => {
                          const isCurrentBatsman = index < 2;
                          const strikeRate = player.balls ? ((player.runs || 0) / player.balls * 100).toFixed(1) : '0.0';
                          const fours = Math.floor((player.runs || 0) / 15);
                          const sixes = Math.floor((player.runs || 0) / 25);

                          return (
                            <tr 
                              key={player.id} 
                              className={`border-b border-gray-100 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-750 ${
                                isCurrentBatsman ? 'border-l-4 border-blue-500' : ''
                              }`}
                            >
                              <td className="py-3 px-2">
                                <div>
                                  <div className="font-medium text-gray-900 dark:text-gray-100">
                                    {player.name}
                                    {isCurrentBatsman && <span className="ml-1 text-blue-600 dark:text-blue-400">*</span>}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {index === 0 ? 'c Keeper b Bowler' : 
                                     index === 1 ? 'lbw b Bowler' :
                                     index === 2 ? 'not out' :
                                     'b Bowler'}
                                  </div>
                                </div>
                              </td>
                              <td className="text-center py-3 px-2 font-bold text-gray-900 dark:text-gray-100">
                                {player.runs || 0}
                              </td>
                              <td className="text-center py-3 px-2 text-gray-600 dark:text-gray-400">
                                {player.balls || 0}
                              </td>
                              <td className="text-center py-3 px-2 text-gray-600 dark:text-gray-400">
                                {fours}
                              </td>
                              <td className="text-center py-3 px-2 text-gray-600 dark:text-gray-400">
                                {sixes}
                              </td>
                              <td className="text-center py-3 px-2 text-gray-600 dark:text-gray-400">
                                {strikeRate}
                              </td>
                            </tr>
                          );
                        })}
                      
                      {/* Extras */}
                      <tr className="border-b border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark-750">
                        <td className="py-3 px-2">
                          <div className="font-medium text-gray-700 dark:text-gray-300">Extras</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">(b 4, lb 2, w 5, nb 1)</div>
                        </td>
                        <td className="text-center py-3 px-2 font-bold text-gray-900 dark:text-gray-100">12</td>
                        <td colSpan={4}></td>
                      </tr>
                      
                      {/* Total */}
                      <tr className="bg-blue-50 dark:bg-blue-900/20 font-bold">
                        <td className="py-3 px-2 font-bold text-gray-900 dark:text-gray-100">
                          Total ({activeInnings === 'teamA' ? match.teamA.overs : match.teamB.overs})
                        </td>
                        <td className="text-center py-3 px-2 font-bold text-gray-900 dark:text-gray-100">
                          {(activeInnings === 'teamA' ? match.teamA.score : match.teamB.score) + 12}
                        </td>
                        <td colSpan={4}></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Fall of Wickets */}
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Fall of Wickets</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded">
                      <span className="text-red-600 dark:text-red-400 font-medium">1-25</span>
                      <span className="text-gray-600 dark:text-gray-400 ml-2">(3.2 ov)</span>
                    </div>
                    <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded">
                      <span className="text-red-600 dark:text-red-400 font-medium">2-67</span>
                      <span className="text-gray-600 dark:text-gray-400 ml-2">(8.4 ov)</span>
                    </div>
                    <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded">
                      <span className="text-red-600 dark:text-red-400 font-medium">3-89</span>
                      <span className="text-gray-600 dark:text-gray-400 ml-2">(12.1 ov)</span>
                    </div>
                    <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded">
                      <span className="text-red-600 dark:text-red-400 font-medium">4-142</span>
                      <span className="text-gray-600 dark:text-gray-400 ml-2">(16.3 ov)</span>
                    </div>
                  </div>
                </div>

                {/* Bowling Figures */}
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Bowling</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-dark-700">
                          <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Bowler</th>
                          <th className="text-center py-3 px-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">O</th>
                          <th className="text-center py-3 px-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">M</th>
                          <th className="text-center py-3 px-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">R</th>
                          <th className="text-center py-3 px-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">W</th>
                          <th className="text-center py-3 px-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Econ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(activeInnings === 'teamA' ? match.teamB.players : match.teamA.players)
                          .filter(player => player.wickets !== undefined)
                          .map((bowler) => {
                            const overs = bowler.overs || '0';
                            const economy = bowler.runs && overs !== '0' ? 
                              ((bowler.runs || 0) / parseFloat(overs)).toFixed(2) : '0.00';

                            return (
                              <tr key={bowler.id} className="border-b border-gray-100 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-750">
                                <td className="py-3 px-2 font-medium text-gray-900 dark:text-gray-100">
                                  {bowler.name}
                                </td>
                                <td className="text-center py-3 px-2 text-gray-600 dark:text-gray-400">{overs}</td>
                                <td className="text-center py-3 px-2 text-gray-600 dark:text-gray-400">0</td>
                                <td className="text-center py-3 px-2 text-gray-600 dark:text-gray-400">{bowler.runs || 0}</td>
                                <td className="text-center py-3 px-2 font-bold text-red-600 dark:text-red-400">{bowler.wickets || 0}</td>
                                <td className="text-center py-3 px-2 text-gray-600 dark:text-gray-400">{economy}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Commentary Tab */}
        {activeTab === 'commentary' && (
          <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Live Commentary</h3>
            <div className="space-y-4">
              {[
                { over: "19.6", bowler: "Bumrah", batsman: "Root", comment: "SIX! What a way to finish the over! Root gets under this length ball and sends it sailing over long-on for a maximum!", runs: 6, time: "Just now" },
                { over: "19.5", bowler: "Bumrah", batsman: "Root", comment: "FOUR! Brilliant shot! Root finds the gap between cover and point with a delightful drive.", runs: 4, time: "1 min ago" },
                { over: "19.4", bowler: "Bumrah", batsman: "Root", comment: "Good length delivery, defended solidly back to the bowler. No run.", runs: 0, time: "2 min ago" },
                { over: "19.3", bowler: "Bumrah", batsman: "Stokes", comment: "WIDE! Down the leg side, Stokes misses the flick. Extra run.", runs: 1, time: "3 min ago" },
                { over: "19.2", bowler: "Bumrah", batsman: "Stokes", comment: "Short of length, Stokes pulls but finds the fielder at square leg. Single taken.", runs: 1, time: "4 min ago" }
              ].map((ball, index) => (
                <div key={index} className="flex space-x-4 p-4 border border-gray-200 dark:border-dark-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-750">
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                      ball.runs === 6 ? 'bg-purple-600' :
                      ball.runs === 4 ? 'bg-green-600' :
                      ball.runs === 1 ? 'bg-blue-600' :
                      'bg-gray-600'
                    }`}>
                      {ball.runs === 1 && ball.comment.includes('WIDE') ? 'WD' : ball.runs}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {ball.over} - {ball.bowler} to {ball.batsman}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{ball.time}</div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{ball.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Statistics Tab */}
        {activeTab === 'statistics' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Match Statistics</h3>
                <div className="space-y-4">
                  {[
                    { label: "Highest Individual Score", teamA: `${Math.max(...match.teamA.players.map(p => p.runs || 0))}`, teamB: `${Math.max(...match.teamB.players.map(p => p.runs || 0))}` },
                    { label: "Best Bowling Figures", teamA: "3/45", teamB: "2/67" },
                    { label: "Most Fours", teamA: "12", teamB: "8" },
                    { label: "Most Sixes", teamA: "5", teamB: "3" }
                  ].map((stat, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-dark-700 pb-3">
                      <div className="font-medium text-gray-900 dark:text-gray-100 mb-2">{stat.label}</div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                          <div className="font-bold text-blue-600 dark:text-blue-400">{stat.teamA}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">{match.teamA.name}</div>
                        </div>
                        <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                          <div className="font-bold text-green-600 dark:text-green-400">{stat.teamB}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">{match.teamB.name}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Partnership Analysis
                </h3>
                <div className="space-y-4">
                  {[
                    { partnership: "1st Wicket", runs: 45, balls: 67, partners: "Player1 & Player2" },
                    { partnership: "2nd Wicket", runs: 78, balls: 89, partners: "Player2 & Player3" },
                    { partnership: "3rd Wicket", runs: 23, balls: 34, partners: "Player3 & Player4" },
                    { partnership: "Current", runs: 56, balls: 45, partners: "Player4 & Player5" }
                  ].map((p, index) => (
                    <div key={index} className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                      p.partnership === 'Current' 
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-blue-200 dark:border-blue-700/50 shadow-sm' 
                        : 'bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700/50'
                    }`}>
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className={`font-semibold mb-1 flex items-center gap-2 ${
                            p.partnership === 'Current' 
                              ? 'text-blue-700 dark:text-blue-300' 
                              : 'text-gray-900 dark:text-slate-100'
                          }`}>
                            {p.partnership === 'Current' && (
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            )}
                            {p.partnership}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-slate-400 font-medium">{p.partners}</div>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold text-lg ${
                            p.partnership === 'Current' 
                              ? 'text-blue-700 dark:text-blue-300' 
                              : 'text-gray-900 dark:text-slate-100'
                          }`}>
                            {p.runs} runs
                          </div>
                          <div className="text-sm text-gray-600 dark:text-slate-400">
                            {p.balls} balls • {(p.runs / p.balls * 100).toFixed(1)} SR
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Match Info Tab */}
        {activeTab === 'info' && (
          <div className="space-y-8">
            {/* Hero Header */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-800 dark:via-purple-800 dark:to-blue-900 rounded-2xl shadow-2xl">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10"></div>
              <div className="relative px-8 py-12">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">Match Information</h3>
                    <p className="text-blue-100">Complete details about this cricket match</p>
                  </div>
                </div>
                
                {/* Quick Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-blue-100 text-sm font-medium">Format</div>
                    <div className="text-white text-lg font-bold">{match.matchType}</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-blue-100 text-sm font-medium">Status</div>
                    <div className="text-white text-lg font-bold capitalize">{match.status}</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-blue-100 text-sm font-medium">Teams</div>
                    <div className="text-white text-lg font-bold">2</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-blue-100 text-sm font-medium">Players</div>
                    <div className="text-white text-lg font-bold">22</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Match Details Card */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl border border-gray-200 dark:border-dark-700 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-6 py-4 border-b border-gray-200 dark:border-dark-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">Match Details</h4>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    {[
                      { icon: "🏏", label: "Format", value: match.matchType },
                      { icon: "🏟️", label: "Venue", value: match.venue, mobileMultiline: true },
                      ...(match.series ? [{ icon: "🏆", label: "Series", value: match.series, multiline: true }] : []),
                      { icon: "📊", label: "Status", value: match.status.charAt(0).toUpperCase() + match.status.slice(1) },
                      { icon: "🎯", label: "Match Type", value: "International" },
                      { icon: "⏰", label: "Date", value: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }
                    ].map((item, index) => (
                      <div key={index} className={`p-4 bg-gray-50 dark:bg-dark-700 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-650 transition-colors duration-200 border border-gray-200 dark:border-dark-600 ${
                        item.multiline ? 'block' : 
                        item.mobileMultiline ? 'block sm:flex sm:items-start sm:justify-between' : 
                        'flex items-start justify-between'
                      }`}>
                        {item.multiline ? (
                          <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                              <span className="text-xl flex-shrink-0">{item.icon}</span>
                              <span className="text-gray-700 dark:text-gray-200 font-medium">{item.label}</span>
                            </div>
                            <div className="ml-8 text-gray-900 dark:text-white font-semibold leading-relaxed">{item.value}</div>
                          </div>
                        ) : item.mobileMultiline ? (
                          <div className="space-y-2 sm:space-y-0 sm:flex sm:items-start sm:justify-between sm:space-x-4">
                            <div className="flex items-center space-x-3 min-w-0 flex-1">
                              <span className="text-xl flex-shrink-0">{item.icon}</span>
                              <span className="text-gray-700 dark:text-gray-200 font-medium">{item.label}</span>
                            </div>
                            <div className="ml-8 sm:ml-0 text-gray-900 dark:text-white font-semibold leading-relaxed sm:text-right">{item.value}</div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center space-x-3 min-w-0 flex-1">
                              <span className="text-xl flex-shrink-0">{item.icon}</span>
                              <span className="text-gray-700 dark:text-gray-200 font-medium">{item.label}</span>
                            </div>
                            <span className="text-gray-900 dark:text-white font-semibold text-right ml-4 leading-relaxed">{item.value}</span>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Officials & Conditions */}
              <div className="lg:col-span-2 space-y-8">
                {/* Officials Card */}
                <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl border border-gray-200 dark:border-dark-700">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 px-6 py-4 border-b border-gray-200 dark:border-dark-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">Match Officials</h4>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { role: "On-field Umpire", name: "Adrian Smith", icon: "👨‍⚖️" },
                        { role: "On-field Umpire", name: "Brian Johnson", icon: "👨‍⚖️" },
                        { role: "Third Umpire", name: "Charlie Brown", icon: "📺" },
                        { role: "Match Referee", name: "David Wilson", icon: "🏛️" }
                      ].map((official, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 bg-white dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-xl hover:shadow-md hover:bg-gray-50 dark:hover:bg-dark-650 transition-all duration-200">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg">
                            {official.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">{official.name}</div>
                            <div className="text-sm text-gray-700 dark:text-gray-200 flex items-center space-x-1">
                              <span>{official.icon}</span>
                              <span>{official.role}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Conditions Card */}
                <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl border border-gray-200 dark:border-dark-700">
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 px-6 py-4 border-b border-gray-200 dark:border-dark-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">Match Conditions</h4>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-800/30 dark:to-blue-700/30 p-4 rounded-xl border border-blue-200 dark:border-blue-600/50">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="text-2xl">🎯</span>
                            <span className="font-semibold text-gray-900 dark:text-white">Toss Result</span>
                          </div>
                          <div className="text-gray-800 dark:text-gray-100">{match.toss || `${match.teamA.name} won the toss and elected to bat first`}</div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-800/30 dark:to-green-700/30 p-4 rounded-xl border border-green-200 dark:border-green-600/50">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="text-2xl">🌿</span>
                            <span className="font-semibold text-gray-900 dark:text-white">Pitch Report</span>
                          </div>
                          <div className="text-gray-800 dark:text-gray-100">Good batting surface with even bounce. Spinners might get assistance later in the day.</div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-800/30 dark:to-yellow-700/30 p-4 rounded-xl border border-yellow-200 dark:border-yellow-600/50">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="text-2xl">☀️</span>
                            <span className="font-semibold text-gray-900 dark:text-white">Weather</span>
                          </div>
                          <div className="text-gray-800 dark:text-gray-100">Sunny conditions, 25°C. Perfect day for cricket with minimal chances of rain.</div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-800/30 dark:to-purple-700/30 p-4 rounded-xl border border-purple-200 dark:border-purple-600/50">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="text-2xl">💨</span>
                            <span className="font-semibold text-gray-900 dark:text-white">Wind Conditions</span>
                          </div>
                          <div className="text-gray-800 dark:text-gray-100">Light breeze from North-East at 5 km/h. Favorable for fast bowlers.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Playing XIs */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-dark-700 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 px-6 py-4 border-b border-gray-200 dark:border-dark-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">Playing XIs</h4>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Team A */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 mb-4">
                      <img 
                        src={match.teamA.logo || 'https://via.placeholder.com/48?text=A'}
                        alt={`${match.teamA.name} logo`} 
                        className="w-12 h-12 rounded-full object-cover ring-4 ring-blue-100 dark:ring-blue-900"
                        onError={e => { (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/48?text=A'; }}
                      />
                      <div>
                        <h5 className="text-lg font-bold text-blue-600 dark:text-blue-400">{match.teamA.name}</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">11 Players</p>
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      {match.teamA.players.slice(0, 11).map((player, index) => (
                        <div key={player.id} className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-800/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-700/30 transition-colors duration-200 border border-blue-200 dark:border-blue-700/50">
                          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{player.name}</div>
                            <div className="text-xs text-gray-700 dark:text-gray-200">
                              {index === 0 ? 'Captain, Batsman' : 
                               index === 1 ? 'Wicket Keeper' :
                               index < 6 ? 'Batsman' :
                               index < 9 ? 'All Rounder' : 'Bowler'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Team B */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 mb-4">
                      <img 
                        src={match.teamB.logo || 'https://via.placeholder.com/48?text=B'}
                        alt={`${match.teamB.name} logo`} 
                        className="w-12 h-12 rounded-full object-cover ring-4 ring-green-100 dark:ring-green-900"
                        onError={e => { (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/48?text=B'; }}
                      />
                      <div>
                        <h5 className="text-lg font-bold text-green-600 dark:text-green-400">{match.teamB.name}</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">11 Players</p>
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      {match.teamB.players.slice(0, 11).map((player, index) => (
                        <div key={player.id} className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-800/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-700/30 transition-colors duration-200 border border-green-200 dark:border-green-700/50">
                          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{player.name}</div>
                            <div className="text-xs text-gray-700 dark:text-gray-200">
                              {index === 0 ? 'Captain, Batsman' : 
                               index === 1 ? 'Wicket Keeper' :
                               index < 6 ? 'Batsman' :
                               index < 9 ? 'All Rounder' : 'Bowler'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default FullScorecard;
