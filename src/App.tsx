import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { FollowedTeamsProvider } from './contexts/FollowedTeamsContext';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import LiveScores from './pages/LiveScores';
import Series from './pages/Series';
import Teams from './pages/Teams';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import FullScorecard from './pages/FullScorecard';

const App: React.FC = () => {
  // Force empty basename for development, use /cricket-live-score for production
  const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
  const basename = isDevelopment ? '' : '/cricket-live-score';
  
  return (
    <ThemeProvider>
      <FollowedTeamsProvider>
        <Router basename={basename}>
          <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-300">
            <ScrollToTop />
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/live-scores" element={<LiveScores />} />
              <Route path="/series" element={<Series />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/scorecard/:id" element={<FullScorecard />} />
            </Routes>
          </div>
        </Router>
      </FollowedTeamsProvider>
    </ThemeProvider>
  );
};

export default App;
