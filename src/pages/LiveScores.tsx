import React, { useEffect, useState } from "react";
import Scoreboard from "../components/Scoreboard";
import Footer from "../components/Footer";
import { fetchLiveScores } from "../services/api";
import { MatchDetails } from "../types/cricket";

const LiveScores: React.FC = () => {
  const [scores, setScores] = useState<MatchDetails[]>([]);

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-300">
      <main className="container mx-auto px-4 py-6">
        {/* Live Matches Section */}
        <section className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">Live Cricket Scores</h1>
            <p className="text-gray-600 dark:text-gray-300">Real-time updates from ongoing matches around the world</p>
          </div>
          
          {/* All Matches Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {scores.map((match, idx) => (
              <Scoreboard key={idx} match={match} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LiveScores;
