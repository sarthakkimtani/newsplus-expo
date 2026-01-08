# News+

**Business & Financial News at Your Fingertips**

News+ is a modern mobile application designed to deliver business and financial news with powerful features like article saving, stock watchlists, and personalized content curation.

## Features

- 🌍 **Global News Coverage** — Dive into a vast collection of news articles from around the globe
- 📖 **Seamless Reading Experience** — Enjoy a clean and intuitive interface for distraction-free reading
- 💾 **Save for Later** — Save your favorite articles to read later
- 📈 **Stock Watchlist** — Stay ahead of the curve by creating your personalized stock watchlist
- 📚 **Personalized Library** — Create a curated collection of articles that matter to you
- 🔐 **Authentication** — Secure login and signup with Clerk authentication

## Project Structure

This is a monorepo powered by [Turborepo](https://turborepo.com/) and [pnpm](https://pnpm.io/).

```
newsplus/
├── apps/
│   ├── mobile/          # React Native (Expo) mobile app
│   └── server/          # Express.js backend API
├── packages/
│   └── schemas/         # Shared Zod schemas for type-safe APIs
├── turbo.json           # Turborepo configuration
└── package.json         # Root package configuration
```

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) 9.0.0 or later
- [Xcode](https://developer.apple.com/xcode/) (for iOS development)
- [Android Studio](https://developer.android.com/studio) (for Android development)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/sarthakkimtani/newsplus-expo.git
   cd newsplus
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create `.env` files in the respective app directories:

   ```bash
   # apps/server/.env
   PORT=3000
   NEWS_API_KEY=your_news_api_key
   STOCKS_API_KEY=your_stocks_api_key

   # apps/mobile/.env.local
   EXPO_PUBLIC_BACKEND_URL=http://localhost:3000
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   ```

4. **Build shared packages**

   ```bash
   pnpm build
   ```

### Development

Run all apps and packages in development mode:

```bash
pnpm dev
```

Or run specific apps:

```bash
# Run only the mobile app
pnpm dev --filter=mobile

# Run only the server
pnpm dev --filter=server
```

### Building

Build all apps and packages:

```bash
pnpm build
```

## License

MIT
