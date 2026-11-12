# BMO practice provenance

Verified against the BMOS/UKMT official archive on 2026-11-12. All displayed years are the actual examination calendar year printed on the paper, rather than the PDF's season-ending filename. There are 29 unique problems, mapped to 32 topic placements across all 16 BMO topics. Repeated placements occur only where both topic methods are central.

The English statements are concise independent restatements of the mathematical tasks. They are labelled `restated: true` and link to the original official question paper. They are not facsimiles or quotations of the papers. The Chinese hints and English worked solutions are newly written; they must not be labelled official marking schemes. The source papers contain questions, rather than the worked solutions used here.

## Official papers checked

All questions below are on PDF page 1 unless page 2 is explicitly indicated. The official [archive](https://bmos.ukmt.org.uk/home/bmo.shtml) establishes the examination dates.

| Exam / question | Official source | Mathematical connection |
| --- | --- | --- |
| BMO2 1995 Q3 | [16 February 1995](https://bmos.ukmt.org.uk/home/bmo2-1995.pdf) | Vieta, polynomial signs, locating roots |
| BMO1 1997 Q4 | [15 January 1997](https://bmos.ukmt.org.uk/home/bmo1-1997.pdf) | Similarity, midpoint area ratios |
| BMO2 1997 Q3 | [27 February 1997](https://bmos.ukmt.org.uk/home/bmo2-1997.pdf) | Polynomial remainders, disjoint-pair counting |
| BMO1 2002 Q4 | [11 December 2002](https://bmos.ukmt.org.uk/home/bmo1-2003.pdf) | Bipartite graph modelling, degrees, star components |
| BMO1 2003 Q2–Q3 | [3 December 2003](https://bmos.ukmt.org.uk/home/bmo1-2004.pdf) | Coordinate projection; parity pairing game strategy |
| BMO1 2005 Q1 | [30 November 2005](https://bmos.ukmt.org.uk/home/bmo1-2006.pdf) | Divisibility by coprime prime powers, modular restrictions |
| BMO1 2006 Q1, Q3, Q5 | [1 December 2006](https://bmos.ukmt.org.uk/home/bmo1-2007.pdf) | Difference of squares; relative-order counting; sum of squares |
| BMO1 2007 Q1, Q5 | [30 November 2007](https://bmos.ukmt.org.uk/home/bmo1-2008.pdf) | Fourth-power identity; similar triangles, area ratios, AM–GM |
| BMO1 2008 Q5 | [4 December 2008](https://bmos.ukmt.org.uk/home/bmo1-2009.pdf) | Rational recurrence, denominator growth, finite orbit |
| BMO1 2009 Q3, Q5 | [3 December 2009](https://bmos.ukmt.org.uk/home/bmo1-2010.pdf) | Stars and bars; functional equation via associativity |
| BMO1 2010 Q3–Q4 | [2 December 2010](https://bmos.ukmt.org.uk/home/bmo1-2011.pdf) | Circle equations and collinearity; parity-changing involution |
| BMO1 2011 Q1, Q2, Q4 | [2 December 2011](https://bmos.ukmt.org.uk/home/bmo1-2012.pdf) | Diophantine factorisation; extremal permutation; decreasing integer sum and parity obstruction |
| BMO1 2012 Q2 | [30 November 2012](https://bmos.ukmt.org.uk/home/bmo1-2013.pdf) | Touching circles, contact-point ratio, coordinate collinearity |
| BMO1 2013 Q2, Q4 | [29 November 2013](https://bmos.ukmt.org.uk/home/bmo1-2014.pdf) | Cyclic quadrilaterals and tangent–chord theorem; state recurrence |
| BMO1 2014 Q2–Q3 | [28 November 2014](https://bmos.ukmt.org.uk/home/bmo1-2015.pdf) | Prime factorisation and congruences; gaps and case counting |
| BMO1 2016 Q3 | [2 December 2016](https://bmos.ukmt.org.uk/home/bmo1-2017.pdf) | Completing squares and prime divisor pairs |
| BMO1 2019 Q1 | [29 November 2019, page 2](https://bmos.ukmt.org.uk/home/bmo1-2020.pdf#page=2) | Examples and a modulo-five prime obstruction |
| BMO1 2023 Q2 | [15 November 2023, page 2](https://bmos.ukmt.org.uk/home/bmo1-2024.pdf#page=2) | Consecutive differences and a divisibility invariant |
| BMO1 2024 Q1 | [20 November 2024, page 2](https://bmos.ukmt.org.uk/home/bmo1-2025.pdf#page=2) | Directed divisibility graph, forbidden directed paths, explicit cycle construction |

## Verification

- Each year, question number, domain, numerical parameter, and requested conclusion was checked against the official PDF text.
- The source schema retains `BMO1`/`BMO2` to distinguish rounds. Display labels can use `BMO · year · Qn`, provided the round remains available adjacent to the label or in the source link.
- BMO1 2011 Q2 is restated for `n >= 2`, the range with a nonempty adjacency condition; `n = 1` has no largest finite gap bound.
- BMO1 2010 Q3 includes the tangency limit in which both second intersections coincide with A; the coordinate line equation remains valid.
- Node import and schema inspection passed: 16 topics, 32 placements, 29 unique IDs, with exactly two sourced exercises per topic.
- Independent Python enumeration confirmed: BMO2 1997 Q3 = 300; BMO1 2006 Q3 = 2520; BMO1 2009 Q3 = 8008; BMO1 2013 Q4 = 3363; BMO1 2014 Q3 = 4352.
- Trial arithmetic confirmed the four prime divisors in BMO1 2006 Q1.

The mathematical proofs are independently derived and reviewed, not certified by UKMT. Live browser layout and math rendering are verified by the owning implementation task.
