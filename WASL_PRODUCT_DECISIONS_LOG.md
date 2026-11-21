# WASL Product Decisions Log

> Records what was decided, why, and what is still open. Source of every CONFIRMED item: your messages in this project. Rationale is my explanation of the reasoning unless marked otherwise. Related: `WASL_PRODUCT_BLUEPRINT_V1.md`, `WASL_MASTER_FEATURE_ROADMAP.md`. Last corrected: 2026-11-21 (final product decisions correction; synchronized with Day 2.1 and Day 2.2).
>
> The log has three separate parts, and they must not be mixed up:
> 1. **CONFIRMED decisions**: decided by you.
> 2. **PROPOSED decisions**: suggestions by the assistant, **not approved**, not to be treated as decisions.
> 3. **UNRESOLVED questions**: product and technical questions without an answer.

# Part 1: CONFIRMED decisions

## Confirmed decisions

| ID | Decision | Rationale (explained by assistant unless stated) | Code status |
|---|---|---|---|
| D-01 | WASL supports both Guest and Account access | Users in danger must get information immediately without registration; personal features need identity and protection | No account code; all users implicitly guests |
| D-02 | Guests can access all public information, awareness content, reporting guidance, verified support resources and the general assistant without registration (restated and confirmed in the final correction) | Lowest barrier to help | Rights, Assistant and Help screens exist as shells; awareness content and reporting guide do not exist |
| D-03 | Account registration is optional; accounts unlock personal features such as trusted contacts, safety plans, private evidence storage and saved preferences (earlier confirmed). **Overlaps with D-24 and D-25: see U-01** | These features hold personal data and need access control | Not implemented |
| D-04 | Guest conversations are not saved by default | Privacy and safety | True today because messages live only in screen memory |
| D-05 | Default language is Moroccan Darija in Arabic script; order Darija, MSA, English, French | Target users speak Darija | Implemented; script-checked |
| D-06 | RTL for Darija and Arabic; LTR for English and French | Reading direction | Implemented; not individually device-verified (physical-phone launch reported only) |
| D-07 | Approved slogan: "معاكِ... خطوة بخطوة" | Brand decision | **Arabic implemented (Day 2.1):** `splash.slogan` in `darija.ts` and `arabic.ts` now holds the approved slogan, and the Splash shows it through the translation system. **The user visually checked the Splash on a physical phone in Darija (OK) and Modern Standard Arabic (OK).** This is a limited manual check of the slogan display only, not a full device test. English ("With you... always") and French ("Avec vous... toujours") are unchanged, **not approved**, and remain open under U-14 / A-01 |
| D-08 | Ten product modules, none removed from long-term scope (Home and Companion, Rights, AI Assistant, Awareness Center, Reporting Guide, Resource Center, My Safe Space, My Safety, Emergency SOS, Quick Exit) | Full vision preserved; delivery is staged | Five modules have UI shells; Awareness and Reporting do not exist |
| D-09 | Emergency SOS: visible red button; user chooses trusted contacts and, where technically supported, organizations; recipients and consent configured beforehand; on activation it requests location permission and attempts an alert with location, timestamp and map link; clear success or failure display | Consent and clarity in an emergency | Not implemented; only a placeholder card |
| D-10 | Never claim delivery without confirmation; never share location without consent; never claim an organization receives alerts without a real, agreed, tested integration | Honesty is a safety requirement: a false "sent" can endanger a user | Current UI already states nothing is sent |
| D-11 | Multiple trusted recipients where possible | Redundancy | Not implemented |
| D-12 | Quick Exit is a separate feature, independent of SOS (extended by D-27 to D-29) | Leaving quickly and calling for help are different needs and must not trigger each other | Exists only as a "return Home" button inside My Safety |
| D-13 | Personal data only when needed and with clear consent; users control saving, export, deletion | Data minimization, user control | Nothing personal is collected yet |
| D-14 | Evidence storage needs appropriate encryption and access protection | Evidence is highly sensitive | Not implemented; UI says so |
| D-15 | Avoid sensitive notification previews | Notifications can be seen by others | No notifications exist |
| D-16 | No promise of absolute confidentiality or guaranteed evidence admissibility | Cannot be guaranteed; false promises create risk | Wording already avoids such claims |
| D-17 | Safety advice must not blame, pressure or endanger users | Ethics and safety | Placeholder content only |
| D-18 | Accessibility: large readable text, clear icons, simple language, audio explanations, different ages and literacy levels | Inclusive access | Partially applied; audio and literacy options not implemented |
| D-19 | Hackathon MVP is realistic while the full long-term vision is kept | Time constraint | Proposed plan in the roadmap, to confirm |
| D-20 | No new dependencies, no app changes during documentation tasks | Process rule for Day 1.4 preparation | Respected |
| D-21 | Account registration is optional | Nobody in danger should be forced to register | No account code exists |
| D-22 | The red SOS button must be visible and accessible to **both Guest and Account users** | An emergency control behind a login can fail the people who need it most | Not implemented; only a placeholder card inside My Safety |
| D-23 | SOS recipients are selected and configured **in advance**. The user may choose trusted personal contacts and **supported** specialized organizations | Choices and consent are made calmly, not during an emergency; "supported" because no organization integration exists | Not implemented |
| D-24 | SOS requests and shares location **only with explicit consent**, and never claims successful delivery without confirmation | A false "sent" or an unconsented location can endanger the user | Not implemented; current UI states nothing is sent |
| D-25 | If a Guest has not configured recipients, SOS offers **safe emergency guidance and a clear setup path** and must not pretend an alert was sent. (This implies a guest can configure recipients; see U-01) | The button must always lead somewhere useful and honest | Not implemented |
| D-26 | Quick Exit is separate from SOS; it must not send alerts or share location | Leaving quickly must be safe and silent | Exists only as a button inside My Safety |
| D-27 | Quick Exit must be reachable from **every main screen** | If it needs navigation to find, it fails its purpose | Only on My Safety |
| D-28 | Quick Exit must **not promise** that operating-system, browser or notification traces are erased | The app cannot control recent-apps previews, notification history, browser history or device logs; a false promise could endanger a user | No such promise exists in the UI today |
| D-29 | The **Guardian** feature stays in the long-term scope | Agreed feature; not removed | Not implemented; card says it sends nothing |
| D-30 | All **ten product modules** and the complete long-term vision are preserved | Staged delivery without shrinking the vision | Five modules have UI shells; the rest do not exist |
| D-31 | The phone's **SMS composer must never be described as automatic sending or confirmed delivery**; the SOS work is separated into prototype/simulation, SMS-composer, and backend-gateway tracks | Verified in Expo SDK 58 docs: the user must press Send and Android reports `unknown` | Documentation only |

