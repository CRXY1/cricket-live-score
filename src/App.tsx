import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import LiveScores from './pages/LiveScores';
import Series from './pages/Series';

const App: React.FC = () => {
  return (
    <Router basename="/cricket-live-score">
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/live-scores" element={<LiveScores />} />
          <Route path="/series" element={<Series />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
