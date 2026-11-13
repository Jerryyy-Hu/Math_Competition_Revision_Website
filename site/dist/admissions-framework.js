/** Official scope mapping, fixed before the independently authored teaching content. */
export const admissionsSources = {
  tmua: [
    { title: 'TMUA specification · October 2026 / January 2027', url: 'https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/03165619/TMUA_Content_Specification.pdf' },
    { title: 'Official mathematics notes · June 2026', url: 'https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2026/06/30103537/Notes_on_Mathematics_-for_TMUA_and_ESAT_M2.pdf' },
    { title: 'Official logic and proof notes · June 2025', url: 'https://uat-wp.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/06/25160507/Notes_on_Logic_and_Proof_June2025.pdf' },
    { title: 'Official preparation and practice tests', url: 'https://esat-tmua.ac.uk/prepare/' },
    { title: 'Official past-paper archive', url: 'https://esat-tmua.ac.uk/tmua-preparation-materials/' },
  ],
  step: [
    { title: 'STEP specification · June 2026 onwards · v1.3', url: 'https://www.ocr.org.uk/Images/696329-step-specification-2026.pdf' },
    { title: 'OCR past papers and preparation', url: 'https://www.ocr.org.uk/students/step-mathematics/preparing-for-step/' },
    { title: 'Cambridge STEP Support Programme', url: 'https://step.maths.org/' },
    { title: 'Specification support and additional topics', url: 'https://step.maths.org/specifications-and-specification-support' },
  ],
};

const chapter = (id, title, scope, references, prerequisites, description) => ({ id, title, scope, references, prerequisites, description });
const both = 'Papers 1 & 2';
const shared = 'STEP 2 & 3';
const mixed = 'STEP 2 & 3 + STEP 3 extensions';

