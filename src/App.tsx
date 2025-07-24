import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SimpleHome from './pages/SimpleHome';
import LiveScores from './pages/LiveScores';
import Series from './pages/Series';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-red-500">
      <div className="text-white text-center p-8">
        <h1 className="text-6xl font-bold">🚨 EMERGENCY TEST 🚨</h1>
        <p className="text-2xl mt-4">If you can see this, the deployment is working!</p>
        <p className="text-xl mt-2">Time: {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
};

export default App;
