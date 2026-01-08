# News+ Server

**Backend API for News+**

Express.js REST API that serves news articles and stock market data to the News+ mobile application.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/)

### Installation

1. **Install dependencies** (from monorepo root)

   ```bash
   pnpm install
   ```

2. **Set up environment variables**

   Create a `.env` file in this directory:

   ```bash
   PORT=3000
   NEWS_API_KEY=your_news_api_key
   STOCKS_API_KEY=your_stocks_api_key
   ```

3. **Build shared packages**

   ```bash
   pnpm build
   ```

### Development

```bash
# Start development server with hot reload
pnpm dev
```

The server will start at `http://localhost:3000`.

### Production

```bash
# Build the project
pnpm build

# Start production server
pnpm start
```

## Project Structure

```
server/
├── src/
│   ├── index.ts           # Application entry point
│   ├── config/            # Environment configuration
│   ├── controllers/       # Route controllers
│   └── routes/            # API route definitions
│       ├── index.ts
│       ├── news.ts        # News endpoints
│       └── stocks.ts      # Stock endpoints
├── package.json
└── tsconfig.json
```