# Part 2: PROPOSED decisions (NOT approved)
These are suggestions. Nothing is to be built or described as decided until you approve each one.

| ID | Proposal | Reasoning | Risks and limitations | Status |
|---|---|---|---|---|
| P-01 | **Local-first personal data:** (1) data stored on the device, (2) app lock and appropriate protection, (3) optional account and cloud synchronization later | Nothing leaves the phone by default; works offline; lets guests configure SOS recipients (D-25) without an account; no backend needed for the first versions | Lost or replaced phone loses data without an opt-in backup; a shared, unlocked or forced-open phone exposes data; on-device encryption is not absolute; uninstalling deletes local data; PIN reset is a trade-off between weak and unrecoverable; no identity means no account recovery and no server-side alerts; it would change the earlier rule D-03 (see U-01). Full list in blueprint section 6.1 | **PROPOSED** |
| P-02 | **SOS in three tracks:** (1) hackathon prototype/simulation, labelled "Simulation: nothing was sent"; (2) first real implementation using the phone's SMS composer, user presses Send, wording "prepared / cancelled / not confirmed"; (3) future backend gateway with delivery reports | Honest increments; each track claims only what it can prove | Track 1 delivers nothing; Track 2 cannot confirm delivery and cannot send silently; Track 3 needs a backend, cost, carrier coverage and legal review | **PROPOSED** |
| P-03 | Hackathon MVP order (device verification, Quick Exit everywhere, SOS Track 1 then 2, verified content, recipients setup, assistant, safety plan, Safe Space, Awareness Center) | Realistic scope with honest labels | Depends on hackathon facts (U-11) and on verified content being available (U-13) | **PROPOSED** |
| P-04 | Assistant first version as rule-based guided help (Option A) or as AI through a backend proxy (Option B) | Option A is demonstrable without a backend | Option A is not AI and must be labelled so; Option B needs backend, provider and guardrails (U-05) | **PROPOSED** |

## Earlier assistant choices still awaiting approval
| ID | Item | Status |
|---|---|---|
| A-01 | English "With you... always" and French "Avec vous... toujours" as slogans | **OPEN.** Written by the assistant, never approved. D-07 (Arabic) is implemented, but these two texts remain unchanged and unapproved; wording for the approved slogan in English and French needs your approval (U-14) |
| A-02 | Splash descriptor "معلومات • دعم • حماية" with English and French versions | **OPEN.** Never approved by you; unchanged by Day 2.1 |
| A-03 | Female guide drawn from a cropped reference image (104x140 px, low resolution) | Used because no higher-resolution asset exists |

