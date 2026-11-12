/** BMT study notes and independently restated official practice. */
const r = String.raw;
const technique = (name, nameZh, text, method, example, pitfall, formula = '') => ({ name, nameZh, text, method, example, pitfall, formula });
const problem = (year, round, number, title, question, hint, solution, proof = false) => ({
  id: `bmt-${year}-${round.toLowerCase()}-${number.replaceAll('.', '-')}`,
  title, question, hint, solution, proof,
  source: {
    competition: 'BMT', year, round, question: `Q${number}`, restated: true,
    url: `https://berkeley.mt/archives/bmt-${year}/${round.toLowerCase()}-problems.pdf`,
    solutionUrl: `https://berkeley.mt/archives/bmt-${year}/${round.toLowerCase()}-solutions.pdf`,
  },
});
const topic = (id, title, description, bullets, exercises, sources) => ({ id, title, description, bullets, exercises, ...(sources ? { sources } : {}) });

const linearCombination = problem(2025, 'Algebra', '1', 'A linear combination',
  r`For real \(x,y,z\), suppose \(5x+6y+7z=0\) and \(6x+7y+8z=1\). Evaluate \(65x+66y+67z\).`,
  '两式相减得到三个变量的和，再将目标拆成已知式的线性组合。',
  [r`Subtracting gives \(x+y+z=1\). Hence \(65x+66y+67z=60(x+y+z)+(5x+6y+7z)=60\).`]);
const transformedRoots = problem(2025, 'Algebra', '4', 'Roots after two transformations',
  r`Translate the graph of \(f(x)=(2x^2+7x+3)(x^2-2x-15)\) right by \(4\), then rotate it through \(180^\circ\) about the origin. Find the sum of the resulting distinct real roots.`,
  '先分解原多项式并去除重复根；追踪每个横截点的横坐标。',
  [r`Factor \(f(x)=(2x+1)(x+3)^2(x-5)\). Its distinct roots are \(-\frac12,-3,5\).`, r`Each root \(u\) becomes \(-(u+4)\), giving \(-\frac72,-1,-9\). Their sum is \(-\frac{27}{2}\).`]);
const arithmeticTerm = problem(2025, 'Algebra', '3', 'Recovering an arithmetic term',
  r`An arithmetic progression has nonzero first term \(a\), second term \(4a\), and third plus fourth terms totalling \(34\). Determine its second term.`,
  '用首项与公差表示所有条件，不必逐项猜测。',
  [r`The common difference is \(d=3a\). Thus \((a+2d)+(a+3d)=17a=34\), so \(a=2\) and the second term is \(8\).`]);
const mixedSequences = problem(2024, 'Algebra', '3', 'Two sequences, one parameter',
  r`An arithmetic sequence \((a_n)\) and a geometric sequence \((g_n)\) of ratio \(2\) satisfy \(a_1+g_1=a_2+g_2=1\) and \(a_{24}=g_7\). Determine \(a_{2024}\).`,
  '设等比数列首项为一个参数，再把等差数列也写成同一个参数的式子。',
  [r`Write \(g_1=t\). Then \(a_1=1-t\), \(a_2=1-2t\), so \(a_n=1-nt\).`, r`The remaining condition gives \(1-24t=64t\), hence \(t=\frac1{88}\). Therefore \(a_{2024}=1-\frac{2024}{88}=-22\).`]);
const derivativeEquation = problem(2025, 'Calculus', '1', 'Where a function equals its derivative',
  r`Set \(f(x)=x^2-11x+31\). If \(a<b\) are the two real solutions of \(f(x)=f'(x)\), evaluate \(10a+b\).`,
  '先求导；原条件会变成一个可分解的二次方程。',
  [r`Since \(f'(x)=2x-11\), the equation is \(x^2-13x+42=(x-6)(x-7)=0\). Thus \(a=6,b=7\), giving \(10a+b=67\).`]);
const exponentialMaximum = problem(2025, 'Calculus', '2', 'An exponential maximum',
  r`For \(x>0\), find the largest possible value of \(\frac{(2025^x)^\pi}{2025^{x^\pi}}\).`,
  '先化成同底数的幂，转而研究指数函数的单调性。',
  [r`The expression is \(2025^{h(x)}\), where \(h(x)=\pi x-x^\pi\). Its derivative is \(\pi(1-x^{\pi-1})\), positive below \(1\) and negative above \(1\). The maximum is therefore \(2025^{\pi-1}\), attained at \(x=1\).`]);
const floorIntegral = problem(2024, 'Calculus', '5', 'A floor function in a limit',
  r`Evaluate \(\displaystyle\lim_{n\to\infty}\int_0^n\frac{x\lfloor x\rfloor}{n^3}\,dx\).`,
  '将取整函数与原变量比较，用上下界夹住整个积分。',
  [r`For \(x\ge0\), \(x-1\le\lfloor x\rfloor\le x\). Multiplying by \(x\), integrating and dividing by \(n^3\) bounds the expression between \(\frac13-\frac1{2n}\) and \(\frac13\). The squeeze theorem gives \(\frac13\).`]);
