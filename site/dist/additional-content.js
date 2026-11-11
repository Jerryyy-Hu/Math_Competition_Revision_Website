import { bullet, exercise, topic } from './content.js';

export const additionalCollections = [
  {
    id: 'bmt', name: 'BMT', fullName: 'Berkeley Math Tournament', short: 'Many ideas. One elegant solution.', color: 'sage', symbol: 'geometry',
    description: '在四个数学方向之间切换，用结构化观察提升解题的准确度与速度。',
    note: 'The notes below are a curated study map, not an official exhaustive syllabus. Practice questions are original or classical; official tournament papers are linked separately.',
    subjects: [
      { id: 'algebra', name: 'Algebra', description: '从代数结构中减少计算。', topics: [
        topic('equations-polynomials', 'Equations & polynomials', '先找对称关系、因式或有效的代换。', [
          bullet('Symmetric substitution', '用根的和与积，简化无需分别求根的表达式。', 'α + β = −b/a, αβ = c/a'),
          bullet('Factorisation', '优先检查有理根、平方差与分组；每次约分都需保留原式的定义域。'),
          bullet('Remainder theorem', '求多项式除以 x − r 的余数，只需计算 P(r)。'),
          bullet('Roots of unity', '利用单位根的周期与几何级数，整理循环出现的幂。', '1 + ω + ⋯ + ωⁿ⁻¹ = 0 (ωⁿ = 1, ω ≠ 1)'),
        ], [exercise('Power sums without solving', 'The roots of x² − 3x + 1 = 0 are α and β. Find α⁴ + β⁴.', '先求 α² + β²，再对它平方并扣除重复项。', ['Vieta’s formulas give α + β = 3 and αβ = 1.', 'Thus α² + β² = 3² − 2 = 7, and α⁴ + β⁴ = 7² − 2(αβ)² = 47.'], false)]),
        topic('sequences-sums', 'Sequences & sums', '通过差分、配对与望远镜求和找到简洁形式。', [
          bullet('Arithmetic & geometric sums', '先辨认公差或公比；使用几何级数公式时单独检查公比为 1 的情况。', '1 + r + ⋯ + rᵏ⁻¹ = (1 − rᵏ)/(1 − r), r ≠ 1'),
          bullet('Finite differences', '相邻差比原数列简单时，先研究差分，再累加还原。'),
          bullet('Telescoping', '将求和项拆成连续两项之差，留意首尾未消去的项。'),
          bullet('Index pairing', '将第 k 项与倒数第 k 项配对，寻找恒定的和或积。'),
        ], [exercise('A weighted geometric sum', 'Evaluate S = 1·2 + 2·2² + ⋯ + n·2ⁿ for n ≥ 1.', '将 S 与 2S 错位相减，先消去带权项。', ['Subtract S from 2S after shifting the index. This gives S = n·2ⁿ⁺¹ − (2 + 2² + ⋯ + 2ⁿ).', 'The geometric sum is 2ⁿ⁺¹ − 2. Therefore S = (n − 1)2ⁿ⁺¹ + 2.'], false)]),
      ]},
      { id: 'combinatorics', name: 'Combinatorics', description: '准确区分样本空间与限制条件。', topics: [
        topic('counting-probability', 'Counting & probability', '先定义对象和样本空间，再计算。', [
          bullet('Combinations & restrictions', '有序选择与无序选择不能混用；把特殊限制先转化为分类、补集或插空。', 'C(n, k) = n! / [k!(n − k)!]'),
          bullet('Complementary probability', '至少一次发生的问题，通常先求一次也不发生。', 'P(at least one) = 1 − P(none)'),
          bullet('Conditional probability', '已知事件发生后，需要在新的条件样本空间中重新计数。', 'P(A | B) = P(A ∩ B)/P(B), P(B) > 0'),
          bullet('Linearity of expectation', '将总量写成指示变量之和；期望可相加，不需要各项相互独立。', 'E[X₁ + ⋯ + Xₙ] = ΣE[Xᵢ]'),
        ], [exercise('Exactly two adjacent heads', 'A fair coin is tossed four times. What is the probability of exactly two heads, with those heads adjacent?', '先找两个 H 形成连续块的全部合法位置。', ['The favourable sequences are HHTT, THHT, and TTHH.', 'All 16 sequences are equally likely, so the probability is 3/16.'], false)]),
        topic('discrete-structures', 'Discrete structures', '用抽屉、递推与图把离散条件变得可见。', [
          bullet('Pigeonhole principle', '把要保证相同的属性当作抽屉，比较对象数与类别数。'),
          bullet('Recurrences', '按最后一个对象分类，同时明确初始值与递推适用范围。'),
          bullet('Graph modelling', '把关系作为边；利用度数、连通性或环避免繁杂枚举。'),
          bullet('Parity & invariants', '每次操作先检查模 2 的变化，再考虑更合适的模数或权重。'),
        ], [exercise('A common remainder', 'Prove that any six integers contain two whose difference is divisible by 5.', '模 5 只有几种余数？', ['There are five residue classes modulo 5.', 'By the pigeonhole principle, two of the six integers have the same residue. Their difference is divisible by 5.'])]),
      ]},
      { id: 'geometry', name: 'Geometry', description: '把几何关系转化为恰当的长度与面积。', topics: [
        topic('euclidean-geometry', 'Euclidean geometry', '角、圆与面积比常能替代大规模计算。', [
          bullet('Similarity', '先找两个角相等，再按对应顺序写边长比。'),
          bullet('Cyclic geometry', '使用同弦所对圆周角、切线与弦夹角，以及对角互补。'),
          bullet('Area formulas', '根据已知信息选择底乘高、两边夹角或内切圆半径。', 'Δ = ab sin C/2 = rs'),
          bullet('Power of a point', '割线、弦与切线长度之间可通过相同的点幂关联。', 'PT² = PA·PB'),
        ], [exercise('An inradius from three sides', 'A triangle has side lengths 13, 14, and 15. Find its inradius.', '先用 Heron’s formula 求面积，再使用 Δ = rs。', ['The semiperimeter is s = 21. Heron’s formula gives Δ = √(21·8·7·6) = 84.', 'Since Δ = rs, the inradius is r = 84/21 = 4.'], false)]),
        topic('coordinate-geometry', 'Coordinate geometry', '选择坐标后，用代数准确记录几何限制。', [
          bullet('Distance & slope', '垂直直线未必有有限斜率；点积通常能统一处理。', 'd² = (x₂ − x₁)² + (y₂ − y₁)²'),
          bullet('Circle equations', '配方可从一般方程直接读取圆心与半径。', '(x − a)² + (y − b)² = r²'),
          bullet('Determinant area', '用行列式求面积时，最后取绝对值；保留符号则可追踪方向。'),
          bullet('Lattice geometry', '简单格点多边形可用 Pick’s theorem；I 表示内部格点，B 表示边界格点。', 'Area = I + B/2 − 1'),
        ], [exercise('A circle through three points', 'Find the equation of the circle through (0, 0), (4, 0), and (0, 6).', '圆心必须同时位于两条弦的垂直平分线上。', ['The perpendicular bisectors of the horizontal and vertical chords meet at (2, 3).', 'The squared radius is 2² + 3² = 13, so the equation is (x − 2)² + (y − 3)² = 13.'], false)]),
      ]},
      { id: 'number-theory', name: 'Number theory', description: '让质因数与余数代替直接试算。', topics: [
        topic('congruences', 'Congruences & residues', '周期、逆元与同余方程共同缩小搜索。', [
          bullet('Power cycles', '计算幂的余数循环，使用指数的周期简化大指数。'),
          bullet('Modular inverses', '仅当 a 与 m 互质时，a 才存在模 m 的乘法逆元。'),
          bullet('Chinese remainder theorem', '模数两两互质时，指定各个余数可唯一确定模其乘积的一个类。'),
          bullet('Fermat & Euler', '先核对互质条件，再使用幂的指数约简。', 'gcd(a, m) = 1 ⇒ aᵠ⁽ᵐ⁾ ≡ 1 (mod m)'),
        ], [exercise('Two simultaneous remainders', 'Find the least positive integer n such that n ≡ 2 (mod 5) and n ≡ 3 (mod 7).', '写成 n = 5k + 2，再代入第二个条件。', ['Substitution gives 5k + 2 ≡ 3 (mod 7), so 5k ≡ 1 (mod 7).', 'Since 5·3 ≡ 1 (mod 7), k ≡ 3 (mod 7). Thus n ≡ 17 (mod 35), and the least positive solution is 17.'], false)]),
        topic('factorisation-valuations', 'Factorisation & valuations', '把乘法条件变成质因数指数的条件。', [
          bullet('Prime factorisation', '用质因数分解的唯一性，比较两个乘积各个质因子的指数。'),
          bullet('Divisor counting', '每个质因数指数都可独立选取。', 'n = p₁^(a₁) ⋯ pᵣ^(aᵣ) ⇒ d(n) = (a₁ + 1)⋯(aᵣ + 1)'),
          bullet('Legendre’s formula', '阶乘中每个 p 的倍数贡献一次，每个 p² 的倍数再多贡献一次，以此类推。', 'vₚ(n!) = Σⱼ≥₁ ⌊n/pʲ⌋'),
          bullet('Perfect powers', '若为完全 k 次幂，则所有质因数指数都必须被 k 整除。'),
        ], [exercise('Trailing zeros', 'How many trailing zeros does 100! have in base 10?', '分别考虑因子 2 和 5，哪一个更少？', ['Each trailing zero requires a factor 10 = 2·5. Factors of 2 are more numerous than factors of 5.', 'Legendre’s formula gives v₅(100!) = ⌊100/5⌋ + ⌊100/25⌋ = 20 + 4 = 24.', 'Therefore 100! has exactly 24 trailing zeros.'], false)]),
      ]},
    ],
  },
  {
    id: 'tmua', name: 'TMUA', fullName: 'Test of Mathematics for University Admission', short: 'Reason with precision.', color: 'peach', symbol: 'curve', scaffold: true,
    description: '分类已建立，内容稍后整理。',
    subjects: [
      { id: 'algebra-functions', name: 'Algebra & functions', topics: [category('expressions', 'Expressions & equations'), category('functions', 'Functions & graphs'), category('sequences', 'Sequences & binomial expansions')] },
      { id: 'geometry-calculus', name: 'Geometry & calculus', topics: [category('coordinates', 'Coordinate geometry & trigonometry'), category('calculus', 'Differentiation & integration')] },
      { id: 'logic-proof', name: 'Logic & proof', topics: [category('statements', 'Statements & quantifiers'), category('proof', 'Proof & counterexamples')] },
    ],
  },
  {
    id: 'step', name: 'STEP', fullName: 'Sixth Term Examination Paper', short: 'Stay with the hard problem.', color: 'blue', symbol: 'integral', scaffold: true,
    description: '分类已建立，内容稍后整理。',
    subjects: [
      { id: 'pure', name: 'Pure mathematics', topics: [category('algebra-proof', 'Algebra & proof'), category('calculus', 'Calculus'), category('complex', 'Trigonometry & complex numbers'), category('vectors', 'Vectors & geometry')] },
      { id: 'mechanics', name: 'Mechanics', topics: [category('motion', 'Forces & motion'), category('energy', 'Energy & momentum')] },
      { id: 'probability-statistics', name: 'Probability & statistics', topics: [category('distributions', 'Distributions'), category('conditional', 'Conditional probability & expectation')] },
    ],
  },
  {
    id: 'interview', name: 'University Interview', fullName: 'University Mathematics Interview', short: 'Make your thinking visible.', color: 'rose', symbol: 'infinity', scaffold: true,
    description: '分类已建立，内容稍后整理。',
    subjects: [
      { id: 'problem-solving', name: 'Problem solving', topics: [category('small-cases', 'Small cases & conjectures'), category('estimation', 'Estimation & bounds')] },
      { id: 'discussion', name: 'Mathematical discussion', topics: [category('thinking', 'Thinking aloud'), category('definitions', 'Definitions & proof')] },
      { id: 'core', name: 'Core mathematics', topics: [category('curves', 'Curve sketching'), category('limits', 'Sequences & limits'), category('probability', 'Probability puzzles')] },
    ],
  },
];

function category(id, title) {
  return { id, title, scaffold: true, description: '', bullets: [], exercises: [] };
}
