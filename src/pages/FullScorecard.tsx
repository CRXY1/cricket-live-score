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
            <div className="bg-gray-50 dark:bg-dark-750 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <img 
                  src={match.teamA.logo || 'https://via.placeholder.com/32?text=Team'}
                  alt={`${match.teamA.name} logo`} 
                  className="w-8 h-8 rounded-full object-cover"
                  onError={e => { (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/32?text=Team'; }}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{match.teamA.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">({match.teamA.overs} ov)</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {match.teamA.score}/{match.teamA.wickets}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">RR: {match.teamA.runRate.toFixed(2)}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-dark-750 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <img 
                  src={match.teamB.logo || 'https://via.placeholder.com/32?text=Team'}
                  alt={`${match.teamB.name} logo`} 
                  className="w-8 h-8 rounded-full object-cover"
                  onError={e => { (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/32?text=Team'; }}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{match.teamB.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">({match.teamB.overs} ov)</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {match.teamB.score}/{match.teamB.wickets}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">RR: {match.teamB.runRate.toFixed(2)}</p>
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
          <div className="flex space-x-0 overflow-x-auto">
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
                  <div key={index} className="text-center p-3 bg-gray-50 dark:bg-dark-750 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Over {index + 1}</p>
                    <p className="font-bold text-gray-900 dark:text-gray-100">{over}</p>
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

              <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Partnership Analysis</h3>
                <div className="space-y-3">
                  {[
                    { partnership: "1st Wicket", runs: 45, balls: 67, partners: "Player1 & Player2" },
                    { partnership: "2nd Wicket", runs: 78, balls: 89, partners: "Player2 & Player3" },
                    { partnership: "3rd Wicket", runs: 23, balls: 34, partners: "Player3 & Player4" },
                    { partnership: "Current", runs: 56, balls: 45, partners: "Player4 & Player5" }
                  ].map((p, index) => (
                    <div key={index} className="p-3 bg-gray-50 dark:bg-dark-750 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">{p.partnership}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">{p.partners}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900 dark:text-gray-100">{p.runs} runs</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">{p.balls} balls</div>
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
          <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Match Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Match Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Format:</span>
                      <span className="text-gray-900 dark:text-gray-100">{match.matchType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Venue:</span>
                      <span className="text-gray-900 dark:text-gray-100">{match.venue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Series:</span>
                      <span className="text-gray-900 dark:text-gray-100">{match.series || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Status:</span>
                      <span className="text-gray-900 dark:text-gray-100">{match.status}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Officials</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Umpire 1:</span>
                      <span className="text-gray-900 dark:text-gray-100">A. Smith</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Umpire 2:</span>
                      <span className="text-gray-900 dark:text-gray-100">B. Johnson</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Third Umpire:</span>
                      <span className="text-gray-900 dark:text-gray-100">C. Brown</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Match Referee:</span>
                      <span className="text-gray-900 dark:text-gray-100">D. Wilson</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Toss & Conditions</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Toss:</span>
                      <span className="text-gray-900 dark:text-gray-100">{match.toss || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Weather:</span>
                      <span className="text-gray-900 dark:text-gray-100">Sunny, 25°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Pitch:</span>
                      <span className="text-gray-900 dark:text-gray-100">Good for Batting</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Wind:</span>
                      <span className="text-gray-900 dark:text-gray-100">Light, NE 5 km/h</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Playing XIs</h4>
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-sm font-medium text-blue-600 dark:text-blue-400">{match.teamA.name}</h5>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {match.teamA.players.slice(0, 5).map(p => p.name).join(', ')}...
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-green-600 dark:text-green-400">{match.teamB.name}</h5>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {match.teamB.players.slice(0, 5).map(p => p.name).join(', ')}...
                      </div>
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
