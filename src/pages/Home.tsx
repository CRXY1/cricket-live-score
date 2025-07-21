import React, { useEffect, useState } from "react";
import Scoreboard from "../components/Scoreboard";
import NewsCard from "../components/NewsCard";
import VideoCard from "../components/VideoCard";
import { fetchLiveScores, fetchLatestNews, fetchFeaturedVideos } from "../services/api";
import { MatchDetails, NewsArticle, FeaturedVideo } from "../types/cricket";

const Home: React.FC = () => {
  const [scores, setScores] = useState<MatchDetails[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [videos, setVideos] = useState<FeaturedVideo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [liveScores, latestNews, featuredVideos] = await Promise.all([
          fetchLiveScores(),
          fetchLatestNews(),
          fetchFeaturedVideos()
        ]);
        
        setScores(liveScores);
        setNews(latestNews);
        setVideos(featuredVideos);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="relative bg-gradient-to-r from-blue-600 via-blue-800 to-purple-900 text-white backdrop-blur-lg shadow-lg">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 py-6 relative">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                CricXL
              </h1>
              <div className="hidden sm:block px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 border border-blue-400/20 text-blue-100">
                LIVE
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="nav-link group">
                <span className="relative">
                  Live Scores
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                </span>
              </a>
              <a href="#" className="nav-link group">
                <span className="relative">
                  Series
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                </span>
              </a>
              <a href="#" className="nav-link group">
                <span className="relative">
                  Teams
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                </span>
              </a>
              <a href="#" className="nav-link group">
                <span className="relative">
                  News
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                </span>
              </a>
              <a href="#" className="nav-link group">
                <span className="relative">
                  Videos
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                </span>
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Live Matches Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Live Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {scores.map((match, idx) => (
              <Scoreboard key={idx} match={match} />
            ))}
          </div>
        </section>

        {/* Featured News and Videos Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Featured News - Takes up 3 columns */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Latest News</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {news.map((article, idx) => (
                <NewsCard 
                  key={article.id} 
                  article={article} 
                  featured={idx === 0} 
                />
              ))}
            </div>
          </div>

          {/* Featured Videos - Takes up 1 column */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Featured Videos</h2>
            <div className="space-y-4">
              {videos.map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </div>

        {/* Series and Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Current Series</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="font-semibold">India vs Australia</div>
                <div className="text-sm text-gray-600">ODI Series</div>
              </div>
              <div className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="font-semibold">England vs South Africa</div>
                <div className="text-sm text-gray-600">T20I Series</div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Matches</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="font-semibold">Pakistan vs New Zealand</div>
                <div className="text-sm text-gray-600">Tomorrow, 7:00 PM</div>
              </div>
              <div className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="font-semibold">Sri Lanka vs Bangladesh</div>
                <div className="text-sm text-gray-600">Tomorrow, 3:00 PM</div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Results</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="font-semibold">India vs England</div>
                <div className="text-sm text-green-600">India won by 5 wickets</div>
              </div>
              <div className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="font-semibold">Australia vs South Africa</div>
                <div className="text-sm text-green-600">Australia won by 3 wickets</div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Key Series</h3>
              <ul className="space-y-2 text-gray-300">
                <li>IPL 2025</li>
                <li>World Cup 2025</li>
                <li>Ashes 2025</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li>T20 Time Table</li>
                <li>ICC Rankings</li>
                <li>Teams</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">CricXL Apps</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Android App</li>
                <li>iOS App</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Follow Us</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Instagram</li>
                <li>Twitter</li>
                <li>Facebook</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            &copy; 2025 CricXL. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;