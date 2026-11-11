/** Curated study notes. Practice questions are original or classical, not copied past papers. */
const bullet = (name, text, formula = '') => ({ name, text, formula });
const exercise = (title, question, hint, solution, proof = true) => ({ title, question, hint, solution, proof });
const topic = (id, title, description, bullets, exercises, extra = {}) => ({ id, title, description, bullets, exercises, ...extra });

export const sources = {
  bmo: [
    { title: 'BMO official paper archive', detail: 'BMO1 and BMO2 · papers and selected marking reports', url: 'https://bmos.ukmt.org.uk/home/bmo.shtml' },
    { title: 'Notes on BMO marking', detail: 'What a complete mathematical argument needs', url: 'https://bmos.ukmt.org.uk/home/bmomarking.pdf' },
    { title: 'BMO1 2022 marking report', detail: 'Q4 · strategies, bounds, pairing, and colouring', url: 'https://bmos.ukmt.org.uk/home/bmo1-2023-report.pdf' },
    { title: 'BMO1 2024 marking report', detail: 'Q3 · parity and termination; Q6 · disjoint pairs', url: 'https://bmos.ukmt.org.uk/home/bmo1-2025-report.pdf' },
  ],
  bmt: [{ title: 'Berkeley Math Tournament archives', detail: 'Official past problems and solutions', url: 'https://berkeley.mt/archives/' }],
};

