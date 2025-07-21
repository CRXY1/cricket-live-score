import React, { useState } from 'react';
import { MatchDetails } from '../types/cricket';

interface ScoreboardProps {
    match: MatchDetails;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ match }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            className={`bg-white rounded-lg shadow-md p-4 mb-2 w-full cursor-pointer transform transition-all duration-200 hover:scale-102 ${
                isExpanded ? 'shadow-lg' : ''
            }`}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                    <div className="flex items-center space-x-2">
                        <h2 className="text-base font-bold text-gray-800">{match.matchType}</h2>
                        <span className="text-xs text-gray-500 truncate">{match.venue}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        match.status === 'live' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                    }`}>
                        {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                    </span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                    {[match.teamA, match.teamB].map((team, idx) => (
                        <div key={idx} className="flex flex-col items-center w-5/12">
                            <div className="flex items-center space-x-2 mb-1">
                                <img 
                                    src={team.logo} 
                                    alt={`${team.name} flag`} 
                                    className="w-6 h-6 rounded-full object-cover"
                                />
                                <span className="text-sm font-bold text-gray-800">{team.name}</span>
                            </div>
                            <span className="text-xl font-extrabold text-blue-600">
                                {team.score}/{team.wickets}
                            </span>
                            <span className="text-xs text-gray-600">
                                ({team.overs}) RR: {team.runRate.toFixed(2)}
                            </span>
                        </div>
                    ))}
                    <div className="w-2/12 flex justify-center">
                        <span className="text-gray-400 text-sm font-medium">VS</span>
                    </div>
                </div>

                {isExpanded && (
                    <div className="border-t pt-4 transition-all duration-200 ease-in-out">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                {[match.teamA, match.teamB].map((team, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <h3 className="font-semibold text-gray-700">
                                            {team.name} Players
                                        </h3>
                                        {team.players.map(player => (
                                            <div key={player.id} className="bg-gray-50 p-2 rounded hover:bg-gray-100 transition-colors duration-200">
                                                <span className="font-medium">{player.name}</span>
                                                {player.runs !== undefined && (
                                                    <span className="text-sm text-gray-600 ml-2">
                                                        {player.runs}({player.balls})
                                                    </span>
                                                )}
                                                {player.wickets !== undefined && (
                                                    <span className="text-sm text-gray-600 ml-2">
                                                        {player.wickets}/{player.overs} overs
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-4">
                                <h3 className="font-semibold text-gray-700 mb-2">Last Few Overs</h3>
                                <div className="flex flex-wrap gap-2">
                                    {match.lastOvers.map((over, idx) => (
                                        <div key={idx} className="bg-gray-50 p-2 rounded text-sm hover:bg-gray-100 transition-colors duration-200">
                                            {over}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-center items-center pt-4 border-t">
                    <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-600">
                            Overs: <span className="text-gray-800 font-bold">{match.teamA.overs}</span>
                        </span>
                        <button
                            className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors duration-200"
                            onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                                setIsExpanded(!isExpanded);
                            }}
                        >
                            {isExpanded ? 'Show Less' : 'Show More'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Scoreboard;