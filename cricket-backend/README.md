# 🏏 CricXL Backend & Admin Dashboard

A comprehensive cricket live score management system with a powerful backend API and modern admin dashboard.

## 🚀 Project Overview

This project consists of two main parts:
1. **Backend API** - Node.js/Express/TypeScript REST API with Socket.IO for real-time updates
2. **Admin Dashboard** - React/TypeScript admin interface with Material-UI and Tailwind CSS

## 📁 Project Structure

```
cricket-backend/
├── src/                          # Backend source code
│   ├── config/                   # Database and app configuration
│   ├── controllers/              # Route controllers
│   ├── middleware/               # Authentication, error handling
│   ├── models/                   # Mongoose models
│   ├── routes/                   # API routes
│   ├── services/                 # Business logic, Socket.IO
│   ├── types/                    # TypeScript interfaces
│   └── server.ts                 # Main server file
├── admin-dashboard/              # React Admin Dashboard
│   ├── public/                   # Static files
│   └── src/                      # Dashboard source code
│       ├── components/           # React components
│       ├── pages/                # Page components
│       ├── store/                # Redux store and slices
│       └── App.tsx               # Main App component
├── uploads/                      # File uploads directory
├── package.json                  # Backend dependencies
└── README.md                     # This file
```

## 🛠 Technology Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Real-time**: Socket.IO
- **Authentication**: JWT
- **File Upload**: Multer
- **Documentation**: Swagger/OpenAPI
- **Security**: Helmet, CORS, Rate Limiting
- **Caching**: Redis (optional)

### Admin Dashboard
- **Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit
- **UI Library**: Material-UI (MUI)
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Animations**: Framer Motion
- **Charts**: Chart.js with react-chartjs-2

## 📊 Features

### Backend Features
- **Authentication & Authorization**: Role-based access control (Admin, Editor, Viewer)
- **Live Match Management**: Real-time score updates, ball-by-ball commentary
- **News Management**: CRUD operations for cricket news articles
- **Team & Player Management**: Comprehensive player and team profiles
- **Series Management**: Tournament and series organization
- **File Upload**: Image and video handling with optimization
- **Real-time Updates**: Socket.IO for live score broadcasting
- **API Documentation**: Auto-generated Swagger docs
- **Data Validation**: Joi/Express-validator integration
- **Error Handling**: Centralized error management
- **Logging**: Morgan for HTTP request logging
- **Security**: Helmet, CORS, rate limiting protection

### Admin Dashboard Features
- **Modern UI/UX**: Glassmorphism design with smooth animations
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Live Match Control**: Real-time match score management
- **Content Management**: Rich text editor for news articles
- **Media Library**: Drag-and-drop file uploads with preview
- **User Management**: Admin user CRUD operations
- **Analytics Dashboard**: Charts and statistics
- **Dark/Light Theme**: Theme switching capability
- **Command Palette**: Keyboard shortcuts (Cmd/Ctrl + K)
- **Real-time Notifications**: Toast notifications for all actions

## 🎨 Design Features

### Modern UI Elements
- **Glassmorphism Cards**: Translucent elements with backdrop blur
- **Gradient Backgrounds**: Cricket-themed color schemes
- **Micro-animations**: Smooth transitions and hover effects
- **Interactive Components**: Hover states and focus indicators
- **Typography**: Professional font hierarchy with Inter & Poppins

### Admin Dashboard Layout
```
┌─────────────────────────────────────────────────────────┐
│                     Header Bar                          │
├─────────────┬───────────────────────────────────────────┤
│             │                                           │
│   Sidebar   │           Main Content Area              │
│             │                                           │
│ - Dashboard │  - Live match controls                   │
│ - Live      │  - Content management forms              │
│ - Matches   │  - Data tables with sorting/filtering    │
│ - News      │  - Charts and analytics                  │
│ - Teams     │  - Settings panels                       │
│ - Series    │                                          │
│ - Users     │                                          │
│ - Settings  │                                          │
│             │                                          │
└─────────────┴──────────────────────────────────────────┘
```

