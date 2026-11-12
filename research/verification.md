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