const substitutionIntegral = problem(2024, 'Calculus', '7', 'A useful square-root substitution',
  r`Compute \(\displaystyle\int_0^{\frac12}\frac{dx}{(1-x)^{\frac12}(1+x)^{\frac52}}\).`,
  r`尝试 \(t=\sqrt{\frac{1-x}{1+x}}\)，根式与分母会同时简化。`,
  [r`Set \(t=\sqrt{\frac{1-x}{1+x}}\), so \(x=\frac{1-t^2}{1+t^2}\) and \(dx=-\frac{4t}{(1+t^2)^2}\,dt\). The integrand becomes \(-\frac{1+t^2}{2}\,dt\).`, r`The bounds become \(1\) and \(\frac1{\sqrt3}\). The answer is \(\left[\frac t2+\frac{t^3}{6}\right]_{\frac1{\sqrt3}}^1=\frac23-\frac5{9\sqrt3}\).`]);
const matchingSocks = problem(2025, 'Discrete', '1', 'A matching pair',
  r`A drawer contains two white and two black socks. Two socks are sampled uniformly without replacement. What is the probability of a matching colour?`,
  '抽出第一只后，只需数剩余三只中有几只与它同色。',
  [r`There are \(\binom42=6\) equally likely pairs; the white pair and the black pair succeed. Thus the probability is \(\frac26=\frac13\).`]);
const restrictedBoxes = problem(2025, 'Discrete', '3', 'A repeated occupancy',
  r`Distribute ten indistinguishable blocks among four distinguishable boxes, with every box nonempty and at least two boxes equally full. How many distributions satisfy this?`,
  '先求全部正整数解，再减去四个占用数互不相同的情形。',
  [r`Positive solutions of \(x_1+x_2+x_3+x_4=10\) number \(\binom93=84\). Four distinct positive occupancies sum to at least \(1+2+3+4=10\), so only permutations of \((1,2,3,4)\) fail. The answer is \(84-4!=60\).`]);
const doubleDivisibility = problem(2025, 'Discrete', '2', 'Two divisibility conditions',
  r`Find the positive integer \(n\) for which \(n\mid n+10\) and \(n+10\mid n+100\).`,
  '先减去整除式中已知的倍数，将变量限制为一个很短的因子表。',
  [r`The first condition requires \(n\mid10\), giving \(n\in\{1,2,5,10\}\). The second becomes \(n+10\mid90\). Only \(n=5\) works.`]);
const rationalInteger = problem(2024, 'Discrete', '3', 'A rational expression that is an integer',
  r`How many positive integers \(n\ne24\) make \(\frac{20+n}{24-n}\) an integer?`,
  r`将分子写成 \(44-(24-n)\)，再检查正、负分母与正整数条件。`,
  [r`Write the expression as \(\frac{44}{24-n}-1\). The nonzero integer \(d=24-n\) must divide \(44\), with \(d\le23\).`, r`Its positive choices are \(1,2,4,11,22\), and its negative choices are \(-1,-2,-4,-11,-22,-44\). These give \(11\) admissible integers.`]);
const semicircleBoundary = problem(2024, 'Geometry', '1', 'Three semicircular arcs',
  r`An equilateral triangle is surrounded by three outward semicircles, each of radius \(3\), with its sides as diameters. Find the length of the outer boundary.`,
  '外边界只由三段半圆弧组成；三条直径都在图形内部。',
  [r`Each semicircular arc has length \(\pi\cdot3=3\pi\). The outer boundary therefore has length \(9\pi\).`]);
const squareOnTriangle = problem(2025, 'Geometry', '1', 'An integer right triangle',
  r`A right triangle \(ABC\), right-angled at \(B\), has integer side lengths and \(AC=10\). Build square \(ACDE\) externally. Determine the perimeter of pentagon \(ABCDE\).`,
  '先确定斜边为十的整数直角三角形，再辨别正方形哪条边不属于外边界。',
  [r`If the shorter leg is \(a\le7\), the only square among \(100-a^2\) for \(a=1,\ldots,7\) is \(64\), at \(a=6\). Thus the legs are \(6,8\).`, r`The outer boundary uses those legs and three square sides, giving \(6+8+30=44\).`]);
const circleThroughTrisections = problem(2024, 'Geometry', '2', 'A circle through eight points',
  r`Trisect each side of a square of side \(6\). A circle passes through the resulting eight nonvertex points. Find its area.`,
  '将正方形中心设为原点，检查任意分点到中心的距离。',
  [r`Place the centre at \((0,0)\). The points are \((\pm3,\pm1)\) and \((\pm1,\pm3)\), all at squared distance \(10\). Thus the circle has area \(10\pi\).`]);
const equilateralCoordinates = problem(2025, 'Geometry', '4', 'Perpendicular lines in an equilateral triangle',
  r`In equilateral triangle \(ABC\), points \(D\in AB\) and \(E\in AC\) satisfy \(DE\parallel BC\) and \(CD\perp BE\). Determine \(\frac{AD}{AB}\).`,
  '用平行条件给两个分点设同一个比例，再把垂直转为点积为零。',
  [r`Set \(A=(0,\sqrt3),B=(-1,0),C=(1,0)\) and \(t=\frac{AD}{AB}=\frac{AE}{AC}\). Then \(D=(-t,\sqrt3(1-t))\), \(E=(t,\sqrt3(1-t))\).`, r`Perpendicularity gives \(-(1+t)^2+3(1-t)^2=0\), or \(t^2-4t+1=0\). Since \(0<t<1\), \(t=2-\sqrt3\).`]);