# Part 3: UNRESOLVED questions
### Product
- **U-01 Where do guest and account personal data live, and what does "account" add?** D-03 says personal features need an account; D-25 implies a guest can configure SOS recipients. The proposal P-01 (local-first) would let this data live on the device for everyone with the account as optional sync, but it is NOT approved. Options: (a) SOS recipients are a special case stored on the device for guests while other personal features need an account; (b) approve P-01 so all personal data is local-first; (c) require an account for any personal data, which contradicts D-25. Affects privacy, effort and where the guest/account line sits.
- **U-02 (largely resolved by D-22, D-25) Remaining detail of the SOS guidance screen:** which emergency numbers and guidance are shown, written in simple language in four languages. The Moroccan emergency numbers must be verified from official sources before display; they are not listed in these documents on purpose.
- **U-03 Quick Exit behaviour.** Reachability from every main screen is CONFIRMED (D-27). Still open: what it does. Options: neutral screen; clear navigation history so Back does not return; open a neutral website; send the app to the background. The app cannot close itself on iOS. Any wording must respect D-28.
- **U-08 Guardian (stays in scope by D-29).** Open: whether it is a separate feature, part of trusted contacts, or SOS follow-up check-ins; what it sends and how; consent for the guardian person.
- **U-09 Placement of new modules** (Awareness Center, Reporting Guide, SOS, Quick Exit) given the approved five-card Home design: more cards, a second row, a sub-menu, or a persistent SOS and Quick Exit control.
- **U-10 SOS gesture and cancellation window** (press-and-hold duration, countdown length, follow-up "I am safe" message).
- **U-11 Hackathon facts:** date, team size, and what must be demonstrable.
- **U-12 Legal review:** who checks Moroccan personal-data requirements and consent wording; who reviews legal content and safety wording.
- **U-13 Content ownership:** who writes and verifies legal text, the reporting procedures, the organization list, and who produces the awareness videos and audio. Without verified content, those screens stay structural.
- **U-14 Branding (OPEN, partly):** the approved slogan wording in **English and French is still unresolved** (the current texts are not approved; see A-01). The Arabic slogan is approved and applied (D-07). Also open: replace the Expo starter splash and icon.

### Technical
- **U-04 SOS delivery confirmation and organizations.** Verified in Expo SDK 58 docs: `expo-sms` opens the system SMS app, the user must press Send, Android always returns `unknown`; delivery cannot be confirmed (D-31). Confirmed delivery needs a backend gateway with delivery reports (Track 3: cost, Moroccan carrier coverage, legal review). Open: which track for the hackathon; which "supported specialized organizations" can be offered at all, since none has an agreed and tested integration.
- **U-05 Assistant backend:** provider, hosting, Darija quality, guardrails, no logging of guest chats by default, and how guests are rate-limited without an identity. A key must never be inside the app.
- **U-06 Authentication method:** email, phone number, or other; recovery flow; how a user at risk can sign in without exposing information to someone who shares the device.
- **U-07 Evidence encryption design:** where keys are stored (OS secure storage), whether files are encrypted individually, behaviour on lost phone, optional backup and its key handling, secure deletion limits. Needs a threat model and probably an independent review; also decide which Expo modules and libraries are acceptable.
- **U-15 Location:** foreground-only permission is assumed; behaviour with the phone locked is out of scope for the first version. Verify against SDK 58 `expo-location` docs at implementation time.
- **U-16 Speech:** Darija text-to-speech voice availability (`ar-MA`) and speech recognition options for Darija are unknown.
- **U-17 Video hosting:** where videos live, captions and subtitles in four languages, offline use, data cost for users.
- **U-18 Testing:** no formal device-testing pass or automated UI tests have been reported; the user reported that the app launched and worked on her physical phone, but that is not a complete device test or verification of individual behaviours. Decide the minimum test set before the demo; untested behaviours remain UNVERIFIED.
- **U-19 Notifications:** which events notify, neutral wording, and permissions.

## Contradictions and remaining gaps (after the final correction)
Resolved: guest SOS behaviour (D-22, D-25), Quick Exit reachability and independence (D-26 to D-28), Guardian kept in scope (D-29), SMS-composer wording rules (D-31).

Still open:
1. Slogan: the approved Arabic slogan is now applied in Darija and Modern Standard Arabic (D-07, Day 2.1, phone-checked on the Splash). English and French still show the older unapproved wording, so those two languages are inconsistent with the brand slogan until U-14 / A-01 is resolved.
2. D-03 (personal features need an account) versus D-25 (a guest can configure SOS recipients): see U-01 and proposal P-01.
3. D-24 requires a success or failure display, but the phone's SMS composer cannot confirm delivery (U-04, D-31). The display must say "not confirmed". Only Track 3 can report delivery, and only as the gateway reports it.
4. D-23 allows "supported specialized organizations", but none has an agreed and tested integration (U-04, U-13).
5. D-30 keeps ten modules, D-22 requires a visible SOS and D-27 a Quick Exit on every main screen, while the approved Home has five cards (U-09). Persistent controls are the likely answer but are not decided.
6. Quick Exit is separate (D-26) but still sits inside My Safety in the app, and its behaviour is undecided (U-03).
7. Guardian is kept (D-29) but its role is undefined (U-08).
