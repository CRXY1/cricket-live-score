import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MatchDetails } from '../types/cricket';

interface ScoreboardProps {
    match: MatchDetails;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ match }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();

    const handleFullScorecard = () => {
        // Navigate to full scorecard page and pass match data
        navigate(`/scorecard/${match.id}`, { state: { match } });
    };

    return (
        <div
            className={`bg-white dark:bg-dark-800 rounded-lg shadow-md dark:shadow-xl border dark:border-dark-700 p-4 mb-2 w-full h-55 transform transition-all duration-200 hover:scale-102 ${
                isExpanded ? 'shadow-lg dark:shadow-2xl h-auto' : ''
            } flex flex-col`}
        >
            <div className="flex flex-col space-y-3 flex-1">
                <div className="flex justify-between items-center border-b dark:border-dark-600 pb-2 min-h-[2.5rem]">
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-100 whitespace-nowrap">{match.matchType}</h2>
                        <span className="text-xs text-gray-500 dark:text-gray-400 truncate flex-1">{match.venue}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
                        match.status === 'live' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}>
                        {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                    </span>
                </div>
                
                <div className="flex items-center justify-between py-2 flex-1">
                    <div className="flex flex-col items-center w-5/12">
                        <div className="flex items-center space-x-2 mb-1 min-h-[1.5rem]">
                            <img 
                                src={match.teamA.logo || 'https://via.placeholder.com/40?text=Team'}
                                alt={`${match.teamA.name} flag`} 
                                className="w-5 h-5 rounded-full object-cover flex-shrink-0"
                                onError={e => { (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/40?text=Team'; }}
                            />
                            <span className="text-sm font-bold text-gray-800 dark:text-gray-100 truncate">{match.teamA.name}</span>
                        </div>
                        <span className="text-lg font-extrabold text-blue-600 dark:text-blue-400 leading-tight">
                            {match.teamA.score}/{match.teamA.wickets}
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-400 text-center leading-tight">
                            ({match.teamA.overs}) RR: {match.teamA.runRate.toFixed(2)}
                        </span>
                    </div>
                    <div className="flex flex-col items-center w-2/12">
                        <span className="text-gray-400 dark:text-gray-500 text-sm font-bold">VS</span>
                    </div>
                    <div className="flex flex-col items-center w-5/12">
                        <div className="flex items-center space-x-2 mb-1 min-h-[1.5rem]">
                            <img 
                                src={match.teamB.logo || 'https://via.placeholder.com/40?text=Team'}
                                alt={`${match.teamB.name} flag`} 
                                className="w-5 h-5 rounded-full object-cover flex-shrink-0"
                                onError={e => { (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/40?text=Team'; }}
                            />
                            <span className="text-sm font-bold text-gray-800 dark:text-gray-100 truncate">{match.teamB.name}</span>
                        </div>
                        <span className="text-lg font-extrabold text-blue-600 dark:text-blue-400 leading-tight">
                            {match.teamB.score}/{match.teamB.wickets}
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-400 text-center leading-tight">
                            ({match.teamB.overs}) RR: {match.teamB.runRate.toFixed(2)}
                        </span>
                    </div>
                </div>

                <div className="flex justify-center items-center pt-2 border-t dark:border-dark-600 mt-auto">
                    <div className="flex items-center space-x-4">
                        <button
                            className="text-blue-600 dark:text-blue-400 text-xs font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 flex items-center space-x-1"
                            onClick={() => setIsExpanded(!isExpanded)}
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
                            onClick={handleFullScorecard}
                            className="text-blue-600 dark:text-blue-400 text-xs font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 flex items-center space-x-1 cursor-pointer"
                        >
                            <span>Full scorecard</span>
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

                {isExpanded && (
                    <div className="border-t dark:border-dark-600 pt-4 transition-all duration-200 ease-in-out">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                {[match.teamA, match.teamB].map((team, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm truncate">
                                            {team.name} Players
                                        </h3>
                                        {team.players.map(player => (
                                            <div key={player.id} className="bg-gray-50 dark:bg-dark-700 p-2 rounded hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors duration-200">
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
                                        <div key={idx} className="bg-gray-50 dark:bg-dark-700 p-2 rounded text-xs hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors duration-200 text-gray-800 dark:text-gray-200">
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

export default Scoreboard;