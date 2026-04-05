# gigMobi Flutter App (MVP)

This project is now a **Flutter** mobile app MVP for a gig marketplace.

## What is implemented

- **Home tab:** list gigs and take open gigs.
- **Post Gig tab:** create a new gig with validation.
- **Wallet tab:** view total value, estimated 15% margin, and status counters.

The app uses local in-memory data and is ready to extend with backend APIs.

## Prerequisites

- Flutter SDK 3.22+
- Android Studio (for Android emulator) or a physical Android phone
- (Optional) Xcode for iOS builds

## Run on Android

1. Install dependencies:
   ```bash
   flutter pub get
   ```
2. Start app on connected Android device/emulator:
   ```bash
   flutter run
   ```

To explicitly run on Android (if multiple devices exist):

```bash
flutter devices
flutter run -d <android_device_id>
```

## Project files

- `lib/main.dart` - complete MVP app (tabs, screens, gig model/state)
- `pubspec.yaml` - Flutter dependencies
- `analysis_options.yaml` - lint rules

## Next steps

- Split `main.dart` into feature folders (`models`, `screens`, `widgets`, `services`)
- Add backend API integration and authentication
- Add Stripe/Razorpay style payment + escrow flow
- Add chat, ratings, disputes, and worker verification
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
