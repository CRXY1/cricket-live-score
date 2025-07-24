import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SimpleHome from './pages/SimpleHome';
import LiveScores from './pages/LiveScores';
import Series from './pages/Series';

const App: React.FC = () => {
  // Debug logging
  console.log('App component is rendering!');
  console.log('Current location:', window.location.href);
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="bg-red-600 text-white p-4 text-center font-bold">
          🚨 APP IS LOADING - CACHE BUSTER: {Date.now()} 🚨
        </div>
        <Routes>
          <Route path="/" element={<SimpleHome />} />
          <Route path="/live-scores" element={<LiveScores />} />
          <Route path="/series" element={<Series />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
