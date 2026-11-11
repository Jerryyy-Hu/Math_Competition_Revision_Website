# BMO combinatorics: preparation toolkit review

## Conclusion and scope

The original five categories cover much of the elementary toolkit. Representative official BMO1 and BMO2 papers show that a stronger preparation map should explicitly include **game strategies**, **two-sided extremal bounds with attaining constructions**, **state encoding**, and **operation reachability**.

This is an editorial preparation framework derived from a sample of historical papers. It is not an official exhaustive syllabus, a frequency analysis, or a guarantee of coverage of future questions. Techniques often overlap across categories.

## Refined keywords

1. **Counting principles:** disjoint-case addition, successive-choice multiplication, complements, inclusion–exclusion, double counting, bijections, weighted and signed counting.
2. **Arrangements and partitions:** ordered versus unordered choices, multiset permutations, gaps, blocks, stars and bars, pairing, temporary labelling with uniform multiplicity, circular arrangements, equivalence under rotations and reflections.
3. **Recurrence and construction:** state-based recurrences, induction and strong induction, subset/binary-string/lattice-path encoding, recursive constructions, deletion–insertion, local adjustments, reverse construction.
4. **Existence and extremal arguments:** pigeonhole principle and its generalisation, extremal choice, averaging, upper and lower bounds, constructions attaining the bound.
5. **Colouring and invariants:** checkerboard colouring, multicolour and weighted colouring, parity and modular invariants, weighted sums, inversions and permutation parity, monovariants with termination arguments, reachability.
6. **Graph theory:** modelling, degrees and the handshake lemma, connectivity, paths and cycles, trees, bipartite graphs, matchings, cliques and independent sets.
7. **Game strategies:** winning and losing states, backward analysis, pairing, symmetry, maintaining a strategy, termination.

Signed counting, permutation parity, and cliques/independent sets can be treated as intermediate extensions. Generating functions, the probabilistic method, Hall’s theorem, and Sprague–Grundy theory belong in optional enrichment rather than being presented as assumed BMO prerequisites on the evidence of this sample.

## Wording that needs conditions

- **Symmetry:** specify the equivalence relation. Division by a symmetry count is justified only when the relevant classes or multiplicities are uniform; symmetric objects can have smaller orbits.
- **Temporary labelling:** prove that each unlabelled object has the same number of labelled preimages before dividing.
- **Monovariants:** strict monotonicity and a bound alone do not prove finite termination for real-valued quantities. A bounded integer-valued quantity decreasing by at least one is sufficient.
- **Construction:** verify every constraint. An extremal answer additionally needs a bound in the opposite direction; a game strategy must handle arbitrary legal opposition.
- **Pairing:** distinguish pair-counting from a matching of mutually disjoint pairs.
- **Invariants:** a mismatch can obstruct reachability, but matching invariant values do not automatically establish reachability.

## Official historical evidence

Use actual sitting years. BMOS filenames sometimes use the season-ending year: `bmo1-2025.pdf` is the November **2024** paper.

| Sitting and problem | Preparation implication | Official source |
| --- | --- | --- |
| BMO1 2013 Q4 | Classify schedules by terminal state before establishing a recurrence. | [Paper](https://bmos.ukmt.org.uk/home/bmo1-2014.pdf) |
| BMO1 2016 Q4 | An alternating integer-selection game requires a valid winning strategy. | [Paper](https://bmos.ukmt.org.uk/home/bmo1-2017.pdf) |
| BMO1 2018 Q6 | Lattice journeys motivate path encodings and interaction with number theory. | [Paper](https://bmos.ukmt.org.uk/home/bmo1-2019.pdf) |
| BMO1 2020 Q7 | A moving-pebble game connects parity, evolving states, and strategy. | [Paper](https://bmos.ukmt.org.uk/home/bmo1-2021.pdf) |
| BMO1 2022 Q4 | The official report gives a guaranteed lower bound using a fixed partition and an upper bound using colouring. Both directions matter. | [Report, PDF page 9](https://bmos.ukmt.org.uk/home/bmo1-2023-report.pdf#page=9) |
| BMO1 2024 Q3 | A parity response strategy also needs strict decrease to establish termination. | [Report, PDF page 8](https://bmos.ukmt.org.uk/home/bmo1-2025-report.pdf#page=8) |
| BMO1 2024 Q6 | The report warns that numerous suitable pairs do not necessarily provide enough disjoint pairs. | [Report, PDF page 16](https://bmos.ukmt.org.uk/home/bmo1-2025-report.pdf#page=16) |
| BMO2 2011 Q4 | A largest-configuration question needs both a universal bound and an attaining construction. | [Paper](https://bmos.ukmt.org.uk/home/bmo2-2011.pdf) |
| BMO2 2015 Q2 | An odd/even count comparison can be organised with signs. This method label is an editorial inference from the problem. | [Paper](https://bmos.ukmt.org.uk/home/bmo2-2015.pdf) |
| BMO2 2019 Q2/Q3 | Constrained arrangements and subset sums motivate constructions, obstructions, and residue encodings. | [Paper](https://bmos.ukmt.org.uk/home/bmo2-2019.pdf) |
| BMO2 2021 Q1 | The official solution uses binary representation, with induction as an alternative. | [Solutions, PDF page 3](https://bmos.ukmt.org.uk/home/bmo2-2021-solutions.pdf#page=3) |
| BMO2 2022 Q3 | The official solution encodes balancing conditions as vectors of count differences. | [Solutions, PDF page 4](https://bmos.ukmt.org.uk/home/bmo2-2022-solutions.pdf#page=4) |
| BMO2 2023 Q2 | Local permutation operations require reachability arguments and explicit legal constructions. | [Paper](https://bmos.ukmt.org.uk/home/bmo2-2023.pdf) |

## Primary reference routes

- [BMOS official BMO archive](https://bmos.ukmt.org.uk/home/bmo.shtml)
- [Official notes on marking](https://bmos.ukmt.org.uk/home/bmomarking.pdf)
- [BMO1 official introduction](https://ukmt.org.uk/senior-challenges/british-maths-olympiad-round-1)
- [Berkeley Math Tournament official archive](https://berkeley.mt/archives/)

The official marking guidance values complete reasoning. The website therefore distinguishes a short hint from a full English solution or proof. Its practice exercises are original or classical training problems; they are not presented as copied official questions, nor are their difficulty levels claimed to match a particular BMO round.
