# News+ Mobile App

**React Native mobile application for News+**

A cross-platform mobile app built with Expo that delivers business and financial news with a seamless reading experience.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/)
- [Xcode](https://developer.apple.com/xcode/) (for iOS)
- [Android Studio](https://developer.android.com/studio) (for Android)

### Installation

1. **Install dependencies** (from monorepo root)

   ```bash
   pnpm install
   ```

2. **Set up environment variables**

   Create a `.env.local` file in this directory:

   ```bash
   EXPO_PUBLIC_BACKEND_URL=http://localhost:3000
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   ```

3. **Build shared packages**

   ```bash
   pnpm build
   ```

### Development

```bash
# Start Expo development server
pnpm start

# Run on iOS
pnpm ios

# Run on Android
pnpm android
```

## Scripts

| Script         | Description                   |
| -------------- | ----------------------------- |
| `pnpm start`   | Start Expo development server |
| `pnpm ios`     | Run on iOS simulator          |
| `pnpm android` | Run on Android emulator       |
| `pnpm lint`    | Run ESLint                    |
