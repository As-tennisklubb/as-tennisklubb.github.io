#!/usr/bin/env node

/**
 * Design Lint � �s Tennisklubb
 *
 * Scans Astro files for patterns that violate the component-based design system
 * defined in src/components/ (primitives/, ui/, content/, layout/).
 *
 * Usage:
 *   node scripts/design-lint.js                        # scan all pages + layouts
 *   node scripts/design-lint.js src/pages/index.astro   # scan one file
 *
 * Ignore mechanism:
 *   Place <!-- design-lint-ignore --> on its own line to suppress any lint
 *   violation whose match starts on the immediately following line.
 *
 *   Example:
 *     <!-- design-lint-ignore -->
 *     <table class="custom-table">   ? this line will not trigger inline-table
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

// ??? Configuration ??????????????????????????????????????????????????????????

const ROOT = resolve(import.meta.dirname, "..");

const SCAN_DIRS = ["src/pages", "src/layouts"];

/**
 * Files that are part of the design system itself and may use raw Tailwind.
 * Layout.astro is the site shell (header, nav, footer) where component
 * abstractions like <PageBlock> and <PageHeader> do not apply.
 */
const IGNORE_PATHS = ["src/components/", "src/styles/", "src/layouts/"];

/**
 * Normalize a file path to always use forward slashes.
 * Ensures consistent path comparison across macOS, Linux, and Windows.
 */
function normalizePath(p) {
  return p.replace(/\\/g, "/");
}

// ??? Rules ??????????????????????????????????????????????????????????????????

/**
 * Each rule has:
 *   id        � short key used in output
 *   pattern   � RegExp tested against the full template string (run with g flag)
 *   message   � human-readable suggestion
 *   severity  � "warning" | "error"
 *
 * Patterns use [^"']* to stay within attribute values. Because [^"'] already
 * matches newlines, these patterns correctly handle multiline class attributes
 * without needing the dotAll (s) flag.
 */
