# WASL Day 1.3 Implementation Report (revised after final review)

## 0. Scope note
The original Day 1.3 prompt did not list concrete tasks and no earlier report defines them, so Day 1.3 was treated as a **stabilization and honesty pass**: audit, fix confirmed bugs, add a repeatable check. No Day 1.4 work and no new feature was added. This final review corrected the report, the blueprint and the i18n script (section 6).

## 1. Initial project state
- Expo SDK ~58.0.26, Expo Router ~58.0.32, React Native 0.88.1, TypeScript ~6.0.3.
- Git: single commit `33628e4`; all Day 1 to 1.3 work is **uncommitted**. No commit, reset or history change was made by me.
- Baseline before Day 1.3 edits: `tsc` exit 0, `expo lint` exit 0.

## 2. Confirmed decisions used in this review
Guest + Account access; guest conversations not saved by default; account for personal settings and optional personal features; language order Darija, Arabic, English, French; approved slogan "معاكِ... خطوة بخطوة". Recorded in `WASL_PRODUCT_BLUEPRINT_V1.md`.

## 3. Requirement classification (against actual code)
| Area | Classification |
|---|---|
| Splash, Home, five destinations, Back navigation | IMPLEMENTED BUT NOT DEVICE-TESTED |
| Four languages, order, RTL/LTR, persistence | IMPLEMENTED BUT NOT DEVICE-TESTED (order and key parity script-checked) |
| Companion screen and spoken greeting | IMPLEMENTED BUT NOT DEVICE-TESTED |
| Rights, Help | UI DEMO ONLY |
| Assistant | UI DEMO ONLY (canned local reply) |
| Safe Space | UI DEMO ONLY |
| Safety planning, contacts, Guardian, SOS | NOT IMPLEMENTED (labelled honestly) |
| Quick Exit | PARTIALLY IMPLEMENTED (returns to Home) |
| Guest access | PARTIALLY IMPLEMENTED: every user is a guest, nothing but the language is stored; no explicit guest flow |
| Account access | NOT IMPLEMENTED |
| Approved slogan | NOT IMPLEMENTED: code shows an older slogan (see blocker B1) |
| Speech recognition | NOT IMPLEMENTED |

## 4. Bugs fixed in Day 1.3 (verified present in code)
1. Splash slogan/descriptor were hardcoded Arabic; now `splash.slogan` / `splash.descriptor` in all four dictionaries.
2. Rights audio button showed unrelated `rights.subtitle`; Safe Space add and Assistant audio buttons echoed their own labels. They now show `common.featureUnavailable`; the Assistant mic shows `companion.voiceUnavailable`.
3. Removed the duplicate "AI not connected" caption in the Assistant screen.
4. `ScreenShell` ScrollView has `automaticallyAdjustKeyboardInsets` (iOS keyboard avoidance).
5. `app.json` `userInterfaceStyle` changed from `automatic` to `light` (palette is light-only).
6. `NoticeCard` has `accessibilityLiveRegion="polite"`.
7. `scripts/check-i18n.mjs` + `npm run check:i18n` added (revised in this review, section 6).

## 5. Report claims checked against code
| Earlier claim | Result |
|---|---|
| No network calls or analytics | Confirmed: no `fetch`/XHR/WebSocket in `src` (only the unused starter `external-link.tsx` imports `expo-web-browser`) |
| Only the language is persisted | Confirmed: the only `AsyncStorage` use is `wasl.language` |
| UI states typed text is not sent anywhere | Partly wrong: that note was `home.privacyNote`, which Home no longer displays. Accurate wording: Assistant says messages stay on the device; Companion says replies are a local demo |
| Android resizes for the keyboard by default | Supported by Expo config docs in `@expo/config-types` (`softwareKeyboardLayoutMode` defaults to `resize`); not tested on a device |
| 56 dp touch targets, 17 px body | Confirmed in `src/constants/design.ts` |
| Darija contains no Latin letters | Re-verified by the script |
| "Node 24 here" makes the script portable | Wrong: see section 6 |
| Device behaviour | **Nothing has been tested on a device.** You have not told me you ran the app, so every runtime claim remains unverified |

