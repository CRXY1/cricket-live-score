import React, { useEffect, useState } from "react";
import Scoreboard from "../components/Scoreboard";
import { fetchLiveScores } from "../services/api";
import { MatchDetails } from "../types/cricket";

const LiveScores: React.FC = () => {
  const [scores, setScores] = useState<MatchDetails[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const liveScores = await fetchLiveScores();
        setScores(liveScores);
      } catch (error) {
        console.error('Error fetching live scores:', error);
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
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-6">
        {/* Live Matches Section */}
        <section className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Live Cricket Scores</h1>
            <p className="text-gray-600">Real-time updates from ongoing matches around the world</p>
          </div>
          
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

          {/* All Matches Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {scores.map((match, idx) => (
              <Scoreboard key={idx} match={match} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LiveScores;
