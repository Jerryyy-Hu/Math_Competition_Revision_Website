# Content depth and search audit

Revision date: 2026-11-13 (Asia/Shanghai).

## Scope and editorial standard

The 26 populated BMO/BMT topic routes are retained. The revision covers 138 technique placements: 82 BMO and 56 BMT. Every technique has a plain Chinese explanation, a highlighted core conclusion, explicit keywords, a method, an example, and a pitfall. There are 197 extension placements under 130 initially collapsed disclosures. Concepts shared between competitions are counted in each placement. The eight Guts/Power workflow entries have context-specific explanations but no forced mathematical extensions.

The TMUA, STEP, and University Interview collections retain their existing category-only scope. This remains an editorial preparation map, not an official exhaustive syllabus or a claim that every listed advanced tool is required in either competition. Entries marked as advanced are optional follow-on material.

Explanations identify what a method preserves, measures, or changes. Extensions connect to the parent method rather than merely collecting names. Formulas are explicit TeX rendered as native MathML; critical conclusions use semantic strong text and a contrasting callout. Advanced theorem statements retain assumptions and limitations.

## Coverage review

| Existing topic group | Main additions and depth |
| --- | --- |
| BMO algebraic identities | Nine factorisation families; Sophie Germain, Euler cubic, cyclic differences; symmetric power sums; substitutions; binomial theorem. |
| BMO inequalities | Weighted AM-GM, Engel form, weighted Cauchy, weighted power sums, power means, Hölder, Schur, rearrangement, convexity/Jensen. |
| BMO polynomials | Multiplicity, quadratic remainders, higher Vieta, Vieta jumping, interpolation, rational roots. |
| BMO sequences/functions | Additive equations and regularity; finite injectivity/surjectivity; characteristic roots; strong induction; arithmetic/geometric sums. |
| BMO counting | General inclusion-exclusion, derangements, marked subsets, incidence bounds, lattice paths, Catalan reflection, signed involutions. |
| BMO arrangements | Non-adjacent choices, bounded stars and bars, generating functions, multinomial coefficients, Burnside and Hall as advanced extensions. |
| BMO recurrence/construction | Finite-state recurrences, strengthened induction, greedy exchange, leaf deletion, prefix-residue pigeonholes. |
| BMO colouring/invariants | Periodic/weighted colours, permutation parity, linear invariants, lexicographic termination, state components. |
| BMO graphs | Complement graphs, degree constraints, Euler trails, tree characterisations, bipartite odd-cycle criterion, DAGs. |
| BMO extremal/games | Expected-value existence, equality-driven constructions, uncrossing, subtraction games, symmetric responses. |
| BMO angles/circles | Directed angles, Ptolemy, Brahmagupta, equal tangents, signed point power, radical axes; sine/cosine and area formulas. |
| BMO similarity | Spiral similarities, cevian area ratios, trigonometric Ceva, reflections; angle bisectors and Menelaus. |
| BMO coordinates/vectors | Coordinate normalisation, projections, signed determinant area, section formula and barycentric interpretation. |
| BMO divisibility/gcd | Extended Euclid, linear Diophantine solutions, coprime powers, Legendre and conditional LTE; divisor count, sum, product. |
| BMO modular arithmetic | Safe cancellation, residue tables, Euler criterion, Euler totient theorem, non-coprime powers, Wilson; CRT and multiplicative order. |
| BMO Diophantine equations | Product completion, consecutive-square bounds, modular descent, minimal-denominator reasoning. |
| BMT equations/polynomials | Shared factorisation and Vieta depth, roots-of-unity filters and complex Euler formula; binomial expansion, AM-GM and Cauchy. |
| BMT sequences/sums | Weighted geometric sums, Newton differences, shifted sums/products, reflection pairing; recurrence transformations. |
| BMT derivatives/limits | Product/quotient/implicit rules, convexity tests, discriminants, local equivalents and conditional L'Hôpital; mean value/Rolle. |
| BMT integrals/series | Trigonometric and symmetric substitution, recurrence integrals, integral comparison, convergence tests, Taylor; FTC and variable limits. |
| BMT counting/probability | Binomial identities, inclusion-exclusion, bounded distributions, Bayes, indicators and covariance; binomial/geometric distributions. |
| BMT discrete structures | Valuations, state recurrences, graph complements, linear invariants; divisor functions, CRT, order, Fermat/Euler. |
| BMT Euclidean geometry | Similarity, Pythagorean parametrisation, chords/segments, signed point power; sine/cosine/area and angle bisectors. |
| BMT coordinate geometry | Projections, subtracting circle equations, collinearity, segment lattice-point counts and Pick restrictions. |
| BMT Guts | Explain batch progression, assignment, submission checks, and time allocation without changing dated rules. |
| BMT Power | Explain definitions, dependencies, proof ownership, and priority without changing dated rules. |

Three new original exercises cover divisor functions, reconstruction from three congruences, and triangle side/area/circumradius. Each appears in both relevant competitions: six added placements, bringing practice to 80 placements. Official problem statements and source assignments are retained.

## Important conditions reviewed

