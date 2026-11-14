# Lemma

## Mobile reading

The phone layout provides a sticky, collapsible current-topic outline with a direct Practice shortcut. It follows the current technique and accounts for the toolbar when scrolling or determining the reading position. Opening the outline overlays the article; choosing a destination, tapping outside or pressing Escape closes it. Desktop mode retains the persistent right outline.

Primary phone controls have at least 44-pixel tap targets. Practice keeps Hint, Solution and review on one row, with a compact Review/Reviewed label and its complete accessible name. Larger body text and formula sizes preserve readability; overflowing formulas receive keyboard access and a horizontal-scroll hint. Search results use the visual viewport to allow for the software keyboard, with a compact mode when little space remains. The material form uses a bottom sheet with safe-area padding and 16-pixel inputs.

`node scripts/check-mobile.mjs` checks controller behaviour using deterministic DOM doubles: responsive outline modes, toolbar occlusion, dismissals, formula overflow and viewport calculations. These checks do not establish browser layout, Safari keyboard behaviour or physical-device touch feel. See the dated verification record for the current preview limitations.

A mathematics study library with a collapsible competition → subject → topic index and locally vendored KaTeX.

## Scope

- **BMO:** 16 populated topics across algebra, combinatorics, geometry, and number theory.
- **BMT:** 10 populated topics across Algebra, Calculus, Discrete, Geometry, and Team Rounds (Guts and Power). The four Focus subjects follow the official classification; Team Rounds is a navigation group.
- **TMUA:** 15 populated topics and 62 bilingual techniques across foundations/data, algebra/functions, geometry/calculus, and logic/proof. The framework maps MM1-MM8, M1-M7 and the Paper 2 argument/proof/error families in the official October 2026 / January 2027 specification.
- **STEP:** 22 populated topics and 100 bilingual techniques across pure mathematics, mechanics, and probability/statistics. The framework follows the June 2026 onwards specification, distinguishing shared STEP 2/3 knowledge from individual STEP 3 additions.
- **University Interview:** seven category entries, with no populated lessons or exercises.
- **Language:** Chinese technique names alongside English terminology; Chinese explanations and hints; English questions and solutions.
- **Practice:** 154 placements: 49 distinct official past-paper questions (29 BMO, 20 BMT) in 52 placements, 28 existing original/classical placements, and 74 new original admissions drills. BMO/BMT retain at least two official exercises per topic. TMUA has 30 original five-option questions; STEP has 44 original linked-part exercises. Admissions drills are explicitly labelled original and are not full mocks or calibrated exam questions.

## Features

