# WASL Master Feature Roadmap

> Documentation only. Status is based on the actual code (checked 2026-11-21) and on `WASL_DAY_1_REPORT.md`, `WASL_DAY_1_1_REPORT.md`, `WASL_DAY_1_2_REPORT.md`, `WASL_DAY_1_3_IMPLEMENTATION_REPORT.md`. The user reported that the app launched and worked on her physical phone, but that is not a complete device test or verification of individual features; untested behaviours remain UNVERIFIED. Product details: `WASL_PRODUCT_BLUEPRINT_V1.md`. Decisions: `WASL_PRODUCT_DECISIONS_LOG.md`.
> Labels: **CONFIRMED** = you decided it; **PROPOSED** = my suggestion, not approved; **UNRESOLVED** = open question. Scope of all ten product modules and the Guardian is CONFIRMED and nothing in this roadmap removes anything; the roadmap only orders the work. Last corrected: 2026-11-21 (final product decisions correction; synchronized with Day 2.1 and Day 2.2).

## A. Already implemented and verified
"Verified" here means checked by a command or a code review that was executed, not by using the app.

| Item | How it was verified |
|---|---|
| TypeScript compiles | `npx tsc --noEmit`, exit 0 (re-run 2026-11-21 in the Day 1.3 review) |
| Lint passes | `npx expo lint`, exit 0 (same review) |
| Expo dependency health | `npx expo-doctor`, 20/20 (earlier Day 1.3 run, not re-run in the review) |
| Android and iOS bundles build | `npx expo export` for both, exit 0 (earlier Day 1.3 run, not re-run) |
| Four dictionaries have identical keys, no empty values, Darija has no Latin letters, no unknown keys used in `src` | `npm run check:i18n`, 158 keys x 4 languages, exit 0; negative test failed as expected; runs without TypeScript loader; re-run in Day 2.1 after the slogan change, exit 0 |
| Approved slogan "معاكِ... خطوة بخطوة" stored in `splash.slogan` of `darija.ts` and `arabic.ts` | Day 2.1: character-by-character comparison with the approved text; `npm run check:i18n`, `npx tsc --noEmit` and `npx expo lint` all exit 0 |
| Language order Darija, Arabic, English, French; default Darija; RTL for Darija and Arabic | Code review plus Day 1.1 checks |
| No network calls or analytics; only the language is persisted | Code search |

## B. Implemented but not fully device-tested
The physical-phone report confirms launch and general working only; the items below remain UNVERIFIED as individual behaviours, except where a row says otherwise (the only individual manual check recorded so far is the Splash slogan in Darija and Modern Standard Arabic).

| Item | Notes |
|---|---|
| Splash (tap to enter Home): slogan and branding | **Day 2.1 done:** the approved Arabic slogan "معاكِ... خطوة بخطوة" is applied to Darija and Modern Standard Arabic (`splash.slogan`). **Manually checked by the user on a physical phone for the Splash screen in Darija (OK) and Modern Standard Arabic (OK); this covers only the slogan display in those two variants.** English still shows "With you... always" and French "Avec vous... toujours": both unchanged, **not approved**, unresolved under U-14 / A-01, and not manually checked. The Splash descriptor is unchanged and unapproved (A-02). Tap-to-enter and the remaining Splash behaviours stay UNVERIFIED |
| Home: greeting, female guide image, five cards, bottom bar | Matched to a reference image by analysis, never seen rendered by the assistant |
| Companion full screen: greeting, four suggestions, local text demo | Replies are a canned local demo |
| Spoken greeting with `expo-speech` | Depends on device voices; Darija uses `ar-MA`, which many devices lack |
| Navigation with Back button, RTL-aware | |
| Language selector and persistence (`wasl.language`) | |
| Keyboard handling on iOS (`automaticallyAdjustKeyboardInsets`), light theme lock, live-region notices | Day 1.3 fixes |
| Honest "not available / not connected" labels | |

