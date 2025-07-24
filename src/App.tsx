import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import LiveScores from './pages/LiveScores';
import Series from './pages/Series';
import Teams from './pages/Teams';
import News from './pages/News';

const App: React.FC = () => {
  return (
    <Router basename="/cricket-live-score">
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/live-scores" element={<LiveScores />} />
          <Route path="/series" element={<Series />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
