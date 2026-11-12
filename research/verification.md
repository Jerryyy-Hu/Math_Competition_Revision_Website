# Verification record

## Automated checks

`node scripts/check-content.mjs` validates the collection structure, unique routes, category-only boundaries, language requirements, exercise and proof completeness, index destinations, escaped content, mobile metadata, and JavaScript syntax.

Result: **passed** — 5 collections, 24 populated topics, 30 exercises, and 22 category-only topics.

## Responsive navigation and expanded notes

All 102 BMO/BMT techniques now include a Chinese method, an illustrative example, and a specific pitfall. The content validator checks all three fields and verifies that each is included in the rendered topic. The 30 practice problems retain English questions/solutions and Chinese hints; the other three collections remain category-only.

The navigation uses a native non-modal dialog on desktop and a modal dialog below the 1024px breakpoint. A reserved content width and a transform-only page shift avoid text reflow during toggling. The header remains accessible while reading long notes.

Additional browser checks passed:

- At CSS viewport widths of 1024px and 1440px, opening the desktop sidebar changed main content width by **0px**, shifted it right by **144px**, and preserved every technique item's height. The content remained clear of the 288px sidebar.
- A hint and a solution dialog remained usable while desktop navigation was open. Closing the solution with Escape retained the desktop sidebar.
- Desktop topic navigation retained the open index.
- At approximately 391px, the mobile drawer was modal and left the underlying content's position and width unchanged. Tapping the exposed backdrop closed it.
- Four rapid pointer toggles completed with consistent closed state.
- Resizing with navigation open correctly switched between modal and non-modal behaviour; Escape closed mobile navigation.
- At 320px, the detailed topic and its five expanded examples rendered without document-level horizontal overflow.
- No warnings or errors were returned by the representative browser checks.

These checks establish behaviour and geometry in the test browser. They do not establish a particular animation frame rate or replace testing on a physical phone.

## Browser checks

The running site was inspected in the browser. Verified flows:

- Expand a competition and subject in the navigation index, then jump directly to a topic.
- Display a Chinese hint and an English proof in its modal.
- Close the proof with Escape and restore focus to its trigger.
- Save a topic and mark it as reviewed; both states survive reload.
- Save a note and an official link with an attached research file in browser storage.
- Export the stored material and attachment as a JSON backup.
- Search by an English technique and by Chinese explanation text.
- Render the home and topic layouts at observed CSS viewport widths of 320 px and 1440 px, without document-level horizontal overflow.
- No console warnings or errors were returned during the representative local flows.

The navigation check exposed an ambiguous expand/jump target. The index now uses the branch label to expand and a separate arrow link to jump. This behaviour was retested successfully. An inaccessible icon-only material control and the skip-link route were also corrected.

## Limits

### Navigation header and icon polish

The drawer now has a single Index heading in its top row. Its entrance and exit use horizontal translation without a drawer-opacity fade. Both desktop trigger glyphs occupy the same 20px square: opening rotates the menu from 0 to 90 degrees while fading it out, and rotates the left chevron from -90 to 0 degrees while fading it in. Closing reverses these transitions. A two-frame entrance setup preserves the painted off-screen starting state, and existing version guards protect rapid reversals.

The existing content, route, rendering, and JavaScript syntax checks passed after these changes. The computer-use tool stopped the attempted Windows browser inspection because it could not determine the current browser URL reliably enough to enforce its policy. No further computer input was attempted. This revision's visual motion has therefore not been verified in a browser; the earlier browser results above apply to the preceding responsive-navigation revision.

These are representative browser flows, not an exhaustive test of every possible input or browser. No physical phone was available; touch behaviour, safe areas, software keyboards, and animation feel on real hardware remain unverified. Original/classical practice exercises are not claimed to reproduce the difficulty distribution of official BMO or BMT papers.
# Content, marking and practice revision — 2026-11-12

This section supersedes the historical interaction descriptions below, including solution dialogs and topic-level review controls.

## Current content

- BMO: 16 topics and 70 bilingual techniques. Added 29 distinct official questions in 32 topic placements, retaining 22 original/classical exercises.
- BMT: official Focus subjects Algebra, Calculus, Discrete and Geometry, plus the editorial Team Rounds group containing Guts and Power. Ten topics, 41 bilingual techniques, and 20 distinct official exercises. Team rules are dated and distinguish current rules, historical paper instructions, and authored strategy advice.
- Total: 26 populated topics, 111 techniques, 74 exercise placements, 49 distinct official problems; the other three collections still contain only 22 category entries.
- Official statements are independently restated and labelled RESTATED; English solutions are independently authored. Sources retain calendar examination year, round, question number, and official paper URL. BMO source dates and all BMT targets were independently reviewed. The source logs document the paper-by-paper checks.

## Current automated verification

`check-content.mjs`, `check-math.mjs` and `check-study-state.mjs` passed. These check every route, bilingual technique details, source coverage, inline exercise markup, marks, stable identifiers, storage round trips, and exact half-heading reading thresholds. All 1011 mathematical expression placements render with strict KaTeX 0.19.1 parsing. Slash fractions and legacy mathematical superscripts, roots, angles and congruences outside TeX are rejected. Fractions render as native MathML; inline fractions use full-size numerators and denominators. Prose remains HTML-escaped and KaTeX trust is disabled.

`check-sources.mjs` verified all 41 distinct linked official question and solution PDFs with successful HTTP responses and PDF content types.

## Current browser verification

`check-browser.mjs` passed using the existing Edge installation in an isolated headless profile. It does not use the signed-in personal browser. The recorded checks establish:

- All 26 populated topics render at 1440, 1024, 391 and 320 CSS pixels without document-level horizontal overflow. Every exercise action row keeps Hint, Solution and review controls together.
- Technique marks highlight the content block and matching outline entry, and survive reload. Individual exercise review status also survives reload.
- The right outline contains current-topic techniques. The first heading remains current while more than half is visible, and the next becomes current at the exact half-occlusion boundary. Outline clicks land below the sticky header.
- Hint and Solution expand within the exercise, have distinct backgrounds, and open no dialog. Mathematical fractions, superscripts and roots use semantic mathematical markup.
- Desktop navigation preserves main-content width, shifts it 144 pixels, and uses a non-modal slide. Trigger glyph rotation lasts 480 ms with a 360 ms crossfade. The hover target is a 42-pixel square with a 6-pixel corner radius. Six rapid toggles leave consistent state.
- Mobile navigation opens modally over the page, leaves main-content position unchanged, and closes on a backdrop click.
- Old BMT Number Theory topic links resolve to the new Discrete topic. Material references and saved-topic keys are remapped by the application; newly added questions are not automatically marked reviewed.
- No JavaScript exceptions, console warnings or console errors were observed during these checks.

Screenshots and the JSON test report are stored only in ignored `artifacts/`. They were visually inspected for the marked block, topic outline, practice controls, inline solutions, mobile drawer and rendered fractions. An initial double anchor offset and unnecessary formula scrollbar were found and corrected before the passing run.

No physical phone was tested. These checks establish the observed browser behaviour and layout, not a universal frame-rate guarantee or exhaustive verification of every device.

---