- Euler's totient theorem requires a base coprime to the modulus. The term “Euler formula” is an alias for discovery; the number-theory entry explicitly distinguishes Euler's theorem from the complex exponential formula. Non-coprime exponent reduction is treated separately.
- Cauchy/Engel require real inputs and positive denominators where used. Weighted power sums specify nonnegative numerators, positive denominator weights, exponent at least 1, and equality cases. General power means are connected through convexity/Hölder rather than asserted to follow from a single Cauchy substitution.
- Divisor formulas count positive divisors, include n itself, and handle n=1. The product formula treats the unpaired square root when the divisor count is odd. Multiplicativity requires coprimality.
- CRT distinguishes a unique residue class from a unique integer and supplies the non-coprime compatibility condition. Multiplicative order is defined only for invertible bases.
- LTE states the odd-prime assumptions and separates the 2-adic case. A degree bound requires distinct roots. Additivity alone does not imply real linearity.
- Ceva and Menelaus specify internal/directed ratios. Point power separates positive segment products from signed power. Pick's formula is restricted to simple hole-free lattice polygons. Triangle and circular-segment formulas state nondegeneracy, angle units or angle range where needed.
- L'Hôpital, Rolle/mean value, and FTC retain their differentiability/continuity conditions. Infinite series require convergence before rearrangement or termwise operations. Binomial modelling requires independent equal-probability trials.

## References and reuse decision

GitHub resources were searched before implementation. The existing static modules provide a better fit than importing another site's application or introducing a search dependency. No application code, packages, or long passages were imported. Explanations and new worked solutions are independently authored.

References consulted for scope and theorem checks:

- [Evan Chen, Olympiad Articles](https://web.evanchen.cc/olympiad.html) and its [source repository](https://github.com/vEnhance/web.evanchen.cc): author-maintained links to functional equations, inequalities, directed angles, modular orders, and CRT.
- [Evan Chen, Unofficial Syllabus for Math Olympiads](https://web.evanchen.cc/handouts/Syllabus/Syllabus.pdf): an informal scope reference, not a BMO/BMT official syllabus.
- [Evan Chen, The Chinese Remainder Theorem](https://web.evanchen.cc/handouts/CRT/CRT.pdf): constructive CRT and its interpretation.
- [Vahagn Aslanyan, Number Theory lecture notes](https://www.math.cmu.edu/users/vahagn/lecture_notes/numbertheory.pdf): prime factorisation, multiplicative functions, modular theorems, orders, and Diophantine equations.
- [Annie Xu and Emily Zhu, Euler's Totient Function and More](https://www.math.cmu.edu/users/mlavrov/arml/16-17/number-theory-09-18-16.pdf): totient, coprimality, and the relation to Fermat.
- [Po-Shen Loh, Inequalities](https://www.math.cmu.edu/~lohp/docs/math/2014-295/06-inequalities.pdf): AM-GM, Cauchy, convexity, and smoothing.
- [David Altizio and Andrew Kwon, Similar Triangles / Cyclic Quadrilaterals](https://www.math.cmu.edu/~mlavrov/arml/16-17/geometry-11-06-16.pdf): cyclic-angle transfers, Ptolemy, and Brahmagupta.

## Verification

- `check-content.mjs`: route uniqueness, complete Chinese methods/examples/pitfalls, official exercise assignments, escaped prose, JavaScript syntax and page rendering.
- `check-math.mjs`: foundation and extension TeX, semantic MathML, stacked fractions, legacy-math detection and escaped HTML.
- `check-study-state.mjs`: stable identifiers, preferences and outline thresholds.
- `check-knowledge.mjs`: explanation/core/keyword coverage, extension identifiers, closed initial markup, bilingual ranked searches, competition scoping, safe query rendering and direct destinations.
- `check-browser.mjs`: isolated Edge checks normal and expanded topics at four viewport widths, keyboard disclosures/search, competition badges, no-result states, direct extension opening/focus and reloads. The actual result is written to `artifacts/browser-verification.json` after a successful run.

Verified results for this revision:

| Check | Observed result |
| --- | --- |
| Content and syntax | Passed: 26 populated topics, 138 techniques, 80 practice placements, 52 official assignments representing 49 distinct official problems. |
| Math rendering | Passed: 1,506 explicit expressions, including foundation explanations, core formulas and extension content; no rendering errors. |
| Knowledge/search | Passed: full explanation/core/keyword coverage, 197 extension placements (144 distinct named entries), 18 bilingual search scenarios, relevant ordering and competition scoping. |
| Study state | Passed: stable identifiers, persisted preferences, reading-outline thresholds. |
| Isolated Edge | Passed: all 26 topics with all extensions open at 1440, 1024, 391 and 320 pixels; native disclosure keyboard activation; search, IME composition logic, focus/deep-link reload and existing interactions. No browser errors. |
| Visual review | Inspected desktop core callouts, ranked suggestions, expanded identities and a narrow-screen divisor-sum formula. Long divisor formulas use multiple lines. |

The source review also corrected the reflection example to require two fixed points on the same side of the line and explicitly handle the zero-coefficient case in the characteristic-root extension.

Automated viewport emulation is not a physical-phone test. No deployment or remote repository mutation is part of this local revision.