## C. Partially implemented or demo only
| Module | What exists | What is missing |
|---|---|---|
| Understand My Rights | Search, categories, three placeholder articles marked "not verified", source area | Real Moroccan legal content, verified sources, review dates, audio |
| AI Assistant | Chat layout, canned local reply, "not connected" state | Backend, AI service, guardrails, four-language quality, escalation text |
| Resource Center (screen "Find Help") | Search, city and category chips, labelled sample cards | Verified organizations, official services, real contacts and addresses |
| My Safe Space | Five evidence-type cards, privacy text | Any storage, encryption, app lock, export, delete |
| My Safety | Cards for plan, contacts, guardian, SOS; Quick Exit card | Everything behind the cards |
| Emergency SOS | A card saying nothing is sent; no red button; reachable only inside My Safety | CONFIRMED requirements not built: red button visible to Guest and Account users, advance recipient and consent setup, guest guidance with setup path, location consent, honest result display (see tracks in section E) |
| Quick Exit | Button returning to Home, inside My Safety only | CONFIRMED requirements not built: reachable from every main screen, no alerts or location, no promise of trace erasure; final behaviour UNRESOLVED (U-03) |
| Guardian | A card saying it sends nothing | Everything; stays in long-term scope (CONFIRMED) |
| Guest access | Implicit: everyone is a guest, nothing but language stored | Explicit guest flow |

## D. Not implemented
- Account: sign-up, sign-in, personal settings, saved preferences, account deletion.
- Awareness Center (videos, audio explanations, scenarios).
- Reporting Guide.
- Real AI assistant, conversation saving (opt-in), guardrails.
- Speech recognition (Darija and other languages), spoken answers beyond the greeting.
- Safety plan editor, trusted contacts, Guardian.
- Evidence storage, encryption, app lock, export and delete.
- Emergency SOS and its delivery pipeline.
- Approved English and French wording for the slogan (the current English and French texts are not approved; U-14 / A-01). The approved Arabic slogan is already applied (Day 2.1).
- Verified legal and support data pipeline; offline content.
- Automated component or end-to-end tests; a formal device-testing pass (the user reported launch and general working on her phone, but not a complete device test or individual feature verification).

## E. Proposed hackathon MVP (to confirm)
Goal: a **honest, demonstrable core** on a real phone, within a hackathon timebox (**the date and team size are unknown, TO CONFIRM**). Anything not finished stays clearly labelled "coming soon". The full vision is not reduced.

### Step 0: housekeeping (before any feature)
1. Run the manual device tests listed in the Day 1.3 report; fix what breaks.
2. Approved Arabic slogan: **done** for Darija and Modern Standard Arabic (Day 2.1, phone-checked on the Splash only). English and French wording is still waiting for approval (U-14 / A-01).
3. Commit the Day 1 to 1.3 work (your decision).

### Step 1: access foundation
- CONFIRMED: guests can use all public content, the general assistant, SOS and Quick Exit with no registration; account registration is optional.
- PROPOSED (not approved): local-first personal data (on-device storage, app lock, optional account and cloud sync later). See blueprint section 6.1 for risks. It would also change the earlier rule that personal features need an account (U-01), so **nothing is built until you approve or reject it**.
- Needed first: an explicit "Continue as guest / Log in" choice (the login itself can stay a placeholder).

### Step 2: content that makes the demo useful
- Reporting Guide and Rights with a **small set of verified entries** (real sources, reviewer named). If no verified content exists by demo time, show the structure only and say so.
- Resource Center with a **few verified organizations** (name, official source, date checked). No invented phone numbers.
- Awareness Center with **1 to 3 real videos or audio clips** if the team can produce or license them; otherwise a clearly labelled placeholder.

### Step 3: personal safety (storage model depends on the PROPOSED local-first decision, U-01)
- SOS recipients and trusted contacts with explicit consent text. Guests can configure SOS recipients (CONFIRMED: D-25 and Blueprint confirmed item 6); where this data lives is UNRESOLVED (U-01).
- Safety plan: simple guided steps, no blame language.
- Guardian stays in long-term scope; not scheduled for the MVP.

