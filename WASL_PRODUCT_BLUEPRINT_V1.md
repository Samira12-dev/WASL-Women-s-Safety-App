# WASL Product Blueprint V1 (Day 1.4 final update)

> Documentation only. Sources: decisions you confirmed in chat, `WASL_DAY_1_REPORT.md`, `WASL_DAY_1_1_REPORT.md`, `WASL_DAY_1_2_REPORT.md`, `WASL_DAY_1_3_IMPLEMENTATION_REPORT.md`, and the current code (re-checked on 2026-11-21). Related documents: `WASL_MASTER_FEATURE_ROADMAP.md` (what is built, what is next) and `WASL_PRODUCT_DECISIONS_LOG.md` (decisions, rationale, open questions).
> Status labels used in all three documents: **CONFIRMED** = you decided it; **PROPOSED** = my suggestion, not approved, must not be treated as a decision; **UNRESOLVED** = open question; **TO CONFIRM** = a detail inside a decision that is still open; **UNVERIFIED** = not individually verified on a device (the user's physical-phone launch/general-working report is not a complete device test or feature verification). Nothing in this file claims a feature works unless the roadmap lists it as verified.
> Last corrected: 2026-11-21 (final product decisions correction; synchronized with Day 2.1 and Day 2.2).

## 0. Decision status at a glance

### CONFIRMED
1. Guests can access all public information, awareness content, reporting guidance, verified support resources and the general assistant without registration.
2. Account registration is optional.
3. The red SOS button is visible and accessible to both Guest and Account users.
4. SOS recipients are selected and configured in advance. The user may choose trusted personal contacts and supported specialized organizations.
5. SOS requests and shares location only with explicit consent, and never claims successful delivery without confirmation.
6. If a Guest has not configured recipients, SOS offers safe emergency guidance and a clear setup path, and never pretends an alert was sent.
7. Quick Exit is separate from SOS, reachable from every main screen, and never sends alerts or shares location.
8. Quick Exit never promises that operating-system, browser or notification traces are erased.
9. The Guardian feature stays in the long-term scope.
10. All ten product modules and the complete long-term vision are preserved.
11. Earlier confirmed: Darija default, language order Darija / Arabic / English / French, approved slogan "معاكِ... خطوة بخطوة", personal features (trusted contacts, safety plans, private evidence, saved preferences) for account users, guest conversations not saved by default.

### PROPOSED (not approved)
- **Local-first personal data**: data stored on the device, protected by an app lock, with an optional account and cloud synchronization later (section 6.1).
- The three-track SOS implementation plan: prototype/simulation, then the phone's SMS composer, then a backend gateway (section 4.2).

### UNRESOLVED
See section 9 and `WASL_PRODUCT_DECISIONS_LOG.md` (U-01 to U-19).

## 1. Vision
WASL ("معاكِ... خطوة بخطوة", the approved slogan) is a mobile app for Android and iOS that gives women **information, support and protection**: understanding their rights, knowing how to report abuse, finding verified help, keeping private evidence, planning their safety, and calling for help in an emergency.

WASL is a **digital guide**. It is not a human, a lawyer, a police service or an emergency service, and it must never present itself as one. It does not promise absolute confidentiality and does not guarantee that evidence will be accepted by a court.

## 2. Access model: Guest and Account
WASL supports **both** modes (confirmed).

| Feature | Guest (no account) | Account (optional login) |
|---|---|---|
| Home and WASL Companion | Yes | Yes |
| Understand My Rights (verified Moroccan legal information) | Yes | Yes |
| Awareness Center (videos, audio explanations, scenarios) | Yes | Yes |
| Reporting Guide | Yes | Yes |
| Resource Center (verified organizations and services) | Yes | Yes |
| General AI Assistant | Yes; conversations **not saved by default** | Yes; saving is a personal setting, off unless the user opts in (**TO CONFIRM**) |
| Language choice | Yes (stored on the device) | Yes (saved preference) |
| Quick Exit | Yes, reachable from every main screen | Yes, reachable from every main screen |
| **Red SOS button, visible and accessible** (CONFIRMED) | **Yes** | **Yes** |
| SOS recipients and consent setup (trusted personal contacts, supported specialized organizations) | Yes: CONFIRMED by D-25 / Blueprint confirmed item 6 (guest SOS guidance implies setup when no recipients are configured) and D-23 (recipients configured in advance). Where this data is stored is UNRESOLVED (U-01) | Yes |
| SOS with no recipients configured | Safe emergency guidance and a clear setup path; no alert is sent or implied | Same |
| Trusted contacts as a personal feature | Earlier confirmed as an account feature. How this fits the guest SOS setup above is UNRESOLVED (U-01) | Yes |
| Safety plan (My Safety) | No, account feature (earlier confirmed) | Yes |
| Private evidence storage (My Safe Space) | No, account feature (earlier confirmed) | Yes |
| Saved preferences and personal settings | No | Yes |

Rules:
- Account registration is **optional** (CONFIRMED). A guest must never be blocked from public information, awareness content, reporting guidance, verified resources, the general assistant, SOS or Quick Exit.
- Personal data is created only when the user chooses to save it, with clear consent.
- **UNRESOLVED (U-01):** the earlier decision "personal features need an account" and the new decision "a guest can configure SOS recipients" overlap. The PROPOSED local-first architecture (section 6.1) would let such data live on the device for everyone and make the account an optional sync layer. This would change the earlier decision, so it needs your explicit approval before it is applied.

**Current code:** no login, account or guest screen exists. Every user is implicitly a guest; the only value written to storage is the language choice (`wasl.language`). Assistant and Companion messages exist only in screen memory.

## 3. Product modules (the full long-term scope; none removed)

| # | Module | Purpose | Access | Today |
|---|---|---|---|---|
| 1 | Home and WASL Companion | Entry point, female guide, language choice, spoken greeting | Guest + Account | Implemented; not individually device-verified |
| 2 | Understand My Rights | Moroccan legal information with verified sources, search, categories, audio explanations | Guest + Account | UI shell with placeholder content only |
| 3 | AI Assistant | Questions answered in Darija, Arabic, English, French; guardrails; escalation to human help | Guest + Account | UI demo; not connected; canned local reply |
| 4 | Awareness Center | Educational videos, audio explanations, practical scenarios | Guest + Account | Not implemented (only a placeholder audio button in Rights) |
| 5 | Reporting Guide | How to report abuse: procedures, steps, required information | Guest + Account | Not implemented |
| 6 | Resource Center (current screen name: Find Help) | Verified organizations, official services, contacts, addresses, support options | Guest + Account | UI shell with clearly labelled sample data |
| 7 | My Safe Space | Private evidence: photos, screenshots, messages, audio, documents, notes | Account | UI shell; no storage, no encryption |
| 8 | My Safety | Personalized safety plan and trusted contacts | Account | UI placeholders only |
| 9 | Emergency SOS | Visible red emergency button (section 4) | Guest + Account (CONFIRMED: visible and accessible to both) | Placeholder card only; sends nothing |
| 10 | Quick Exit | Separate, independent way to leave the app quickly (section 5) | Guest + Account, from every main screen | Basic: returns to Home; lives inside the My Safety screen only |

**Guardian** (a trusted person who can check in with the user, from the earlier reports) **stays in the long-term scope (CONFIRMED)**. It is not one of the ten modules; it sits with My Safety. How it relates to trusted contacts and SOS is UNRESOLVED (U-08). It is not implemented; the current card only says it sends nothing.

### Navigation
Expo Router, single `Stack`. Current routes: `/` (Splash, also `/splash`), `/home`, `/companion`, `/rights`, `/assistant`, `/help`, `/safe-space`, `/safety`, plus the unlinked starter `/explore`. Home shows five cards (rights, assistant, help, safe space, safety) and a bottom bar (Home, Rights, Assistant which opens the Companion, Help, Safety). The Home design is approved and was matched to a reference image. **There is no screen yet for Awareness Center, Reporting Guide, Account, SOS or Quick Exit as separate features.** Where those modules appear without breaking the approved Home design is undecided (U-09).

## 4. Emergency SOS: intended behaviour (not implemented)
Status: items 1 to 10 below and the guest rule are **CONFIRMED** product behaviour. The implementation tracks in 4.2 are **PROPOSED**.

### 4.1 Intended behaviour
Exact intended behaviour, as confirmed:

1. A **clearly visible red SOS button**.
2. The user **chooses trusted contacts** and, **where technically supported**, specialized support organizations.
3. The user **configures recipients and consent before an emergency**, never during one.
4. When activated, the app **requests location permission** and **attempts to send an emergency alert** containing **location, timestamp and a map link**.
5. The app **clearly shows whether delivery succeeded or failed**.
6. It **never claims delivery without confirmation**.
7. It **never shares location without the user's consent**.
8. It supports **multiple trusted recipients** where possible.
9. It **never claims an organization receives alerts** unless a real, agreed and tested integration exists.
10. **Quick Exit is independent of SOS.**

### Scenarios that must be designed and tested
| Scenario | Required behaviour |
|---|---|
| Accidental activation | Activation needs a deliberate gesture (for example press and hold) plus a short visible countdown with a large Cancel button. Exact gesture: TO CONFIRM |
| Cancellation | Cancel during the countdown sends nothing and shares no location. After a send, the user can send a follow-up "I am safe" message (**TO CONFIRM**) |
| No recipients configured or no consent (including every Guest who has not set up SOS) | CONFIRMED: show **safe emergency guidance** and a **clear path to set up recipients**. Nothing is sent, and the screen must never suggest that an alert was sent. The emergency phone numbers shown must first be verified from official sources (U-02) |
| Location permission denied | Ask the user whether to send the alert without location. Never send location without permission |
| GPS unavailable or slow | Wait a short, visible time, then offer: send now with the last known location (clearly labelled as old), or without location. Never present stale data as current |
| No network | Show failure clearly; keep the alert queued only if the user agreed (**TO CONFIRM**); offer a fallback such as the phone's own SMS app |
| Partial delivery | Show per recipient: confirmed, failed, or unknown |
| Delivery cannot be confirmed | Show "prepared in your SMS app, not confirmed". Never show "sent", "delivered" or "received" unless a gateway reports it (Track 3) |
| Recipient unreachable or number invalid | Show which recipient failed |
| Phone locked, app in background | Not supported in the first version; document honestly |

### 4.2 Implementation tracks (PROPOSED, in this order)
The three tracks must never be confused in the UI or in any document. The phone's SMS composer is **not automatic sending and not confirmed delivery**.

| Track | What it is | What it can honestly claim | What it must never claim |
|---|---|---|---|
| 1. Hackathon prototype / simulation | Full SOS flow (red button, hold and countdown, cancel, consent, guidance, location consent screen) where **no message leaves the phone** | "Simulation: nothing was sent" shown clearly on screen | Any alert, any delivery, any organization receiving anything |
| 2. First real implementation using the phone's SMS composer | The app opens the phone's SMS app with recipients, message, timestamp and map link pre-filled; **the user must press Send** | "Message prepared in your SMS app" and, only where the platform reports it, "you sent it" or "you cancelled". Android always reports `unknown`, so there it can say "not confirmed" | "Alert sent automatically", "delivered", "received", any organization receiving it |
| 3. Future production: backend messaging gateway with delivery reports | A server sends messages and receives per-recipient delivery reports | Per-recipient status as reported by the gateway: accepted, delivered, failed, unknown | Anything beyond what the gateway reports; "read"; organization receipt without an agreed and tested integration |

### 4.3 Technical reality (verified against Expo SDK 58 documentation for `expo-sms`)
- `expo-sms` opens the phone's own SMS app with a pre-filled message; **the user must press Send**. It returns `sent`, `cancelled` or `unknown`; **Android always returns `unknown`**. It therefore **cannot confirm delivery** and cannot send silently.
- Real, confirmed delivery needs a **server-side messaging service** (SMS or messaging gateway) that reports status. This requires a backend, an account system, running costs, Moroccan carrier coverage, and consent and legal review. Even then, "accepted by the gateway" is not the same as "read by the person".
- Support organizations: **no integration exists and none may be claimed**. Alerts to organizations are possible only after a signed agreement and a tested channel.
- The map link and timestamp can be generated on the device; location uses the OS permission prompt (foreground location; details to verify against the SDK 58 `expo-location` docs when implementing).

## 5. Quick Exit (independent of SOS)
Status: reachability, independence from SOS, and the no-traces rule are **CONFIRMED**. The exact behaviour is **UNRESOLVED** (U-03).

- **CONFIRMED:** reachable from **every main screen** (Home, Companion, Rights, Assistant, Resource Center, Safe Space, My Safety, and the future Awareness Center and Reporting Guide), for guests and account users alike. Today it exists only as a card inside My Safety.
- **CONFIRMED:** it **must not send alerts or share location**, and does not depend on SOS or trigger it.
- **UNRESOLVED:** what it does. Options: go to a neutral screen, clear the navigation history so Back does not return, open a neutral website, or send the app to the background. A mobile app cannot truly close itself on iOS.
- **CONFIRMED:** it **must not promise that operating-system, browser or notification traces are erased** (recent-apps preview, notification history, browser history, device logs). The wording may say only what the app itself does, for example "leaves WASL", never "no trace will remain".
- Purpose: let a user leave WASL at once if someone approaches.
- **UNRESOLVED (U-03), detail only:** whether generic notification wording and a neutral app label are used to reduce visible traces. They may only be described as "less visible", never as removing traces (see the CONFIRMED rule above).

## 6. Privacy and safety
- **Guest conversations are not saved by default.** Today they exist only in screen memory.
- **Collect only what is needed, with clear consent**, explained in simple language in all four languages.
- **Evidence storage** requires encryption at rest and access protection (app lock or biometrics). Until that exists the UI must keep saying "not available / encryption not implemented".
- **Users control their data**: saving, exporting and deleting. Deletion must be easy to find and explained honestly (including what a backup would keep).
- **Notifications** must not show sensitive previews. Use neutral wording, no message or contact content on the lock screen.
- **No absolute promises.** Never "100% confidential", "fully secure", or "evidence will be accepted in court". Say what the app does and its limits.
- **Safety wording** must never blame, pressure or endanger the user. No "you should leave", no deadlines, no guilt. Give options and let the user decide.
- Legal and support information must come from **verified, cited official sources**, with a review date.
- Moroccan personal-data law and authority requirements should be checked with a legal adviser before any real personal data is collected (U-12).
- No secrets, tokens or API keys in the app. A future AI service must be reached through a backend, never with a key inside the app.
- Today: no analytics, no network calls, no remote storage (checked in code on 2026-11-21).

### 6.1 Local-first personal data: PROPOSED architecture (not approved)
**Status: PROPOSED.** This is a suggestion and must not be treated as a decision until you approve it explicitly. It would also modify the earlier decision that personal features need an account (U-01).

Proposal:
1. Personal data (SOS recipients, trusted contacts, safety plan, evidence, preferences) is stored **on the device**.
2. The data is protected by an **app lock** (PIN or biometrics) and encryption at rest, with keys kept in the operating system's secure storage.
3. An **optional account and cloud synchronization** can be added later, only if the user opts in.

Why it is attractive: nothing leaves the phone by default; it works without network; guests and account users can use SOS setup; it keeps the guest-privacy promise; it needs no backend for the first versions.

Risks and limitations that must be explained to users and designers:
- **Lost, reset or replaced phone = lost data**, unless an opt-in backup exists. Backup and sync create a second copy that must itself be protected and deletable.
- **A shared, unlocked or forced-open phone exposes the data.** An app lock reduces this but cannot protect against someone who knows the PIN or can compel the user.
- **Encryption on the device is not absolute protection.** Weak PINs, rooted or jailbroken devices, malware and OS backups can weaken it. Wording must never promise absolute confidentiality.
- **Uninstalling the app normally deletes its local data**; this must be explained, and an export option considered.
- **An app-lock reset path** is hard: if "forgot PIN" is easy, the lock is weak; if impossible, the data is lost.
- **No identity means no account recovery** and no way to send alerts from a server; Track 3 SOS needs a backend and therefore an account or at least a verified phone number.
- Local data needs a clear **delete everything** control and an explanation of what it does not erase (for example copies the user exported or sent).
- Encryption design and its review are UNRESOLVED (U-07).

## 7. Languages and accessibility
- Default: **Moroccan Darija in Arabic script**. Order: **Darija, Modern Standard Arabic, English, French**. Implemented.
- **RTL** for Darija and Arabic, **LTR** for English and French. Implemented; not individually device-verified.
- Four dictionaries with matching keys; `npm run check:i18n` checks this.
- Large readable text (17 px body), clear icons with labels, simple wording, 56 dp primary touch targets, accessibility labels and roles. Applied in code, UNVERIFIED with screen readers.
- Still required: audio explanations for the main content, support for different ages and literacy levels (icons plus audio plus very short sentences), Darija speech recognition, and a TalkBack/VoiceOver audit on real devices.
- Approved slogan "معاكِ... خطوة بخطوة" is **applied in the app for Darija and Modern Standard Arabic** (Day 2.1: `splash.slogan` in `darija.ts` and `arabic.ts`). The user checked the Splash on a physical phone in both variants: OK. This is a limited manual check of the slogan display only, not a full device test. **English ("With you... always") and French ("Avec vous... toujours") are unchanged, NOT approved, and unresolved (U-14 / A-01).** The Splash descriptor is unchanged and unapproved (A-02).

## 8. Roadmap summary
The full classification is in `WASL_MASTER_FEATURE_ROADMAP.md`. In short:
- **Verified (static checks only):** type check, lint, dependency check, Android and iOS bundle export, translation key parity, language order, absence of network calls.
- **Implemented; not individually device-verified (physical-phone launch/general-working report only):** Splash, Home, Companion, navigation, language selector and persistence, RTL/LTR, spoken greeting, UI placeholders. The only individual manual check recorded so far is the Splash slogan in Darija and Modern Standard Arabic (OK on a physical phone); everything else stays UNVERIFIED.
- **Partial or demo only:** Rights, Assistant, Resource Center, Safe Space, My Safety, Quick Exit.
- **Not implemented:** Account and Guest flows, Awareness Center, Reporting Guide, real assistant, evidence storage, safety plan, trusted contacts, SOS, speech recognition, verified content.
- **Hackathon MVP (proposed, to confirm):** see the roadmap; it favours an honest, demonstrable core over unfinished everything.

## 9. Contradictions and unresolved items
Resolved by the final correction: the guest SOS behaviour (section 0 confirmed items 3 and 6; D-22 and D-25), Quick Exit reachability and independence (section 0 items 7 and 8; D-27 and D-28), Guardian kept in scope (section 0 item 9; D-29), and the former "which SOS path" ambiguity (now three tracks, section 4.2, still PROPOSED).

Still open:
1. **Slogan (English and French only):** the approved slogan is applied in Darija and Modern Standard Arabic (Day 2.1, phone-checked on the Splash). English and French still show older, unapproved wording; their approved wording is unresolved (U-14 / A-01).
2. **Guest SOS setup versus "trusted contacts need an account":** a guest can configure SOS recipients (D-25 / section 0 item 6), but trusted contacts were defined as an account feature. Either SOS recipients are a special case, or the local-first proposal (6.1) replaces the earlier rule. (U-01)
3. **Where guest-configured recipients are stored** and how they are protected (U-01, U-07).
4. **Quick Exit:** its behaviour is undecided (U-03), and today it exists only inside My Safety.
5. **Supported specialized organizations:** no integration, agreement or channel exists; the first SMS track can only send to a phone number the user enters or an organization publishes for that purpose (U-04, U-13).
6. **Delivery confirmation:** the phone's SMS composer cannot confirm delivery (U-04). The screen must say "not confirmed".
7. **Ten modules versus the approved five-card Home** (U-09).
8. **Guardian:** kept in scope; its relation to trusted contacts and SOS is open (U-08).
9. **Find Help versus Resource Center:** the screen is still called Find Help.
10. **Bottom-bar "Assistant"** opens the Companion, not the Assistant screen.
11. **Splash descriptor** "معلومات • دعم • حماية" has no recorded approval (A-02); it is unchanged and still unresolved.
12. **Emergency numbers and legal/organization data** must be verified from official sources before display (U-02, U-13).