const burgerRates = problem(2025, 'Guts', '2', 'Two production rates',
  r`Isaac makes five more burgers per hour than Nathan. Nathan's four-hour output exceeds Isaac's three-hour output by twenty. How many burgers can they make together in five hours?`,
  '为每小时产量设未知数；用另一名队员检查时间单位和最后求的总量。',
  [r`If Nathan's hourly rate is \(v\), Isaac's is \(v+5\). The condition \(4v=3(v+5)+20\) gives \(v=35\). Together they make \(5(35+40)=375\) burgers.`]);
const sixDivisors = problem(2025, 'Guts', '4', 'Six selected divisors',
  r`Six distinct positive divisors of \(30\) have mean \(6\). Determine the largest selected divisor.`,
  '列出全部因子，研究没有选中的两个，比直接选六个更快。',
  [r`The divisors \(1,2,3,5,6,10,15,30\) total \(72\), while the selected six total \(36\). The omitted pair must sum to \(36\), so it is \(6,30\). The largest remaining divisor is \(15\).`]);
const origamiBisector = problem(2024, 'Power', '1.8', 'The crease as a perpendicular bisector',
  r`In the unit square, take \(A=(0,\frac1{2k})\), \(B=(\frac1{2k},1)\), with integer \(k\ge1\). Folding \(A\) onto \(B\) creates a crease meeting the vertical axis at \(P\). Prove \(\lvert P-(0,1)\rvert=\frac{k-1}{2k-1}\).`,
  r`折痕上的点到 \(A,B\) 距离相等。令 \(P=(0,p)\) 后只需解一个一次方程。`,
  [r`Let \(u=\frac1{2k}\) and \(P=(0,p)\). The crease is the perpendicular bisector of \(AB\), hence \((p-u)^2=u^2+(p-1)^2\).`, r`Expanding gives \(2p(1-u)=1\), so \(p=\frac{k}{2k-1}\). Thus \(\lvert1-p\rvert=\frac{k-1}{2k-1}\), as required.`], true);
const commutingRegionChanges = problem(2025, 'Power', '4.5', 'Why two region changes commute',
  r`A region crossing change in a knot diagram switches over/under information at every crossing bordering that region. Prove that applying such changes to regions \(R\) and \(S\) in either order gives the same diagram.`,
  '逐个交叉点考虑被翻转零次、一次或两次；边界在操作中不会改变。',
  [r`The underlying planar curves do not change, so both operations affect fixed sets of crossings. At each crossing the final state depends only on the parity of the number of switches.`, r`That number is \(\mathbf1_R+\mathbf1_S\), independent of order. Every crossing therefore has the same final state in both orders, proving the claim.`], true);

const formatSource = {
  title: 'BMT 2026 — format and scoring', url: 'https://berkeley.mt/events/bmt-2026/',
  detail: '2026 线下赛规则；核对日期 2026-11-12。团队策略为本学习库建议。',
};
const faqSource = { title: 'Official BMT FAQ', url: 'https://berkeley.mt/faqs/', detail: '个人 Focus 科目、作答要求，以及线上赛 Power 单独计分说明。' };

