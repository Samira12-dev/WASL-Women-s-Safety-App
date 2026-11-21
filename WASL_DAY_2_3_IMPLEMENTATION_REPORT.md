# WASL Day 2.3 Implementation Report: Welcome Screen and Guest/Account Entry

Date: 2026-11-21

## 1. Initial project state and inspected files
- Git: single commit `33628e4 Initial commit`; all earlier WASL work is uncommitted. Existing user changes (for example `src/components/app-tabs.web.tsx`) were preserved.
- Flow before this task: Splash (`src/app/index.tsx`, also `/splash`) went directly to `/home` with `router.replace('/home')`. No welcome, guest or account screen existed.
- A dev server (`expo start --go --tunnel`, port 8081) was already running, started by you. I did not start, stop or restart it.

Inspected: `src/app/index.tsx`, `src/app/splash.tsx`, `src/app/_layout.tsx`, `src/app/home.tsx`, `src/app/safety.tsx` (route usage), the four translation files and `translations/index.ts`, `src/hooks/use-localization.tsx`, `use-layout.ts`, `src/constants/design.ts`, `src/components/ui/{screen-shell,wasl-button,wasl-card,status-badge,wasl-guide-image,wasl-icon}.tsx`, `src/types/index.ts`, `tsconfig.json`, `.expo/types/router.d.ts`, `scripts/check-i18n.mjs`, `git status`.

### Day 2.1 report check (read only, not modified)
I read `WASL_DAY_2_1_IMPLEMENTATION_REPORT.md` in full. Its content is consistent with the work done (two translation files changed, checks passed, English and French unchanged). The file's creation time is 15:26:56 and its last write time is 15:33:06; the later write is not from me, and I cannot tell from the file what caused it (an editor save is the most likely explanation). I found no content inconsistency, so I raise it only as a note. I did not overwrite or reconstruct it.

### Smallest safe plan (applied)
1. New route `welcome` for the welcome screen.
2. New route `account-soon` for the "account still being prepared" explanation.
3. Splash: one-line change so it goes to `/welcome` instead of `/home`.
4. Register both routes in `_layout.tsx`.
5. Add 11 translation keys to each of the four dictionaries.
6. Add the `welcome` key prefix to `scripts/check-i18n.mjs` so the new keys are checked too.
No dependency, no storage, no authentication.

## 2. Files changed
| File | Change |
|---|---|
| `src/app/welcome.tsx` | **New.** Welcome screen |
| `src/app/account-soon.tsx` | **New.** Account explanation screen |
| `src/app/index.tsx` | Splash now calls `router.replace('/welcome')` (one line) |
| `src/app/_layout.tsx` | Registered `welcome` and `account-soon` |
| `src/localization/translations/darija.ts`, `arabic.ts`, `english.ts`, `french.ts` | Added 11 keys each (appended; no existing value changed) |
| `scripts/check-i18n.mjs` | Added `welcome` to the key-prefix list used to find unknown keys |
| `WASL_DAY_2_3_IMPLEMENTATION_REPORT.md` | This report |

## 3. Exact Darija copy implemented
Compared character by character with your text using a temporary UTF-8 script (outside the project): all 8 strings plus the slogan match exactly.

| Key | Darija value |
|---|---|
| `welcome.title` | مرحبا بيكِ فـ WASL 💜 |
| `welcome.heading` | هنا صوتك مسموع، وراحتك كتهمّنا. |
| `welcome.description` | خدي وقتك، قلّبي على المعلومة اللي محتاجاها، واختاري الخطوة اللي مناسبة ليك. |
| `welcome.guest.button` | بغيت ندخل كضيفة |
| `welcome.guest.desc` | تصفحي الحقوق والمعلومات، طرحي أسئلتك واستافدي من المساعدة العامة، بلا ما تحتاجي تفتحي حساب. |
| `welcome.account.button` | عندي حساب |
| `welcome.account.desc` | دخلي لحسابك باش تستافدي من الخصائص الشخصية ديالك. |
| `welcome.privacy` | خصوصيتك مهمة عندنا. نتي اللي كتختاري شنو تشاركي ووقتاش. |
| Footer | the existing key `splash.slogan` = معاكِ... خطوة بخطوة (not duplicated, so there is one source of truth) |

Three extra Darija strings were **not in your brief** and are **my wording**, for the account explanation screen (please review):
- `welcome.account.soon.title`: الحساب مازال قيد التحضير
- `welcome.account.soon.body`: خاصية الحساب مازال كنحضّروها. دابا تقدري تدخلي كضيفة وتستافدي من المعلومات والمساعدة العامة بلا حساب. ما دخلتيش لأي حساب.
- `welcome.account.soon.back`: رجعي لصفحة الترحيب

## 4. Translation summary
Arabic, English and French for all 11 keys were written by me and are **not approved**; they are simple, faithful translations of the Darija meaning. The approved slogan was not changed.
- **Arabic (MSA):** feminine address, for example "أهلاً بكِ في WASL 💜", "أريد الدخول كضيفة", "لديّ حساب".
- **English:** "Welcome to WASL 💜", "Continue as a guest", "I have an account".
- **French:** formal "vous" like the rest of the app, "Bienvenue sur WASL 💜", "Continuer comme invitée", "J’ai un compte".
- The footer in English and French is the existing, **still unapproved** slogan text ("With you... always", "Avec vous... toujours"), because it reuses `splash.slogan` (U-14 / A-01 stay open).
- No existing translation was changed. Key count: 169 per language (158 before + 11 new: 8 welcome copy keys and 3 account-explanation keys).