- Animated slide-out index: a modal overlay on mobile and a non-modal push sidebar from 1024px upward.
- Reserved desktop margins keep content width and line wrapping constant when the sidebar is toggled.
- All 300 techniques include a plain Chinese explanation, a highlighted core conclusion, a method, an illustrative example, and a specific pitfall.
- STEP/TMUA collection pages introduce the knowledge framework, dated specification baseline, study order, scope boundaries and an expandable prerequisite table. Topic pages link prerequisites and specifications; individual STEP 3 techniques and questions carry explicit scope labels.
- 130 techniques have a native, initially collapsed `拓展` disclosure, containing 197 extension placements. The eight team-process techniques do not have artificial mathematical extensions. These counts include concepts shared between competitions.
- Factorisation has nine common identity families, including Sophie Germain, Euler's cubic identity, and cyclic differences. Fermat leads to Euler's totient theorem; Cauchy leads to Engel form, weighted power sums, power means, and Hölder, with conditions and equality cases.
- Coverage additions include divisor count/sum/product, CRT, multiplicative order, binomial expansion, rearrangement, convexity, triangle trigonometry, angle bisectors, Menelaus, the mean value theorem, the fundamental theorem of calculus, and binomial probability.
- Technique marks highlight the entire block and its corresponding reading-outline entry, and persist locally.
- The right outline shows techniques within the current topic. It tracks the topmost visible heading and advances when at least half of that heading is hidden by the sticky header.
- Keyword suggestions rank direct bilingual names and aliases above context or incidental prose, label every result by competition, and link directly to the matching technique or extension. Arrow keys, Enter, Escape, Chinese input composition, and reloadable deep links are supported.
- Saved topics, per-problem review status, and recent reading.
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
node scripts/check-knowledge.mjs
node scripts/check-admissions.mjs
```

With the preview server running, `node scripts/check-browser.mjs` uses an existing Windows Edge installation and a new isolated profile under ignored `artifacts/`. It checks all populated topics, with every extension expanded, at 1440, 1024, 391 and 320 pixels, plus ranked search, competition tags, keyboard selection, native disclosures, extension deep links, admissions frameworks, MCQ choices and new study-state persistence. `node scripts/check-sources.mjs` checks official practice PDF links and needs network access.

## Content editing

- `site/dist/content.js`: BMO terminology, formulas, questions, and worked solutions.
- `site/dist/notes-zh.js`: corresponding Chinese BMO explanations and hints.
- `site/dist/technique-details.js`: expanded legacy Chinese methods, examples, and limitations.
- `site/dist/bmo-presentation.js`: bilingual BMO names and curated TeX conversion of the legacy notes.
- `site/dist/bmo-past-papers.js`: independently restated official BMO practice and complete proofs.
- `site/dist/bmt-content.js`: current BMT taxonomy, detailed notes, dated team rules, strategies, sourced practice, and old-route aliases.
- `site/dist/knowledge-additions.js`: new techniques and three independently authored practice problems, each placed in both relevant competitions.
- `site/dist/knowledge-depth.js`: plain explanations, core conclusions, bilingual aliases, and scoped extensions for every populated technique. Profiles are shared where the mathematics is shared; calculus substitution and team formats have context-specific profiles.
- `site/dist/search.js`: weighted, normalised keyword index and direct result destinations.
- `site/dist/admissions-framework.js`: the dated STEP/TMUA scope, official source links, topic families, learning targets and prerequisite order, established before lesson authoring.
- `site/dist/admissions-content.js` and `admissions-authoring.js`: framework/content integration, stable original exercise IDs and shared data constructors.
- `site/dist/tmua-content.js`: 15 TMUA chapters, 62 techniques and 30 original multiple-choice drills.
- `site/dist/step-pure-content.js`, `step-further-pure-content.js`, `step-mechanics-content.js` and `step-statistics-content.js`: 22 STEP chapters, 100 techniques and 44 original linked-part drills, with per-entry STEP 3 labels.
- `site/dist/additional-content.js`: the University Interview scaffold; its former BMT/STEP/TMUA data is no longer used.
- `site/dist/math.js`: escaped prose and explicit TeX rendering.
- `site/dist/research.js`: refined BMO combinatorics keywords and official evidence.
- `research/bmo-combinatorics.md`: research scope, conclusions, and source references.
- `research/bmo-practice-sources.md` and `research/bmt-format-sources.md`: official sources, dates, question references, and content verification.
- `research/content-depth-audit.md`: coverage decisions, mathematical conditions, references, and verification scope for the content revision.
- `research/step-tmua-framework.md`: the framework fixed before authoring, official chapter mappings, boundaries and reuse decisions.
- `research/step-tmua-verification.md`: observed validation results and limits for the admissions content addition.

Validators check bilingual teaching fields, explicit TeX, framework coverage, acyclic prerequisites, preserved category routes, original-problem provenance, single MCQ answer labels and selected independently enumerated/numerically checked results. These do not constitute formal verification of every proof. The preparation taxonomy is editorial; topic-family coverage is not an exhaustive treatment of every official syllabus bullet.

## Data storage

Personal materials are stored in IndexedDB; topic bookmarks, technique marks, and per-problem review status use localStorage. Personal records are not written into the GitHub repository or uploaded to a server. They do not automatically sync between browsers or devices. Export a backup before changing browsers or clearing site data. Backups include material attachments; bookmarks, marks, and review status are not included. Old BMT routes, saved topics, and material references resolve to the corrected Discrete category; newly added questions are not automatically marked reviewed.

## GitHub Pages

The included workflow deploys `site/dist` on pushes to `main`. Enable **Settings → Pages → Build and deployment → GitHub Actions** for the repository. Hash routes and relative assets support deployment under a repository subpath. There are no server, CDN, or paid hosting dependencies. The approved KaTeX ES module and MIT licence are committed under `site/dist/vendor/katex`; `provenance.json` records the release and SHA-256 hashes. `node scripts/vendor-katex.mjs` downloads only that integrity-pinned release, without lifecycle scripts.

## Verification limits

Content validation and JavaScript syntax checks are automated. Browser interactions and visual checks are recorded in the delivery report. Mobile browser emulation cannot establish behaviour on a real phone; safe areas, software keyboard interaction, and touch feel require physical-device verification.