### Step 4: Quick Exit and SOS, in three tracks
Quick Exit and SOS are separate features (CONFIRMED) and are built and tested separately.

**4a. Quick Exit (small, no dependencies).** Reachable from every main screen; never sends alerts or shares location; never promises that OS, browser or notification traces are erased. Behaviour to be chosen (U-03).

**4b. SOS Track 1: hackathon prototype / simulation (PROPOSED).** Red SOS button visible and accessible to Guest and Account users on the main screens; deliberate press-and-hold with countdown and Cancel; consent and location-consent screens; for a guest with no recipients, safe emergency guidance and a clear setup path (CONFIRMED behaviour). **No message leaves the phone, and the screen says "Simulation: nothing was sent".** It demonstrates the flow only and must be presented as a prototype.

**4c. SOS Track 2: first real implementation using the phone's SMS composer (PROPOSED).** Foreground location only with explicit consent, message with timestamp and map link, opened in the phone's SMS app with the user's chosen recipients. **The SMS composer is not automatic sending and not confirmed delivery**: the user must press Send; Android always reports `unknown`. Allowed wording: "Message prepared in your SMS app", "You cancelled", "Not confirmed". Forbidden wording: "alert sent", "delivered", "received". No organization is claimed to receive anything.

**4d. SOS Track 3: future production with a backend messaging gateway and delivery reports (PROPOSED, future).** See section F.

### Step 5: assistant
- Option A (safest for a demo): rule-based guided help with predefined questions, labelled as guided help, not AI.
- Option B: real AI through a **backend proxy** (no key in the app), guardrails, no logging of guest chats by default. Needs a backend and a provider decision (U-05).

### Step 6: private Safe Space
- Local encrypted storage and app lock for notes first; photos, audio and documents after. Only mark "encrypted" after tests pass.

### Rough priority for a hackathon
1. Device verification and housekeeping. 2. Quick Exit on every main screen (4a) and the Guest/Log in choice. 3. SOS Track 1 prototype (4b), then Track 2 (4c) if time allows. 4. Verified content (Rights, Reporting, Resources). 5. Trusted contacts and recipients setup. 6. Assistant (Option A or B). 7. Safety plan. 8. Safe Space. 9. Awareness Center. Items 7 to 9 are the first to defer. This order is PROPOSED; the content of the demo depends on U-11.

## F. Future production requirements
- **Backend and accounts:** authentication, secure API, rate limiting, account deletion, data export, hosting in a location compatible with Moroccan data-protection requirements (to verify with a legal adviser).
- **Messaging (SOS Track 3):** a server-side gateway that reports delivery status per recipient, retries, queueing only with the user's consent, cost control, coverage tests on Moroccan carriers. Only then may the app show per-recipient "delivered / failed / unknown", and only as reported by the gateway.
- **Organization alerts:** signed agreements, a tested channel, monitoring, and clear wording to users about what is and is not received.
- **Content operations:** verified legal and organization data with named reviewers, review dates, update process, offline packs.
- **Assistant:** guardrails, evaluation in Darija, Arabic, English, French, escalation to human help, no sensitive logging, abuse and prompt-injection testing, professional review of safety wording.
- **Evidence security:** encryption at rest with keys in OS secure storage, app lock or biometrics, optional encrypted backup, secure export, verified deletion, threat model, independent security review.
- **Notifications:** neutral previews, user-controlled.
- **Accessibility and literacy:** real-device screen-reader audit, audio for all core content, user testing with different ages and literacy levels.
- **Quality:** automated component and end-to-end tests, crash reporting designed with privacy in mind, release process (EAS), store review preparation, branding assets replacing Expo starter icons and splash.
- **Governance:** privacy policy and terms in four languages, consent records, incident response plan.
