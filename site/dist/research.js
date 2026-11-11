export const methodGroups = [
  ['Counting principles', '计数原理', '分类加法、分步乘法、补集、容斥、双计数、一一对应、带权与带符号计数。'],
  ['Arrangements & partitions', '排列分组', '有序与无序、重复元素排列、插空、捆绑、隔板、配对、临时标号与等重数去重、圆排列、旋转与反射等价。'],
  ['Recurrence & construction', '递推与构造', '状态分类递推、数学归纳与强归纳、编码（集合／二进制串／格路）、递归构造、删除插入、局部调整、逆向构造。'],
  ['Existence & extremal arguments', '存在与极值', '抽屉原理与广义抽屉原理、极端原理、平均原理、上下界估计、达到界的构造。'],
  ['Colouring & invariants', '染色与不变量', '黑白染色、多色与加权染色、奇偶与模不变量、加权和、逆序数与置换奇偶性、单调量与终止性、操作可达性。'],
  ['Graph theory', '图论', '建图、度数与握手定理、连通性、路径与环、树、二分图、配对与匹配、团与独立集。'],
  ['Game strategies', '博弈策略', '必胜态与必败态、逆推、配对策略、对称策略、策略保持、终止性。'],
];

export const evidence = [
  ['BMO1 2013 · Q4', 'State-based recurrence', '按末状态分类，保留足以确定后继选择的信息。', 'https://bmos.ukmt.org.uk/home/bmo1-2014.pdf'],
  ['BMO1 2016 · Q4', 'Game strategy', '交替选择整数的游戏，需要覆盖对手所有合法选择的策略。', 'https://bmos.ukmt.org.uk/home/bmo1-2017.pdf'],
  ['BMO1 2018 · Q6', 'Path encoding', '格路结构可以与计数及数论条件交叉出现。', 'https://bmos.ukmt.org.uk/home/bmo1-2019.pdf'],
  ['BMO1 2022 · Q4', 'Bounds + construction', '官方报告分别用固定分组给出保证下界，用染色给出上界。', 'https://bmos.ukmt.org.uk/home/bmo1-2023-report.pdf#page=9'],
  ['BMO1 2024 · Q3', 'Parity + termination', '奇偶回应策略还需证明整数严格下降，保证过程终止。', 'https://bmos.ukmt.org.uk/home/bmo1-2025-report.pdf#page=8'],
  ['BMO1 2024 · Q6', 'Disjoint matching', '官方报告强调：很多符合条件的点对不一定能组成足够多的互不相交配对。', 'https://bmos.ukmt.org.uk/home/bmo1-2025-report.pdf#page=16'],
  ['BMO2 2011 · Q4', 'Extremal counting', '最大规模问题需要上界及达到该界的合法构造。', 'https://bmos.ukmt.org.uk/home/bmo2-2011.pdf'],
  ['BMO2 2015 · Q2', 'Signed counting', '比较奇偶类别的数量可引入正负权重。', 'https://bmos.ukmt.org.uk/home/bmo2-2015.pdf'],
  ['BMO2 2021 · Q1', 'Binary encoding', '官方解答使用二进制表示构造，也提供归纳方法。', 'https://bmos.ukmt.org.uk/home/bmo2-2021-solutions.pdf#page=3'],
  ['BMO2 2023 · Q2', 'Operation reachability', '允许的局部排列操作，需要不变量与合法构造共同处理。', 'https://bmos.ukmt.org.uk/home/bmo2-2023.pdf'],
];

export const qualifications = [
  ['Symmetry is conditional', '“对称性”不能直接理解为除以对称个数。必须明确等价关系，并核查各个对象的重计次数。'],
  ['Monotonicity needs termination', '严格变化还需要离散步长或其他有限性论证；有界的严格单调实数列未必有限步终止。'],
  ['A construction needs verification', '构造必须验证全部限制；极值题还需证明相反方向的界；策略必须应对任意合法对手行动。'],
];
