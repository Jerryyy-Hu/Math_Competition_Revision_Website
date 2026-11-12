# BMT taxonomy, format and practice evidence

Verified on 2026-11-12. The website uses the official four Focus subjects (Algebra, Calculus, Discrete, Geometry), plus a library category named Team Rounds containing Guts and Power. Team Rounds and the topic subdivisions are editorial navigation, not additional official tests. Discrete includes both Combinatorics and Number Theory.

## Current format

- [BMT 2026 event page](https://berkeley.mt/events/bmt-2026/): Focus Tests are 60 minutes and 10 questions each; a student takes two. Power is a 90-minute proof-oriented team round. Guts is 75 minutes, nine consecutive sets of three, with the current set submitted before the next is issued and a live scoreboard. In-person team size is up to six. The source also gives the in-person scoring weights.
- [Official FAQ](https://berkeley.mt/faqs/): distinguishes BMT Online, whose Power score is separate from the overall team score. The library notes this difference and avoids applying an in-person weighting to the online event.
- [2025 Power instructions](https://berkeley.mt/archives/bmt-2025/power-problems.pdf), page 1: the particular paper exempts compute/find/draw questions from proof, orders tasks by content, and allows citation of statements of earlier questions even when not solved. These are identified as 2025 paper rules, not a universal promise.
- [2025 Guts instructions](https://berkeley.mt/archives/bmt-2025/guts-problems.pdf), page 1: the particular paper gives set-dependent points and an estimation last set. The notes do not claim that those details are permanent rules.

All assignment, checking, time-allocation, dependency-map and proof-writing advice is an independently authored training suggestion, distinguished from rule summaries.

## Practice selection

Statements are independently restated in English. Definitions needed for standalone questions are included; all numerical data and targets are retained. Solutions were independently written and checked against official solutions. Each academic topic and team topic has two distinct official questions. No solutions require omitted figures. The 2024 Geometry Q1 figure is described as three outward semicircles on the sides of the equilateral triangle; only their exposed arcs form the boundary. The Power 2024 Q1.8 restatement makes the contextual integer parameter assumption explicit.

Each source is linked through the official archive. Problem PDF and solution PDF links are stored on each exercise.

| Topic | Official questions | Checked result |
| --- | --- | --- |
| Algebra / Equations & polynomials | [2025 Algebra Q1, Q4](https://berkeley.mt/archives/bmt-2025/algebra-problems.pdf) | 60; negative 27/2 |
| Algebra / Sequences & sums | [2025 Algebra Q3](https://berkeley.mt/archives/bmt-2025/algebra-problems.pdf); [2024 Algebra Q3](https://berkeley.mt/archives/bmt-2024/algebra-problems.pdf) | 8; negative 22 |
| Calculus / Derivatives, limits & optimisation | [2025 Calculus Q1, Q2](https://berkeley.mt/archives/bmt-2025/calculus-problems.pdf) | 67; 2025 raised to pi minus 1 |
| Calculus / Integrals & series | [2024 Calculus Q5, Q7](https://berkeley.mt/archives/bmt-2024/calculus-problems.pdf) | 1/3; 2/3 minus 5/(9 sqrt(3)) |
| Discrete / Counting & probability | [2025 Discrete Q1, Q3](https://berkeley.mt/archives/bmt-2025/discrete-problems.pdf) | 1/3; 60 |
| Discrete / Number theory & discrete structures | [2025 Discrete Q2](https://berkeley.mt/archives/bmt-2025/discrete-problems.pdf); [2024 Discrete Q3](https://berkeley.mt/archives/bmt-2024/discrete-problems.pdf) | 5; 11 |
| Geometry / Euclidean geometry | [2024 Geometry Q1](https://berkeley.mt/archives/bmt-2024/geometry-problems.pdf); [2025 Geometry Q1](https://berkeley.mt/archives/bmt-2025/geometry-problems.pdf) | 9 pi; 44 |
| Geometry / Coordinate geometry | [2024 Geometry Q2](https://berkeley.mt/archives/bmt-2024/geometry-problems.pdf); [2025 Geometry Q4](https://berkeley.mt/archives/bmt-2025/geometry-problems.pdf) | 10 pi; 2 minus sqrt(3) |
| Team Rounds / Guts | [2025 Guts Q2, Q4](https://berkeley.mt/archives/bmt-2025/guts-problems.pdf) | 375; 15 |
| Team Rounds / Power | [2024 Power Q1.8](https://berkeley.mt/archives/bmt-2024/power-problems.pdf); [2025 Power Q4.5](https://berkeley.mt/archives/bmt-2025/power-problems.pdf) | Perpendicular-bisector calculation; parity of switches |

Official solution links follow the same paths with `-solutions.pdf`:

- [2025 Algebra](https://berkeley.mt/archives/bmt-2025/algebra-solutions.pdf), Q1/Q3 page 1 and Q4 page 2.
- [2024 Algebra](https://berkeley.mt/archives/bmt-2024/algebra-solutions.pdf), Q3 page 1.
- [2025 Calculus](https://berkeley.mt/archives/bmt-2025/calculus-solutions.pdf), Q1/Q2 page 1.
- [2024 Calculus](https://berkeley.mt/archives/bmt-2024/calculus-solutions.pdf), Q5 page 2 and Q7 page 3. The library uses a squeeze proof for Q5 and a different rationalising substitution for Q7.
- [2025 Discrete](https://berkeley.mt/archives/bmt-2025/discrete-solutions.pdf), Q1/Q2/Q3 pages 1–2.
- [2024 Discrete](https://berkeley.mt/archives/bmt-2024/discrete-solutions.pdf), Q3 page 1.
- [2024 Geometry](https://berkeley.mt/archives/bmt-2024/geometry-solutions.pdf), Q1/Q2 page 1.
- [2025 Geometry](https://berkeley.mt/archives/bmt-2025/geometry-solutions.pdf), Q1 page 1 and Q4 pages 2–3. The library uses a coordinate proof for Q4.
- [2025 Guts](https://berkeley.mt/archives/bmt-2025/guts-solutions.pdf), Q2 page 1 and Q4 page 2.
- [2024 Power](https://berkeley.mt/archives/bmt-2024/power-solutions.pdf), Q1.8 page 6.
- [2025 Power](https://berkeley.mt/archives/bmt-2025/power-solutions.pdf), Q4.5 page 24.

## Compatibility

`bmt-content.js` exports `bmtCollection` and `bmtRouteAliases`. Existing Algebra and Geometry topic URLs are unchanged. Former Combinatorics topic links map to the corresponding Discrete topic. Both old Number Theory topic links map to Number theory & discrete structures; preserve and remap their browser-local materials and preference records when integrating. New Calculus and Team Rounds topics carry complete teaching detail fields and Chinese technique names.
