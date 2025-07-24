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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
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
        {/* Show loading or fallback content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="bg-blue-500 text-white p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Loading Cricket Data...</h2>
              <p>Please wait while we fetch the latest scores and news.</p>
            </div>
          </div>
        ) : (
          <>
            {/* Show fallback if no data */}
            {scores.length === 0 && news.length === 0 && videos.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-green-500 text-white p-8 rounded-lg">
                  <h2 className="text-2xl font-bold mb-4">Welcome to CricXL!</h2>
                  <p>Your premier destination for live cricket scores and updates.</p>
                  <p className="mt-2">Data is being loaded from our servers...</p>
                </div>
              </div>
            ) : null}
          </>
        )}
        
        {/* Live Matches Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Live Matches</h2>
          
          {/* Desktop Slider */}
          <div className="hidden md:block relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out gap-4"
                style={{ transform: `translateX(-${currentSlide * 25}%)` }}
              >
                {scores.map((match, idx) => (
                  <div key={idx} className="w-1/4 flex-shrink-0">
                    <Scoreboard match={match} />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Desktop Navigation Arrows */}
            {scores.length > 4 && (
              <>
                <button
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  disabled={currentSlide >= Math.max(0, scores.length - 4)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <div key={idx} className="w-full flex-shrink-0 px-2">
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
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlideMobile}
                  disabled={currentSlide >= scores.length - 1}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      idx === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
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
    </>
  );
};

export default Home;