## 5. Navigation and button behaviour
- **Splash -> Welcome:** tap anywhere (`router.replace('/welcome')`, existing double-tap guard kept).
- **Guest button:** `router.replace('/home')` to the existing Home. No registration, no login, no data stored. Because it replaces the screen, Back from Home does not return to the Welcome screen (same behaviour as before for Splash).
- **Account button:** `router.push('/account-soon')`. The screen shows a friendly "still being prepared" message, states that the user is not signed in to any account, and offers a "back to the welcome page" button (plus the header Back button and the system back gesture). The button uses `router.back()`, or `router.replace('/welcome')` if the screen was opened directly.
- Nothing is saved, nothing is sent, no fake sign-in.

## 6. Design
Existing WASL identity only: same header (brand mark, WASL, language selector), palette, 56 dp buttons, `SurfaceCard`, `NoticeCard`. The existing female guide image is kept (in a rounded frame, so its rectangle does not look like a stray box). Guest and Account are visually different: Guest is a tinted lilac card with a filled primary button; Account is a white card with an outlined button and a lock icon. The language selector is available on the Welcome screen. Home and Splash were not redesigned (Splash only changed its destination).

## 7. Tests and actual results
| Check | Result |
|---|---|
| `npm run check:i18n` | `i18n check passed: 169 keys x 4 languages, no missing/extra/empty keys, no unknown keys in src.` exit 0 |
| `npx tsc --noEmit` | no output, exit 0 |
| `npx expo lint` | no output, exit 0 |
| `npx expo export --platform android` (temp dir, deleted) | exit 0 |
| `npx expo export --platform ios` (temp dir, deleted) | exit 0 |
| Exact Darija copy comparison | all 9 strings equal |

### Browser (web preview) checks performed by me
I used your already running dev server in a browser at a 412 x 915 viewport. **This is a web preview, not a phone and not Android/iOS.**
| Check | Result |
|---|---|
| Splash -> Welcome | Passed: URL changed to `/welcome` |
| Welcome content in Darija | Passed: all copy visible, screenshot reviewed |
| Guest -> existing Home | Passed: URL `/home`, existing Home content shown |
| Account -> explanation | Passed: URL `/account-soon`, message shown |
| Return to Welcome from explanation | Passed: URL `/welcome` |
| Darija and Arabic RTL | Passed: header mirrored (language button on the left), text right-aligned, forward chevron points left |
| English and French LTR | Passed: language button on the right, left-aligned text, correct translated copy |
| Page errors during the full flow | None captured |
A transient `Radius is not defined` error appeared once in the dev server because hot reload picked up the file between two of my consecutive edits (styles first, import second). It disappeared after the import was added and did not recur. If your phone was open at that moment it may have shown a brief error screen; reloading fixes it.

## 8. Manual / device checks still pending (not performed by me)
I did **not** test on Android or iOS and make no device-verification claim. Please check on your phone: Splash -> Welcome; Guest -> Home; Account -> explanation -> back to Welcome; Darija and Arabic RTL; English and French LTR; emoji 💜 rendering in the title; the guide image frame; text size and touch comfort; Android back button and iOS back gesture on each screen; TalkBack/VoiceOver reading order.

## 9. Warnings and unresolved items
1. **Gendered copy:** your Darija text addresses a woman (feminine forms). I kept that in Arabic and French ("invitée", "connectée"). English is neutral. Confirm this is intended for all users.
2. **Copy versus reality:** the Guest description invites users to "ask your questions and use general help", but the assistant is not connected and only gives a local demo reply (its own screen says so). Not changed, because the copy is yours.
3. **Welcome shows on every launch** (no stored guest choice). Whether to remember the choice is a product decision; it would need storage, which this task excluded.
4. **Brand name in Darija:** the header shows "وصل" (existing `common.appName`) while the new title uses "WASL". Existing inconsistency, not changed.
5. **Darija wording overall:** only the new text was written or adopted. Existing Darija strings were deliberately not changed (brief: no unrelated translation changes). A wider Darija tone review remains a separate task.
6. **Web-only console error on Home (pre-existing):** nested `<button>` inside `<button>` hydration warning. Not caused by this task and not fixed; it concerns the web preview only.
7. **U-14 / A-01** (English and French slogan) and **A-02** (descriptor) remain open.
8. **U-01 and U-06** were not decided: no storage, no authentication method, no recovery flow. Documents (blueprint, roadmap, decisions log) were not updated for the new screens; that is a separate documentation task.
9. The typed-routes file `.expo/types/router.d.ts` (git-ignored, generated) was refreshed by your running dev server, which is why `tsc` accepted the new routes.

## 10. Confirmations
- **No authentication, backend, credentials, registration or login was invented.** The Account button leads to an explanation only; the user is never shown as logged in.
- No persistent personal-data storage was added.
- SOS, Quick Exit, Guardian and Safe Space were not touched.
- No dependency was added or removed; `package.json`, `package-lock.json` and `app.json` were not modified (last write times unchanged: 13:07:31, 12:08:09, 13:07:08).
- No unrelated file was changed: only the files listed in section 2 changed under `src` and `scripts`.
- Existing reports, including the Day 2.1 report, were not modified.
- No commit, no push, no destructive Git command; history still shows only `33628e4 Initial commit`.
