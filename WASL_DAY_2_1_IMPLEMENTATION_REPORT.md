# WASL Day 2.1 Implementation Report: Approved Brand Slogan

Date: 2026-11-21

## Objective
Apply the approved Arabic brand slogan **معاكِ... خطوة بخطوة** to Moroccan Darija (Arabic script) and Modern Standard Arabic. English, French and the Splash descriptor are out of scope.

## Files inspected
- `src/app/index.tsx` (Splash screen): lines 34 and 35 already render the slogan and descriptor through the translation system, as `t('splash.slogan')` and `t('splash.descriptor')`. No change was needed.
- `src/app/splash.tsx`: re-exports `index.tsx`, so it shows the same slogan.
- `src/localization/translations/darija.ts`, `arabic.ts`, `english.ts`, `french.ts`: located the `splash.slogan` key in each.
- `WASL_DAY_1_4_FINAL_AUDIT_REPORT.md`: read for context only, not changed.
- Search of `src` for `splash.slogan` and `splash.descriptor`: only the Splash screen and the four dictionaries use them.

## Files changed
| File | Change |
|---|---|
| `src/localization/translations/darija.ts` | `splash.slogan` changed from `معك... دائماً` to the approved slogan |
| `src/localization/translations/arabic.ts` | `splash.slogan` changed from `معك... دائماً` to the approved slogan |

Nothing else was changed in the project. This report is the only new file.

## Exact slogan values applied
| Language | Key | Value now |
|---|---|---|
| Darija (Arabic script) | `splash.slogan` | `معاكِ... خطوة بخطوة` |
| Modern Standard Arabic | `splash.slogan` | `معاكِ... خطوة بخطوة` |

Verified by comparing both file values with the approved text, character for character (case-sensitive): both are identical. The text includes the kasra mark (U+0650) after the kaf, as in the approved slogan.

## English and French unchanged
| Language | Value (unchanged) |
|---|---|
| English | `With you... always` |
| French | `Avec vous... toujours` |

I did not write, approve or translate any English or French slogan. These two values are the older wording written earlier by the assistant and are **not approved**. They are still **unresolved under U-14 (and A-01)**. Until you provide approved wording, English and French users see these old, unapproved texts, which no longer match the Arabic slogan.

## Splash descriptor
Not changed. `splash.descriptor` keeps its current values in all four languages. Its approval remains unresolved under **A-02**.

## Splash screen check
The slogan is displayed through the existing translation system (`t('splash.slogan')` in `src/app/index.tsx`). The code was not modified. I did not run the app or look at the Splash on a device, so the visual rendering of the new text (for example the position of the kasra mark in the chosen font) is **not verified**.

## Tests executed and actual results
| Command | Result |
|---|---|
| `npm run check:i18n` | `i18n check passed: 158 keys x 4 languages, no missing/extra/empty keys, no unknown keys in src.` Exit 0 |
| `npx tsc --noEmit` | No output, exit 0 |
| `npx expo lint` | No output, exit 0 |
| Character comparison of the slogan in the four files | Darija: identical to approved. Arabic: identical to approved. English and French: different, as intended |

No check failed. I did not run `expo-doctor` or the Android and iOS bundle exports, because they were not requested.

## Warnings and unresolved issues
1. **U-14 / A-01 (open):** English and French slogan wording still unapproved. This is also what keeps those languages inconsistent with the brand slogan.
2. **A-02 (open):** the Splash descriptor is still unapproved in all languages.
3. **Visual check pending:** please look at the Splash on your phone in Darija and Arabic. The tagged `WASL_DAY_1_4_FINAL_AUDIT_REPORT.md` still lists the approved slogan as "not yet applied in code"; that statement is now out of date. I did not edit that file or the roadmap, blueprint or decisions log, as instructed.
4. The Darija check in `check:i18n` only verifies that there are no Latin letters; it does not check the slogan text itself.

## Confirmation of boundaries
- No screen was redesigned, and navigation and all other translations were not touched.
- No dependency was added or removed; `package.json` and `package-lock.json` were not modified (last modified earlier today, before this task).
- No unrelated file was modified: only the two translation files above changed in the project (confirmed by file modification times).
- Product decisions, roadmap and blueprint were not changed.
- No commit and no push were made; Git history still shows only `33628e4 Initial commit`.
- Existing user changes were preserved.
