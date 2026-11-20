// gta6-meme-x-01 — "WANTED: the make.fun ghost" entry program.
//
// The entry itself is a post on X: a GTA 6 meme (a Vice City police WANTED
// poster starring the make.fun ghost) posted from a public account, with
// make.fun and the play code in its text. This program does exactly one
// thing: it hands the house the post's address by copying POST.json from
// the repository into the output directory, byte for byte. The house then
// reads the post from X itself — its first picture and its text — and that
// is what the judge sees. Nothing this program writes is judged.
//
// Run locally the same way the grader runs it:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// and out/POST.json will match this directory's POST.json exactly.

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(OUTPUT_DIR, { recursive: true });

try {
  copyFileSync(join(BOT_DIR, "POST.json"), join(OUTPUT_DIR, "POST.json"));
  // Fail loudly on a malformed POST.json instead of handing the gate a
  // file it cannot read: it must be a JSON object with a url string.
  const post = JSON.parse(readFileSync(join(OUTPUT_DIR, "POST.json"), "utf8")) as unknown;
  if (typeof post !== "object" || post === null || typeof (post as { url?: unknown }).url !== "string") {
    throw new Error("POST.json is not a JSON object with a url string");
  }
} catch (err) {
  console.error(`POST.json could not be handed over from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
