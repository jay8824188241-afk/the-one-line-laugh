import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const JOKE =
  "I set my alarm for 6 a.m. to start the day early, and my snooze button has now seen more sunrises than I have.";

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

function selfCheck(text: string): void {
  const trimmed = text.trim();
  if (trimmed !== JOKE) {
    throw new Error("self-check failed: output does not match the joke verbatim");
  }
  if (trimmed.includes("\n")) {
    throw new Error("self-check failed: the joke must be a single line");
  }
  if (trimmed.split(/\s+/).length < 10) {
    throw new Error("self-check failed: joke looks truncated");
  }
  if (!trimmed.endsWith(".")) {
    throw new Error("self-check failed: joke must end with a period");
  }
}

mkdirSync(OUT_DIR, { recursive: true });

// First write: the original one-line joke, verbatim.
writeFileSync(OUT_FILE, JOKE + "\n", "utf8");

// Revision pass: read back, self-check, then rewrite to confirm the final
// output is exactly the joke (single line, verbatim, trailing newline).
const written = readFileSync(OUT_FILE, "utf8");
selfCheck(written);
writeFileSync(OUT_FILE, JOKE + "\n", "utf8");
selfCheck(readFileSync(OUT_FILE, "utf8"));

console.log("Wrote one-line joke to /output/entry.txt");
