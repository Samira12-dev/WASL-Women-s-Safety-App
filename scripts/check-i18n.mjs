// Dependency-free consistency check for the four WASL dictionaries.
// Run with: npm run check:i18n
// The dictionaries are read as plain text (not imported), so the script works on every
// Node version supported by Expo SDK 58 (^22.13 || ^24.3 || ^26) without TypeScript loaders.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dictDir = join(root, 'src', 'localization', 'translations');

// Matches entries such as  'key.name': 'value',  (the value may sit on the next line).
const ENTRY_PATTERN = /^\s*'([A-Za-z0-9.]+)':\s*('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")\s*,?\s*$/gm;

const load = (file) => {
  const source = readFileSync(join(dictDir, file), 'utf8');
  const entries = {};
  for (const [, key, quoted] of source.matchAll(ENTRY_PATTERN)) {
    entries[key] = quoted.slice(1, -1);
  }
  // Guard against entries the parser could not read (it would hide missing keys).
  const declared = (source.match(/^\s*'[A-Za-z0-9.]+':/gm) ?? []).length;
  if (declared !== Object.keys(entries).length) {
    console.error(`i18n check FAILED: could not parse every entry in ${file}`);
    process.exit(1);
  }
  return entries;
};

const dictionaries = {
  darija: load('darija.ts'),
  ar: load('arabic.ts'),
  en: load('english.ts'),
  fr: load('french.ts'),
};

const failures = [];
const fail = (message) => failures.push(message);
const referenceKeys = Object.keys(dictionaries.ar);

for (const [code, dictionary] of Object.entries(dictionaries)) {
  const keys = Object.keys(dictionary);
  for (const key of referenceKeys) {
    if (!(key in dictionary)) fail(`[${code}] missing key: ${key}`);
  }
  for (const key of keys) {
    if (!referenceKeys.includes(key)) fail(`[${code}] extra key: ${key}`);
    if (typeof dictionary[key] !== 'string' || dictionary[key].trim() === '') {
      fail(`[${code}] empty value: ${key}`);
    }
  }
}

// Darija is written in Arabic script; allow only the brand name in Latin letters.
for (const [key, value] of Object.entries(dictionaries.darija)) {
  if (/[A-Za-z]/.test(value.replace(/WASL/g, ''))) {
    fail(`[darija] Latin letters in value: ${key}`);
  }
}

// Every translation key referenced in source code must exist.
const KEY_PATTERN =
  /'((?:common|nav|home|rights|assistant|help|safe|safety|companion|splash|welcome)\.[A-Za-z0-9.]+)'/g;

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return name === 'translations' ? [] : walk(path);
    return /\.(ts|tsx)$/.test(name) ? [path] : [];
  });

for (const file of walk(join(root, 'src'))) {
  for (const match of readFileSync(file, 'utf8').matchAll(KEY_PATTERN)) {
    if (!referenceKeys.includes(match[1])) {
      fail(`unknown key '${match[1]}' used in ${file.replace(root, '.')}`);
    }
  }
}

if (failures.length > 0) {
  console.error(`i18n check FAILED (${failures.length} problem(s)):`);
  failures.forEach((message) => console.error(` - ${message}`));
  process.exit(1);
}

console.log(
  `i18n check passed: ${referenceKeys.length} keys x ${Object.keys(dictionaries).length} languages, no missing/extra/empty keys, no unknown keys in src.`,
);
