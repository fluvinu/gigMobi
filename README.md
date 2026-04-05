# gigMobi Mobile App (MVP)

This repository includes a working **Expo React Native** MVP for a gig marketplace app.

## Features in this MVP

- **Home tab:** Browse available gigs and accept open gigs.
- **Post Gig tab:** Create a new gig (title, description, budget, city, category).
- **Wallet tab:** View simple platform metrics (total gig value, estimated margin, status counts).

## Tech stack

- Expo + React Native
- TypeScript

## Run on Android (recommended flow)

### 1) Install requirements

- Node.js 20+
- Android Studio (with an emulator) **or** a physical Android phone
- Expo Go app on phone (from Play Store)

### 2) Install dependencies

```bash
npm install
```

### 3) Start on Android emulator/device

```bash
npm run android
```

If Metro cache issues happen, run:

```bash
npm run android:clear
```

## Run with Expo Go on physical Android

1. Start dev server:
   ```bash
   npm run start
   ```
2. Scan the QR code from Expo Go.
3. App opens directly on the phone.

## Build Android app package (EAS)

For shareable internal build:

```bash
npm run build:android:preview
```

For production build:

```bash
npm run build:android:production
```

> You need an Expo account (`npx eas login`) before cloud builds.

## Other platforms

```bash
npm run ios
npm run web
```

## Current project structure

- `App.tsx` - app shell, tabs, shared state
- `src/screens/HomeScreen.tsx` - gig list and accept action
- `src/screens/CreateGigScreen.tsx` - post-a-gig form
- `src/screens/WalletScreen.tsx` - margin and status summary
- `src/components/GigCard.tsx` - reusable gig card
- `src/data/mockGigs.ts` - seed gigs
- `src/types.ts` - shared types

## Next build steps

- Add authentication for customer and worker roles.
- Add backend API + database (gigs, users, assignments, payouts).
- Add payment/escrow flow.
- Add chat, ratings, and dispute handling.