export const bmtCollection = {
  id: 'bmt', name: 'BMT', fullName: 'Berkeley Math Tournament', short: 'Many ideas. One elegant solution.', color: 'sage', symbol: 'geometry',
  description: '按官方四个 Focus 科目整理个人训练，并单列 Guts 与 Power 团队轮。Discrete 同时包含组合数学与数论。',
  note: 'The four Focus subjects and round names follow the official format. Topic subdivisions are a curated study map. Past-paper statements are independently restated; source PDFs and official solutions are linked.',
  sources: [formatSource, faqSource,
    { title: 'BMT 2025 archive', url: 'https://berkeley.mt/archives/bmt-2025/', detail: '四个 Focus 科目及 Power、Guts 的官方题目和解析。' },
    { title: 'BMT 2024 archive', url: 'https://berkeley.mt/archives/bmt-2024/', detail: '与本库所选真题对应的官方归档。' },
  ],
  subjects: [
    { id: 'algebra', name: 'Algebra', description: '从结构、根与数列关系中减少计算。', topics: [
      topic('equations-polynomials', 'Equations & polynomials', '把目标写成已知式，或把根的对称关系直接读出来。', [
        technique('Linear combinations', '线性组合', '当目标是未知数的线性式时，不必先分别求出所有未知数。', '对齐各式的系数，先相加或相减以获得一个更简单的组合，再将目标拆成这些组合。即使方程组不能唯一确定所有变量，目标仍可能唯一确定。', r`由 \(5x+6y+7z=0\) 与 \(6x+7y+8z=1\) 得 \(x+y+z=1\)，目标若是前式加上这个和的倍数即可直接求值。`, '证明拆分后的每个系数都吻合；不能因为未知数多就认定目标无法求出。'),
        technique('Factorisation', '因式分解', '先检查公共因子、平方差、完全平方和有理根，将高次方程化成较低次数的因式。', '分解前先明确实数还是复数范围；读取根后，单独检查重复根是否只应计一次。因式分解也适合追踪图像变换后的横截点。', r`\(x^4-1=(x-1)(x+1)(x^2+1)\)，在实数范围内只有 \(-1,1\) 两个根。`, '约去可能为零的因式会漏解；题目要求 distinct roots 时不能按重数求和。'),
        technique('Vieta’s formulas', '韦达定理与对称式', '需要根的和、积或幂和时，优先使用系数关系。', '二次方程中先记根的和与积，再将目标改写为这两个量。高次幂和可以用每个根满足的方程递推，不必求根式。', r`若 \(\alpha+\beta=3,\alpha\beta=1\)，则 \(\alpha^2+\beta^2=7\)，继而 \(\alpha^4+\beta^4=47\)。`, '非首一多项式必须除以首项系数；根的对称式不意味着每个根都是实数。', r`\alpha+\beta=-\frac ba,\qquad\alpha\beta=\frac ca`),
        technique('Roots of unity', '单位根与周期', '循环幂或单位圆上的复数常可转成有限等比和。', '把幂指数按阶数取余；遇到单位根乘积时，可将它们看作某个多项式的全部根，利用代入或求导。', r`若 \(\omega^n=1\) 且 \(\omega\ne1\)，则 \(1+\omega+\cdots+\omega^{n-1}=0\)。`, '使用“全部单位根”时必须包含根一；原始单位根的阶数与给定幂次可能不同。'),
      ], [linearCombination, transformedRoots]),
      topic('sequences-sums', 'Sequences & sums', '用共同参数、差分和抵消理解数列，而不逐项计算。', [
        technique('Arithmetic and geometric sequences', '等差与等比数列', '先用首项、公差或公比把每个条件写出来。', '不同数列之间若有关联，优先设一个共同参数，避免为每一项引入未知数。几何和公式的公比为一时单独处理。', r`若 \(g_1=t,g_2=2t\) 且 \(a_1+g_1=a_2+g_2=1\)，则 \(a_n=1-nt\)。`, '分清第零项和第一项；公比为零时不能随意除以前一项。', r`a_n=a_1+(n-1)d,\qquad \sum_{j=0}^{n-1}r^j=\frac{1-r^n}{1-r}\quad(r\ne1)`),
        technique('Finite differences', '有限差分', '当相邻项之差比原数列简单时，先研究差分。', '计算连续的一阶、二阶差分，寻找低次多项式结构；再用初值累加还原。差分恒定可提示次数，但证明需要覆盖所有项。', r`\((n+1)^2-n^2=2n+1\)，累加得到前若干奇数之和为平方数。`, '少量数据的差分只能提出猜想，不能证明数列始终遵循这一规律。'),
        technique('Telescoping', '望远镜求和', '将每项拆成前后两项之差，让中间项抵消。', '先展开前几项与末几项检查索引，再写出一般边界项。带权几何和可通过移位相减形成同样的抵消。', r`将每项拆成相邻倒数之差：\(\sum_{k=1}^n\frac1{k(k+1)}=\sum_{k=1}^n(\frac1k-\frac1{k+1})=1-\frac1{n+1}\)。`, '无穷求和还需证明极限存在；不可只写“其余全抵消”而不检查末项。'),
        technique('Index pairing', '首尾配对与指标变换', '将第一个与最后一个、第二个与倒数第二个配对，寻找不变的和或积。', '写出指标变换前后对应的上下限。奇数项个数时，中间项必须单独计入。配对也可用于互补函数值。', r`\(\sum_{k=1}^n k=\frac{n(n+1)}2\)，因为将整列正写与反写相加后每列都是 \(n+1\)。`, '配对所得的是两倍原和；非对称范围或重复中点会造成倍数错误。'),
      ], [arithmeticTerm, mixedSequences]),
    ] },
    { id: 'calculus', name: 'Calculus', description: '导数、极限、积分与级数共同刻画变化和累积。', topics: [
      topic('derivatives-optimisation', 'Derivatives, limits & optimisation', '先找定义域和结构，再用导数证明变化趋势。', [
        technique('Differentiation rules', '求导法则与链式法则', '区分和、积、商与复合函数，逐层求导。', '把内层函数临时设为一个变量，避免漏掉其导数。含参数时，先说明相对哪个变量求导，其他参数保持不变。', r`对 \(f(x)=\sqrt{3x^2+2x+1}\)，有 \(f'(x)=\frac{3x+1}{\sqrt{3x^2+2x+1}}\)。`, '商的导数不是导数的商；复合根式必须乘上内层的导数。', r`\frac{d}{dx}F(g(x))=F'(g(x))g'(x)`),
        technique('Monotonicity and optimisation', '单调性与最值', '用导数符号判断增减，并用端点和边界行为核对全局最值。', '先列定义域，解临界点，再按区间分析符号。若目标是同底指数且底数大于一，可只优化指数，减少繁琐计算。', r`\(h(x)=\pi x-x^\pi\) 在 \(0<x<1\) 递增，在 \(x>1\) 递减，因此最大值在 \(x=1\)。`, '导数为零只说明驻点，可能不是极值；开区间上的上确界也可能取不到。'),
        technique('Tangency and repeated roots', '相切与重根条件', '两个函数只有一个交点时，相切常是确定参数的线索。', '联立函数值相等与导数相等，求得候选参数，再用单调性或凸性证明没有其他交点。多项式重根可用函数和导数同时为零处理。', r`曲线 \(y=e^{kx}\) 与 \(y=3\sqrt x\) 相切时，既满足函数值相等，也满足 \(ke^{kx}=\frac3{2\sqrt x}\)。`, '“唯一交点”未必总由相切产生；定义域端点相交需另外检查。'),
        technique('Limits and dominant terms', '极限与主导项', '先判断是可直接代入，还是存在零除零、无穷除无穷等未定式。', '多项式或根式常可提取最高次幂；差根式优先有理化。对幂的极限先取对数，但必须核对底数为正。', r`分子、分母同时提取最高次幂：\(\lim_{x\to\infty}\frac{3x+1}{\sqrt{3x^2+2x+1}}=\lim_{x\to\infty}\frac{3+\frac1x}{\sqrt{3+\frac2x+\frac1{x^2}}}=\sqrt3\)。`, '当变量可能为负时，平方根中提取平方要得到绝对值；L’Hôpital 法则必须核对条件。'),
      ], [derivativeEquation, exponentialMaximum]),
      topic('integrals-series', 'Integrals & series', '用换元、分段和极限把难积分变成可比较或可累加的对象。', [
        technique('Substitution', '积分换元', '选择能同时简化根式和微分项的新变量。', '先完整计算微分，再转换定积分上下限。若根式包含相似的和与差，分式根号换元常能把整式变为有理函数。', r`令 \(t=\sqrt{\frac{1-x}{1+x}}\)，则 \(x=\frac{1-t^2}{1+t^2}\)，含 \(1-x\) 与 \(1+x\) 的根式可同时简化。`, '只换积分函数而没有换微分会得出错误答案；换元后不能混用原上下限。', r`\int_a^b f(g(x))g'(x)\,dx=\int_{g(a)}^{g(b)}f(u)\,du`),
        technique('Integration by parts', '分部积分', '乘积中一部分求导变简单，另一部分容易积分时尝试分部积分。', '明确选择的两部分，完整保留边界项。多项式乘指数或三角函数可重复分部；递推积分要注明起始值。', r`将多项式求导、指数函数积分，得到：\(\int x e^x\,dx=xe^x-\int e^x\,dx=(x-1)e^x+C\)。`, '不定积分不要漏积分常数；定积分的边界项要在两个端点都求值。', r`\int u\,dv=uv-\int v\,du`),
        technique('Piecewise integration and bounds', '分段积分与夹逼', '遇到取整、绝对值或分段定义，按函数规则改变的位置切分。', '取整函数在每个相邻整数区间恒定；若只求极限，可以用更简单的上下界夹逼，从而避免冗长的精确求和。', r`对 \(x\ge0\)，\(x(x-1)\le x\lfloor x\rfloor\le x^2\)；积分后可控制相对误差。`, '有限个间断点不影响普通定积分，但无穷区间的收敛性必须单独处理。'),
        technique('Series and convergence', '级数展开与收敛', '把熟悉函数展开为幂级数，可将求和转成积分或函数值。', '先判断收敛范围，再进行逐项微分、积分或极限交换。求端点值时额外说明端点处的收敛依据。', r`\(\arctan x=\sum_{j=0}^{\infty}\frac{(-1)^j x^{2j+1}}{2j+1}\) 在 \(\lvert x\rvert<1\) 成立；在一处可用交错级数与连续性得到 \(\arctan1=\frac\pi4\)。`, '不能任意重排条件收敛级数；形式上展开正确不代表可以随意交换运算。'),
      ], [floorIntegral, substitutionIntegral]),
    ] },
    { id: 'discrete', name: 'Discrete', description: '官方 Discrete 同时覆盖 Combinatorics 与 Number Theory。', topics: [
      topic('counting-probability', 'Counting & probability', '先定义计数对象和样本空间，再处理限制与概率。', [
        technique('Counting with restrictions', '限制条件下的计数', '先明确顺序、标签和重复是否会产生不同对象。', '先处理最特殊的对象或限制；若“至少”或“不是全部”难以直接分类，就数全部再减去补集。每一步都应能对应到唯一对象。', r`四个正整数之和为十共有 \(\binom93\) 种；四个数互异时只能是 \((1,2,3,4)\) 的排列。`, '不可将有序与无序选择的答案混用；多个限制的补集不一定互不相交。', r`\binom nk=\frac{n!}{k!(n-k)!}`),
        technique('Stars and bars', '隔板法', '把相同物品分配给有标签的盒子，转成整数方程。', '非空条件先给每盒一个，再分配剩余；有上界则在基础答案上用容斥排除超界解。', r`\(x_1+\cdots+x_r=N\) 且每个 \(x_i\ge1\) 时，相当于在相邻物品间选取 \(r-1\) 个隔板。`, '盒子无标签、物品不同或还有次序限制时，普通隔板公式不能直接使用。', r`\#\{(x_1,\ldots,x_r)\in\mathbb Z_{>0}^r:\sum x_i=N\}=\binom{N-1}{r-1}`),
        technique('Conditional and complementary probability', '条件概率与补事件', '额外信息出现后，应在新的条件样本空间内重新计算。', '抽样不放回时下一次的分母会改变；“至少出现一次”常用一减去完全不出现。判断样本是否等可能后才能用有利数除以总数。', r`两白两黑的袜子不放回抽两只；第一只确定后，剩余三只中只有一只同色，因此概率是 \(\frac13\)。`, '条件概率不能忽略条件事件；独立、互斥和等可能是不同概念。', r`P(A\mid B)=\frac{P(A\cap B)}{P(B)}\quad(P(B)>0)`),
        technique('Linearity of expectation', '期望的线性性', '把总量拆成容易分析的指示变量，再把期望相加。', '为每个待计数事件定义取值为零或一的变量，其期望就是发生概率。各变量不需要独立，但必须明确期望存在。', r`随机排列中的不动点数 \(X=\sum I_i\)，每个 \(E[I_i]=\frac1n\)，因此 \(E[X]=1\)。`, '期望的乘法一般需要额外条件；期望值也不一定是某次试验能实际取到的值。', r`E\!\left[\sum_iX_i\right]=\sum_iE[X_i]`),
      ], [matchingSocks, restrictedBoxes]),
      topic('discrete-structures', 'Number theory & discrete structures', '用余数、因子、递推和图记录离散限制。', [
        technique('Divisibility and residues', '整除变形与同余', '从整除关系中加减已知倍数，消去变量或缩小候选集合。', '把有理式先改写为整数加常数除以一个整式；结果为整数就要求分母整除常数。幂的余数则研究周期。', r`\(n\mid n+10\) 等价于 \(n\mid10\)，从而正整数候选只有十的正因子。`, '约分或约去同余式中的因子需要互质条件；分母为零的值必须排除。'),
        technique('Prime factorisation and valuations', '质因数分解与赋值', '把乘积、整除、最大公因数和最小公倍数转成各质因子的指数。', '分别记录每个质因子的指数；最大公因数取较小指数，最小公倍数取较大指数。完全幂要求全部指数满足同样的整除条件。', r`\(72=2^3 3^2\)，因此正因子数为 \((3+1)(2+1)=12\)。`, '不同质因子可以分别分析，但最后需要兼顾所有质因子的约束。', r`v_p(\gcd(a,b))=\min(v_p(a),v_p(b)),\qquad d\!\left(\prod p_i^{a_i}\right)=\prod(a_i+1)`),
        technique('Recurrences and states', '递推与状态划分', '按最后一次选择分类，让当前对象由较小对象组成。', '若前一步的信息影响合法选择，就保留足够的状态；列出每种状态的初值与转移，最后才求总数。', r`长度为 \(n\) 且不含连续两个一的二进制串，按末尾是零还是一分类，得到 \(a_n=a_{n-1}+a_{n-2}\)。`, '状态遗漏会把非法对象计入；不同转移必须互斥，才能直接相加。'),
        technique('Graph modelling', '图论建模', '将对象作为顶点，将关系作为边，使局部限制变成度数或邻接限制。', '先注明是简单图还是有向图，允许哪些边。无向图可对边的两端计数；环形相邻问题常适合用环图表达。', r`若比赛中的选手为顶点、已进行的比赛为边，则某选手的比赛次数就是其度数。`, '握手定理给的是总度数为偶数，不代表每个顶点的度数都为偶数。', r`\sum_{v\in V}\deg(v)=2\lvert E\rvert`),
        technique('Pigeonhole principle and invariants', '抽屉原理与不变量', '存在性问题先找有限类别，操作问题先找每步保持的量。', '模数余数是常见抽屉；奇偶性是常见不变量。若简单奇偶不足，就尝试加权和、更大模数或单调量。', r`任意六个整数模五只有五种余数，因此有两个之差被五整除。`, '不变量一般只能排除不可能；证明可达还需给出构造或完整论证。'),
      ], [doubleDivisibility, rationalInteger]),
    ] },
    { id: 'geometry', name: 'Geometry', description: '先辨认角、长度与面积关系，再选择合适的图或坐标。', topics: [
      topic('euclidean-geometry', 'Euclidean geometry', '相似、圆与勾股关系能将图形约束转成少量精确等式。', [
        technique('Similarity', '相似三角形', '先证明两个角对应相等，再按相同顺序写边长比。', '平行线、切线与直角常提供相等角；明确缩放比例后，长度、面积、体积分别按一次、二次、三次变化。', r`若 \(DE\parallel BC\)，则 \(\triangle ADE\sim\triangle ABC\)，且 \(\frac{AD}{AB}=\frac{AE}{AC}=\frac{DE}{BC}\)。`, '对应顶点顺序错误会颠倒比例；相似不意味着两三角形大小相等。'),
        technique('Pythagoras and integer triangles', '勾股定理与整数直角三角形', '直角将三个边长关联，整数条件会进一步显著限制可能性。', '将较短直角边限制在合理范围，再检查另一边的平方是否为完全平方。复杂图形中，先确定外边界而非把所有边直接相加。', r`整数直角三角形斜边为十时，直角边为六和八；附着在斜边外的正方形只贡献三条边。`, '只写一个熟悉的勾股数组不足以证明唯一性；需要给出候选范围或一般分类依据。', r`a^2+b^2=c^2`),
        technique('Circle angles, arcs and areas', '圆周角、弧长与面积', '区分圆心角、圆周角、弧长和扇形面积。', '先在图中识别同弦、同弧或半径，再写角关系；计算边界时仅保留外露弧段，内部公共边不计入周长。', r`半径为三的半圆弧长为 \(3\pi\)；三段这样的外露弧组成的边界长为 \(9\pi\)。`, '弧度与角度不能混用；所求是弓形面积时，还需从扇形中减去三角形。', r`\ell=r\theta,\qquad A_{\rm sector}=\frac12r^2\theta\quad(\theta\text{ in radians})`),
        technique('Power of a point', '点幂定理', '同一个点引出的割线、弦或切线可用同一个乘积关联。', '先判断点在圆内还是圆外，再按几何位置写无向长度公式，或统一采用有向长度。切线是两个交点重合的极限情形。', r`圆外点 \(P\) 的切点为 \(T\)，割线依次经过 \(A,B\)，则 \(PT^2=PA\cdot PB\)。`, '圆内点的两弦长度乘积公式与有向点幂的符号不同；不要混用方向约定。'),
      ], [semicircleBoundary, squareOnTriangle]),
      topic('coordinate-geometry', 'Coordinate geometry', '选择保留对称性的坐标，把相似、垂直和圆转成代数。', [
        technique('Coordinates and dot products', '坐标选取与向量点积', '将对称中心放在原点，或将一条关键边放在坐标轴上。', '利用平行关系给分点设相同比例，再用点积表达垂直。点积比斜率更统一，能处理竖直直线。', r`非零向量 \((u,v)\) 与 \((s,t)\) 垂直当且仅当 \(us+vt=0\)。`, '任选复杂坐标可能增加变量；图形缩放只有在题目尺度允许时才可任意进行。', r`\mathbf u\cdot\mathbf v=u_1v_1+u_2v_2`),
        technique('Circle equations', '圆的方程', '将圆方程配方后，直接读取圆心与半径。', '对一组高度对称的点，先猜测圆心，再用距离平方验证全部点；三个不共线点可唯一确定圆。', r`边长为六的正方形居中放置后，边上三等分点为 \((\pm3,\pm1)\) 与 \((\pm1,\pm3)\)，距原点平方均为十。`, '通过部分点的圆不一定通过其余点；共线三点不存在普通有限半径圆。', r`(x-a)^2+(y-b)^2=R^2`),
        technique('Determinant area', '行列式面积', '坐标已知时，用行列式将三角形面积写成一个式子。', '保留带符号面积可追踪方向或相消，求实际面积时取绝对值。多边形可按顶点顺序使用鞋带公式。', r`顶点为 \((0,0),(4,0),(1,3)\) 的三角形面积为 \(\frac12\lvert4\cdot3\rvert=6\)。`, '顶点顺序必须沿边界排列；自交多边形的带符号面积不一定等于所求区域面积。', r`[ABC]=\frac12\left|\det\begin{pmatrix}x_B-x_A&y_B-y_A\\x_C-x_A&y_C-y_A\end{pmatrix}\right|`),
        technique('Lattice geometry', '格点几何与皮克定理', '简单格点多边形的面积可由内部点与边界点数求得。', '先核对全部顶点为整数点且边界不自交；边界点计数可用边的横纵坐标差的最大公因数，避免逐个数点。', r`\((0,0)\) 到 \((6,4)\) 的线段共有 \(\gcd(6,4)+1=3\) 个格点，包括两个端点。`, 'Pick’s theorem 用于平面简单格点多边形；有孔洞时公式需要调整，不能直接套用。', r`A=I+\frac B2-1`),
      ], [circleThroughTrisections, equilateralCoordinates]),
    ] },
    { id: 'team-rounds', name: 'Team Rounds', description: '区分现场轮次规则与团队协作建议。规则以所参加年度的官方文件为准。', topics: [
      topic('guts', 'Guts Round', '连续题组、现场提交与实时计分要求团队兼顾准确度和推进速度。', [
        technique('Official format', '官方模式', 'BMT 2026 线下 Guts 为七十五分钟，九组三题；提交当前组后才能领取下一组，并显示实时榜单。', '按完整题组练习提交节奏；当年题面中的分值、估算题及答案格式优先于历年经验。此条为规则摘要，其余协作条目为训练建议。', '用往年 Guts 按连续题组进行模拟，由一人记录当前题组和剩余时间，避免提前翻看后续组。', '不要把某一年每组的具体分值推广为永久规则；线上赛细节也需核对当年说明。'),
        technique('Parallel assignment', '并行分工', '建议先快速浏览当前组，再按擅长方向分配主解人。', '每题指定一名主解者，其他队员按空闲情况协助或独立复核。简短汇报卡点比所有人同时重复起步更有效。', '三题中一题是速率、一题是因子、一题是几何，可分别交给三位主解者，其余队员负责复核与提交。', '分工不应阻止求助；主解人卡住时，应明确说明已完成的部分及尚缺的观察。'),
        technique('Submission checkpoints', '提交前检查', '建议为每组安排一次短检查，由负责提交的人汇总最终答案。', '检查题号、单位、正负号、题目究竟求总数还是单项，以及精确答案是否化简。先写答案的依据，再由复核者检查最容易出错的一步。', '速率题求五小时总产量时，复核者应检查最终结果是否又乘了五，而非仅给出两人的每小时总产量。', '讨论中的暂定答案不能混入最终答案表；修改后须让提交者明确收到更新。'),
        technique('Time allocation', '时间分配与推进', '建议把等待当前难题的代价与解锁下一组的机会一起考虑。', '预先约定每组剩余时间检查点。卡住时先寻求独立思路，再由团队决定是否交出现有结果并推进；这是一种策略选择，不是保证得分的公式。', '两题已有可靠答案而第三题长期没有进展时，团队可短暂集中讨论，再依据剩余总时间决定提交时机。', '不要仅因实时排名变化就频繁改变方案；不能假定所有年份对空答案或修改答案采取相同处理。'),
      ], [burgerRates, sixDivisors], [formatSource,
        { title: 'BMT 2025 Guts instructions', url: 'https://berkeley.mt/archives/bmt-2025/guts-problems.pdf', detail: '历年训练示例；该年的分值与估算题规则只适用于该卷。' },
      ]),
      topic('power', 'Power Round', '围绕新主题阅读定义、建立依赖并写出严谨论证。', [
        technique('Official format', '官方模式', 'BMT 2026 线下 Power 为九十分钟的团队证明轮，围绕一个主题展开，通常不要求此前学过该主题。', '先读当年卷首说明再分工：哪些指令需要证明、可引用哪些已给结论，以及怎样编号和提交。2025 卷对 compute、find、draw 有无需证明的明确例外。', '2025 主题为 Knots，2024 主题为 Origami；学习重点是依据卷内定义推理，而非提前假定主题固定。', '规则与主题会随年份改变；Power Online 当前单独计分，不能套用线下总分权重。'),
        technique('Definition and dependency map', '定义与依赖图', '建议由队员快速记录新定义、可用定理及题目之间的依赖。', '明确某题是在应用已给结果，还是要求证明这个结果本身。把符号含义和允许引用的前置结论写在公共笔记中，减少概念分歧。', '折纸题中的折痕把一点映到另一点时，可立即记录“折痕是两点连线的垂直平分线”，再交给负责坐标的队员。', '不可在证明一个定理时循环引用它的后续推论；能否引用未解前题必须查当年卷首。'),
        technique('Proof ownership and review', '证明分工与交叉复核', '建议每题指定一位写作者与一位复核者，分开检查数学内容和表达。', '写作者明确假设、目标与逻辑链；复核者寻找未说明的边界、退化情形和必要定义。汇总时保持符号一致。', '操作交换性题可让一人按交叉点讨论奇偶，另一人检查操作是否会改变平面曲线及区域的边界。', '只写结论或画示意图通常不能替代所要求的证明；团队口头理解不等于纸面论证完整。'),
        technique('Points and dependencies', '按分值与依赖安排顺序', '建议扫描整卷，结合分值、所需时间和前置关系安排任务。', '早期定义题帮助建立共同语言，但不必让全队在同一早题停留。若卷首允许引用前题陈述，即使尚未解出，也可明确引用后继续后题。', '2025 卷明确说明按内容排序，并允许引用前题陈述；模拟训练时可据此让不同队员同时推进独立分支。', '“可引用前题”不是所有竞赛的通则；只可在当年说明允许的范围内采用。'),
      ], [origamiBisector, commutingRegionChanges], [formatSource, faqSource,
        { title: 'BMT 2025 Power instructions', url: 'https://berkeley.mt/archives/bmt-2025/power-problems.pdf', detail: '卷首的证明例外、题序与前题引用规则。' },
        { title: 'BMT 2024 Power paper', url: 'https://berkeley.mt/archives/bmt-2024/power-problems.pdf', detail: 'Origami 主题；本库 Q1.8 练习的原始题目。' },
      ]),
    ] },
  ],
};

/** Preserve links and browser-local records created before the taxonomy correction. */
export const bmtRouteAliases = {
  'bmt/combinatorics': 'bmt/discrete',
  'bmt/number-theory': 'bmt/discrete',
  'bmt/combinatorics/counting-probability': 'bmt/discrete/counting-probability',
  'bmt/combinatorics/discrete-structures': 'bmt/discrete/discrete-structures',
  'bmt/number-theory/congruences': 'bmt/discrete/discrete-structures',
  'bmt/number-theory/factorisation-valuations': 'bmt/discrete/discrete-structures',
};
