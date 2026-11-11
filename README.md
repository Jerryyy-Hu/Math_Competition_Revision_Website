# Lemma

A dependency-free mathematics study library with a collapsible competition → subject → topic index.

## Scope

- **BMO:** 16 populated topics across algebra, combinatorics, geometry, and number theory.
- **BMT:** 8 populated topics across the same four subjects; BMT means Berkeley Math Tournament.
- **TMUA, STEP, University Interview:** category structures only, with no populated notes, exercises, or past-paper collections.
- **Language:** English terminology, questions, and solutions; Chinese explanations and hints.
- **Practice:** 30 original or classical training exercises, clearly distinguished from linked official past papers.

## Features

- Animated slide-out index: a modal overlay on mobile and a non-modal push sidebar from 1024px upward.
- Reserved desktop margins keep content width and line wrapping constant when the sidebar is toggled.
- All 102 techniques include a method, an illustrative example, and a specific pitfall.
- Topic search, saved topics, review status, and recent reading.
- Chinese hints and English solution/proof dialogs.
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
```

## Content editing

- `site/dist/content.js`: BMO terminology, formulas, questions, and worked solutions.
- `site/dist/notes-zh.js`: corresponding Chinese BMO explanations and hints.
- `site/dist/technique-details.js`: expanded Chinese methods, examples, and limitations for BMO and BMT.
- `site/dist/additional-content.js`: BMT content and the three category-only collections.
- `site/dist/research.js`: refined BMO combinatorics keywords and official evidence.
- `research/bmo-combinatorics.md`: research scope, conclusions, and source references.

The BMO translation validator checks that every technique and exercise has its corresponding Chinese text. The preparation taxonomy is editorial; it is not an official exhaustive syllabus.

## Data storage

Personal materials are stored in IndexedDB; topic bookmarks and review status use localStorage. Personal records are not written into the GitHub repository or uploaded to a server. They do not automatically sync between browsers or devices. Export a backup before changing browsers or clearing site data. Backups include material attachments; bookmarks and review status are not included.

## GitHub Pages

The included workflow deploys `site/dist` on pushes to `main`. Enable **Settings → Pages → Build and deployment → GitHub Actions** for the repository. Hash routes and relative assets support deployment under a repository subpath. There are no server, package, font-CDN, or paid hosting dependencies.

## Verification limits

Content validation and JavaScript syntax checks are automated. Browser interactions and visual checks are recorded in the delivery report. Mobile browser emulation cannot establish behaviour on a real phone; safe areas, software keyboard interaction, and touch feel require physical-device verification.
