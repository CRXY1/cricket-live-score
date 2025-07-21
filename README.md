# CricXL

This project is a live scoring website for cricket matches. It provides real-time updates on scores, overs, and match details, allowing users to stay informed about ongoing games.

## Features

- Live score updates for ongoing cricket matches
- Display of team names, scores, and overs
- User-friendly interface built with React
- Fetches data from a cricket API

## Project Structure

```
cricket-live-score
├── src
│   ├── components
│   │   └── Scoreboard.tsx
│   ├── pages
│   │   └── Home.tsx
│   ├── services
│   │   └── api.ts
│   └── types
│       └── index.ts
├── public
│   └── index.html
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/cricket-live-score.git
   ```
2. Navigate to the project directory:
   ```
   cd cricket-live-score
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the development server, run:
```
npm start
```

Open your browser and go to `http://localhost:3000` to view the application.

## API Integration

The application fetches live scores and match details from a cricket API. Ensure you have the necessary API keys and endpoints configured in the `src/services/api.ts` file.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.