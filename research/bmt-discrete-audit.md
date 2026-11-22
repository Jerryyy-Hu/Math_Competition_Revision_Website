# BMT Discrete 2020–2025 archive audit

Verified against the official Berkeley Math Tournament archive on 2026-11-22.

## Scope and provenance

The replacement covers every question in the six official Discrete main papers: 10 per year, 60 total. It additionally covers all Discrete tiebreakers listed for 2020, 2021, 2022, 2023 and 2025: three per paper, 15 total. The 2024 official archive does not list a Discrete tiebreaker; no missing paper is invented. General, Guts, Power, BmMT and 2026 questions are outside this requested collection.

The [official archive](https://berkeley.mt/archives/) links all 22 PDFs below. Each was successfully downloaded as a PDF, extracted page by page and checked against its official solution. GitHub research found the organisers' own [website source](https://github.com/berkeleymt/berkeley.mt); no external application code or new runtime dependency was needed.

Statements are independently restated, with all mathematical data and targets retained. Context-only names and stories may be compressed. Worked solutions and Chinese approaches are independently authored. Classification and teaching order are editorial, not an official syllabus. Each question has one primary placement; secondary methods are linked from the other relevant categories.

## Teaching structure

| Category | Techniques | Primary questions | Secondary references |
| --- | ---: | ---: | ---: |
| Counting, bijections & complements | 5 | 13 | 22 |
| Conditional & geometric probability | 4 | 8 | 6 |
| Expectation & stopping times | 4 | 4 | 1 |
| Digits, carries & numeral bases | 4 | 10 | 2 |
| Congruences & periodicity | 6 | 9 | 19 |
| Prime exponents & divisor functions | 7 | 10 | 12 |
| Diophantine equations & factorisation | 4 | 5 | 7 |
| Generating functions & parity filters | 5 | 4 | 4 |
| Recurrences, states & linear maps | 5 | 7 | 9 |
| Graphs, matchings & extremal bounds | 5 | 5 | 4 |

Every technique contains a plain explanation, a highlighted conclusion, applicable formula, practical method, example and pitfall. Shared foundations and their existing extensions are reused after preparation. The old Discrete exercises are replaced, rather than left beside the new archive. The two old Discrete topic routes and earlier aliases remain valid; other competitions and BMT subjects retain their content.

The subject index offers six native year disclosures and 75 initially collapsed answer disclosures. A question link uses a stable problem ID and focuses the corresponding exercise within its primary category. The category shows theory first, then chronological main/tiebreaker exercises, then secondary references. Hints and solutions retain the site's separate inline disclosures. Official solution links include a one-based PDF page anchor.

## Transcription and reasoning checks

- 2020 TB1 uses n/2 and n/3, confirmed visually on the source PDF; these are not exponent expressions.
- 2025 Q8 uses N = 2025 × 202^5 × 20^25, confirmed visually. Its factorisation is 2^55 × 3^4 × 5^27 × 101^5.
- 2023 Q6 uses 210 × 2023, not 2^10 × 2023.
- 2023 Q9 permits empty sections; the completely increasing permutation has 15 divider placements and must be separated from the constant multiplicity-four cases.
- 2021 Q10 first proves bipartiteness and connectedness before counting bipartitions. Triangle-free alone is insufficient.
- 2024 Q10 removes the 120 placements with two distinct fourfold sums; direct enumeration of all 9! placements corroborates 20616.
- 2025 Q10 includes all small-exponent branches, preserves a ≥ b−2 after substitution, and supplies order/LTE/growth arguments excluding unbounded remaining exponents. Its finite computational search is explicitly not presented as a completeness proof.
- New TeX follows the existing stacked-fraction convention. Mathematical text is escaped and rendered by the existing vendored KaTeX to native MathML.

## Complete question inventory

| Year | Paper | Question | Primary category | Answer | Official worked solution |
| --- | --- | --- | --- | --- | --- |
| 2020 | Discrete | Q1 | Counting, bijections & complements | 96 | [PDF page 1](https://berkeley.mt/archives/bmt-2020/discrete-solutions.pdf#page=1) |
| 2020 | Discrete | Q2 | Conditional & geometric probability | 3 | [PDF page 1](https://berkeley.mt/archives/bmt-2020/discrete-solutions.pdf#page=1) |
| 2020 | Discrete | Q3 | Congruences & periodicity | 50 | [PDF page 1](https://berkeley.mt/archives/bmt-2020/discrete-solutions.pdf#page=1) |
| 2020 | Discrete | Q4 | Expectation & stopping times | 82 | [PDF page 1](https://berkeley.mt/archives/bmt-2020/discrete-solutions.pdf#page=1) |
| 2020 | Discrete | Q5 | Generating functions & parity filters | 2024 | [PDF page 2](https://berkeley.mt/archives/bmt-2020/discrete-solutions.pdf#page=2) |
| 2020 | Discrete | Q6 | Prime exponents & divisor functions | 2 | [PDF page 2](https://berkeley.mt/archives/bmt-2020/discrete-solutions.pdf#page=2) |
| 2020 | Discrete | Q7 | Diophantine equations & factorisation | 15 | [PDF page 2](https://berkeley.mt/archives/bmt-2020/discrete-solutions.pdf#page=2) |
| 2020 | Discrete | Q8 | Graphs, matchings & extremal bounds | 27 | [PDF page 3](https://berkeley.mt/archives/bmt-2020/discrete-solutions.pdf#page=3) |
| 2020 | Discrete | Q9 | Recurrences, states & linear maps | 76 | [PDF page 4](https://berkeley.mt/archives/bmt-2020/discrete-solutions.pdf#page=4) |
| 2020 | Discrete | Q10 | Prime exponents & divisor functions | 54 | [PDF page 5](https://berkeley.mt/archives/bmt-2020/discrete-solutions.pdf#page=5) |
| 2020 | Discrete Tiebreaker | Q1 | Prime exponents & divisor functions | 648 | [PDF page 1](https://berkeley.mt/archives/bmt-2020/discrete-tiebreaker-solutions.pdf#page=1) |
| 2020 | Discrete Tiebreaker | Q2 | Counting, bijections & complements | 313 | [PDF page 1](https://berkeley.mt/archives/bmt-2020/discrete-tiebreaker-solutions.pdf#page=1) |
| 2020 | Discrete Tiebreaker | Q3 | Conditional & geometric probability | 49 | [PDF page 1](https://berkeley.mt/archives/bmt-2020/discrete-tiebreaker-solutions.pdf#page=1) |
| 2021 | Discrete | Q1 | Counting, bijections & complements | 18 | [PDF page 1](https://berkeley.mt/archives/bmt-2021/discrete-solutions.pdf#page=1) |
| 2021 | Discrete | Q2 | Congruences & periodicity | 101 | [PDF page 1](https://berkeley.mt/archives/bmt-2021/discrete-solutions.pdf#page=1) |
| 2021 | Discrete | Q3 | Counting, bijections & complements | 13 | [PDF page 1](https://berkeley.mt/archives/bmt-2021/discrete-solutions.pdf#page=1) |
| 2021 | Discrete | Q4 | Conditional & geometric probability | 5/84 | [PDF page 1](https://berkeley.mt/archives/bmt-2021/discrete-solutions.pdf#page=1) |
| 2021 | Discrete | Q5 | Digits, carries & numeral bases | 233 | [PDF page 2](https://berkeley.mt/archives/bmt-2021/discrete-solutions.pdf#page=2) |
| 2021 | Discrete | Q6 | Prime exponents & divisor functions | 93 | [PDF page 2](https://berkeley.mt/archives/bmt-2021/discrete-solutions.pdf#page=2) |
| 2021 | Discrete | Q7 | Recurrences, states & linear maps | 377 | [PDF page 3](https://berkeley.mt/archives/bmt-2021/discrete-solutions.pdf#page=3) |
| 2021 | Discrete | Q8 | Expectation & stopping times | 10/19 | [PDF page 4](https://berkeley.mt/archives/bmt-2021/discrete-solutions.pdf#page=4) |
| 2021 | Discrete | Q9 | Congruences & periodicity | 5 | [PDF page 5](https://berkeley.mt/archives/bmt-2021/discrete-solutions.pdf#page=5) |
| 2021 | Discrete | Q10 | Graphs, matchings & extremal bounds | 23/24 | [PDF page 6](https://berkeley.mt/archives/bmt-2021/discrete-solutions.pdf#page=6) |
| 2021 | Discrete Tiebreaker | Q1 | Congruences & periodicity | 0 | [PDF page 1](https://berkeley.mt/archives/bmt-2021/discrete-tiebreaker-solutions.pdf#page=1) |
| 2021 | Discrete Tiebreaker | Q2 | Diophantine equations & factorisation | 11 | [PDF page 1](https://berkeley.mt/archives/bmt-2021/discrete-tiebreaker-solutions.pdf#page=1) |
| 2021 | Discrete Tiebreaker | Q3 | Generating functions & parity filters | 104 | [PDF page 1](https://berkeley.mt/archives/bmt-2021/discrete-tiebreaker-solutions.pdf#page=1) |
| 2022 | Discrete | Q1 | Counting, bijections & complements | 18 | [PDF page 1](https://berkeley.mt/archives/bmt-2022/discrete-solutions.pdf#page=1) |
| 2022 | Discrete | Q2 | Prime exponents & divisor functions | 11 | [PDF page 1](https://berkeley.mt/archives/bmt-2022/discrete-solutions.pdf#page=1) |
| 2022 | Discrete | Q3 | Conditional & geometric probability | 25/72 | [PDF page 1](https://berkeley.mt/archives/bmt-2022/discrete-solutions.pdf#page=1) |
| 2022 | Discrete | Q4 | Counting, bijections & complements | 932 | [PDF page 1](https://berkeley.mt/archives/bmt-2022/discrete-solutions.pdf#page=1) |
| 2022 | Discrete | Q5 | Digits, carries & numeral bases | 397 | [PDF page 2](https://berkeley.mt/archives/bmt-2022/discrete-solutions.pdf#page=2) |
| 2022 | Discrete | Q6 | Conditional & geometric probability | 111/128 | [PDF page 3](https://berkeley.mt/archives/bmt-2022/discrete-solutions.pdf#page=3) |
| 2022 | Discrete | Q7 | Expectation & stopping times | 689/45 | [PDF page 3](https://berkeley.mt/archives/bmt-2022/discrete-solutions.pdf#page=3) |
| 2022 | Discrete | Q8 | Recurrences, states & linear maps | 3010 | [PDF page 4](https://berkeley.mt/archives/bmt-2022/discrete-solutions.pdf#page=4) |
| 2022 | Discrete | Q9 | Generating functions & parity filters | 1355 | [PDF page 5](https://berkeley.mt/archives/bmt-2022/discrete-solutions.pdf#page=5) |
| 2022 | Discrete | Q10 | Prime exponents & divisor functions | 648 | [PDF page 6](https://berkeley.mt/archives/bmt-2022/discrete-solutions.pdf#page=6) |
| 2022 | Discrete Tiebreaker | Q1 | Digits, carries & numeral bases | 90 | [PDF page 1](https://berkeley.mt/archives/bmt-2022/discrete-tiebreaker-solutions.pdf#page=1) |
| 2022 | Discrete Tiebreaker | Q2 | Digits, carries & numeral bases | 31 | [PDF page 1](https://berkeley.mt/archives/bmt-2022/discrete-tiebreaker-solutions.pdf#page=1) |
| 2022 | Discrete Tiebreaker | Q3 | Congruences & periodicity | 19 | [PDF page 1](https://berkeley.mt/archives/bmt-2022/discrete-tiebreaker-solutions.pdf#page=1) |
| 2023 | Discrete | Q1 | Digits, carries & numeral bases | 171 | [PDF page 1](https://berkeley.mt/archives/bmt-2023/discrete-solutions.pdf#page=1) |
| 2023 | Discrete | Q2 | Counting, bijections & complements | 90 | [PDF page 1](https://berkeley.mt/archives/bmt-2023/discrete-solutions.pdf#page=1) |
| 2023 | Discrete | Q3 | Digits, carries & numeral bases | 1111 | [PDF page 1](https://berkeley.mt/archives/bmt-2023/discrete-solutions.pdf#page=1) |
| 2023 | Discrete | Q4 | Congruences & periodicity | 182 | [PDF page 1](https://berkeley.mt/archives/bmt-2023/discrete-solutions.pdf#page=1) |
| 2023 | Discrete | Q5 | Conditional & geometric probability | 6/11 | [PDF page 2](https://berkeley.mt/archives/bmt-2023/discrete-solutions.pdf#page=2) |
| 2023 | Discrete | Q6 | Congruences & periodicity | 51 | [PDF page 2](https://berkeley.mt/archives/bmt-2023/discrete-solutions.pdf#page=2) |
| 2023 | Discrete | Q7 | Expectation & stopping times | 11/18 | [PDF page 3](https://berkeley.mt/archives/bmt-2023/discrete-solutions.pdf#page=3) |
| 2023 | Discrete | Q8 | Prime exponents & divisor functions | 232 | [PDF page 4](https://berkeley.mt/archives/bmt-2023/discrete-solutions.pdf#page=4) |
| 2023 | Discrete | Q9 | Counting, bijections & complements | 544 | [PDF page 5](https://berkeley.mt/archives/bmt-2023/discrete-solutions.pdf#page=5) |
| 2023 | Discrete | Q10 | Recurrences, states & linear maps | 970 | [PDF page 6](https://berkeley.mt/archives/bmt-2023/discrete-solutions.pdf#page=6) |
| 2023 | Discrete Tiebreaker | Q1 | Conditional & geometric probability | 40/343 | [PDF page 1](https://berkeley.mt/archives/bmt-2023/discrete-tiebreaker-solutions.pdf#page=1) |
| 2023 | Discrete Tiebreaker | Q2 | Counting, bijections & complements | 41 | [PDF page 1](https://berkeley.mt/archives/bmt-2023/discrete-tiebreaker-solutions.pdf#page=1) |
| 2023 | Discrete Tiebreaker | Q3 | Recurrences, states & linear maps | 7 | [PDF page 1](https://berkeley.mt/archives/bmt-2023/discrete-tiebreaker-solutions.pdf#page=1) |
| 2024 | Discrete | Q1 | Digits, carries & numeral bases | 939 | [PDF page 1](https://berkeley.mt/archives/bmt-2024/discrete-solutions.pdf#page=1) |
| 2024 | Discrete | Q2 | Counting, bijections & complements | 26400 | [PDF page 1](https://berkeley.mt/archives/bmt-2024/discrete-solutions.pdf#page=1) |
| 2024 | Discrete | Q3 | Diophantine equations & factorisation | 11 | [PDF page 1](https://berkeley.mt/archives/bmt-2024/discrete-solutions.pdf#page=1) |
| 2024 | Discrete | Q4 | Recurrences, states & linear maps | 44 | [PDF page 1](https://berkeley.mt/archives/bmt-2024/discrete-solutions.pdf#page=1) |
| 2024 | Discrete | Q5 | Generating functions & parity filters | 5/81 | [PDF page 2](https://berkeley.mt/archives/bmt-2024/discrete-solutions.pdf#page=2) |
| 2024 | Discrete | Q6 | Digits, carries & numeral bases | 6020 | [PDF page 3](https://berkeley.mt/archives/bmt-2024/discrete-solutions.pdf#page=3) |
| 2024 | Discrete | Q7 | Counting, bijections & complements | 2/5 | [PDF page 3](https://berkeley.mt/archives/bmt-2024/discrete-solutions.pdf#page=3) |
| 2024 | Discrete | Q8 | Prime exponents & divisor functions | 2160 | [PDF page 4](https://berkeley.mt/archives/bmt-2024/discrete-solutions.pdf#page=4) |
| 2024 | Discrete | Q9 | Congruences & periodicity | 81 | [PDF page 5](https://berkeley.mt/archives/bmt-2024/discrete-solutions.pdf#page=5) |
| 2024 | Discrete | Q10 | Graphs, matchings & extremal bounds | 20616 | [PDF page 6](https://berkeley.mt/archives/bmt-2024/discrete-solutions.pdf#page=6) |
| 2025 | Discrete | Q1 | Conditional & geometric probability | 1/3 | [PDF page 1](https://berkeley.mt/archives/bmt-2025/discrete-solutions.pdf#page=1) |
| 2025 | Discrete | Q2 | Diophantine equations & factorisation | 5 | [PDF page 1](https://berkeley.mt/archives/bmt-2025/discrete-solutions.pdf#page=1) |
| 2025 | Discrete | Q3 | Counting, bijections & complements | 60 | [PDF page 1](https://berkeley.mt/archives/bmt-2025/discrete-solutions.pdf#page=1) |
| 2025 | Discrete | Q4 | Digits, carries & numeral bases | 59/1500 | [PDF page 1](https://berkeley.mt/archives/bmt-2025/discrete-solutions.pdf#page=1) |
| 2025 | Discrete | Q5 | Prime exponents & divisor functions | 2131 | [PDF page 2](https://berkeley.mt/archives/bmt-2025/discrete-solutions.pdf#page=2) |
| 2025 | Discrete | Q6 | Recurrences, states & linear maps | 360 | [PDF page 2](https://berkeley.mt/archives/bmt-2025/discrete-solutions.pdf#page=2) |
| 2025 | Discrete | Q7 | Graphs, matchings & extremal bounds | 845 | [PDF page 3](https://berkeley.mt/archives/bmt-2025/discrete-solutions.pdf#page=3) |
| 2025 | Discrete | Q8 | Prime exponents & divisor functions | 13328 | [PDF page 4](https://berkeley.mt/archives/bmt-2025/discrete-solutions.pdf#page=4) |
| 2025 | Discrete | Q9 | Graphs, matchings & extremal bounds | 51 | [PDF page 5](https://berkeley.mt/archives/bmt-2025/discrete-solutions.pdf#page=5) |
| 2025 | Discrete | Q10 | Diophantine equations & factorisation | 1998 | [PDF page 6](https://berkeley.mt/archives/bmt-2025/discrete-solutions.pdf#page=6) |
| 2025 | Discrete Tiebreaker | Q1 | Counting, bijections & complements | 76 | [PDF page 1](https://berkeley.mt/archives/bmt-2025/discrete-tiebreaker-solutions.pdf#page=1) |
| 2025 | Discrete Tiebreaker | Q2 | Digits, carries & numeral bases | 663 | [PDF page 1](https://berkeley.mt/archives/bmt-2025/discrete-tiebreaker-solutions.pdf#page=1) |
| 2025 | Discrete Tiebreaker | Q3 | Congruences & periodicity | 675 | [PDF page 2](https://berkeley.mt/archives/bmt-2025/discrete-tiebreaker-solutions.pdf#page=2) |

## Source documents

Hashes refer to the PDFs retrieved for this audit, not to any republished PDF assets. The site links to the organisers' files and does not bundle their PDFs.

| Year | File | PDF pages | SHA-256 |
| --- | --- | ---: | --- |
| 2020 | [discrete-problems.pdf](https://berkeley.mt/archives/bmt-2020/discrete-problems.pdf) | 1 | a497bb2f2ce467bddaf7e254b9d9b8531fb95f0240e740d152ffc8d4d1f001aa |
| 2020 | [discrete-solutions.pdf](https://berkeley.mt/archives/bmt-2020/discrete-solutions.pdf) | 8 | 540c682a03a298357d944a32c9141fcf965f36fc98af9ae63c553a4a9ef4cfbb |
| 2020 | [discrete-tiebreaker-problems.pdf](https://berkeley.mt/archives/bmt-2020/discrete-tiebreaker-problems.pdf) | 1 | c692b2a0091335ab2de9327257c28b72947578c5744a6d7d33428df56cda58c8 |
| 2020 | [discrete-tiebreaker-solutions.pdf](https://berkeley.mt/archives/bmt-2020/discrete-tiebreaker-solutions.pdf) | 1 | f5aca5e679ef3b8e5d4ccbb4a2b2120a1af3b8dd290d4ccb9d96606e6bd22067 |
| 2021 | [discrete-problems.pdf](https://berkeley.mt/archives/bmt-2021/discrete-problems.pdf) | 1 | ce93a48f6317dcdc7ab23d8f22315a2b3d5697344cc7b082fa6b46689c553f1a |
| 2021 | [discrete-solutions.pdf](https://berkeley.mt/archives/bmt-2021/discrete-solutions.pdf) | 7 | fd2414e854b8f822364ad9958a262abb9d27abde300ddc078f655923e9675638 |
| 2021 | [discrete-tiebreaker-problems.pdf](https://berkeley.mt/archives/bmt-2021/discrete-tiebreaker-problems.pdf) | 1 | 2efd7ecbea60d6db3cd72a67682c3abaf748ed1f1cc3043f93562019c5496a34 |
| 2021 | [discrete-tiebreaker-solutions.pdf](https://berkeley.mt/archives/bmt-2021/discrete-tiebreaker-solutions.pdf) | 2 | b1f18df4bc3abcaa0bb77dd1b5f2bc6cdaa17f8c97eb3898a119a64b3f8ebf1c |
| 2022 | [discrete-problems.pdf](https://berkeley.mt/archives/bmt-2022/discrete-problems.pdf) | 1 | 983fb7004b9638665002d52ac70d236499dd1566834a2d98ff506f68c08d2d4f |
| 2022 | [discrete-solutions.pdf](https://berkeley.mt/archives/bmt-2022/discrete-solutions.pdf) | 7 | f7289711955e9fd36adf55de737d952f8e1fa61ee3954581c27228dc306bbb77 |
| 2022 | [discrete-tiebreaker-problems.pdf](https://berkeley.mt/archives/bmt-2022/discrete-tiebreaker-problems.pdf) | 1 | ea007081792cd64d62270b86728a4d6098340334834c2e81283d49da54059267 |
| 2022 | [discrete-tiebreaker-solutions.pdf](https://berkeley.mt/archives/bmt-2022/discrete-tiebreaker-solutions.pdf) | 2 | 9c22ef4b8303ca89e5cadaccba577c2679bb55d806ec4b93b2aa6b5fa581c1a9 |
| 2023 | [discrete-problems.pdf](https://berkeley.mt/archives/bmt-2023/discrete-problems.pdf) | 2 | e4147f75b403a1bd78d02d3e03358083b58575f1ef10fc92b42dff3242245957 |
| 2023 | [discrete-solutions.pdf](https://berkeley.mt/archives/bmt-2023/discrete-solutions.pdf) | 6 | 0e498f4116a320d0b74e86fc5ba8ff3d3f16ec0f878c72a26b09fad94ec7eb17 |
| 2023 | [discrete-tiebreaker-problems.pdf](https://berkeley.mt/archives/bmt-2023/discrete-tiebreaker-problems.pdf) | 1 | bf2f6dc1e886965de9df0b5b179eaf3969c7b3b48f41ea8ba9d917548d2585fc |
| 2023 | [discrete-tiebreaker-solutions.pdf](https://berkeley.mt/archives/bmt-2023/discrete-tiebreaker-solutions.pdf) | 2 | ad8c9666ddb8a7bba560378365219f4cd78e317656a9eecf315cc6145419f8a6 |
| 2024 | [discrete-problems.pdf](https://berkeley.mt/archives/bmt-2024/discrete-problems.pdf) | 2 | e1383e6a81caa0fc57470947d779cd9814a24bd125914b7b12f19d89dbc8a63e |
| 2024 | [discrete-solutions.pdf](https://berkeley.mt/archives/bmt-2024/discrete-solutions.pdf) | 6 | dd7d4ae39863b1ecfab76ee2d84c1ea168e6f294ce7b11d75d5792169da4b9e4 |
| 2025 | [discrete-problems.pdf](https://berkeley.mt/archives/bmt-2025/discrete-problems.pdf) | 2 | be7e28c3de14e36c24363146fc0232c95f36dcb569e9793f866b9710bb6b6d4c |
| 2025 | [discrete-solutions.pdf](https://berkeley.mt/archives/bmt-2025/discrete-solutions.pdf) | 12 | b4de023b7d36b693ff98fa234057140237eefd4d50959a091f61598f48ed24fa |
| 2025 | [discrete-tiebreaker-problems.pdf](https://berkeley.mt/archives/bmt-2025/discrete-tiebreaker-problems.pdf) | 2 | ad725a007f1423f4566e3132e4e87392afd19d1833a42e29f7fac5b8b1f33515 |
| 2025 | [discrete-tiebreaker-solutions.pdf](https://berkeley.mt/archives/bmt-2025/discrete-tiebreaker-solutions.pdf) | 2 | ea8f8f7293c84aa5f3451353a53cbff8c716dc0c2b7a2a516dea7b5f0dec3e93 |

## Validation and limits

- The existing content, mathematical rendering, study state, search/knowledge, admissions and mobile-controller checks are run with the new taxonomy.
- scripts/check-bmt-discrete.mjs checks all 75 IDs and official answer transcriptions, per-year completeness, ten categories, all primary and secondary links, initially collapsed answers and 44 independent finite computations. Checks include all 362880 labelled 3×3 grids, direct lattice-point and modular scans, exact products and alternative recurrences.
- Finite computation corroborates results; it does not formally verify every proof or replace unbounded/existence arguments.
- The isolated Edge browser suite passed at 1440, 1024, 391 and 320 CSS pixels. It rendered all 71 populated topics with extensions expanded; for the new Discrete categories it also expanded every hint and worked solution. It checked all six year groups, 75 initially collapsed answer disclosures, question deep-link focus, inline hints and answers, native MathML, and page overflow. No browser errors were observed. Screenshots of the category index and expanded answer lookup were visually inspected at 1440 and 391 pixels.
- Desktop mobile emulation does not establish physical-phone, Safari keyboard or touch behaviour. No physical phone was tested.
- Deployment verification is recorded separately after publication, against the exact new commit and live site bytes.