const rules = [
  // 1. Inline container patterns
  {
    id: "inline-container",
    pattern: /class\s*=\s*["'][^"']*max-w-(?:3xl|4xl|6xl)[^"']*mx-auto[^"']*/,
    message: "Inline container detected. Use <PageBlock> instead.",
    severity: "warning",
  },
  {
    id: "inline-container-reverse",
    pattern: /class\s*=\s*["'][^"']*mx-auto[^"']*max-w-(?:3xl|4xl|6xl)[^"']*/,
    message: "Inline container detected. Use <PageBlock> instead.",
    severity: "warning",
  },

  // 2. Inline card styling
  {
    id: "inline-card",
    pattern: /class\s*=\s*["'][^"']*rounded-xl[^"']*\bp-6\b[^"']*border\b/,
    message: "Inline card/box styling detected. Use <Card> or <Callout> instead.",
    severity: "warning",
  },
  {
    id: "inline-card-alt",
    pattern: /class\s*=\s*["'][^"']*\bborder\b[^"']*rounded-xl[^"']*\bp-6\b/,
    message: "Inline card/box styling detected. Use <Card> or <Callout> instead.",
    severity: "warning",
  },

  // 3. Inline button styling
  {
    id: "inline-button",
    pattern: /class\s*=\s*["'][^"']*inline-flex[^"']*px-6[^"']*py-3[^"']*rounded-full/,
    message: "Inline button styling detected. Use <Button> instead.",
    severity: "warning",
  },

  // 4. Direct brand colors in pages (not via component)
  {
    id: "direct-brand-bg",
    pattern: /class\s*=\s*["'][^"']*\bbg-brand-\d+\b/,
    message: "Direct bg-brand-* usage. Use <PageHeader>, <Box>, or semantic tokens instead.",
    severity: "warning",
  },
  {
    id: "direct-accent-bg",
    pattern: /class\s*=\s*["'][^"']*\bbg-accent-\d+\b/,
    message:
      'Direct bg-accent-* usage. Use <Button variant="secondary">, <LinkCard>, or .surface-accent instead.',
    severity: "warning",
  },

  // 5. Inline grid that should be HGrid
  {
    id: "inline-grid",
    pattern: /class\s*=\s*["'][^"']*\bgrid\b[^"']*gap-6[^"']*md:grid-cols/,
    message: "Inline card grid detected. Use <HGrid> instead.",
    severity: "warning",
  },
  {
    id: "inline-grid-alt",
    pattern: /class\s*=\s*["'][^"']*\bgrid\b[^"']*md:grid-cols[^"']*gap-6/,
    message: "Inline card grid detected. Use <HGrid> instead.",
    severity: "warning",
  },

  // 6. Inline prose styling (should use Prose)
  {
    id: "inline-prose",
    pattern: /class\s*=\s*["'][^"']*\bprose\b[^"']*prose-brand/,
    message: "Inline prose classes detected. Use <Prose> instead.",
    severity: "warning",
  },

  // 7. Inline section spacing (should use VStack with gap)
  //    Catches common large bottom-margins (mb-12 and above) on <section> elements.
  {
    id: "inline-section-mb",
    pattern: /<section[^>]*class\s*=\s*["'][^"']*\bmb-(?:12|16|20|24)\b/,
    message: "Inline section with large bottom margin. Use <VStack> with gap for consistent spacing.",
    severity: "warning",
  },

  // 8. Inline link colors (should use <Link> component)
  {
    id: "inline-link-color",
    pattern: /class\s*=\s*["'][^"']*\btext-brand-700[^"']*hover:underline/,
    message: "Inline link styling detected. Use the <Link> component instead.",
    severity: "warning",
  },
  {
    id: "inline-link-color-accent",
    pattern: /class\s*=\s*["'][^"']*\btext-accent-700[^"']*hover:underline/,
    message: "Inline accent link styling detected. Use the <Link> component instead.",
    severity: "warning",
  },

  // 9. Raw color tokens (non-role-based)
  //    Catches both plain utilities and Tailwind prefixed variants such as
  //    hover:bg-green-500, dark:text-green-700, ring-orange-300, etc.
  //    The optional (?:[\w-]+:)* handles arbitrary modifier chains.
  {
    id: "raw-green",
    pattern:
      /class\s*=\s*["'][^"']*\b(?:[\w-]+:)*(?:bg|text|border|ring|outline|from|via|to)-green-\d+\b/,
    message: "Raw green-* color token. Use brand-* tokens instead.",
    severity: "error",
  },
  {
    id: "raw-orange",
    pattern:
      /class\s*=\s*["'][^"']*\b(?:[\w-]+:)*(?:bg|text|border|ring|outline|from|via|to)-orange-\d+\b/,
    message: "Raw orange-* color token. Use accent-* tokens instead.",
    severity: "error",
  },

  // 10. Inline table styling (should use <DataTable> component)
  //     Uses [^"']* in the lookahead so the check stays within the attribute
  //     value and works correctly for multiline class attributes.
  {
    id: "inline-table",
    pattern: /<table[^>]*class\s*=\s*["'](?![^"']*\bdata-table\b)/,
    message: "Table without <DataTable> component. Use <DataTable> instead.",
    severity: "warning",
  },

  // 11. Manual bullet list (should use List + ListItem)
  {
    id: "inline-bullet-list",
    pattern: /<ul[^>]*class\s*=\s*["'][^"']*list-disc/,
    message: "Manual bullet list styling detected. Use <List> + <ListItem> instead.",
    severity: "warning",
  },
];

// ??? Scanner ????????????????????????????????????????????????????????????????

function collectFiles(dir, ext = ".astro") {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectFiles(fullPath, ext));
    } else if (entry.name.endsWith(ext)) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Extract the template portion of an Astro file.
 *
 * - If frontmatter (--- � ---) exists, returns everything after it.
 * - If no frontmatter is found, returns the entire file.
 *
 * Returns { template, lineOffset } where lineOffset is the number of
 * lines consumed by the frontmatter block so match positions can be
 * mapped back to original file line numbers.
 *
 * BUG FIX: the previous version required frontmatterCount >= 2 before
 * emitting any lines, which meant files without frontmatter produced
 * zero template lines and were silently skipped.
 */
function extractTemplate(source) {
  const lines = source.split("\n");
  const firstLine = lines[0] ? lines[0].replace(/\r$/, "").trim() : "";

  if (firstLine === "---") {
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].replace(/\r$/, "").trim() === "---") {
        // Template is everything after the closing ---
        const template = lines.slice(i + 1).join("\n");
        return { template, lineOffset: i + 1 };
      }
    }
    // No closing --- found (malformed frontmatter) � lint entire file as fallback
  }

  // No frontmatter � lint the entire file
  return { template: source, lineOffset: 0 };
}

/**
 * Compute the 1-based original line number for a character index within
 * the template string.
 */
function getLineNumber(template, index, lineOffset) {
  let line = 1;
  for (let i = 0; i < index && i < template.length; i++) {
    if (template[i] === "\n") line++;
  }
  return line + lineOffset;
}

/**
 * Build a Set of line numbers that should be ignored.
 *
 * A <!-- design-lint-ignore --> comment suppresses every lint violation
 * whose match starts on the immediately following line.
 */
function getIgnoredLines(template, lineOffset) {
  const ignored = new Set();
  const re = /<!--\s*design-lint-ignore\s*-->/g;
  let m;
  while ((m = re.exec(template)) !== null) {
    const commentLine = getLineNumber(template, m.index, lineOffset);
    ignored.add(commentLine + 1);
  }
  return ignored;
}

/**
 * Lint a single file by running every rule against the full template string.
 *
 * This approach (instead of per-line matching) correctly detects violations
 * in multiline class attributes, multiline element tags, and similar patterns
 * that the previous line-by-line scanner would miss.
 */
function lintFile(filePath) {
  const source = readFileSync(filePath, "utf-8");
  const { template, lineOffset } = extractTemplate(source);
  const findings = [];
  const ignoredLines = getIgnoredLines(template, lineOffset);

  for (const rule of rules) {
    // Build a global copy of the pattern so we can iterate all matches.
    const flags = rule.pattern.flags.replace(/g/g, "") + "g";
    const globalPattern = new RegExp(rule.pattern.source, flags);

    let match;
    while ((match = globalPattern.exec(template)) !== null) {
      // Guard against zero-length matches that would stall the loop.
      // Not triggered by current rules, but protects against future patterns.
      if (match[0].length === 0) {
        globalPattern.lastIndex++;
        continue;
      }

      const line = getLineNumber(template, match.index, lineOffset);

      // Skip lines suppressed by <!-- design-lint-ignore -->
      if (ignoredLines.has(line)) continue;

      // Skip matches that fall inside HTML comments (simple heuristic)
      const before = template.slice(0, match.index);
      const lastOpen = before.lastIndexOf("<!--");
      const lastClose = before.lastIndexOf("-->");
      if (lastOpen > lastClose) continue;

      // Build a short source excerpt � collapse whitespace and truncate
      const raw = match[0].replace(/\s+/g, " ").trim();
      const excerpt = raw.length > 80 ? raw.slice(0, 80) + "�" : raw;

      findings.push({
        file: normalizePath(relative(ROOT, filePath)),
        line,
        rule: rule.id,
        severity: rule.severity,
        message: rule.message,
        source: excerpt,
      });
    }
  }

  return findings;
}

// ??? Main ???????????????????????????????????????????????????????????????????

const args = process.argv.slice(2);
let files;

if (args.length > 0) {
  files = args.map((a) => resolve(a));
} else {
  files = SCAN_DIRS.flatMap((d) => {
    const abs = resolve(ROOT, d);
    try {
      statSync(abs);
      return collectFiles(abs);
    } catch {
      return [];
    }
  });
}

// Filter out component/style files (OS-safe path comparison)
files = files.filter((f) => {
  const rel = normalizePath(relative(ROOT, f));
  return !IGNORE_PATHS.some((ip) => rel.startsWith(ip));
});

let totalWarnings = 0;
let totalErrors = 0;
const allFindings = [];

for (const file of files) {
  const findings = lintFile(file);
  allFindings.push(...findings);
  totalWarnings += findings.filter((f) => f.severity === "warning").length;
  totalErrors += findings.filter((f) => f.severity === "error").length;
}

// ??? Output ?????????????????????????????????????????????????????????????????

const RESET = "\x1b[0m";
const YELLOW = "\x1b[33m";
const RED = "\x1b[31m";
const GRAY = "\x1b[90m";
const BOLD = "\x1b[1m";
const CYAN = "\x1b[36m";
const DIM = "\x1b[2m";

if (allFindings.length === 0) {
  console.log(`\n${BOLD}? Design lint: no violations found.${RESET}\n`);
  process.exit(0);
}

console.log(`\n${BOLD}?? Design Lint � �s Tennisklubb${RESET}\n`);

// Group by file
const byFile = {};
for (const f of allFindings) {
  (byFile[f.file] ??= []).push(f);
}

for (const [file, findings] of Object.entries(byFile)) {
  // Stable sort: line number first, then rule id for deterministic output
  findings.sort((a, b) => a.line - b.line || a.rule.localeCompare(b.rule));
  console.log(`${CYAN}${file}${RESET}`);
  for (const f of findings) {
    const sev = f.severity === "error" ? `${RED}ERROR${RESET}` : `${YELLOW}WARN${RESET}`;
    console.log(
      `  ${GRAY}line ${f.line}${RESET}  ${sev}  ${f.message}  ${GRAY}(${f.rule})${RESET}`,
    );
    if (f.source) {
      console.log(`  ${DIM}${f.source}${RESET}`);
    }
  }
  console.log();
}

console.log(
  `${BOLD}Summary:${RESET} ${totalErrors} error(s), ${totalWarnings} warning(s) in ${files.length} file(s)\n`,
);
process.exit(totalErrors > 0 ? 1 : 0);