export const collections = [
  {
    id: 'bmo', name: 'BMO', fullName: 'British Mathematical Olympiad', short: 'The art of a complete proof.', color: 'lavender', symbol: 'graph',
    description: 'Build the argument, not just the answer. Four subjects, connected by a small collection of powerful ideas.',
    note: 'This is a curated preparation map, not an official exhaustive syllabus. BMO1 and BMO2 can combine several techniques in one problem.',
    subjects: [
      { id: 'algebra', name: 'Algebra', description: 'Find the structure inside the expression.', topics: [
        topic('identities', 'Algebraic identities', 'Factor, substitute, and make hidden symmetry visible.', [
          bullet('Factorisation', 'Look for a difference of squares, a common factor, or a useful regrouping before expanding.', 'a² − b² = (a − b)(a + b)'),
          bullet('Symmetric expressions', 'For two variables, rewrite using their sum and product.', 'a² + b² = (a + b)² − 2ab'),
          bullet('Substitution', 'Replace a repeated expression with a new variable, while preserving its domain.'),
          bullet('Telescoping', 'Rewrite each summand as a difference so that neighbouring terms cancel.', '1/[k(k + 1)] = 1/k − 1/(k + 1)'),
        ], [exercise('A sum that collapses', 'Find the exact value of 1/(1·2) + 1/(2·3) + ⋯ + 1/(n(n + 1)), for a positive integer n.', 'Express each term as the difference of two reciprocals.', ['Since 1/[k(k + 1)] = 1/k − 1/(k + 1), all intermediate terms cancel.', 'The sum is 1 − 1/(n + 1) = n/(n + 1).'], false)]),
        topic('inequalities', 'Inequalities', 'Choose a bound that preserves the equality case.', [
          bullet('Non-negative squares', 'Move everything to one side and try to write it as a sum of squares.', '(a − b)² ≥ 0'),
          bullet('AM–GM', 'For non-negative variables, the arithmetic mean bounds the geometric mean; record when equality holds.', '(a + b)/2 ≥ √(ab)'),
          bullet('Cauchy–Schwarz', 'Pair a sum of squares with a second sum of squares to control a squared scalar product.', '(Σaᵢ²)(Σbᵢ²) ≥ (Σaᵢbᵢ)²'),
          bullet('Homogeneity', 'When both sides have the same degree, a justified normalisation can remove one parameter.'),
        ], [exercise('Three variables, one bound', 'For positive a, b, c, prove that (a + b + c)(1/a + 1/b + 1/c) ≥ 9.', 'Apply Cauchy–Schwarz to √a, √b, √c and their reciprocals.', ['Cauchy–Schwarz gives (a + b + c)(1/a + 1/b + 1/c) ≥ (1 + 1 + 1)² = 9.', 'Equality holds exactly when a = b = c.'])]),
        topic('polynomials', 'Polynomials', 'Translate roots and values into factors.', [
          bullet('Factor and remainder theorems', 'A known root gives a factor; evaluating at a chosen point gives the corresponding remainder.', 'P(r) = 0 ⇔ (x − r) divides P(x)'),
          bullet('Vieta’s formulas', 'Read symmetric information about roots from coefficients.', 'x² − sx + p = (x − α)(x − β)'),
          bullet('Degree and roots', 'A non-zero polynomial of degree d has at most d distinct roots; use this to prove identities.'),
          bullet('Integer evaluations', 'For integer-coefficient P and integers u, v, the difference u − v divides P(u) − P(v).'),
        ], [exercise('A polynomial identity', 'A polynomial P of degree at most 2 satisfies P(0) = 1, P(1) = 3, and P(2) = 7. Determine P(x).', 'Subtract x² + x + 1 and count roots.', ['Let Q(x) = P(x) − (x² + x + 1). It has degree at most 2 and roots 0, 1, 2.', 'Three distinct roots force Q to be identically zero. Hence P(x) = x² + x + 1.'], false)]),
        topic('sequences-functions', 'Sequences & functional equations', 'Use special inputs, induction, and a carefully chosen transformation.', [
          bullet('Special inputs', 'In a functional equation, try 0, 1, equal variables, and opposite variables when the domain permits them.'),
          bullet('Injectivity and surjectivity', 'Prove these properties from the given equation before using them.'),
          bullet('Recurrence transformations', 'Subtract a fixed point, take a reciprocal, or study consecutive differences to simplify a recurrence.'),
          bullet('Induction', 'State the claim precisely, verify the first case, and show how the recurrence advances it.'),
        ], [exercise('An additive function on the integers', 'Suppose f: ℤ → ℤ satisfies f(m + n) = f(m) + f(n) for all integers m, n, and f(1) = 3. Prove that f(n) = 3n for every integer n.', 'First find f(0), then positive inputs, then negative inputs.', ['Setting m = n = 0 gives f(0) = 0.', 'Induction using f(n + 1) = f(n) + 3 gives f(n) = 3n for positive n.', 'Since 0 = f(n + (−n)) = f(n) + f(−n), we have f(−n) = −3n.'])]),
      ]},
      { id: 'combinatorics', name: 'Combinatorics', description: 'Count carefully. Notice what cannot change.', topics: [
        topic('counting', 'Counting principles', 'Different ways of counting the same objects reveal different kinds of structure.', [
          bullet('Disjoint cases & successive choices', 'Add across mutually exclusive cases; multiply the number of valid continuations at each stage. If continuation counts vary, split into cases first.'),
          bullet('Complement & inclusion–exclusion', 'Count everything and remove the unwanted cases. Correct for overlaps when several restrictions interact.', '|A ∪ B| = |A| + |B| − |A ∩ B|'),
          bullet('Double counting', 'Define one finite set of objects or incidences, then count it in two genuinely equivalent ways.', 'Σᵥ deg(v) = 2|E|'),
          bullet('Bijections & encoding', 'Turn a difficult family into an easier one with a reversible map. Binary strings, subsets, and lattice paths are useful encodings.', '|{subsets of an n-set}| = 2ⁿ'),
          bullet('Counting with weights', 'Attach a weight or sign when the ordinary count loses useful information. State what each weight records.'),
        ], [
          exercise('Choose a chairperson', 'Prove that Σ k·C(n, k) = n·2ⁿ⁻¹, where the sum runs from k = 1 to n and n ≥ 1.', 'Count a committee with a distinguished chairperson in two orders.', ['For a committee of size k, there are C(n, k) choices for its members and k choices for its chairperson.', 'Alternatively, choose the chairperson in n ways, then include or exclude each of the remaining n − 1 people independently.', 'Both procedures count the same committee–chairperson pairs, so the two totals are equal.']),
          exercise('Avoid both restrictions', 'How many integers from 1 to 100 are divisible by neither 2 nor 5?', 'Remove the union of the multiples of 2 and of 5.', ['There are 50 multiples of 2, 20 of 5, and 10 of both.', 'The required count is 100 − (50 + 20 − 10) = 40.'], false),
        ], { featured: true }),
        topic('arrangements', 'Arrangements & partitions', 'Decide what is distinguishable before choosing a formula.', [
          bullet('Gaps & blocks', 'Place separated objects into gaps; bind consecutive objects into a block and count its internal orders.'),
          bullet('Stars and bars', 'Use for identical objects in labelled boxes. Subtract compulsory lower bounds first; upper bounds need extra restrictions.', 'x₁ + ⋯ + xₖ = n, xᵢ ≥ 0: C(n + k − 1, k − 1)'),
          bullet('Labelling & multiplicities', 'Temporarily label identical objects, then divide only when every unlabelled outcome has the same number of labels.', 'n! / (m₁!m₂!⋯mᵣ!)'),
          bullet('Circular order & symmetry classes', 'Specify whether rotations and reflections are identified. Division by a symmetry count needs equally sized classes.', 'Distinct objects, rotations identified: (n − 1)!'),
          bullet('Pairing & matching', 'A matching uses disjoint pairs. Many available pairs do not automatically give many simultaneously usable pairs.'),
        ], [
          exercise('No two selected are adjacent', 'Choose 3 positions from a row of 8, with no two adjacent. How many choices are possible?', 'If the chosen positions are a < b < c, compress the compulsory gaps.', ['The map (a, b, c) ↦ (a, b − 1, c − 2) is a bijection to increasing triples from {1, …, 6}.', 'The inverse adds the compulsory gaps back. Therefore the answer is C(6, 3) = 20.'], false),
          exercise('Three labelled boxes', 'Distribute 9 identical counters among three labelled boxes, with at least one counter in each. How many distributions exist?', 'Remove one counter from each box before applying stars and bars.', ['Writing xᵢ = yᵢ + 1 gives y₁ + y₂ + y₃ = 6 with yᵢ ≥ 0.', 'There are C(8, 2) = 28 solutions.'], false),
        ]),
        topic('recurrence', 'Recurrence & construction', 'Build larger objects from smaller ones, without losing track of the state.', [
          bullet('Recurrence & state splitting', 'Classify by the last choice or a distinguished object. Keep enough state for future choices to be determined.'),
          bullet('Induction & strong induction', 'Prove an initial case and a valid extension. Strong induction allows every smaller case to be used.'),
          bullet('Constructive existence', 'Give an explicit rule, verify every constraint, and prove that it works for the whole stated range.'),
          bullet('Deletion–insertion & local repair', 'Remove one object to use a smaller case, or improve a configuration by a controlled local change.'),
          bullet('Extremal choice & pigeonholes', 'Choose a largest or smallest object to force structure; compare the number of objects with available boxes.', 'N objects in k boxes ⇒ some box has at least ⌈N/k⌉'),
        ], [
          exercise('Binary strings without 11', 'Let aₙ count length-n binary strings with no consecutive 1s. Find a recurrence, initial values, and a₅.', 'Split by the final digit; a final 1 forces the preceding digit to be 0.', ['For n ≥ 2, a string ending in 0 comes from any valid length-(n − 1) string. A string ending in 1 ends in 01 and comes from a valid length-(n − 2) string.', 'Thus aₙ = aₙ₋₁ + aₙ₋₂, with a₀ = 1 (the empty string) and a₁ = 2.', 'The values are 1, 2, 3, 5, 8, 13; hence a₅ = 13.'], false),
          exercise('A divisible difference', 'Prove that among any n + 1 integers, two have a difference divisible by n, where n ≥ 1.', 'Use the n possible remainders modulo n as boxes.', ['Assign each integer to its residue class modulo n.', 'Two of the n + 1 integers occupy the same one of the n classes, so their difference is divisible by n.']),
        ]),
        topic('invariants', 'Colouring & invariants', 'Find a quantity that every permitted move respects.', [
          bullet('Checkerboard & modular colouring', 'Colour to match the shape or move. More than two colours, residues, and unequal weights can detect what black and white cannot.'),
          bullet('Parity & modular invariants', 'Track a count, sum, or configuration modulo 2 or another useful modulus.'),
          bullet('Invariants', 'Prove that every allowed move preserves a quantity, then compare its initial and proposed final values.'),
          bullet('Monovariants & termination', 'Find a quantity that strictly changes and is bounded in the relevant direction. A bounded monotone real sequence alone does not prove finite termination.'),
          bullet('Reachability & obstructions', 'An invariant can rule a target out; agreeing invariants alone need not prove that the target is reachable.'),
        ], [
          exercise('A board with two corners missing', 'Remove two opposite corners of an 8 × 8 chessboard. Prove that the remaining board cannot be tiled by 1 × 2 dominoes.', 'Compare the colour counts, and what each domino covers.', ['Opposite corners have the same colour. Removing them leaves 30 squares of one colour and 32 of the other.', 'Every domino covers one square of each colour, so any domino tiling would require equal counts. This is impossible.']),
          exercise('A process that must stop', 'Start with a finite list of positive integers. A move replaces one entry x > 1 by x − 1. Prove that every sequence of moves terminates.', 'Use the sum of the entries as an integer-valued monovariant.', ['The sum decreases by exactly 1 at each move and is bounded below by the number of entries.', 'Consequently only finitely many moves are possible; in fact their number is the initial sum minus the number of entries.']),
        ]),
        topic('graphs', 'Graph theory', 'Replace a relation with vertices and edges, then use its structure.', [
          bullet('Graph modelling', 'State what each vertex and edge represents; decide whether loops, multiple edges, or edge directions are relevant.'),
          bullet('Degrees & the handshake lemma', 'Each undirected edge contributes twice to the degree sum. The number of odd-degree vertices is even.', 'Σᵥ deg(v) = 2|E|'),
          bullet('Connectivity, paths & cycles', 'Use connected components or a longest path to isolate the obstruction or force an extra edge.'),
          bullet('Trees & bipartite graphs', 'A finite tree on n vertices has n − 1 edges. A graph is bipartite exactly when it has no odd cycle.'),
          bullet('Directed graphs & matchings', 'Orient comparisons or moves; model simultaneous disjoint pairings as a matching. Advanced matching theorems are enrichment, not an assumed prerequisite.'),
        ], [
          exercise('Two equal degrees', 'Prove that any simple undirected graph with n ≥ 2 vertices has two vertices of the same degree.', 'Could degrees 0 and n − 1 both occur?', ['Every degree belongs to {0, 1, …, n − 1}. A vertex of degree n − 1 is adjacent to every other vertex, so an isolated vertex cannot coexist with it.', 'At most n − 1 different degree values can therefore occur among n vertices. The pigeonhole principle gives a repeated degree.']),
          exercise('An odd-degree obstruction', 'Can a finite undirected graph have exactly three vertices of odd degree? Explain.', 'Reduce the degree-sum identity modulo 2.', ['The sum of all degrees is even because it equals twice the number of edges.', 'A sum has the same parity as its number of odd summands. Exactly three odd degrees would make the sum odd, which is impossible.']),
        ]),
        topic('extremal-games', 'Extremal arguments & games', 'Prove the limit, then show how to reach it.', [
          bullet('Averaging & counting bounds', 'Some value is at least the average and some is at most the average; combine this with integrality when appropriate.'),
          bullet('Upper bound + attaining construction', 'A claimed maximum needs a universal upper bound and a legal example achieving it. Reverse both directions for a minimum.'),
          bullet('Extremal configuration & local improvement', 'Choose an optimal object, then show that any forbidden feature would allow a better one.'),
          bullet('Winning & losing states', 'For a finite normal-play game, a losing state has no move to a losing state; a winning state has at least one such move.'),
          bullet('Pairing strategy & strategy stealing', 'Specify a legal response to every opponent move. If stealing a strategy, justify why the extra move cannot hurt.'),
        ], [
          exercise('Take one, two, or three', 'Two players alternately remove 1, 2, or 3 counters from a pile of 21. The player taking the last counter wins. Who can force a win?', 'Try to leave a multiple of four after each of your turns.', ['The first player removes 1, leaving 20.', 'If the opponent removes r counters, respond by removing 4 − r. This is always 1, 2, or 3 and restores a multiple of 4.', 'Eventually the opponent faces 4 counters; the first player then takes the last counter.'], false),
          exercise('A sharp bound on a cycle', 'What is the largest number of vertices you can choose on a cycle with 10 vertices if no two chosen vertices are adjacent? Prove your answer.', 'Pair neighbouring vertices for a bound, then choose alternate vertices.', ['Partition the cycle into five disjoint adjacent pairs. At most one vertex from each pair can be chosen, giving an upper bound of 5.', 'Choosing every other vertex is legal and chooses 5 vertices. Therefore the maximum is 5.']),
        ]),
      ]},
      { id: 'geometry', name: 'Geometry', description: 'Let the diagram suggest the next relationship.', topics: [
        topic('angles-circles', 'Angles & circles', 'Use equal angles to discover a cyclic quadrilateral.', [
          bullet('Angle chasing', 'Mark known angles systematically; use straight lines, triangle sums, and parallel lines.'),
          bullet('Cyclic quadrilaterals', 'Opposite angles sum to 180°. Equal angles subtended by the same chord give a useful converse.'),
          bullet('Tangent–chord theorem', 'The angle between a tangent and a chord equals the angle subtended by that chord in the alternate segment.'),
          bullet('Power of a point', 'Intersecting chords and secants convert the same circle into equal products.', 'PA·PB = PC·PD'),
        ], [exercise('Intersecting chords', 'Chords AB and CD meet at an interior point P of a circle. Prove that PA·PB = PC·PD.', 'Compare triangles PAC and PDB.', ['Angles APC and DPB are vertically opposite.', 'Angles PAC and PDB subtend the same chord BC, so triangles PAC and PDB are similar.', 'Thus PA/PD = PC/PB. Multiplying gives PA·PB = PC·PD.'])]),
        topic('similarity', 'Similarity & ratios', 'Convert a picture into ratios, areas, and concurrency.', [
          bullet('Similar triangles', 'Confirm the correct vertex correspondence before writing side ratios.'),
          bullet('Area ratios', 'Triangles sharing an altitude have areas in the ratio of their bases.'),
          bullet('Ceva’s theorem', 'For interior points D ∈ BC, E ∈ CA, F ∈ AB, the cevians concur exactly when the ratio product is 1.', '(BD/DC)(CE/EA)(AF/FB) = 1'),
          bullet('Auxiliary lines', 'A parallel line, a radius, or a perpendicular can create the similar triangles the diagram is missing.'),
        ], [exercise('The centroid ratio', 'The medians AD and BE of triangle ABC meet at G. Prove that AG:GD = 2:1.', 'Use the segment joining midpoints D and E.', ['Since D and E are midpoints, DE is parallel to AB and DE = AB/2.', 'Triangles GDE and GAB are similar, with GD/GA = DE/AB = 1/2.', 'Therefore AG:GD = 2:1.'])]),
        topic('coordinates-vectors', 'Coordinates & vectors', 'Choose coordinates that simplify the geometry instead of expanding it.', [
          bullet('Coordinate placement', 'Place a useful line on an axis, a symmetry centre at the origin, or a circle in a simple standard form.'),
          bullet('Dot products', 'Use a zero dot product for perpendicularity and a normalised dot product for an angle.', 'u·v = |u||v| cos θ'),
          bullet('Vector midpoints', 'A midpoint is an average, and a centroid is the average of three position vectors.', 'g = (a + b + c)/3'),
          bullet('Distance and determinant', 'Squared distance avoids unnecessary radicals; a two-dimensional determinant gives signed area.'),
        ], [exercise('The midpoint identity', 'If M is the midpoint of BC, prove that AB² + AC² = 2AM² + BC²/2.', 'Put M at the origin and write B = v, C = −v, A = u.', ['The left side is |u − v|² + |u + v|² = 2|u|² + 2|v|².', 'Since AM² = |u|² and BC² = 4|v|², this equals 2AM² + BC²/2.'])]),
      ]},
      { id: 'number-theory', name: 'Number theory', description: 'Use divisibility to constrain what is possible.', topics: [
        topic('divisibility-gcd', 'Divisibility & gcd', 'Reduce the arithmetic to factors that can be controlled.', [
          bullet('Euclidean algorithm', 'Subtract multiples without changing the gcd.', 'gcd(a, b) = gcd(b, a mod b)'),
          bullet('Bézout’s identity', 'The gcd is an integer linear combination of the two integers.'),
          bullet('Coprime factors', 'If gcd(a, b) = 1 and a divides bc, then a divides c.'),
          bullet('Prime valuations', 'Compare the exponent of a prime on each side; perfect powers have valuation multiples of that power.'),
        ], [exercise('Consecutive coprime integers', 'Prove that gcd(n, n + 1) = 1 for every positive integer n.', 'Any common divisor also divides their difference.', ['A common divisor of n and n + 1 divides (n + 1) − n = 1.', 'The only positive divisor of 1 is 1, so the gcd is 1.'])]),
        topic('modular-arithmetic', 'Modular arithmetic', 'Choose a modulus that makes the expression rigid.', [
          bullet('Residue classes', 'Replace an integer by its remainder; addition and multiplication respect congruence.'),
          bullet('Quadratic residues', 'List possible square residues for a small useful modulus.', 'x² ≡ 0 or 1 (mod 4)'),
          bullet('Fermat’s little theorem', 'For prime p and p not dividing a, powers of a repeat with period dividing p − 1.', 'aᵖ⁻¹ ≡ 1 (mod p)'),
          bullet('Modular inverses', 'Cancellation modulo m is valid for a factor coprime to m; ordinary division is not automatic.'),
        ], [exercise('An impossible square', 'Prove that no integer square is congruent to 2 modulo 4.', 'Separate an integer into even and odd cases.', ['If n = 2k, then n² = 4k² ≡ 0 (mod 4).', 'If n = 2k + 1, then n² = 4k(k + 1) + 1 ≡ 1 (mod 4).', 'Neither case has residue 2.'])]),
        topic('diophantine', 'Diophantine equations', 'Combine factorisation, congruences, and size.', [
          bullet('Factor into integer divisors', 'Rearrange an equation as a product equal to a fixed integer and list its divisor pairs.'),
          bullet('Bounding', 'Use positivity and ordering to reduce an apparently infinite search to a finite one.'),
          bullet('Congruence obstructions', 'Rule out a whole family of candidates with one well-chosen modulus.'),
          bullet('Infinite descent', 'From a purported smallest positive solution, construct a smaller one in the same class.'),
        ], [exercise('A reciprocal equation', 'Find all positive integer pairs (x, y) satisfying 1/x + 1/y = 1/3.', 'Multiply through, then complete the product (x − 3)(y − 3).', ['The equation gives xy = 3x + 3y, so (x − 3)(y − 3) = 9.', 'Since 1/x < 1/3 and 1/y < 1/3, both x and y exceed 3.', 'Positive divisor pairs of 9 give (x, y) = (4, 12), (6, 6), (12, 4).'], false)]),
      ]},
    ],
  },
];

export { bullet, exercise, topic };
