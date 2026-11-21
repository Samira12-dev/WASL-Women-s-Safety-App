# WASL Day 1.2 Report

## Objective
Implement the two authoritative reference designs as responsive Expo/React Native screens: a Splash first screen, a reference-matched Home, and a full-screen interactive female Companion, while preserving four-language localization, persistence, and existing navigation.

## Reference handling
- The paths supplied in the request, `assets/reference/wasl-splash-reference.png` and `assets/reference/wasl-home-reference.png`, were not present.
- The authoritative files were found at:
  - `src/reference/wasl-splash-reference.png` (535x565)
  - `src/reference/wasl-home-reference.png` (201x515)
- Both files were inspected before UI changes. Programmatic color/region analysis was used because the current assistant model cannot directly render image pixels.
- The woman illustration was cropped from the authoritative Home reference into `assets/images/wasl-guide.png` (104x140) and reused on Home and in the full-screen Companion so the same character is preserved.

## Implemented
### Splash first screen
- `src/app/index.tsx` is now the first in-app screen; no unsupported Stack `initialRouteName` is used (removed in Expo Router SDK 58).
- Tap anywhere enters Home with a navigation guard to prevent double navigation.
- Preserved feminine WASL identity, brand name, slogan `معك... دائماً`, descriptor `معلومات • دعم • حماية`, lavender palette, skyline, and layered landscape.
- Added localized tap prompt in all four languages.

### Home
- Moved the existing Home implementation to `src/app/home.tsx`.
- Reproduced the reference arrangement:
  - Greeting/subtitle at the top.
  - Female guide illustration below the greeting.
  - Five cards in original order: rights, assistant, help, safe space, safety.
  - First four cards in a two-column grid; fifth card full width.
  - Rounded lavender/pastel surfaces and compact icon cards.
  - Bottom navigation bar with Home, Rights, Assistant, Help, and Safety.
- Added `src/components/ui/bottom-nav.tsx` and a `compact` mode to `src/components/ui/wasl-card.tsx`.

### Full-screen Companion
- Added `src/app/companion.tsx` and `src/components/ui/companion-screen.tsx`.
- Tapping the guide on Home opens the dedicated full-screen Companion route, not the old modal.
- Reused the exact guide crop from the Home reference.
- Exact Darija greeting: `مرحبا، كيفاش نقدر نعاونك اليوم؟`.
- Exact Darija suggestions:
  - `بغيت نفهم حقوقي`
  - `بغيت نلقى المساعدة`
  - `بغيت نحافظ على سلامتي`
  - `بغيت نسول على شي حاجة`
- Text interaction is clearly labelled as a local demo; no fake AI response is claimed.
- Added real user-initiated text-to-speech with `expo-speech` for the greeting, with stop support and no autoplay.
- Voice recognition remains unavailable and is labelled honestly; tapping the microphone shows an explanatory notice instead of simulating success.
- Removed the old modal implementation from `src/components/ui/female-companion.tsx`.

### Localization and navigation
- Added new keys in all four dictionaries: `splash.tapToStart`, `companion.speak`, `companion.stopSpeaking`, `companion.voiceUnavailable`.
- Preserved exact language order: `darija`, `ar`, `en`, `fr`.
- Preserved Darija default, Arabic script for Darija, RTL for Darija/Arabic, LTR for English/French, and AsyncStorage persistence.
- Registered `home`, `companion`, and `splash` routes in `src/app/_layout.tsx`.
- Updated Safety quick exit to return to `/home`.
- Preserved the pre-existing user modification in `src/components/app-tabs.web.tsx` unchanged.

## Dependency changes
- Installed `expo-speech` with `npx expo install expo-speech` (SDK 58-compatible, included in Expo Go).
- No other native dependency was added.

## Verification
- `npx tsc --noEmit` — passed, no output.
- `npx expo lint` — passed, no output.
- `npx eslint .` — passed, no output.
- `npx expo-doctor` — `20/20 checks passed. No issues detected!`
- `npx expo export --platform android --output-dir C:/Users/evo/AppData/Local/Temp/opencode/wasl-export-android-day12` — passed; `Android Bundled 27171ms`, 1661 modules, 34 assets, entry bundle `entry-2a06c1af92393a7e0c369a7bde7b9d35.hbc` (4MB).
- `npx expo export --platform ios --output-dir C:/Users/evo/AppData/Local/Temp/opencode/wasl-export-ios-day12` — passed; `iOS Bundled 26167ms`, 1556 modules, 30 assets, entry bundle `entry-ac021d41061bfa74e840c12ada19b4fc.hbc` (3.7MB).
- Custom invariant check passed:
  - 155 translation keys per language with full key parity.
  - Exact Darija greeting and four exact Darija suggestions.
  - Darija default and language order.
  - RTL/LTR mapping and AsyncStorage persistence.
  - Splash is `index`, Home and Companion routes exist, guide asset exists.
  - TTS dependency present, old Companion modal removed, bottom nav present.

## Limitations
- Implemented screenshots were not captured because no browser automation or physical device/screenshot tooling is available in this environment.
- Physical-device testing was not performed.
- TTS voice quality/language availability depends on the device OS. On iOS, speech may not play while the device is in silent mode.
- Speech recognition was intentionally not implemented; the UI states that it is unavailable rather than pretending to listen.
- The extracted guide crop is low-resolution because the authoritative Home reference is 201x515; it is reused without changing the character.
