import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FollowedTeamsContextType {
  followedTeams: string[];
  isFollowing: (teamId: string) => boolean;
  toggleFollow: (teamId: string) => void;
}

const FollowedTeamsContext = createContext<FollowedTeamsContextType | undefined>(undefined);

export const useFollowedTeams = () => {
  const context = useContext(FollowedTeamsContext);
  if (!context) {
    throw new Error('useFollowedTeams must be used within a FollowedTeamsProvider');
  }
  return context;
};

interface FollowedTeamsProviderProps {
  children: ReactNode;
}

export const FollowedTeamsProvider: React.FC<FollowedTeamsProviderProps> = ({ children }) => {
  const [followedTeams, setFollowedTeams] = useState<string[]>([]);

  // Load followed teams from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('followedTeams');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFollowedTeams(parsed);
        }
      } catch (error) {
        console.error('Error parsing followed teams from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage whenever followedTeams changes
  useEffect(() => {
    localStorage.setItem('followedTeams', JSON.stringify(followedTeams));
  }, [followedTeams]);

  const isFollowing = (teamId: string): boolean => {
    return followedTeams.includes(teamId);
  };

  const toggleFollow = (teamId: string): void => {
    setFollowedTeams(prev => {
      if (prev.includes(teamId)) {
        // Remove team
        return prev.filter(id => id !== teamId);
      } else {
        // Add team
        return [...prev, teamId];
      }
    });
  };

  const value: FollowedTeamsContextType = {
    followedTeams,
    isFollowing,
    toggleFollow
  };

  return (
    <FollowedTeamsContext.Provider value={value}>
      {children}
    </FollowedTeamsContext.Provider>
  );
};