## 6. i18n script and Node compatibility
- Supported Node range (from `engines` of `expo` 58.0.26 and `react-native` 0.88.1): **`^22.13.0 || ^24.3.0 || ^26`**. The repo has no `engines`, `.nvmrc` or CI config. Installed here: v24.15.0.
- **Finding:** the first version imported the `.ts` dictionaries and needed Node's unflagged TypeScript stripping (Node 22.18+). It would fail on Node 22.13 to 22.17, which Expo supports. I reproduced the failure on Node 24 with `--no-experimental-strip-types`: `ERR_UNKNOWN_FILE_EXTENSION`, exit 1.
- **Fix:** the script now reads the dictionary files as text (regex), with a guard that fails if any entry cannot be parsed. It uses only `node:fs`, `node:path`, `node:url`, so it needs no TypeScript support and no flags.
- **Verified this review (Node v24.15.0):**
  - `npm run check:i18n` -> `i18n check passed: 158 keys x 4 languages, no missing/extra/empty keys, no unknown keys in src.` exit 0.
  - `node --no-experimental-strip-types scripts/check-i18n.mjs` -> same pass, exit 0.
  - Negative test on a temporary copy (a removed French key, an empty English value, an unknown key used in `rights.tsx`) -> exit 1 with exactly those three problems reported. Temp copy deleted; real files untouched.
- **Not verified:** execution on Node 22.13 to 22.17 or 26. The script uses only long-standing APIs, but I did not run those versions.
- Limit: it checks key presence, non-empty values and Darija script, not translation quality or placeholder syntax.

## 7. Files
**Created in Day 1.3:** `scripts/check-i18n.mjs`, `WASL_PRODUCT_BLUEPRINT_V1.md`, `WASL_DAY_1_3_IMPLEMENTATION_REPORT.md`.
**Modified in Day 1.3:** `app.json`, `package.json` (one script), `src/app/index.tsx`, `src/app/rights.tsx`, `src/app/safe-space.tsx`, `src/app/assistant.tsx`, `src/components/ui/status-badge.tsx`, `src/components/ui/screen-shell.tsx`, the four translation files.
**This review:** rewrote the blueprint and this report, rewrote `scripts/check-i18n.mjs`. No app source file changed. Nothing deleted except my own earlier report drafts, which were replaced. No dependency installed. Other user changes (e.g. `src/components/app-tabs.web.tsx`) untouched.

## 8. Tests executed and exact results
| Command | When | Result |
|---|---|---|
| `npx tsc --noEmit` | re-run in this review | exit 0, no output |
| `npx expo lint` | re-run in this review | exit 0, no output |
| `npm run check:i18n` and variants | this review | see section 6 |
| `npx expo-doctor` | earlier Day 1.3 run, **not re-run** | `20/20 checks passed. No issues detected!` |
| `npx expo export --platform android` and `--platform ios` | earlier Day 1.3 run, **not re-run** | both exit 0 (4 MB and 3.7 MB Hermes bundles); no app source changed since |

Never run: device, emulator or simulator tests; unit or component tests (none exist).

## 9. Remaining issues
### Blockers (resolve before calling Day 1.3 accepted)
- **B1. Slogan contradicts the approved decision.** `splash.slogan` is "معك... دائماً" (Arabic and Darija) and "With you... always" / "Avec vous... toujours". Approved: "معاكِ... خطوة بخطوة". Fix is two string edits plus your approval of the English and French wording; I did not change it because this review was report-only.
- **B2. No manual device verification.** Keyboard fix, light-mode lock, language persistence, RTL and spoken greeting are unverified at runtime.
- **B3. Day 1 to 1.3 work is uncommitted**, so one mistake could lose it. Committing is your decision.

### Future improvements (not blockers)
- Guest/Account: design and implement (blueprint section 3); explicit guest entry; account screens.
- Splash descriptor approval; bottom-bar "Assistant" opens the Companion, not `/assistant`.
- Quick Exit behaviour; branding assets (native splash and icon are Expo starter); remove or hide starter `/explore` and unused tab components; duplicate `splash.tsx` route.
- Darija text-to-speech uses `ar-MA`, which many devices lack.
- Automated component tests; accessibility audit on real devices; optional `engines` field in `package.json`.

## 10. Manual tests you need to perform
1. `npx expo start`; open on a real Android phone and an iPhone.
2. Switch languages, close and reopen the app, confirm the language persists.
3. Assistant and Companion: confirm the keyboard does not hide the input (iPhone especially).
4. Tap Rights audio, Safe Space add, Assistant mic and audio: each must show a clear "not available" message.
5. System dark mode: the app must stay light and readable.
6. TalkBack / VoiceOver: confirm notices are read.
7. Companion "Hear greeting" in each language (iPhone: silent mode off).
8. Optional: run `npm run check:i18n` on Node 22.13 to 22.17 if you have it.

## 11. Recommended next step
Approve the English and French wording for the approved slogan so B1 can be fixed, run the manual tests above, then commit. Do not start Day 1.4 until then.
