import React, { useEffect, useState } from "react";
import Scoreboard from "../components/Scoreboard";
import NewsCard from "../components/NewsCard";
import VideoCard from "../components/VideoCard";
import FavouriteTeams from "../components/FavouriteTeams";
import Footer from "../components/Footer";
import { fetchLiveScores, fetchLatestNews, fetchFeaturedVideos } from "../services/api";
import { MatchDetails, NewsArticle, FeaturedVideo } from "../types/cricket";
import { useFollowedTeams } from "../contexts/FollowedTeamsContext";

const Home: React.FC = () => {
  const { followedTeams } = useFollowedTeams();
  const [scores, setScores] = useState<MatchDetails[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [videos, setVideos] = useState<FeaturedVideo[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  // Slider navigation functions
  const nextSlide = () => {
    const maxSlide = Math.max(0, scores.length - 4); // Show 4 on desktop
    setCurrentSlide(prev => Math.min(prev + 1, maxSlide));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  const nextSlideMobile = () => {
    setCurrentSlide(prev => Math.min(prev + 1, scores.length - 1));
  };

  const prevSlideMobile = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  return (
    <>
      <main className="container mx-auto px-4 py-6">
        {/* Trending News Ticker */}
        <section className="mb-6">
          <div className="bg-red-600 dark:bg-red-700 text-white py-2 px-4 rounded-lg shadow-lg dark:shadow-xl overflow-hidden">
            <div className="flex items-center">
              {/* Mobile Icon Version */}
              <div className="bg-red-900 dark:bg-red-800 px-2 py-1 rounded text-sm font-bold mr-3 flex-shrink-0 block sm:hidden flex items-center justify-center">
                <svg className="w-4 h-4 text-yellow-300 dark:text-yellow-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              {/* Desktop Text Version */}
              <div className="bg-red-900 dark:bg-red-800 px-3 py-1 rounded text-sm font-bold mr-4 flex-shrink-0 z-10 hidden sm:block">
                TRENDING
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex animate-scroll whitespace-nowrap">
                  <span className="mr-8">🏏 Rohit Sharma's masterclass leads India to 7-wicket victory over England at Lord's</span>
                  <span className="mr-8">⚡ Babar Azam becomes fastest to 5000 ODI runs, breaks Kohli's record</span>
                  <span className="mr-8">🎯 Australia announces 15-member squad for upcoming Ashes series</span>
                  <span className="mr-8">🔥 Jasprit Bumrah returns to Test cricket after 8-month injury layoff</span>
                  <span className="mr-8">📈 IPL 2025: Mumbai Indians retain Bumrah for ₹18 crore in mega auction</span>
                  <span className="mr-8">🏆 New Zealand completes historic 3-0 whitewash against South Africa</span>
                  <span className="mr-8">⭐ Ben Stokes announces retirement from ODI cricket to focus on Tests</span>
                  <span className="mr-8">🌟 Shubman Gill named as India's vice-captain for T20I series</span>
                  <span className="mr-8">🏟️ Eden Gardens to host pink-ball Test between India and Bangladesh</span>
                  <span className="mr-8">💥 Jos Buttler's explosive 150* powers England to victory in 2nd ODI</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Matches Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Live Matches</h2>
          
          {/* Desktop Slider */}
          <div className="hidden md:block relative">
            <div className={`overflow-hidden ${scores.length > 4 ? 'ml-6 mr-8' : ''}`}>
              <div 
                className="flex transition-transform duration-300 ease-in-out gap-3"
                style={{ transform: `translateX(-${currentSlide * 24.25}%)` }}
              >
                {scores.map((match, idx) => (
                  <div key={match.id} className="w-[24.25%] flex-shrink-0 min-w-0">
                    <Scoreboard match={match} />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Desktop Navigation Arrows - Made smaller */}
            {scores.length > 4 && (
              <>
                <button
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white dark:bg-dark-700 shadow-md dark:shadow-lg rounded-full p-1.5 hover:bg-gray-50 dark:hover:bg-dark-600 disabled:opacity-50 disabled:cursor-not-allowed z-10 border dark:border-dark-600"
                >
                  <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  disabled={currentSlide >= Math.max(0, scores.length - 4)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-dark-700 shadow-md dark:shadow-lg rounded-full p-1.5 hover:bg-gray-50 dark:hover:bg-dark-600 disabled:opacity-50 disabled:cursor-not-allowed z-10 border dark:border-dark-600"
                >
                  <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Mobile Slider */}
          <div className="md:hidden relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {scores.map((match, idx) => (
                  <div key={match.id} className="w-full flex-shrink-0 px-2">
                    <Scoreboard match={match} />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Mobile Navigation Arrows */}
            {scores.length > 1 && (
              <>
                <button
                  onClick={prevSlideMobile}
                  disabled={currentSlide === 0}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white dark:bg-dark-700 shadow-lg dark:shadow-xl rounded-full p-2 hover:bg-gray-50 dark:hover:bg-dark-600 disabled:opacity-50 disabled:cursor-not-allowed z-10 border dark:border-dark-600"
                >
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlideMobile}
                  disabled={currentSlide >= scores.length - 1}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white dark:bg-dark-700 shadow-lg dark:shadow-xl rounded-full p-2 hover:bg-gray-50 dark:hover:bg-dark-600 disabled:opacity-50 disabled:cursor-not-allowed z-10 border dark:border-dark-600"
                >
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Mobile Dots Indicator */}
            {scores.length > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                {scores.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === currentSlide ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Favourite Teams Section - Only show if user is following teams */}
        {followedTeams.length > 0 && <FavouriteTeams />}

        {/* Featured News and Videos Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Featured News - Takes up 3 columns */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Latest News</h2>
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
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Featured Videos</h2>
            <div className="space-y-4">
              {videos.map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </div>

        {/* Series and Results Grid - TEMPORARILY HIDDEN */}
        {/* 
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="bg-white dark:bg-dark-800 border dark:border-dark-700 rounded-lg shadow-md dark:shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Current Series</h2>
            <div className="space-y-4">
              <div className="p-4 border dark:border-dark-600 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
                <div className="font-semibold text-gray-800 dark:text-gray-100">India vs Australia</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">ODI Series</div>
              </div>
              <div className="p-4 border dark:border-dark-600 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
                <div className="font-semibold text-gray-800 dark:text-gray-100">England vs South Africa</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">T20I Series</div>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-dark-800 border dark:border-dark-700 rounded-lg shadow-md dark:shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Upcoming Matches</h2>
            <div className="space-y-4">
              <div className="p-4 border dark:border-dark-600 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
                <div className="font-semibold text-gray-800 dark:text-gray-100">Pakistan vs New Zealand</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Tomorrow, 7:00 PM</div>
              </div>
              <div className="p-4 border dark:border-dark-600 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
                <div className="font-semibold text-gray-800 dark:text-gray-100">Sri Lanka vs Bangladesh</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Tomorrow, 3:00 PM</div>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-dark-800 border dark:border-dark-700 rounded-lg shadow-md dark:shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Recent Results</h2>
            <div className="space-y-4">
              <div className="p-4 border dark:border-dark-600 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
                <div className="font-semibold text-gray-800 dark:text-gray-100">India vs England</div>
                <div className="text-sm text-green-600 dark:text-green-400">India won by 5 wickets</div>
              </div>
              <div className="p-4 border dark:border-dark-600 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
                <div className="font-semibold text-gray-800 dark:text-gray-100">Australia vs South Africa</div>
                <div className="text-sm text-green-600 dark:text-green-400">Australia won by 3 wickets</div>
              </div>
            </div>
          </section>
        </div>
        */}
      </main>

      <Footer />
    </>
  );
};

export default Home;