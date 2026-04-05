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
