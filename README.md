# Lemma

A mathematics study library with a collapsible competition → subject → topic index and locally vendored KaTeX.

## Scope

- **BMO:** 16 populated topics across algebra, combinatorics, geometry, and number theory.
- **BMT:** 10 populated topics across Algebra, Calculus, Discrete, Geometry, and Team Rounds (Guts and Power). The four Focus subjects follow the official classification; Team Rounds is a navigation group.
- **TMUA, STEP, University Interview:** category structures only, with no populated notes, exercises, or past-paper collections.
- **Language:** Chinese technique names alongside English terminology; Chinese explanations and hints; English questions and solutions.
- **Practice:** 49 distinct official past-paper questions (29 BMO, 20 BMT), assigned to 52 relevant topic placements, plus 22 original/classical exercises. Every populated topic has at least two official exercises. Statements are independently restated and link to their original papers; solutions are independently authored.

## Features

- Animated slide-out index: a modal overlay on mobile and a non-modal push sidebar from 1024px upward.
- Reserved desktop margins keep content width and line wrapping constant when the sidebar is toggled.
- All 111 techniques include a method, an illustrative example, and a specific pitfall.
- Technique marks highlight the entire block and its corresponding reading-outline entry, and persist locally.
- The right outline shows techniques within the current topic. It tracks the topmost visible heading and advances when at least half of that heading is hidden by the sticky header.
- Topic search, saved topics, per-problem review status, and recent reading.
- Chinese hints and English solutions/proofs expand inline, with distinct colours. Review controls share the same action row.
- Explicit TeX is converted by KaTeX 0.19.1 to semantic native MathML, including stacked fractions. No CDN or downloaded font is needed at runtime.
- Browser-local notes, links, and file attachments with JSON backup import/export.
- Responsive layouts, keyboard access, native modal focus management, and reduced-motion support.

## Run locally

No package installation or build is required. With Node.js installed:

```sh
node scripts/serve.mjs
```

Open the URL printed by the server. Validate content and JavaScript syntax with:

```sh
node scripts/check-content.mjs
node scripts/check-math.mjs
node scripts/check-study-state.mjs
```

With the preview server running, `node scripts/check-browser.mjs` uses an existing Windows Edge installation and a new isolated profile under ignored `artifacts/`. It checks all populated topics at 1440, 1024, 391 and 320 pixels. `node scripts/check-sources.mjs` checks official PDF links and needs network access.

## Content editing

- `site/dist/content.js`: BMO terminology, formulas, questions, and worked solutions.
- `site/dist/notes-zh.js`: corresponding Chinese BMO explanations and hints.
- `site/dist/technique-details.js`: expanded legacy Chinese methods, examples, and limitations.
- `site/dist/bmo-presentation.js`: bilingual BMO names and curated TeX conversion of the legacy notes.
- `site/dist/bmo-past-papers.js`: independently restated official BMO practice and complete proofs.
- `site/dist/bmt-content.js`: current BMT taxonomy, detailed notes, dated team rules, strategies, sourced practice, and old-route aliases.
- `site/dist/additional-content.js`: the three category-only collections; its former BMT data is no longer used.
- `site/dist/math.js`: escaped prose and explicit TeX rendering.
- `site/dist/research.js`: refined BMO combinatorics keywords and official evidence.
- `research/bmo-combinatorics.md`: research scope, conclusions, and source references.
- `research/bmo-practice-sources.md` and `research/bmt-format-sources.md`: official sources, dates, question references, and content verification.

The BMO translation validator checks that every technique and exercise has its corresponding Chinese text. The preparation taxonomy is editorial; it is not an official exhaustive syllabus.

## Data storage

Personal materials are stored in IndexedDB; topic bookmarks, technique marks, and per-problem review status use localStorage. Personal records are not written into the GitHub repository or uploaded to a server. They do not automatically sync between browsers or devices. Export a backup before changing browsers or clearing site data. Backups include material attachments; bookmarks, marks, and review status are not included. Old BMT routes, saved topics, and material references resolve to the corrected Discrete category; newly added questions are not automatically marked reviewed.

## GitHub Pages

The included workflow deploys `site/dist` on pushes to `main`. Enable **Settings → Pages → Build and deployment → GitHub Actions** for the repository. Hash routes and relative assets support deployment under a repository subpath. There are no server, CDN, or paid hosting dependencies. The approved KaTeX ES module and MIT licence are committed under `site/dist/vendor/katex`; `provenance.json` records the release and SHA-256 hashes. `node scripts/vendor-katex.mjs` downloads only that integrity-pinned release, without lifecycle scripts.

## Verification limits

Content validation and JavaScript syntax checks are automated. Browser interactions and visual checks are recorded in the delivery report. Mobile browser emulation cannot establish behaviour on a real phone; safe areas, software keyboard interaction, and touch feel require physical-device verification.
