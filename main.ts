// main.ts — copies the entry image to the output directory.
// Runs on Node 22, standard library only, no network access.
// The output directory comes from MAKEFUN_OUTPUT_DIR; without it,
// the writable /output directory of the grading container is used.
//
// The copy is deterministic by construction: it moves the file's bytes
// unchanged, so two runs always produce byte-identical output.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = resolve(fileURLToPath(new URL(".", import.meta.url)));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const source = join(repoDir, "entry.png");

if (!existsSync(source)) {
  throw new Error(`entry image not found: ${source}`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, join(outDir, "entry.png"));
