import React from 'react';

const SimpleHome: React.FC = () => {
  console.log('SimpleHome component is rendering!');
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-yellow-500 text-black p-4 rounded text-center mb-4 font-bold">
        🔥 SIMPLE HOME IS RENDERING - TIME: {new Date().toLocaleTimeString()} 🔥
      </div>
      
      <div className="bg-blue-600 text-white p-8 rounded-lg text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">🏏 Welcome to CricXL!</h1>
        <p className="text-xl">Your premier destination for live cricket scores and updates</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">🔴 Live Matches</h2>
          <p className="text-gray-600">Stay updated with live cricket scores from around the world</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">📰 Latest News</h2>
          <p className="text-gray-600">Get the latest cricket news and updates</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">🎥 Videos</h2>
          <p className="text-gray-600">Watch highlights and match videos</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">🏆 Series</h2>
          <p className="text-gray-600">Follow ongoing cricket series and tournaments</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">⚡ Quick Stats</h2>
          <p className="text-gray-600">Player statistics and team rankings</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">📱 Mobile Ready</h2>
          <p className="text-gray-600">Access CricXL on any device, anywhere</p>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">🚀 Website is Working!</h2>
          <p className="text-lg">The routing and rendering system is now functional.</p>
          <p className="mt-2">Navigation and all pages should work correctly.</p>
        </div>
      </div>
    </div>
  );
};

export default SimpleHome;