## ⚡ Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB
- npm or yarn

### Backend Setup
1. **Navigate to backend directory**
   ```bash
   cd cricket-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

### Admin Dashboard Setup
1. **Install dashboard dependencies**
   ```bash
   npm run setup:admin
   ```

2. **Start both backend and dashboard**
   ```bash
   npm run dev
   ```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration  
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/change-password` - Change password

### Matches
- `GET /api/matches` - Get all matches (with pagination)
- `GET /api/matches/live` - Get live matches
- `GET /api/matches/:id` - Get match by ID
- `POST /api/matches` - Create new match (Admin/Editor)
- `PUT /api/matches/:id` - Update match (Admin/Editor)

### News
- `GET /api/news` - Get all news articles
- `GET /api/news/:id` - Get news article by ID
- `POST /api/news` - Create news article (Admin/Editor)
- `PUT /api/news/:id` - Update news article (Admin/Editor)
- `DELETE /api/news/:id` - Delete news article (Admin)

### Teams & Players
- `GET /api/teams` - Get all teams
- `GET /api/teams/:id` - Get team by ID
- `GET /api/players` - Get all players
- `GET /api/players/:id` - Get player by ID

### Series
- `GET /api/series` - Get all series
- `POST /api/series` - Create new series (Admin/Editor)

### File Upload
- `POST /api/upload/image` - Upload image files
- `POST /api/upload/video` - Upload video files

## 🔌 Socket.IO Events

### Match Events
- `match:scoreUpdate` - Live score updates
- `match:wicket` - Wicket notifications
- `match:boundary` - Boundary alerts
- `match:over` - Over completion
- `match:statusChange` - Match status changes

### Commentary
- `commentary:update` - Live commentary updates

### Admin Events
- `admin:userOnline` - Admin user online status
- `admin:notification` - System notifications

## 🎯 Admin Dashboard Menu Structure

1. **📊 Dashboard**
   - Overview analytics
   - Quick statistics
   - Recent activity

2. **🏏 Live Matches**
   - Real-time score control
   - Ball-by-ball updates
   - Match status management

3. **📝 Content Management**
   - News Articles
   - Match Reports
   - Photo Gallery
   - Video Highlights

4. **⚙️ Match Management**
   - Create New Match
   - Schedule Matches
   - Team Lineups
   - Match Settings

5. **👥 Teams & Players**
   - Team Profiles
   - Player Database
   - Statistics Management

6. **🏆 Series & Tournaments**
   - Create Series
   - Points Tables
   - Tournament Brackets

7. **📱 App Settings**
   - Theme Configuration
   - Notification Settings
   - API Configuration

8. **👤 User Management**
   - Admin Users
   - Permissions
   - Activity Logs

## 🚀 Deployment

### Environment Variables
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cricxl
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379
```

### Build Commands
```bash
# Build backend
npm run build:server

# Build admin dashboard  
npm run build:admin

# Build both
npm run build

# Start production server
npm start
```

## 🔐 Security Features

- **JWT Authentication** with role-based authorization
- **Rate Limiting** to prevent API abuse
- **CORS Protection** with configurable origins
- **Input Validation** with Joi schemas
- **Helmet.js** for security headers
- **Password Hashing** with bcryptjs
- **File Upload Security** with type validation

## 📈 Performance Optimizations

- **Database Indexing** for faster queries
- **Response Compression** with gzip
- **Static File Serving** with Express
- **Connection Pooling** with Mongoose
- **Lazy Loading** in React components
- **Code Splitting** with React Router
- **Image Optimization** with Sharp

## 🧪 API Testing

API documentation is available at: `http://localhost:5000/api-docs`

Health check endpoint: `http://localhost:5000/health`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Cricket API** for match data
- **Material-UI** for React components
- **Tailwind CSS** for utility-first styling
- **MongoDB** for flexible data storage

## 🐛 Support

For support and questions:
- Create an issue on GitHub
- Email: support@cricxl.com

---

**CricXL Backend & Admin Dashboard** - Your complete cricket management solution! 🏆