export const admissionsFrameworks = [
  {
    id: 'tmua', name: 'TMUA', fullName: 'Test of Mathematics for University Admission', short: 'Reason with precision.', color: 'peach', symbol: 'curve',
    description: '先掌握数学知识，再训练论证。Paper 1 应用知识，Paper 2 在相同知识上增加逻辑、证明与找错。',
    note: 'Original foundation and application drills, not official past-paper questions or a calibrated mock. The topic map is editorial and mapped to the official 2026/2027 specification; official papers and support notes are linked separately.',
    framework: {
      verifiedOn: '2026-11-13', baseline: 'October 2026 / January 2027 specification',
      examFormat: '两卷各 75 分钟、各 20 道选择题；不使用计算器和公式册，答错不倒扣。两卷均使用 Section 1，Paper 2 另加 Section 2。',
      studyOrder: '建议顺序：数与比例 → 代数与函数 → 几何与微积分 → 概率统计；命题逻辑可在掌握代数后并行学习，再进入证明与找错。',
      boundary: '微积分限考纲内有理幂及其和差；不要求第一原理求导、三角或指数对数函数求导、乘积链式法则、分部积分。二项式只要求正整数幂；不要求换底公式、形式真值表或符号逻辑记号。',
    },
    sources: admissionsSources.tmua,
    subjects: [
      { id: 'foundations-data', name: 'Foundations & data', description: '精确运算、量纲、比例，以及数据和随机性的解释。', topics: [
        chapter('number-units', 'Number, units & bounds', both, ['M1', 'M2'], [], '用精确值、单位换算和误差区间约束答案，避免过早近似。'),
        chapter('ratio', 'Ratio, proportion & models', both, ['M3'], ['foundations-data/number-units'], '将百分比、相似缩放和正反比例写成乘法模型。'),
        chapter('statistics', 'Statistics & representations', both, ['M6'], ['foundations-data/ratio'], '读懂频数密度、累计频数、中心与离散程度，并区分相关和因果。'),
        chapter('probability', 'Probability & counting', both, ['M2.5', 'M7'], ['foundations-data/ratio'], '先定义样本空间，再用树、表和条件信息计算概率。'),
      ]},
      { id: 'algebra-functions', name: 'Algebra & functions', description: '在定义域内保持等价，连接表达式、方程和图像。', topics: [
        chapter('expressions', 'Expressions & equations', both, ['MM1.1–MM1.6', 'M4'], ['foundations-data/number-units'], '用因式、判别式和符号表处理参数方程与不等式。'),
        chapter('functions', 'Functions & graphs', both, ['MM1.7', 'MM8'], ['algebra-functions/expressions'], '追踪定义域、图像变换、复合函数和交点个数。'),
        chapter('sequences', 'Sequences & binomial expansions', both, ['MM2'], ['algebra-functions/expressions'], '区分通项与递推、有限和与无穷和，并正确提取展开式系数。'),
        chapter('exponentials', 'Exponentials & logarithms', both, ['MM5'], ['algebra-functions/functions'], '先核对真数与底数条件，再将指数方程化为代数问题。'),
      ]},
      { id: 'geometry-calculus', name: 'Geometry & calculus', description: '把形状和变化转化为准确的方程、导数与面积。', topics: [
        chapter('coordinates', 'Coordinate geometry', both, ['MM3', 'M4.9–M4.10', 'M5.10'], ['algebra-functions/expressions'], '用直线、圆和判别式连接交点与相切条件。'),
        chapter('geometry', 'Geometry & measurement', both, ['M5'], ['foundations-data/ratio', 'geometry-calculus/coordinates'], '结合相似、圆定理、空间长度、向量和方位角进行测量与证明。'),
        chapter('trigonometry', 'Trigonometry', both, ['MM4', 'M5.18'], ['geometry-calculus/geometry', 'algebra-functions/functions'], '用精确值、周期和区间求解三角问题，注意正弦定理的多解。'),
        chapter('calculus', 'Differentiation & integration', both, ['MM6', 'MM7', 'MM8.5', 'M4.14'], ['algebra-functions/functions'], '先化简成幂，再求切线、极值、带符号积分、实际面积与梯形估计。'),
      ]},
      { id: 'logic-proof', name: 'Logic & proof', description: '把“看起来正确”变成条件明确、步骤有效的论证。', topics: [
        chapter('statements', 'Statements & quantifiers', 'Paper 2', ['Arg1–Arg4'], ['algebra-functions/expressions'], '分清充分必要、逆命题与逆否命题，正确否定含量词的陈述。'),
        chapter('proof', 'Proof & counterexamples', 'Paper 2', ['Prf1–Prf5'], ['logic-proof/statements'], '使用演绎、分类、反证和反例，并检查论证顺序与完整性。'),
        chapter('errors', 'Errors & equivalent reasoning', 'Paper 2', ['Err1–Err2'], ['logic-proof/proof', 'algebra-functions/expressions'], '定位消去、平方、开方和反函数中的隐藏假设。'),
      ]},
    ],
  },
  {
    id: 'step', name: 'STEP', fullName: 'Sixth Term Examination Paper', short: 'Stay with the hard problem.', color: 'blue', symbol: 'integral',
    description: '以完整推导串联多个知识点；先学 STEP 2 共通知识，再进入明确标注的 STEP 3 新增内容。',
    note: 'Original linked-part learning drills, not official past-paper questions, full 20-mark STEP questions or a calibrated mock. The three exam sections are official; topic grouping and prerequisite order are editorial. STEP 3 assumes all STEP 2 knowledge.',
    framework: {
      verifiedOn: '2026-11-13', baseline: 'June 2026 onwards specification · version 1.3',
      examFormat: 'STEP 2 和 STEP 3 各 3 小时，均有 8 道纯数、2 道力学、2 道概率统计；每题 20 分，取最高六题。无计算器和公式册。Mathematics 1 是两卷先修内容，已无现行 STEP 1 考试。',
      studyOrder: '建议顺序：证明与代数 → 函数、数列、三角 → 微分、积分、复数、矩阵、向量 → STEP 3 新增工具；力学与概率统计分别按各自先修关系学习。',
      boundary: '复数基本运算与轨迹、反三角求导、反常积分、递推积分及指数级数已属 STEP 2。棣莫弗、一般麦克劳林、平面与叉积、极坐标、双曲函数及非分离型微分方程列为 STEP 3。转动惯量与生成函数不列为要求。',
    },
    sources: admissionsSources.step,
    subjects: [
      { id: 'pure', name: 'Pure mathematics', description: '从共同基础进入 STEP 3 的新增工具；混合专题逐项标注范围。', topics: [
        chapter('algebra-proof', 'Algebra & proof', shared, ['Mathematics 1 pp7–8', 'STEP 2 p21'], [], '建立归纳、反证与等价变形习惯，处理多项式根和部分分式。'),
        chapter('functions', 'Functions, curves & numerical methods', shared, ['Mathematics 1 pp8–9,12,15', 'STEP 2 p21'], ['pure/algebra-proof'], '结合定义域、反函数、渐近线、圆锥曲线和数值迭代研究根。'),
        chapter('sequences', 'Sequences, sums & binomial expansions', shared, ['Mathematics 1 p10', 'STEP 2 p21'], ['pure/algebra-proof'], '用望远镜、归纳界和收敛条件连接递推、求和与展开。'),
        chapter('trigonometry', 'Trigonometry', shared, ['Mathematics 1 p11'], ['pure/functions'], '组合角公式、辅助角与小角近似，给出完整的三角方程解族。'),
        chapter('calculus', 'Differentiation & curve analysis', shared, ['Mathematics 1 p13', 'STEP 2 p22'], ['pure/functions', 'pure/trigonometry'], '综合链式、隐式、参数与反三角求导，严谨判断曲线性质。'),
        chapter('integration', 'Integration & reduction', shared, ['Mathematics 1 p14', 'STEP 2 p22'], ['pure/calculus'], '识别换元、分部、部分分式与递推结构，并分别检验反常积分端点。'),
        chapter('complex', 'Complex numbers', mixed, ['STEP 2 p20', 'STEP 3 p25'], ['pure/algebra-proof', 'pure/trigonometry'], '由共轭、模辐角和轨迹进入 STEP 3 的棣莫弗与单位根。'),
        chapter('matrices', 'Matrices & transformations', mixed, ['STEP 2 p21', 'STEP 3 p25'], ['pure/algebra-proof'], '连接矩阵乘法、几何变换、奇异性与不变集合；三阶系统列为 STEP 3。'),
        chapter('vectors', 'Vectors & geometry', mixed, ['Mathematics 1 p15', 'STEP 2 p22', 'STEP 3 p26'], ['pure/functions'], '先用直线和点积，再学习 STEP 3 的平面、叉积与空间距离。'),
        chapter('series', 'Maclaurin series & applications', 'STEP 3', ['STEP 3 pp25–26'], ['pure/sequences', 'pure/calculus', 'pure/integration'], '在有效区间内提取主导项，并处理曲线长度、旋转体和函数平均值。'),
        chapter('polar-hyperbolic', 'Polar coordinates & hyperbolic functions', 'STEP 3', ['STEP 3 pp26–27'], ['pure/trigonometry', 'pure/integration'], '追踪极角范围和重描区域，用指数定义推导双曲与反双曲关系。'),
        chapter('differential-equations', 'Differential equations', mixed, ['Mathematics 1 pp13–14', 'STEP 3 p28'], ['pure/integration'], '由分离变量进入 STEP 3 的积分因子、二阶方程、受迫与耦合系统。'),
      ]},
      { id: 'mechanics', name: 'Mechanics', description: '先声明模型与方向，再写力、运动及守恒方程。', topics: [
        chapter('motion', 'Forces & motion', shared, ['Mathematics 1 pp16–17'], ['pure/vectors', 'pure/calculus'], '统一运动学、抛体、牛顿定律、连接体和摩擦模型。'),
        chapter('statics', 'Statics & centres of mass', mixed, ['Mathematics 1 p17', 'STEP 3 p29'], ['mechanics/motion', 'pure/integration'], '由力矩与倾覆条件进入 STEP 3 的组合体及积分重心。'),
        chapter('energy', 'Energy, momentum & collisions', mixed, ['STEP 2 p23', 'STEP 3 p29'], ['mechanics/motion'], '区分功、功率、能量、动量与恢复系数；冲量和斜碰撞列为 STEP 3。'),
        chapter('elasticity', 'Elastic strings & springs', shared, ['STEP 2 p23'], ['mechanics/energy'], '用胡克定律与弹性势能处理伸长、平衡和绳松弛。'),
        chapter('further-motion', 'Circular motion & oscillations', 'STEP 3', ['STEP 3 pp28–29'], ['mechanics/energy', 'mechanics/elasticity', 'pure/differential-equations'], '结合径向方程、能量、接触限制、简谐及变力模型。'),
      ]},
      { id: 'probability-statistics', name: 'Probability & statistics', description: '从样本空间出发，再连接分布、积分与统计推断。', topics: [
        chapter('conditional', 'Conditional probability & expectation', shared, ['Mathematics 1 pp18–19'], ['pure/algebra-proof'], '正确计数、条件化、区分互斥与独立，并计算离散矩。'),
        chapter('distributions', 'Discrete distributions & models', shared, ['Mathematics 1 p19', 'STEP 2 p24'], ['probability-statistics/conditional', 'pure/sequences'], '按试验结构选择二项、泊松与离散均匀分布，检查近似条件。'),
        chapter('continuous', 'Continuous distributions', shared, ['Mathematics 1 p19', 'STEP 2 p24'], ['probability-statistics/distributions', 'pure/integration'], '由密度与累计分布求概率、矩、中位数，连接均匀、正态与连续性修正。'),
        chapter('inference', 'Sampling & hypothesis testing', shared, ['Mathematics 1 pp18–19'], ['probability-statistics/continuous'], '理解抽样与统计图，构造二项检验及已知方差的正态均值检验。'),
        chapter('random-variables', 'Independent variables & transformations', 'STEP 3', ['STEP 3 p30'], ['probability-statistics/conditional', 'probability-statistics/continuous'], '用独立性整理方差，并由事件不等式推导变量变换后的分布。'),
      ]},
    ],
  },
];
