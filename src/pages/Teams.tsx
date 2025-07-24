import React from 'react';

interface Team {
  id: string;
  name: string;
  shortName: string;
  flag: string;
  ranking: {
    test: number;
    odi: number;
    t20: number;
  };
  captain: string;
  recentForm: string;
  nextMatch: string;
  description: string;
}

const Teams: React.FC = () => {
  const teams: Team[] = [
    {
      id: '1',
      name: 'India',
      shortName: 'IND',
      flag: 'https://flagcdn.com/w80/in.png',
      ranking: { test: 1, odi: 1, t20: 2 },
      captain: 'Rohit Sharma',
      recentForm: 'WWLWW',
      nextMatch: 'vs AUS (Jan 15)',
      description: 'The current world champions and top-ranked team in Tests and ODIs.'
    },
    {
      id: '2',
      name: 'Australia',
      shortName: 'AUS',
      flag: 'https://flagcdn.com/w80/au.png',
      ranking: { test: 2, odi: 3, t20: 4 },
      captain: 'Pat Cummins',
      recentForm: 'WLWWL',
      nextMatch: 'vs IND (Jan 15)',
      description: 'Five-time World Cup winners with a rich cricket heritage.'
    },
    {
      id: '3',
      name: 'England',
      shortName: 'ENG',
      flag: 'https://flagcdn.com/w80/gb-eng.png',
      ranking: { test: 4, odi: 2, t20: 3 },
      captain: 'Jos Buttler',
      recentForm: 'LWWWL',
      nextMatch: 'vs SA (Jan 18)',
      description: 'The birthplace of cricket, known for their aggressive batting style.'
    },
    {
      id: '4',
      name: 'Pakistan',
      shortName: 'PAK',
      flag: 'https://flagcdn.com/w80/pk.png',
      ranking: { test: 5, odi: 4, t20: 1 },
      captain: 'Babar Azam',
      recentForm: 'WWWLW',
      nextMatch: 'vs NZ (Jan 20)',
      description: 'Current T20 World Cup holders with explosive batting lineup.'
    },
    {
      id: '5',
      name: 'South Africa',
      shortName: 'SA',
      flag: 'https://flagcdn.com/w80/za.png',
      ranking: { test: 3, odi: 5, t20: 5 },
      captain: 'Temba Bavuma',
      recentForm: 'WLWLW',
      nextMatch: 'vs ENG (Jan 18)',
      description: 'Known for their fast bowlers and competitive cricket.'
    },
    {
      id: '6',
      name: 'New Zealand',
      shortName: 'NZ',
      flag: 'https://flagcdn.com/w80/nz.png',
      ranking: { test: 6, odi: 6, t20: 6 },
      captain: 'Kane Williamson',
      recentForm: 'LWWWL',
      nextMatch: 'vs PAK (Jan 20)',
      description: 'World Test Championship winners known for their team spirit.'
    },
    {
      id: '7',
      name: 'Sri Lanka',
      shortName: 'SL',
      flag: 'https://flagcdn.com/w80/lk.png',
      ranking: { test: 7, odi: 8, t20: 7 },
      captain: 'Dasun Shanaka',
      recentForm: 'WLWLW',
      nextMatch: 'vs BAN (Jan 22)',
      description: '1996 World Cup winners with a history of spin bowling excellence.'
    },
    {
      id: '8',
      name: 'Bangladesh',
      shortName: 'BAN',
      flag: 'https://flagcdn.com/w80/bd.png',
      ranking: { test: 8, odi: 7, t20: 8 },
      captain: 'Shakib Al Hasan',
      recentForm: 'LWLWW',
      nextMatch: 'vs SL (Jan 22)',
      description: 'Rising cricket nation with passionate fans and improving performances.'
    },
    {
      id: '9',
      name: 'West Indies',
      shortName: 'WI',
      flag: 'https://flagcdn.com/w80/bb.png',
      ranking: { test: 9, odi: 9, t20: 9 },
      captain: 'Nicholas Pooran',
      recentForm: 'WLLWL',
      nextMatch: 'vs IRE (Jan 25)',
      description: 'Two-time T20 World Cup champions known for power hitting.'
    }
  ];

  const getRankingColor = (rank: number) => {
    if (rank <= 3) return 'text-green-600 bg-green-100';
    if (rank <= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getFormColor = (char: string) => {
    return char === 'W' ? 'bg-green-500' : 'bg-red-500';
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          International Cricket Teams
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the world's top cricket teams, their current rankings, recent form, 
          and upcoming fixtures in all formats of the game.
        </p>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teams.map((team) => (
          <div
            key={team.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
          >
            {/* Team Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-2">
                    <img 
                      src={team.flag} 
                      alt={`${team.name} logo`}
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        e.currentTarget.src = '/api/placeholder/32/32';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{team.name}</h3>
                    <p className="text-blue-100">{team.shortName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-200">Captain</p>
                  <p className="font-semibold">{team.captain}</p>
                </div>
              </div>
            </div>

            {/* Team Content */}
            <div className="p-6">
              {/* Rankings */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Current Rankings</h4>
                <div className="flex space-x-4">
                  <div className="text-center">
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${getRankingColor(team.ranking.test)}`}>
                      #{team.ranking.test}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">TEST</p>
                  </div>
                  <div className="text-center">
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${getRankingColor(team.ranking.odi)}`}>
                      #{team.ranking.odi}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">ODI</p>
                  </div>
                  <div className="text-center">
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${getRankingColor(team.ranking.t20)}`}>
                      #{team.ranking.t20}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">T20</p>
                  </div>
                </div>
              </div>

              {/* Recent Form */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Recent Form</h4>
                <div className="flex space-x-1">
                  {team.recentForm.split('').map((result, index) => (
                    <div
                      key={index}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${getFormColor(result)}`}
                    >
                      {result}
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4 leading-relaxed">
                {team.description}
              </p>

              {/* Next Match */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Next Match</p>
                    <p className="font-semibold text-gray-800">{team.nextMatch}</p>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-blue-100 mb-6">
            Follow live scores, match updates, and team news from around the cricket world.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-blue-200">Test Nations</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-2xl font-bold">104</p>
              <p className="text-sm text-blue-200">ODI Nations</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-2xl font-bold">108</p>
              <p className="text-sm text-blue-200">T20I Nations</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Teams;
