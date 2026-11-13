/** Independently authored notes and original drills; scope lives in admissions-framework.js. */
import { tex as r, technique as t, multipleChoice as q } from './admissions-authoring.js';

export const tmuaContent = {
  'foundations-data/number-units': {
    bullets: [
      t('Exact arithmetic and surds', '精确运算与根式', '先保留分数、根式和圆周率，利用约分或有理化找到结构，最后才考虑近似。', '能算精确值时，先消去共同因子再计算。', r`\frac1{\sqrt a+\sqrt b}=\frac{\sqrt a-\sqrt b}{a-b}\quad(a,b\ge0,\ a\ne b)`, '统一分母或乘以共轭式；含平方根的表达式先检查被开方数非负。', r`例如 \(\frac1{\sqrt3+\sqrt2}=\sqrt3-\sqrt2\)，不必先算小数。`, '有理化必须同时乘分子与分母；主平方根总是非负，不能随意添负号。'),
      t('Prime factors and recurring decimals', '质因数与循环小数', '质因数决定整除与公倍数；循环小数则通过错位相减转化为精确分数。', '先标准分解；纯循环小数可以乘适当的十次幂后相减。', r`0.\overline{ab}=\frac{10a+b}{99}`, r`最大公因数取各质因数的较小指数，最小公倍数取较大指数；循环小数设为 x 后消去循环尾部。`, r`例如 \(84=2^2\cdot3\cdot7\)、\(60=2^2\cdot3\cdot5\)，最大公因数为 12。`, '循环节前存在不循环部分时，不能直接把全部数字除以九十九。'),
      t('Units and compound measures', '单位与复合量纲', '把速度、密度或面积中的每个单位独立换算，指数也需要跟随换算因子。', '先统一单位，再代入关系式；面积和体积的换算因子需要平方或立方。', r`1\ \mathrm{km\,h^{-1}}=\frac5{18}\ \mathrm{m\,s^{-1}}`, '把千米换成米、小时换成秒，再按分子分母整理；用量纲反查公式。', r`速度 \(36\ \mathrm{km\,h^{-1}}=10\ \mathrm{m\,s^{-1}}\)，运动 3 秒走 30 米。`, '长度扩大一百倍时面积扩大一万倍；不要把复合单位当作一个普通标签。'),
      t('Bounds and rounding intervals', '界与舍入区间', '一个四舍五入结果对应一段可能的真值；计算上下界时需要考虑函数的单调方向。', '精确到步长 h 的数 a，一般对应左闭右开的半步长区间。', r`a-\frac h2\le x<a+\frac h2`, '先写每个输入量的区间；正数相除求上界时用较大的分子和较小的分母。', r`长度记为 2.0 厘米且精确到 0.1 厘米，则 \(1.95\le l<2.05\)。`, '端点是否取得必须随舍入约定保留；跨零区间不能直接套正数乘除的界。'),
    ],
    exercises: [
      q('units-speed', 'Converting a speed', r`A particle travels at a constant speed of \(72\ \mathrm{km\,h^{-1}}\) for \(2.5\) seconds. How far does it travel in metres?`, ['36', '40', '45', '50', '60'], 'D', '先将速度换成每秒多少米，再乘时间。', [r`The speed is \(72\times\frac5{18}=20\ \mathrm{m\,s^{-1}}\).`, r`The distance is \(20\times2.5=50\) metres. The correct option is D.`]),
      q('recurring-decimal', 'An exact recurring decimal', r`Which fraction equals \(0.\overline{27}\)?`, [r`\(\frac{27}{100}\)`, r`\(\frac3{11}\)`, r`\(\frac{27}{90}\)`, r`\(\frac{11}{30}\)`, r`\(\frac{27}{10}\)`], 'B', '乘一百后相减，循环尾部会完全消失。', [r`Let \(x=0.\overline{27}\). Then \(100x-x=27\), so \(x=\frac{27}{99}=\frac3{11}\). The correct option is B.`]),
    ],
  },
  'foundations-data/ratio': {
    bullets: [
      t('Multiplicative percentage change', '百分比的乘法变化', '每次百分比变化都作用在当时的数量上，连续变化需要乘因子，不能直接相减。', '增加 p 后减少 p，通常不会回到原值。', r`(1+p)(1-p)=1-p^2`, '把百分数变成小数；复原原值时除以变化因子，比较变化时明确分母是谁。', r`先增加 10% 再减少 10%，结果为原值的 \(1.1\times0.9=0.99\)。`, '“减少百分之二十”的逆操作是除以零点八，并非再增加百分之二十。'),
      t('Direct and inverse proportion', '正比与反比模型', '判断一个量随另一个量如何变化，再用常数把文字条件写成同一个模型。', '反平方比例意味着自变量乘 k，因变量除以 k 的平方。', r`y=kx^a\quad\Longrightarrow\quad\frac{y_2}{y_1}=\left(\frac{x_2}{x_1}\right)^a`, '用一组已知数据求比例常数，或直接比较比值；核对幂次和变量范围。', r`面积与边长平方成正比，边长变为三倍，面积变为九倍。`, '反比图像不是负斜率直线；关系中有额外加数时不能当成正比。'),
      t('Ratios and mixtures', '分配与混合比例', '比例描述各部分之间的份数，浓度问题则需要保持溶质和总量各自的账。', '先求总份数或守恒量，再计算每部分。', r`\text{concentration}=\frac{\text{solute}}{\text{total mixture}}`, '统一质量或体积单位；写出混合前后溶质总量不变的等式。', r`2 千克的 10% 溶液加入 3 千克水，溶质仍为 0.2 千克，浓度变为 4%。`, '两种浓度不能直接取算术平均，除非两份混合物的总量相等。'),
      t('Similarity scale factors', '相似图形的尺度', '相似形对应长度按同一比例变化，面积和体积分别按比例的平方和立方变化。', '长度、面积、体积的尺度指数依次为一、二、三。', r`L:k,\qquad A:k^2,\qquad V:k^3`, '先确认图形相似，再从已知面积比或体积比还原长度比。', r`两个相似立体长度比为 \(2:3\)，则表面积比为 \(4:9\)，体积比为 \(8:27\)。`, '同周长或同面积并不保证相似；只有对应长度统一缩放才能使用尺度公式。'),
    ],
    exercises: [
      q('percent-return', 'Two percentage changes', 'A price rises by 20% and then falls by 20%. What is the overall change from the original price?', ['A 4% decrease', 'No change', 'A 4% increase', 'A 2% decrease', 'A 20% decrease'], 'A', '用原价一百或直接相乘两个变化因子。', [r`The final multiplier is \(1.2\times0.8=0.96\), so the final price is 4% lower. The correct option is A.`]),
      q('inverse-square', 'An inverse-square model', r`A positive quantity \(y\) is inversely proportional to \(x^2\). If \(x\) is tripled, what is the new value of \(y\) in terms of its old value \(y_0\)?`, [r`\(3y_0\)`, r`\(\frac{y_0}3\)`, r`\(\frac{y_0}9\)`, r`\(9y_0\)`, r`\(\frac{y_0}{27}\)`], 'C', '把反平方直接写成常数除以变量的平方。', [r`Writing \(y=\frac{k}{x^2}\), the new value is \(\frac{k}{(3x)^2}=\frac{y_0}9\). The correct option is C.`]),
    ],
  },
  'foundations-data/statistics': {
    bullets: [
      t('Weighted means and summaries', '加权平均与统计摘要', '平均数由总和除以数量得到；合并两组数据时，应按各组人数加权。', '先恢复总和，不能把不同大小样本的平均数直接平均。', r`\bar x=\frac{\sum_i f_ix_i}{\sum_i f_i}`, '列出频数与对应值；分组数据用组中点估计时，明确结果并非精确值。', r`3 人平均 8 分、2 人平均 13 分，合并平均为 \(\frac{24+26}{5}=10\) 分。`, '平均数容易受极端值影响；比较数据时需同时考虑中心、范围与样本情况。'),
      t('Histogram area and frequency density', '直方图面积与频数密度', '不等宽分组的柱高不直接表示人数，真正表示频数的是每个柱子的面积。', '频数密度等于频数除以组距。', r`\text{frequency}=\text{class width}\times\text{frequency density}`, '先算每组宽度，再由面积还原频数；核对纵轴写的是频数还是密度。', r`区间宽 5、频数 20，对应密度 4；宽 10、频数 30，对应密度 3。`, '柱子更高不一定人数更多，必须同时考虑组距。'),
      t('Cumulative frequency and quartiles', '累计频数与四分位数', '累计曲线记录不超过某值的人数，可按总人数的四分之一、一半和四分之三读取位置。', '四分位距描述中间一半数据的跨度。', r`\mathrm{IQR}=Q_3-Q_1`, '先确认总频数，再在累计纵轴找到相应比例；分组内插值只能给估计。', r`若曲线上读出 \(Q_1=12\)、\(Q_3=21\)，则四分位距为 9。`, '不同四分位约定可能影响很小的原始样本；分组估计不要声称等于精确中位数。'),
      t('Correlation and extrapolation', '相关与外推', '散点趋势可以帮助描述关联，却不能仅凭相关性认定因果关系或无限延长趋势。', '在已知数据范围内插值通常比远距离外推更有依据。', '', '检查散点形状、异常值和取值范围；比较可能的共同影响因素。', '例如冰淇淋销量与气温同时上升，只能支持关联，不能说明买冰淇淋造成升温。', '拟合线不必通过每个点；没有明显线性趋势时，不应强行使用直线预测。'),
    ],
    exercises: [
      q('histogram-density', 'Unequal histogram classes', r`A histogram has frequency 12 in \([0,10)\) and frequency 18 in \([10,30)\). What is the ratio of the first bar height to the second?`, [r`\(2:3\)`, r`\(4:3\)`, r`\(3:4\)`, r`\(1:2\)`, r`\(2:1\)`], 'B', '先分别除以组距，再比较密度。', [r`The heights are \(\frac{12}{10}\) and \(\frac{18}{20}\). Their ratio is \(24:18=4:3\). The correct option is B.`]),
      q('mean-replacement', 'Replacing one observation', 'Five numbers have mean 8. One observation, equal to 2, is replaced by 12. What is the new mean?', ['8', '8.5', '9', '10', '12'], 'D', '总和增加多少？样本数量保持多少？', [r`The original sum is \(5\times8=40\). Replacement increases it by 10, so the new mean is \(\frac{50}5=10\). The correct option is D.`]),
    ],
  },
  'foundations-data/probability': {
    bullets: [
      t('Systematic sample spaces', '系统列举样本空间', '先定义一次结果记录哪些信息，再通过表格或树确保每种结果恰好出现一次。', '只有基本结果等可能时，才可直接用数量之比求概率。', r`P(A)=\frac{\#A}{\#\Omega}\quad\text{for equally likely outcomes}`, '有顺序的抽取先保留顺序；若改用无序组合，需要分子分母一起改变。', r`两枚公平骰子的有序结果共 36 种，而点数和的十一种可能值并不等可能。`, '不能把“能列出的事件”直接当成等概率事件，也不能把交换顺序重复计数。'),
      t('Complements and exclusive alternatives', '补事件与互斥分类', '至少一次或不能同时发生的问题，经常可以通过补集或互斥分类减少计算。', '互斥分支可以相加；一般事件相加需要扣去交集。', r`P(A\cup B)=P(A)+P(B)-P(A\cap B)`, '先判断分类是否互斥且穷尽；至少一次发生可先算一次也不发生。', r`独立抛币四次，至少一次正面的概率为 \(1-\frac1{16}=\frac{15}{16}\)。`, '互斥与独立含义不同；两个有正概率且互斥的事件不会独立。'),
      t('Trees with changing probabilities', '条件改变的概率树', '不放回抽取后，剩余总数与各类数量都会变化，每条树枝应按当前状态标记。', '沿同一路径相乘，不同互斥路径相加。', r`P(A\cap B)=P(A)P(B\mid A)`, '从第一步向后写条件概率；标出成功路径，再将各路径概率求和。', r`袋中 3 红 2 蓝，不放回连抽两红的概率为 \(\frac35\cdot\frac24=\frac3{10}\)。`, '不放回不能把每一步的概率都写成初始比例；有时间顺序不代表独立。'),
      t('Conditional frequencies', '条件样本空间与频数', '已知某事件发生后，只在满足该信息的结果中重新比较所求事件的比例。', '分母应是条件事件的概率或频数。', r`P(A\mid B)=\frac{P(A\cap B)}{P(B)}\quad(P(B)>0)`, '用两向表或树找到共同部分，再除以已知条件对应的总量。', r`30 人中 12 人戴眼镜，戴眼镜者中 5 人学法语；已知戴眼镜后学法语的概率为 \(\frac5{12}\)。`, '反向条件概率通常不同；若条件概率为零，初等定义中的比值不存在。'),
    ],
    exercises: [
      q('mixed-colours', 'Two different colours', 'A bag contains two red and three blue counters. Two counters are drawn without replacement. What is the probability of drawing one of each colour?', [r`\(\frac15\)`, r`\(\frac25\)`, r`\(\frac35\)`, r`\(\frac12\)`, r`\(\frac45\)`], 'C', '红蓝与蓝红是两条互斥路径。', [r`The probability is \(\frac25\cdot\frac34+\frac35\cdot\frac24=\frac35\). The correct option is C.`]),
      q('coin-conditioning', 'Conditioning on at least one head', 'Three fair coins are tossed independently. Given that at least one head occurs, what is the probability of exactly two heads?', [r`\(\frac13\)`, r`\(\frac38\)`, r`\(\frac12\)`, r`\(\frac37\)`, r`\(\frac23\)`], 'D', '从八个等可能结果中去掉全为反面的一个。', [r`There are seven equally likely outcomes after excluding TTT. Exactly three, HHT, HTH and THH, have two heads. The conditional probability is \(\frac37\). The correct option is D.`]),
    ],
  },
  'algebra-functions/expressions': {
    bullets: [
      t('Polynomial factors and remainders', '多项式因式与余数', '除以线性式的余数可通过代入求出；找到一个根后，可以降低多项式次数。', '代入得到零才说明对应线性因式整除。', r`P(x)=(x-a)Q(x)+P(a)`, '先尝试小整数根，再进行代数除法；有理式约分后仍保留原来的禁值。', r`例如 \(P(x)=x^3-4x\) 有根 0、2、−2，所以可写成 \(x(x-2)(x+2)\)。`, '除以一般线性式时要代入它的根；约掉因式不意味着原定义域中的空点消失。'),
      t('Quadratics with parameters', '带参数二次方程', '判别式控制实根数量，配方控制函数极值；二者适合处理参数范围。', '先检查二次项系数非零，再使用判别式。', r`\Delta=b^2-4ac`, '把方程整理为标准二次形式，区分无实根、重根和两个不同实根。', r`例如 \(x^2-2kx+1=0\) 有实根要求 \(4k^2-4\ge0\)，即 \(|k|\ge1\)。`, '参数可能使最高次项为零；重根与两个不同实根的边界必须区别。'),
      t('Inequalities and sign charts', '不等式与符号表', '分子为零和分母为零的位置将数轴分段，各段内分别判断符号。', '未知符号的式子不能直接跨边相乘而不分类。', r`\frac{a}{b}>0\iff (a>0,\ b>0)\ \text{or}\ (a<0,\ b<0)`, '找出所有零点与禁值，逐段检查正负，最后按是否取等号处理端点。', r`例如 \(\frac{x-2}{x+1}>0\) 的解为 \(x<-1\) 或 \(x>2\)。`, '分母零点永远排除；仅比较分子为正会漏掉分子分母同时为负的区间。'),
      t('Simultaneous equations and substitutions', '联立方程与代换', '用一个关系消去变量，或将反复出现的整体设为新变量，降低方程复杂度。', '代换后的候选值必须能回到原变量与原定义域。', r`y=mx+c\quad\Longrightarrow\quad\text{substitute into the second equation}`, '代入后解单变量方程，再逐个还原另一变量；检查平方或消去导致的增根。', r`例如 \(x+y=3\)、\(xy=2\)，可令两数为方程 \(u^2-3u+2=0\) 的两根。`, '不能只保留一个分支；若除以未知量，应先检查它为零的情况。'),
    ],
    exercises: [
      q('rational-sign', 'A rational inequality', r`Solve \(\frac{x-1}{x+2}\ge0\) over the real numbers.`, [r`\([-2,1]\)`, r`\((-2,1)\)`, r`\(( -\infty,-2]\cup[1,\infty)\)`, r`\((-\infty,-2)\cup[1,\infty)\)`, r`\([1,\infty)\)`], 'D', '分界点为一与负二，负二是禁值。', [r`The quotient is positive for \(x<-2\) and \(x>1\), zero at \(x=1\), and undefined at \(x=-2\). The correct option is D.`]),
      q('repeated-root', 'A repeated root and a parameter', r`For which real values of \(k\) does \(x^2-2kx+k+2=0\) have a repeated real root?`, [r`\(k=1\)`, r`\(k=-2\text{ or }1\)`, r`\(k=-1\text{ or }2\)`, r`\(k=2\)`, 'No real values'], 'C', '重根时判别式恰好为零。', [r`The discriminant is \(4k^2-4(k+2)=4(k-2)(k+1)\). It vanishes at \(k=-1,2\). The correct option is C.`]),
    ],
  },
  'algebra-functions/functions': {
    bullets: [
      t('Domains and compositions', '定义域与复合函数', '函数输入要先满足内层条件，内层的输出又必须落在外层允许的范围内。', '复合函数的定义域由每一层共同限制。', r`(f\circ g)(x)=f(g(x))`, '先按从里到外的顺序代入，列出分母、根式和对数的限制。', r`若 \(f(u)=\sqrt u\)、\(g(x)=x-2\)，则 \(f(g(x))=\sqrt{x-2}\) 要求 \(x\ge2\)。`, '两个函数都有定义，不代表它们在每个点都可以复合；不能交换复合顺序。'),
      t('Graph transformations and points', '图像变换与点的追踪', '纵向变化作用于输出，横向变化通过解新的输入关系追踪旧点。', '处理横向变换时，从新输入等于旧横坐标的关系求位置。', r`y=af(bx+c)+d:\quad (u,v)\mapsto\left(\frac{u-c}{b},av+d\right)\quad(b\ne0)`, '先记录原图的关键点，再逐点映射；把零点、顶点和渐近线一起追踪。', r`原图点 \((2,3)\) 在 \(y=f(x+1)-4\) 上对应 \((1,-1)\)。`, '横向平移方向常与括号符号相反；放缩和平移的顺序不能随意交换。'),
      t('Modulus and piecewise graphs', '绝对值与分段图像', '绝对值隐藏了分段条件；把内部式为零的位置标出来，才能保留各段约束。', '绝对值的值非负，解方程前先检查另一侧是否可能为负。', r`|u|=\begin{cases}u&u\ge0,\\-u&u<0.\end{cases}`, '在转折点处分段，分别求解，再只保留落在该段的解。', r`例如 \(|x-2|=1\) 给出 \(x=1\) 或 \(x=3\)，图上对应水平线与折线两个交点。`, '平方可用来消去绝对值，但需要保留原式另一边非负的条件。'),
      t('Intersections and root counts', '交点与实根个数', '方程求根可以转化成两条曲线相交，参数问题常由顶点、切点和边界决定。', '根的数量改变通常发生在相切或边界穿越处。', r`f(x)=g(x)\iff f(x)-g(x)=0`, '画出大致形状并标明极值与定义域；用代数确认临界值和端点。', r`例如 \(x^2=c\) 在 c 为负、零、正时，实根数量依次为零、一、二。`, '图像只能提供判断方向；精确范围还要检查相切、重根和定义域端点。'),
    ],
    exercises: [
      q('modulus-equation', 'A modulus intersection', r`How many real solutions does \(|x-1|=x+1\) have?`, ['0', '1', '2', '3', 'Infinitely many'], 'B', '先按横坐标是否小于一分段。', [r`For \(x\ge1\), the equation would give \(x-1=x+1\), which is impossible. For \(x<1\), it gives \(1-x=x+1\), so \(x=0\). There is one solution; the correct option is B.`]),
      q('positive-intersections', 'Two positive roots', r`For which values of \(c\) does \(x^2-4x+5=c\) have two distinct positive roots?`, [r`\(c>1\)`, r`\(c\ge1\)`, r`\(c<5\)`, r`\(1<c<5\)`, r`\(1\le c\le5\)`], 'D', '配方后检查两个根中的较小者必须大于零。', [r`The roots are \(2\pm\sqrt{c-1}\). Distinct real roots require \(c>1\); positivity of the smaller root requires \(\sqrt{c-1}<2\). Thus \(1<c<5\). The correct option is D.`]),
    ],
  },
  'algebra-functions/sequences': {
    bullets: [
      t('Arithmetic terms and sums', '等差数列通项与和', '等差数列相邻项差相同，首尾配对可以把求和变成项数乘以平均值。', '先分清第 n 项和前 n 项的和。', r`u_n=a+(n-1)d,\qquad S_n=\frac n2\bigl(2a+(n-1)d\bigr)`, '用已知项先求首项与公差，再核对首尾索引和总项数。', r`首项 3、公差 2 的前五项为 3、5、7、9、11，总和为 35。`, '从零开始编号时要相应调整通项；平均首尾后仍需乘项数。'),
      t('Geometric sums and convergence', '等比和与收敛', '连续项按固定倍数变化；有限和可错位相减，无穷和还必须检查公比的大小。', '无穷等比和需要公比绝对值小于一。', r`S_n=\frac{a(1-r^n)}{1-r},\qquad S_\infty=\frac a{1-r}\ (|r|<1)`, '先从相邻项求公比；有限和遇到公比一时直接按项数计算。', r`例如 \(2+1+\frac12+\cdots=4\)，因为公比为 \(\frac12\)。`, '有限和公式不能直接证明所有等比级数收敛；公比等于负一也没有通常意义的无穷和。'),
      t('Recurrences and fixed points', '递推与不动点', '递推规则决定如何从当前项得到下一项，不动点只是可能的极限候选。', '假设极限存在才能先写不动点方程；候选值还需结合序列行为。', r`u_{n+1}=f(u_n),\quad u_n\to L\ \Longrightarrow\ L=f(L)\quad\text{if }f\text{ is continuous at }L`, '先计算少量项检查周期、单调和范围，再用规则解释后续行为。', r`例如 \(u_{n+1}=1-u_n\)、\(u_1=0\) 会在零与一之间循环，不趋向不动点。`, '解出不动点不等于证明收敛；初始值也会改变序列行为。'),
      t('Positive-integer binomial coefficients', '正整数幂的二项式系数', '展开式中的某项由选择多少个第二项决定，系数与幂次需要同时追踪。', 'TMUA 要求的是正整数幂展开，不需无穷二项式级数。', r`(a+bx)^n=\sum_{k=0}^n\binom nk a^{n-k}b^kx^k`, '先确定目标幂对应的索引，再计算组合数和常数幂；复合幂需要重新对应次数。', r`例如 \((1+3x)^4\) 中二次项系数为 \(\binom42\cdot9=54\)。`, '不能遗漏常数或系数的幂；项与系数不同，系数本身不带变量。'),
    ],
    exercises: [
      q('infinite-sum', 'A convergent geometric sum', r`Evaluate \(1+\frac13+\frac19+\cdots\).`, [r`\(\frac43\)`, r`\(\frac32\)`, r`\(2\)`, r`\(3\)`, 'The series diverges'], 'B', '首项为一，公比为三分之一。', [r`Since \(\left|\frac13\right|<1\), the sum is \(\frac1{1-\frac13}=\frac32\). The correct option is B.`]),
      q('binomial-coefficient', 'Selecting a coefficient', r`What is the coefficient of \(x^2\) in \((1+2x)^5\)?`, ['10', '20', '30', '40', '80'], 'D', '选两个括号提供含变量的项，别忘记二的平方。', [r`The coefficient is \(\binom52\,2^2=10\cdot4=40\). The correct option is D.`]),
    ],
  },
  'algebra-functions/exponentials': {
    bullets: [
      t('Exponential substitutions', '指数整体代换', '几个指数具有相同基础倍数时，可先把一个正的指数整体设为新变量。', '指数代换得到的新变量始终为正。', r`a^{2x}=(a^x)^2\quad(a>0)`, '将各项改写为同一指数整体的幂，再解代数方程；还原时排除非正候选。', r`例如 \(4^x-3\cdot2^x+2=0\)，令 \(u=2^x>0\)，得到 \((u-1)(u-2)=0\)。`, '代数方程的负根不能还原成正底数的实指数值；底数为一时另行处理。'),
      t('Logarithm laws with domains', '对数法则与定义域', '对数把乘除和幂转化为加减和系数，但每个原真数都必须为正。', '先写每个原真数的正值条件，再合并对数。', r`\log_a u+\log_a v=\log_a(uv)\quad(a>0,\ a\ne1,\ u,v>0)`, '核对同底数后再使用法则；化简后求出的解要带回原始真数限制。', r`例如 \(\log_2(x-1)+\log_2(x+1)\) 要求 \(x>1\)，不能仅要求乘积为正。`, '对数的和不等于和的对数；负真数不能因为两个相乘变正就重新变得合法。'),
      t('Exponential and logarithmic graphs', '指数对数图像', '指数函数与同底对数互为反函数；底数在零与一之间时，两者都递减。', '比较大小前先判断底数决定的单调方向。', r`a^x=b\iff x=\log_a b\quad(a>0,\ a\ne1,\ b>0)`, '标出指数函数的纵截点和对数函数的横截点，再检查渐近线与定义域。', r`例如底数 \(\frac12\) 时，指数随横坐标增大而减小，函数值仍为正。`, '底数小于一时取对数会反转相应不等式方向；TMUA 不要求换底公式。'),
      t('Growth and decay models', '增长与衰减模型', '每个固定时间段乘同一因子，就形成指数模型；离散模型的指数应与时间单位一致。', '总倍率等于单期倍率的期数次幂。', r`Q_n=Q_0r^n\quad(r>0)`, '先定义一次更新对应的时间长度，再用比例或对数解未知期数。', r`某量每两小时减半，六小时后剩原值的 \(\left(\frac12\right)^3=\frac18\)。`, '不能把每小时和每两小时的倍率直接混用；模型需要说明倍率保持不变的假设。'),
    ],
    exercises: [
      q('exponential-quadratic', 'A quadratic in an exponential', r`Solve \(9^x-4\cdot3^x+3=0\) for real \(x\).`, [r`\(x=0\text{ or }1\)`, r`\(x=1\text{ or }3\)`, r`\(x=-1\text{ or }0\)`, r`\(x=0\text{ only}\)`, 'No real solutions'], 'A', '把三的横坐标次幂设为一个正变量。', [r`Let \(u=3^x>0\). Then \(u^2-4u+3=(u-1)(u-3)=0\). Thus \(x=0\) or \(1\). The correct option is A.`]),
      q('log-domain', 'A logarithmic domain check', r`Solve \(\log_2(x-1)+\log_2(x+1)=3\).`, [r`\(x=-3\)`, r`\(x=\pm3\)`, r`\(x=\sqrt8\)`, r`\(x=3\)`, r`\(x=9\)`], 'D', '先写真数条件，再合并为乘积。', [r`The original domain is \(x>1\). Combining logs gives \(x^2-1=8\), so the candidates are \(\pm3\). Only \(3\) is in the domain. The correct option is D.`]),
    ],
  },
  'geometry-calculus/coordinates': {
    bullets: [
      t('Lines including vertical lines', '直线与竖直线', '直线可以用一般式统一表示；斜率形式只适用于非竖直直线。', '垂直关系需先检查是否有竖直或水平直线。', r`ax+by+c=0,\qquad m_1m_2=-1\ \text{for finite perpendicular gradients}`, '先求方向或斜率，再用一个已知点确定常数；特殊方向直接写方程。', r`过 \((2,3)\) 且垂直于 \(y=2x\) 的直线为 \(y-3=-\frac12(x-2)\)。`, '竖直直线没有有限斜率，不能机械套斜率乘积公式。'),
      t('Circle equations by completing squares', '配方读取圆', '把横纵坐标分别配方，可以从一般二次式读出圆心、半径及是否存在实圆。', '配方后的半径平方必须为正才是非退化实圆。', r`(x-a)^2+(y-b)^2=r^2`, '先整理同类项，补全两个平方，再检查常数项；圆心坐标与括号内符号相反。', r`例如 \(x^2+y^2-2x+4y=4\) 化为 \((x-1)^2+(y+2)^2=9\)。`, '半径平方为零只有一个点，为负没有实点；不能直接把常数项当成半径。'),
      t('Tangency and intersection discriminants', '相切与交点判别式', '直线代入圆后得到二次方程，重根对应切点；也可利用半径与切线垂直。', '相切恰好对应唯一交点，代入后的判别式为零。', r`\Delta=0\quad\text{at tangency}`, '联立方程得到单变量二次式，计算判别式；需要时再求切点核对。', r`直线 \(y=c\) 与单位圆相切要求 \(x^2+c^2=1\) 只有一个横坐标，故 \(c=\pm1\)。`, '判别式方法需要确认代入后的确为二次方程；图中看起来接触不等于精确相切。'),
      t('Circle angles and chord geometry', '圆周角与弦', '同弧所对圆心角与圆周角、半圆直角及弦的垂直平分关系都可辅助坐标求解。', '半径垂直切线，圆心到弦的垂线平分该弦。', r`\angle AOB=2\angle ACB\quad\text{for the same arc}`, '先确定所对的是同一段弧，再使用角或直角三角形关系。', r`半径为 5、圆心到弦的距离为 3 时，半弦长为 \(\sqrt{25-9}=4\)，弦长为 8。`, '圆周角使用同段弧条件；圆上点所在位置改变时，可能需要使用补角。'),
    ],
    exercises: [
      q('circle-centre', 'Reading a circle', r`What is the centre and radius of \(x^2+y^2-4x+6y=12\)?`, [r`\((4,-6),\sqrt{12}\)`, r`\((-2,3),5\)`, r`\((2,-3),\sqrt{12}\)`, r`\((2,3),5\)`, r`\((2,-3),5\)`], 'E', '补成两个平方，再整理右侧常数。', [r`Completing squares gives \((x-2)^2+(y+3)^2=25\). The centre is \((2,-3)\) and the radius is 5. The correct option is E.`]),
      q('tangent-parameter', 'A tangent parameter', r`For which values of \(c\) is \(y=x+c\) tangent to \(x^2+y^2=2\)?`, [r`\(c=0\)`, r`\(c=\pm\sqrt2\)`, r`\(c=\pm2\)`, r`\(c=2\text{ only}\)`, r`\(c=\pm1\)`], 'C', '代入圆后令二次方程判别式为零。', [r`Substitution gives \(2x^2+2cx+c^2-2=0\). Its discriminant is \(4c^2-8(c^2-2)=16-4c^2\). Tangency requires \(c=\pm2\). The correct option is C.`]),
    ],
  },
  'geometry-calculus/geometry': {
    bullets: [
      t('Similarity and congruence arguments', '相似与全等判定', '先用角、边或比例证实对应关系，再将几何条件转化为长度或面积关系。', '全等保留长度，相似保留角与对应长度比例。', r`\frac{AB}{DE}=\frac{BC}{EF}=\frac{CA}{FD}\quad\text{for corresponding similar triangles}`, '写清顶点对应顺序；使用角角相似或合适的全等条件，而非凭图判断。', r`两个相似三角形对应边长比为 \(3:5\)，面积比为 \(9:25\)。`, '两边和非夹角可能产生两个三角形，不能把它当作一般的全等条件。'),
      t('Area, volume and compound shapes', '面积体积与组合图形', '把复杂图形分成简单部分，或用整体减去空缺；空间题需要分清截面、表面积和体积。', '面积用平方单位，体积用立方单位；组合时处理内部公共边界。', r`V_{\mathrm{prism}}=Ah,\quad V_{\mathrm{cylinder}}=\pi r^2h`, '画清俯视和正视的对应长度，用勾股或比例先补齐所需尺寸。', r`底面积为 12、高为 5 的直棱柱体积为 60；内部接触面不计入外表面积。`, '球、锥和棱锥公式若题目需要会按考纲提供；不要把平面图上的投影长度直接当真实长度。'),
      t('Vectors for division and parallelism', '向量分点与平行', '向量记录有方向的位移，沿线段按比例行进可直接写出分点位置。', '平行向量成倍数，分点公式要按对应线段比例确定权重。', r`\overrightarrow{OP}=\overrightarrow{OA}+s(\overrightarrow{OB}-\overrightarrow{OA})`, '先写从起点到终点的位移，再乘行进比例；共线时检查一个向量是否为另一个的倍数。', r`从 \((1,2)\) 到 \((7,5)\) 走一半，得到 \((4,\frac72)\)。`, '位置向量与自由位移不能混为一谈；相反方向仍平行，但倍数为负。'),
      t('Bearings and three-dimensional lengths', '方位角与空间长度', '方位角从正北顺时针量；空间长度可通过两次直角三角形关系得到。', '先在水平面内分解，再结合竖直高度。', r`d^2=x^2+y^2+z^2`, '明确北向和角度起点；先求水平投影，再和竖直分量组成直角三角形。', r`边长为 2、3、6 的长方体空间对角线为 \(\sqrt{4+9+36}=7\)。`, '从正东逆时针量的数学角并非方位角；图中交叉的空间线段也未必相交。'),
    ],
    exercises: [
      q('similar-solids', 'From area to volume', r`Two similar solids have surface areas in the ratio \(9:4\). What is the ratio of their volumes in the same order?`, [r`\(9:4\)`, r`\(27:8\)`, r`\(81:16\)`, r`\(3:2\)`, r`\(8:27\)`], 'B', '先从面积比开平方求长度比。', [r`The length ratio is \(3:2\), so the volume ratio is \(3^3:2^3=27:8\). The correct option is B.`]),
      q('vector-division', 'A point on a segment', r`The position vectors of \(A,B\) are \((2,1)\) and \((8,4)\). Point \(P\) is one third of the way from \(A\) to \(B\). What is its position vector?`, [r`\((4,2)\)`, r`\((6,3)\)`, r`\((\frac{10}3,\frac53)\)`, r`\((2,1)\)`, r`\((10,5)\)`], 'A', '从起点加上三分之一的位移。', [r`The displacement is \((6,3)\), so \(P=(2,1)+\frac13(6,3)=(4,2)\). The correct option is A.`]),
    ],
  },
  'geometry-calculus/trigonometry': {
    bullets: [
      t('Exact angles and basic identities', '特殊角与基本恒等式', '用特殊三角形和单位圆得到精确值，再利用平方关系和象限确定正负。', '同一个正弦值不保证同一个角，符号需结合象限。', r`\sin^2x+\cos^2x=1,\qquad\tan x=\frac{\sin x}{\cos x}\ (\cos x\ne0)`, '先判断象限，再找参照角；平方恒等式开方后需要重新确定符号。', r`若 \(\sin x=\frac35\) 且 x 在第二象限，则 \(\cos x=-\frac45\)。`, '三角函数的平方不是二倍角；分母为零时不能使用正切比值。'),
      t('Trigonometric solutions in intervals', '区间内的三角方程', '求反三角值只给一支，完整解还需要周期和对称，再筛选题目指定区间。', '角度被放大时，先同步放大求解区间。', r`\sin u=\sin\alpha\iff u=\alpha+2k\pi\ \text{or}\ u=\pi-\alpha+2k\pi`, '将内部角作为整体，列全部解支，最后换回原变量并检查端点。', r`例如 \(\sin x=\frac12\) 在 \([0,2\pi)\) 内有 \(\frac\pi6\) 和 \(\frac{5\pi}6\) 两解。`, '反正弦只返回主值；多个周期的区间会产生额外解，左闭右开端点也需区分。'),
      t('Radians, arcs and sectors', '弧度、弧与扇形', '弧度等于弧长除以半径，所以弧长和扇形面积的公式特别简洁。', '弧长和扇形面积公式中的角度必须用弧度。', r`l=r\theta,\qquad A=\frac12r^2\theta`, '先把角度换为弧度；若求弓形面积，从扇形面积减去相应三角形面积。', r`半径 4、圆心角 \(\frac\pi3\) 的扇形面积为 \(\frac{8\pi}3\)。`, '扇形周长还包括两条半径；弓形与扇形是不同区域。'),
      t('Triangle rules and ambiguous angles', '三角形定理与多解', '已知两边夹角时用余弦或面积公式；正弦定理给出的角可能还有一个补角候选。', '两边及非夹角不一定唯一确定三角形。', r`c^2=a^2+b^2-2ab\cos C,\qquad\Delta=\frac12ab\sin C`, '先匹配已知边和对角；使用正弦定理时把锐角和补角分别带回角和条件。', r`若正弦定理得到 \(\sin B=\frac12\)，需检查 30 度与 150 度是否都能与已知角组成三角形。`, '余弦定理的角必须是所用两边的夹角；直角三角函数不能直接套到任意三角形。'),
    ],
    exercises: [
      q('trig-count', 'Counting trigonometric roots', r`How many solutions does \(\sin(2x)=\frac12\) have for \(0\le x<2\pi\)?`, ['2', '4', '6', '8', 'Infinitely many'], 'B', '内部角覆盖两个完整周期。', [r`The angle \(2x\) lies in \([0,4\pi)\). Each complete period contributes two solutions, so there are four. The correct option is B.`]),
      q('triangle-area', 'An exact triangle area', r`Two sides of a triangle have lengths 5 and 7, with included angle \(60^\circ\). What is its area?`, [r`\(\frac{35}4\)`, r`\(\frac{35\sqrt3}2\)`, r`\(\frac{35\sqrt3}4\)`, r`\(35\sqrt3\)`, r`\(\frac{35}2\)`], 'C', '使用两边与夹角的面积公式，保留精确正弦值。', [r`The area is \(\frac12\cdot5\cdot7\cdot\sin60^\circ=\frac{35\sqrt3}4\). The correct option is C.`]),
    ],
  },
  'geometry-calculus/calculus': {
    bullets: [
      t('Rational-power differentiation', '有理幂求导与先化简', 'TMUA 的求导以有理幂及其和差为基础，根式与简单商先改写成幂。', '先化简，再逐项求导；无需额外套乘积或链式法则。', r`\frac{d}{dx}x^n=nx^{n-1}`, '展开或约分到适用形式，保留原定义域；在函数及导数有定义的位置使用公式。', r`例如 \(\frac{x^2+1}{x}=x+x^{-1}\)，导数为 \(1-x^{-2}\)，且 \(x\ne0\)。`, '不要将同样的范围推广到指数、对数或三角函数求导；这些并非 TMUA 所要求。'),
      t('Tangents, normals and monotonicity', '切线、法线与单调性', '导数给切线斜率；导数的符号说明函数在对应区间内增加还是减少。', '先求导数的符号区间，不能只看函数值的正负。', r`y-f(a)=f'(a)(x-a)`, '将接触点代入导数得到斜率；法线斜率在切线非水平时为其负倒数。', r`例如 \(y=x^2\) 在横坐标 1 处切线为 \(y-1=2(x-1)\)，法线斜率为 \(-\frac12\)。`, '水平切线对应竖直法线；导数为零的单点并不自动说明极大或极小。'),
      t('Stationary points and classification', '驻点与极值判断', '先解导数为零，再检查左右符号或二阶导数，区分极大、极小与其他可能。', '驻点只是候选点，需要附加判断才能断定极值。', r`f'(a)=0,\quad f''(a)>0\Rightarrow\text{local minimum}`, '列出驻点和区间端点；要求全局最大最小时比较所有候选值。', r`例如 \(f(x)=x^3-3x\) 的导数为 \(3(x^2-1)\)，在负一与一之间递减。`, '二阶导数为零时该检验没有结论；TMUA 不要求计算拐点，但需识别简单多项式形状。'),
      t('Power integration and the fundamental theorem', '幂积分与微积分基本定理', '积分是找一个导数为原函数的函数；定积分通过端点原函数值之差计算。', '幂积分增加指数再除新指数；指数为负一时不能套此公式。', r`\int x^n\,dx=\frac{x^{n+1}}{n+1}+C\quad(n\ne-1)`, '先化简为允许的有理幂和差；不定积分保留常数，初值再决定常数。', r`例如 \(\int_0^2 3x^2\,dx=[x^3]_0^2=8\)；若 \(F(x)=\int_a^x f(t)\,dt\)，则 \(F'(x)=f(x)\)。`, 'TMUA 不要求负一次幂的对数积分或分部积分；被积函数和区间仍需合法。'),
      t('Signed integrals and actual area', '带符号积分与实际面积', '横轴下方的定积分为负，几何面积却不能为负，因此穿过横轴时应分段。', '实际面积应把各段绝对面积相加，不能让上下两块抵消。', r`A=\int_a^b|f(x)|\,dx`, '先求区间内所有零点，再逐段确定正负；两曲线间面积按上减下积分。', r`例如 \(y=x\) 从负一到一的积分为零，实际面积为两个三角形面积之和，即一。`, '整个积分的绝对值通常不等于实际面积；还需检查积分上下限顺序。'),
      t('Trapezium estimates', '梯形估计与偏差', '相邻采样点之间用直线连接，得到一组梯形；曲线相对弦的位置决定估计偏高还是偏低。', '向上弯曲的曲线在弦下方，梯形估计偏大。', r`T=\frac h2\left(y_0+2\sum_{i=1}^{n-1}y_i+y_n\right)`, '确认采样等距；端点只计一次，内部点计两次，再结合图像判断偏差。', r`对 \(x^2\) 在零到一使用一个梯形，得到 \(\frac12\)，大于真实积分 \(\frac13\)。`, '曲线弯曲方向变化时，不能仅凭某一小段推断整个误差方向。'),
    ],
    exercises: [
      q('decreasing-cubic', 'A decreasing interval', r`On which interval is \(f(x)=x^3-3x\) strictly decreasing?`, [r`\((1,\infty)\)`, r`\((-\infty,-1)\)`, r`\((0,\infty)\)`, r`\((-\infty,\infty)\)`, r`\((-1,1)\)`], 'E', '求导后找负值区间。', [r`We have \(f'(x)=3x^2-3<0\) exactly when \(-1<x<1\). Thus the correct option is E.`]),
      q('signed-area', 'Area across an axis crossing', r`What is the total area between \(y=x-1\), the x-axis, \(x=0\) and \(x=3\)?`, [r`\(\frac32\)`, r`\(2\)`, r`\(\frac52\)`, r`\(3\)`, r`\(\frac92\)`], 'C', '在横坐标一处分成两块三角形。', [r`The line crosses the axis at \(x=1\). The two areas are \(\frac12\cdot1\cdot1=\frac12\) and \(\frac12\cdot2\cdot2=2\). Their sum is \(\frac52\). The correct option is C.`]),
    ],
  },
  'logic-proof/statements': {
    bullets: [
      t('Implication and its converse', '蕴含与逆命题', '一个条件推出结论，只说明满足前者的情况一定满足后者；反向关系需另行证明。', '原命题为真，逆命题仍可能为假。', r`A\Rightarrow B\quad\text{does not imply}\quad B\Rightarrow A`, '把自然语言改成“如果前件，那么后件”；只有前件真而后件假才能推翻它。', '例如整数能被四整除就一定为偶数；偶数二却不一定能被四整除。', '“A only if B” 表示 A 推出 B；不要按句子出现的先后顺序误读条件方向。'),
      t('Contrapositive and logical negation', '逆否与逻辑否定', '逆否命题通过交换前后并同时否定，与原蕴含等价；否定整个蕴含则需要前真后假。', '逆否等价；否定蕴含不是简单把箭头反过来。', r`(A\Rightarrow B)\iff(\neg B\Rightarrow\neg A)`, '先固定前后件，再分别否定；用普通语言读回，检查是否保留含义。', '例如“整数的平方为偶数则它为偶数”的逆否是“整数为奇数则平方为奇数”。', '逆命题、否命题与逆否命题不同；符号只是辅助，考试不要求形式逻辑记号。'),
      t('Necessary and sufficient conditions', '必要与充分条件', '充分条件保证结果，必要条件是结果发生时必须满足的要求，二者可以同时成立也可以只成立一边。', 'A 推出 B 时，A 对 B 充分，B 对 A 必要。', r`A\iff B\quad\text{means both directions hold}`, '分别尝试寻找满足前者但不满足后者、以及反过来的例子，以检查两个方向。', r`例如 \(x>2\) 对 \(x^2>4\) 充分但不必要；负三说明它不必要。`, '“只有”通常指必要条件；“只要”通常指充分条件，需按实际逻辑理解。'),
      t('Quantifiers and their negations', '量词及其否定', '所有、至少存在一个、并且和或者会在否定时同时改变，变量范围必须一直保留。', '否定“每个都成立”就是“至少有一个不成立”。', r`\neg(\forall x\ P(x))\iff\exists x\ \neg P(x)`, '由外到内逐层否定，保留变量范围；否定并且变或者，否定或者变并且。', r`“每个正实数都小于 10”的否定是“存在正实数不小于 10”。`, '“不是所有”不等于“所有都不”；多个量词的顺序会影响陈述含义。'),
    ],
    exercises: [
      q('negating-universal', 'Negating a universal implication', 'Which statement is the negation of: Every even integer is divisible by 4?', ['Every odd integer is divisible by 4.', 'No even integer is divisible by 4.', 'Some integer divisible by 4 is odd.', 'There exists an even integer that is not divisible by 4.', 'Every integer not divisible by 4 is odd.'], 'D', '找一个满足前件而不满足后件的例子就能推翻原句。', ['The negation of a universal claim requires at least one counterexample. It asserts that an even integer exists which is not divisible by 4, such as 2. The correct option is D.']),
      q('sufficient-condition', 'Sufficient but not necessary', r`Which condition is sufficient but not necessary for a real number \(x\) to satisfy \(x^2>4\)?`, [r`\(x>2\)`, r`\(x>0\)`, r`\(|x|>2\)`, r`\(x^2>1\)`, r`\(x\ne0\)`], 'A', '充分要保证结论，不必要则应存在未满足条件但结论仍真的情况。', [r`If \(x>2\), then \(x^2>4\). However, \(x=-3\) satisfies the conclusion without satisfying \(x>2\). Option C is both necessary and sufficient; B, D and E are not sufficient. The correct option is A.`]),
    ],
  },
  'logic-proof/proof': {
    bullets: [
      t('Direct deductions and proof order', '直接演绎与证明顺序', '每一步使用题目假设或已经得到的结论，按依赖关系连接到所需结果。', '结论不能在得到证明之前充当前提。', '', '写清每步理由；排序题先找最初假设、最后目标和中间结论之间的依赖。', '例如两个偶数分别写成两个整数的两倍，它们的和也为某个整数的两倍。', '看见目标式并不代表可以直接使用它；循环论证无法证明新的信息。'),
      t('Exhaustive proof by cases', '穷尽的分类证明', '当对象自然分成几类时，分别证明所有类别，并确保没有遗漏。', '分类必须覆盖全部情况，且各分支都要到达目标。', r`n=2k\quad\text{or}\quad n=2k+1\qquad(k\in\mathbb Z)`, '按奇偶、符号或范围分组，先说明为何穷尽，再逐类计算或推理。', r`证明 \(n(n+1)\) 是偶数时，n 为偶数或 n 加一为偶数覆盖全部整数。`, '只验证正数和负数会遗漏零；写若干例子不能替代穷尽分类。'),
      t('Contradiction and assumptions', '反证与假设管理', '临时假设目标不成立，再结合已知条件推出不可能的结论，以否定临时假设。', '矛盾必须由合法推理得到，并明确冲突的是哪些陈述。', '', '先准确写目标的否定，标记临时假设；找到矛盾后返回原目标。', '例如假设不存在最大值之外的更大正整数，而在任何正整数上加一又得到更大的正整数。', '错误地否定量词会证明另一个命题；仅有不常见结果并不构成矛盾。'),
      t('Counterexamples and conjectures', '反例与猜想验证', '小例子帮助发现规律，反例则能直接推翻普遍命题；证明普遍规律需要一般论证。', '一个合法反例足以推翻全称命题，许多支持例子仍不能证明它。', '', '优先检查零、一、负数、边界、重复值和最小合数，核对反例属于变量范围。', '例如“每个奇数都为质数”可由九推翻，而检查三、五、七都不能证明该命题。', '反例必须使全部前提成立却结论失败；不在定义域中的对象不是反例。'),
    ],
    exercises: [
      q('odd-prime-counterexample', 'A decisive counterexample', 'Which number disproves the claim that every odd integer greater than 1 is prime?', ['9', '3', '5', '7', '11'], 'A', '找一个符合奇数及大于一条件的合数。', [r`The integer \(9=3^2\) is odd and greater than 1 but is composite. The other listed integers are prime. The correct option is A.`]),
      q('even-product-proof', 'A complete parity argument', r`Which argument proves that \(n^2+n\) is even for every integer \(n\)?`, ['It holds for the first hundred positive integers.', r`\(n^2+n=n(n+1)\), and one of two consecutive integers is even.`, r`\(n^2\) is always even.`, r`\(n+n\) is even, so \(n^2+n\) is even.`, 'Every integer is either positive or negative.'], 'B', '把表达式分解成相邻整数的积。', [r`For every integer \(n\), one of \(n,n+1\) is even, so their product \(n(n+1)=n^2+n\) is even. This covers negative integers and zero as well. The correct option is B.`]),
    ],
  },
  'logic-proof/errors': {
    bullets: [
      t('Cancellation with zero factors', '约去零因子的错误', '消去公共因子等于除以它，只有已经知道因子非零时才保留等价性。', '先保留公共因子为零的分支，再进行除法。', r`ab=ac,\ a\ne0\Rightarrow b=c`, '在每次约分旁记录非零条件；若无法保证，将零值单独代入原式。', r`例如 \(x(x-1)=0\) 不能直接除以 x，否则会漏掉 \(x=0\)。`, '两个式子相等时，它们的差可能就是零；经典伪证常在此处偷偷除零。'),
      t('Squaring and principal roots', '平方与主平方根', '平方可能让符号相反的值变得相同，开平方则只返回非负的主值。', '实数平方后的主平方根是绝对值。', r`\sqrt{x^2}=|x|`, '平方前写符号限制；解平方后的方程再将每个候选代回原式。', r`例如 \(\sqrt{x+2}=x\) 要求 \(x\ge0\)，平方得到的负候选必须排除。`, '从两边平方后的等式不能无条件推出原等式；负数的平方根符号也不能随意使用。'),
      t('Non-injective functions and inverse errors', '非单射函数与错误反推', '不同输入可能得到同一函数值，只有在已限制的一一对应区间才能反向消去函数。', '函数值相等不保证输入相等，需要检查函数在指定范围内是否一一对应。', r`\sin\frac\pi6=\sin\frac{5\pi}6`, '检查图像是否有水平线多交点；若采用反函数，明确所用主值区间。', '例如正弦在三十度和一百五十度同为二分之一，不能消去正弦得到两角相等。', '平方、绝对值和三角函数都有多对一情形；代入反函数会丢失其他分支。'),
      t('Hidden sign and domain assumptions', '隐藏的符号与定义域假设', '看似普通的移项和乘除，可能依赖正负、非零或可开方条件，必须逐步核查。', '找证明错误时，定位第一个无依据的推理步骤。', r`a<b,\ c<0\Rightarrow ac>bc`, '逐行写操作的条件，检查是否被已知假设保证；找到错误后给出满足前提的反例。', r`例如 \(x<1\) 不能直接乘 x 得 \(x^2<x\)，因为 x 可能为负。`, '最终结论恰好正确也不能补救中间无效步骤；找错应说明为什么操作不合法。'),
    ],
    exercises: [
      q('principal-root-error', 'A principal-root error', r`A proposed identity is \(\sqrt{x^2}=x\) for all real \(x\). Which value disproves it?`, [r`\(x=2\)`, r`\(x=-2\)`, r`\(x=0\)`, r`\(x=1\)`, r`\(x=4\)`], 'B', '平方根为非负，而右侧可以为负。', [r`At \(x=-2\), the left side is \(\sqrt4=2\), whereas the right side is \(-2\). The correct identity is \(\sqrt{x^2}=|x|\). The correct option is B.`]),
      q('division-zero-error', 'The first invalid cancellation', r`Let \(a=b=1\). From \(a^2=ab\), subtract \(b^2\) to obtain \((a-b)(a+b)=b(a-b)\). Cancel \(a-b\) to obtain \(a+b=b\). What invalidates the argument?`, ['The initial equality is false.', 'Subtracting the same quantity is invalid.', r`The cancelled factor \(a-b\) is zero.`, 'Factorisation is invalid.', r`The integers \(a,b\) cannot be equal.`], 'C', '每一步都核对，错误只出现在消去公共因子时。', [r`The initial equality, subtraction and factorisation are valid. But \(a-b=0\), so cancelling it divides by zero. The correct option is C.`]),
    ],
  },
};
