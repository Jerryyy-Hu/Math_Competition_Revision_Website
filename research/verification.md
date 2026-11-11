# Verification record

## Automated checks

`node scripts/check-content.mjs` validates the collection structure, unique routes, category-only boundaries, language requirements, exercise and proof completeness, index destinations, escaped content, mobile metadata, and JavaScript syntax.

Result: **passed** — 5 collections, 24 populated topics, 30 exercises, and 22 category-only topics.

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

These are representative browser flows, not an exhaustive test of every possible input or browser. No physical phone was available; touch behaviour, safe areas, software keyboards, and animation feel on real hardware remain unverified. Original/classical practice exercises are not claimed to reproduce the difficulty distribution of official BMO or BMT papers.
