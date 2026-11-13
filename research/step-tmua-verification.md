# STEP and TMUA implementation verification

Verified locally on 2026-11-13. No Git commit, remote repository change or deployment was performed.

## Delivered content

The [framework](step-tmua-framework.md) was recorded before the lessons were authored. `admissions-framework.js` contains the scope, source baseline, topic families and prerequisite graph; separate files contain the authored teaching material. Integration fails if a planned chapter is missing or an authored chapter is not mapped.

| Collection | Topics | Technique placements | Original exercises | Format |
| --- | ---: | ---: | ---: | --- |
| TMUA | 15 | 62 | 30 | Five-option multiple-choice drills |
| STEP | 22 | 100 | 44 | Linked-part learning drills |
| Added total | 37 | 162 | 74 | Original, explicitly labelled |

The full library now has 63 populated topics, 300 technique placements and 154 exercise placements. BMO/BMT retain their 26 topics, 138 technique placements and 80 exercise placements, including 52 assignments of 49 distinct official questions. The seven University Interview categories remain unpopulated. All seven pre-existing TMUA and eight pre-existing STEP topic routes remain valid.

Every new technique includes bilingual names, a Chinese explanation, core conclusion, method, worked example, pitfall, formula where appropriate, searchable keywords and a scope label. Each topic has official specification references, linked prerequisites and two original exercises. STEP 3-only tools and mixed-topic exercises are marked individually. Original drills are not presented as official papers, full 20-mark STEP questions, timed mocks or calibrated exam difficulty.

## Automated results

`node --run check` passed all five scripts:

- `check-content.mjs`: all 63 topic pages, teaching fields, exercise markup, identifiers, existing official-source requirements and site JavaScript syntax passed.
- `check-math.mjs`: 2,563 explicit expression placements, including MCQ choices, rendered with strict KaTeX 0.19.1 to native MathML without errors.
- `check-study-state.mjs`: stable identifiers, preference round trips and exact reading-outline thresholds passed.
- `check-knowledge.mjs`: all 300 technique cores and keyword records passed; existing 197 extension placements and 18 ranked bilingual search scenarios passed.
- `check-admissions.mjs`: all 37 mapped topics, 74 unique original exercise IDs, 15 retained category routes, official topic-family mappings, scope safeguards and an acyclic prerequisite graph passed. Scoped STEP/TMUA searches passed. Independent enumerations and numerical residual checks covered selected coin/counter probabilities, arithmetic and binomial coefficients, strict telescoping-tail bounds, dice moments, binomial rejection tails, collision momentum/restitution/energy and the resonant differential-equation solution.

These checks are not a formal proof checker and do not certify every mathematical argument. The questions and solutions were also reviewed during authoring for domains, endpoints, equality cases, physical constraints and parameter ranges.

## Browser and visual results

The final `check-browser.mjs` run passed in an isolated installed Edge profile at `http://127.0.0.1:4174/`.

- All 63 populated topic pages passed at 1440, 1024, 391 and 320 CSS pixels. Existing extensions were expanded; all new hints and solutions were expanded for the layout checks. No document-level horizontal overflow was detected. Practice controls stayed on their shared action row.
- Both framework pages passed at all four widths, including expanded topic/prerequisite tables. Narrow tables scroll inside their own container.
- All 30 TMUA questions displayed five choices at all four widths. The English solution answer label, Chinese hint and persistent individual review control worked.
- New technique marks and problem review states survived reload. STEP differential equations displayed the shared separable technique followed by explicitly STEP 3-only techniques.
- Existing index/drawer, saved study state, inline solutions, outline tracking, ranked search, IME handling, keyboard selection and extension deep links passed. The old BMT Number Theory alias still resolved to Discrete.
- No browser runtime errors were recorded. No physical phone was tested.

An initial 320px run detected that the word `Counterexamples` could overflow the topic heading. Adding wrapping/hyphenation to topic headings fixed the observed failure; the final full run passed. Screenshot capture now waits for descendant disclosure animations as well as page transitions before recording images.

Visually inspected screenshots under ignored `artifacts/`:

- `admissions-step-framework.png`: desktop framework introduction and study boundaries.
- `admissions-step-scope.png`: dated references, prerequisite link, bilingual technique and shared scope badge.
- `admissions-tmua-framework-mobile.png`: contained horizontal framework table on a narrow screen.
- `admissions-tmua-practice-mobile.png`: visible five-option question, answer, solution and reviewed state after reload.

The final machine report is `artifacts/browser-verification.json`. Earlier failure screenshots may remain in the ignored directory and are not evidence of the final state.

## Source checks

The current UAT-UK preparation page was used to discover the TMUA 2026/2027 specification and current supporting notes; the specification cover confirms its edition despite an older year embedded in its URL. The official STEP June 2026 onwards specification v1.3 was downloaded and all 53 pages extracted for chapter/scope review. It remains in ignored research artifacts and is not distributed with the website.

Eight of nine official resource links returned HTTP 200 in direct HEAD checks: the three TMUA PDFs, UAT-UK preparation page and archive, the STEP specification, and two Cambridge STEP Support pages. The OCR preparation page was successfully read through the web research tool, including its official specification and past-paper links; direct command-line HEAD and GET attempts timed out. Therefore this report does not claim nine successful direct HTTP checks.

Network and local-debugging sandbox restrictions initially blocked research or browser connections. The approved source fetch and isolated browser/server checks succeeded with the required execution permissions. No new package or runtime dependency was installed.
