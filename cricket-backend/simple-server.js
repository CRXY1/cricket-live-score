const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Cricket Backend Server is running!',
    timestamp: new Date().toISOString()
  });
});

// Mock data routes
app.get('/api/matches', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        _id: '1',
        title: 'India vs Australia - 1st Test',
        team1: { name: 'India', shortName: 'IND', logo: '' },
        team2: { name: 'Australia', shortName: 'AUS', logo: '' },
        status: 'live',
        venue: 'Melbourne Cricket Ground',
        startTime: new Date(),
        format: 'Test'
      },
      {
        _id: '2',
        title: 'England vs New Zealand - T20',
        team1: { name: 'England', shortName: 'ENG', logo: '' },
        team2: { name: 'New Zealand', shortName: 'NZ', logo: '' },
        status: 'upcoming',
        venue: 'Lords',
        startTime: new Date(Date.now() + 86400000), // tomorrow
        format: 'T20'
      }
    ]
  });
});

app.get('/api/dashboard/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      totalMatches: 25,
      liveMatches: 3,
      totalTeams: 12,
      totalUsers: 150
    }
  });
});

// Mock auth route
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Simple demo login
  if (email === 'admin@cricxl.com' && password === 'admin123') {
    res.json({
      success: true,
      data: {
        token: 'demo-jwt-token-12345',
        user: {
          _id: '1',
          email: 'admin@cricxl.com',
          username: 'admin',
          role: 'admin',
          firstName: 'Admin',
          lastName: 'User'
        }
      },
      message: 'Login successful'
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials. Try admin@cricxl.com / admin123'
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Cricket Backend Server running on port ${PORT}`);
  console.log(`📊 API Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🏏 Demo Login: admin@cricxl.com / admin123`);
});
