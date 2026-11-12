/** Fill specific gaps without changing existing topic routes or study identifiers. */
const tex = String.raw;
const ext = (id, nameZh, name, text, formula, example, pitfall, keywords = []) => ({ id, nameZh, name, text, formula, example, pitfall, keywords: [nameZh, name, ...keywords] });

function technique(name, nameZh, explanation, core, formula, method, example, pitfall, keywords, extensions = []) {
  return { name, nameZh, explanation, core, formula, text: explanation, method, example, pitfall, keywords, extensions };
}

const divisorCount = technique('Divisor count', '正因子个数',
  '一个正因子由每个质因数用了几次决定；各个指数独立选择，所以把选择数相乘。',
  '不同质因数的指数分别加 1，再相乘；只计正因子。',
  tex`\begin{aligned}n&=\prod_{i=1}^r p_i^{a_i},\\\tau(n)=d(n)&=\prod_{i=1}^r(a_i+1).\end{aligned}`,
  tex`先将正整数 n 唯一分解成不同素数的幂。因子中的每个指数可以是 \(0,1,\ldots,a_i\)，所以有 \(a_i+1\) 种。n=1 时空乘积为 1。`,
  tex`\(72=2^3\cdot3^2\)，所以 \(\tau(72)=4\cdot3=12\)。`,
  '必须完整分解成不同的素数，不能把合数当作独立质因子；负因子不计在本公式中。',
  ['divisor count', 'number of divisors', '因子数', '因子个数', '约数个数', '因数个数', '正因数个数', '因数数量', '约数数目', 'tau', 'd(n)'], [
    ext('square-divisor-parity', '因子个数奇偶与完全平方', 'Odd divisor counts and squares', '因子可两两配成 d 与 n/d。只有完全平方会留下单独的平方根，所以正因子数为奇数恰好等价于 n 是完全平方。', tex`\tau(n)\text{ odd}\iff n\text{ is a perfect square}`, tex`\(36=2^2\cdot3^2\)，有 \(3\cdot3=9\) 个正因子。`, '包括 n=1；不能把“因子数为平方数”误当成同一个结论。'),
    ext('divisors-of-power', '完全幂与固定因子数', 'Divisors of powers', 'n 的幂会把所有质因数指数按同一个倍数放大，因此可以直接重新套用因子个数公式。', tex`\tau(n^k)=\prod_i(ka_i+1)\quad(k\in\mathbb Z_{>0})`, tex`若 \(\tau(n)=6\)，指数结构只有 5 或 2、1，故 n 形如 \(p^5\) 或 \(p^2q\)（p、q 为不同素数）。`, '指数可以列候选，但还要保留不同素数及其他大小约束。'),
  ]);

const divisorSum = technique('Divisor sum', '正因子和',
  '把每个质因数允许出现的幂写成一串和，再将这些和相乘，展开时每个正因子恰好出现一次。',
  '每个质因数对应一个有限等比和，所有等比和相乘。',
  tex`\begin{aligned}\sigma(n)&=\sum_{d\mid n}d\\&=\prod_{i=1}^r(1+p_i+\cdots+p_i^{a_i})\\&=\prod_{i=1}^r\frac{p_i^{a_i+1}-1}{p_i-1}.\end{aligned}`,
  '先写 n 的标准质因数分解，再对每个质因数计算有限等比和；这里的因子和包含 1 和 n 本身。n=1 时和为 1。',
  tex`\(12=2^2\cdot3\)，所以 \(\sigma(12)=(1+2+4)(1+3)=28\)。`,
  '真因子和为 σ(n)−n；σ(ab)=σ(a)σ(b) 需要 a、b 互质。',
  ['divisor sum', 'sum of divisors', '因子和', '约数和', '因数和', '因子总和', '约数之和', 'sigma', '完全数'], [
    ext('multiplicative-divisors', '互质乘法性', 'Multiplicativity', '互质整数的质因子互不重叠，其因子能唯一拆成来自两部分的因子之积。', tex`\gcd(a,b)=1\Rightarrow\sigma(ab)=\sigma(a)\sigma(b),\quad\tau(ab)=\tau(a)\tau(b)`, tex`\(\sigma(4)=7\)、\(\sigma(3)=4\)，所以 \(\sigma(12)=28\)。`, tex`例如 \(\sigma(4)=7\ne\sigma(2)^2=9\)；不互质时不能相乘。`),
    ext('general-divisor-sum', '因子幂和与倒数和', 'Divisor power sums', '把每个因子的 k 次幂相加，仍然可按质因数独立展开。', tex`\sigma_k(n)=\sum_{d\mid n}d^k=\prod_i\sum_{j=0}^{a_i}p_i^{jk},\qquad\sum_{d\mid n}\frac1d=\frac{\sigma(n)}n`, '倒数和公式来自因子配对 d 与 n/d。', '此处 k 为非负整数时最常用；k=0 恢复因子个数，不能套分母为零的等比闭式。'),
  ]);

const divisorProduct = technique('Divisor product', '正因子积',
  '每个正因子 d 都有一个伙伴 n/d，两者相乘等于 n；把所有因子这样配对，就能求出总乘积。',
  '所有正因子之积为 n 的“正因子个数的一半”次幂。',
  tex`\prod_{d\mid n}d=n^{\frac{\tau(n)}2}`,
  tex`若 \(\tau(n)\) 为偶数，有 \(\frac{\tau(n)}2\) 对，每对乘积为 n。若为奇数，n 必为平方，还需把单独的 \(\sqrt n\) 计入。`,
  tex`12 有 6 个正因子，积为 \(12^3=1728\)。36 有 9 个正因子，积为 \(36^4\cdot6=6^9\)。`,
  '半整数指数不代表答案不是整数：出现这种情况时 n 必是完全平方；不能用 n 的一半代替因子数的一半。',
  ['divisor product', 'product of divisors', '因子积', '约数积', '因数积', '因子乘积', '约数乘积'], [
    ext('divisor-prime-exponents', '积中各质因数的指数', 'Prime exponents in the product', '在所有因子里，一个质因数的指数从 0 到 a_i 平均出现；乘积总指数就是平均指数乘因子数。', tex`v_{p_i}\!\left(\prod_{d\mid n}d\right)=\frac{a_i\tau(n)}2`, '这也从质因数的角度证明了因子积公式。', '结果必是整数：a_i 为奇数时，a_i+1 为偶数，从而 τ(n) 为偶数。'),
  ]);

const chineseRemainder = technique('Chinese remainder theorem', '中国剩余定理',
  '互质模数的余数信息互不冲突，可以拼成一个更大模数下的唯一余数。',
  '互质模数可合并，合并后模数为它们的乘积。',
  tex`\gcd(m,n)=1\ \Longrightarrow\ \begin{cases}x\equiv a\pmod m\\x\equiv b\pmod n\end{cases}\text{ has one residue class modulo }mn`,
  tex`先写 \(x=a+mt\)，代入第二个同余，得到 \(mt\equiv b-a\pmod n\)。因为 m 在模 n 下可逆，可以解出 t。`,
  tex`\(x\equiv2\pmod3\)、\(x\equiv3\pmod5\)。写 \(x=2+3t\)，得 \(t\equiv2\pmod5\)，故 \(x\equiv8\pmod{15}\)。`,
  '“唯一”指模乘积的剩余类，不是唯一整数。模数不互质时可能无解，也不能直接相乘作最终模数。',
  ['crt', 'chinese remainder', '中国剩余', '孙子定理', '同余方程组'], [
    ext('general-crt', '非互质模数的相容条件', 'Generalised CRT', '共享的公因子部分必须给出一致余数，才能合并。', tex`x\equiv a\pmod m,\ x\equiv b\pmod n\text{ solvable}\iff\gcd(m,n)\mid(a-b)`, '有解时所有解形成模 lcm(m,n) 的一个剩余类。例如余数 1（模 4）、3（模 6）可合成 9（模 12）。', '逐次合并多个同余时，每一步都要检查相容条件。'),
  ]);

const multiplicativeOrder = technique('Multiplicative order', '乘法阶',
  '互质的数不断乘自己，模 m 的余数最终回到 1；第一次回到 1 的正指数就是乘法阶。',
  '指数是否给出余数 1，只取决于它是否是乘法阶的倍数。',
  tex`d=\operatorname{ord}_m(a)\ \Longrightarrow\ \big(a^k\equiv1\pmod m\iff d\mid k\big),\quad d\mid\varphi(m)`,
  '确认 gcd(a,m)=1 且 m≥2。先求 φ(m)，再检查它的因子是否已让幂余 1，可缩小最短周期。',
  tex`\(2^1,2^2,2^3\) 模 7 的余数为 2、4、1，所以阶是 3，\(2^{100}\equiv2\pmod7\)。`,
  '欧拉定理给出的指数不一定是最短周期；底数不互质时不定义这种回到 1 的乘法阶。',
  ['multiplicative order', 'order mod', '乘法阶', '最短周期', '幂周期'], [
    ext('order-divides-prime', '由阶限制素因子', 'Orders constrain prime divisors', '若素数 q 整除一个幂差，则底数模 q 的阶必须整除该指数，同时整除 q−1。', tex`q\mid a^k-1,\ q\text{ prime}\ \Longrightarrow\ \operatorname{ord}_q(a)\mid\gcd(k,q-1)`, tex`若 k 为素数且 a 不余 1，那么阶只能为 k，故 \(q\equiv1\pmod k\)。`, tex`需先排除阶为 1 的分支；不能直接从 \(a^k\equiv1\pmod q\) 得到阶恰好为 k。`),
  ]);

const binomialTheorem = technique('Binomial theorem', '二项式定理',
  '把 n 个相同括号相乘，要得到含 k 个 b 的项，就得从 n 个括号里选出 k 个来贡献 b。',
  '系数是在数“哪些括号选了 b”。',
  tex`(a+b)^n=\sum_{k=0}^n\binom nk a^{n-k}b^k\quad(n\in\mathbb Z_{\ge0})`,
  '先判断目标幂次需要从每个括号选什么，再用组合数计选法。求全部系数之和可令变量为 1。',
  tex`\((1+x)^5\) 中 \(x^2\) 的系数为 \(\binom52=10\)。`,
  '一般 a、b 也可能是带系数的多项式；目标项还要乘各自系数，不能只取一个组合数。',
  ['binomial', '二项式', '组合数', '展开系数', 'pascal'], [
    ext('binomial-sums', '常用二项式求和', 'Binomial sums', '用特殊值或标记一个被选元素，可以得到整行系数和及带权系数和。', tex`\sum_{k=0}^n\binom nk=2^n,\qquad\sum_{k=0}^n k\binom nk=n2^{n-1}\quad(n\ge1)`, '第二式也可通过先选被标记元素、再任选其余元素证明。', '交错系数和为零要求 n≥1；n=0 时为 1。'),
    ext('binomial-prime-modulus', '素数模数下的展开', 'Binomial coefficients modulo a prime', '素数 p 使所有中间组合数都含 p 因子，模 p 后只留下两端。', tex`(a+b)^p\equiv a^p+b^p\pmod p\quad(p\text{ prime},\ a,b\in\mathbb Z)`, '它也是证明费马小定理的一条初等路线。', '普通整数等式中不能删掉中间项；合数模数通常也不成立。'),
  ]);

const rearrangement = technique('Rearrangement inequality', '排序不等式',
  '大数配大数、小数配小数，会让乘积和最大；大数配小数会让它最小。',
  '两列都按同一方向排序，乘积和取最大。',
  tex`\sum_{i=1}^n a_i b_{n+1-i}\le\sum_{i=1}^n a_i b_{\pi(i)}\le\sum_{i=1}^n a_i b_i\quad(a_1\le\cdots\le a_n,\ b_1\le\cdots\le b_n)`,
  tex`比较两对配法：当 \(a\ge b\)、\(c\ge d\) 时，\(ac+bd-ad-bc=(a-b)(c-d)\ge0\)。不断交换逆序配对即可。`,
  tex`1、2、3 与 4、5、6 的最大乘积和为 \(1\cdot4+2\cdot5+3\cdot6=32\)，最小为 28。`,
  '要同时看两列的排序方向；有相等元素时最优排列未必唯一。',
  ['rearrangement', '排序不等式', '重排', '切比雪夫'], [
    ext('chebyshev', '切比雪夫求和不等式', "Chebyshev's sum inequality", '同序数据的乘积平均值，不小于各自平均值的乘积；逆序时方向反转。', tex`\frac1n\sum_{i=1}^n a_i b_i\ge\left(\frac1n\sum_i a_i\right)\left(\frac1n\sum_i b_i\right)`, '要求两列均按非降序（或均按非升序）排列。', '没有排序条件就不能直接使用；此结论不同于概率中的切比雪夫界。'),
  ]);

const convexity = technique('Convexity and Jensen', '凸性与詹森不等式',
  '凸函数的图像在连接两点的线段下方；因此先平均输入再计算，不会超过先计算再平均。',
  '在同一个凸性区间内，用正权重比较“平均后函数值”与“函数值的平均”。',
  tex`f\!\left(\sum_i w_i x_i\right)\le\sum_i w_i f(x_i),\quad w_i>0,\ \sum_iw_i=1`,
  '先确认所有 x_i 在同一凸区间，并说明为什么 f 在该区间凸。二阶可导时 f″≥0 是常用充分条件，也可直接用割线定义证明。',
  tex`\(f(x)=x^2\) 凸，所以 \(\left(\frac{a+b+c}3\right)^2\le\frac{a^2+b^2+c^2}3\)。`,
  '凹函数不等号反向。只有严格凸且权重为正时，才可直接断言等号要求所有输入相同。',
  ['jensen', '詹森', '琴生', '凸性', 'convexity', '平滑'], [
    ext('smoothing', '固定和的平滑', 'Smoothing at a fixed sum', '凸函数下，把两数在和不变的前提下拉近，函数值之和不会增大。', tex`f(x)+f(y)\ge2f\!\left(\frac{x+y}{2}\right)`, '这解释了很多对称最值为什么在变量相等时出现。', '“对称”本身不保证最值在相等处；必须证明平滑方向与目标一致。'),
  ]);

const triangleTrigonometry = technique('Sine and cosine rules', '正弦定理与余弦定理',
  '正弦定理把各边与对角联系起来；余弦定理把勾股定理推广到非直角三角形，用夹角修正长度。',
  '边 a、b、c 分别对角 A、B、C；已知两边夹角优先用余弦定理。',
  tex`\frac a{\sin A}=\frac b{\sin B}=\frac c{\sin C}=2R,\qquad a^2=b^2+c^2-2bc\cos A`,
  '画清边角对应。已知一边和其对角可联用正弦定理；已知两边夹角或三边求角可用余弦定理。',
  tex`b=3、c=4、A=60° 时，\(a^2=9+16-24\cdot\frac12=13\)。`,
  '由 sin A 求角可能有锐角与钝角两支；退化三角形与不满足三角不等式的数据要先排除。',
  ['sine rule', 'cosine rule', '正弦定理', '余弦定理', '解三角形', '外接圆'], [
    ext('triangle-area', '三角形面积公式族', 'Triangle area identities', '同一面积可由边角、内切圆、外接圆或三边表示，选已知数据最直接的一个。', tex`K=\frac12bc\sin A=rs=\frac{abc}{4R}=\sqrt{s(s-a)(s-b)(s-c)},\quad s=\frac{a+b+c}{2}`, 'r 为内切圆半径，R 为外接圆半径；最后一个是 Heron（海伦）公式。', '所有长度来自同一个非退化三角形；s 是半周长。', ['heron', '海伦', '海伦公式', '内切圆', '面积公式']),
  ]);

const angleBisector = technique('Angle bisector theorem', '角平分线定理',
  '内角平分线两侧的小三角形共享高方向的角关系，它们的面积比既是邻边比，也是底边被分出的比例。',
  '内角平分线将对边按相邻两边的长度比分开。',
  tex`\angle BAD=\angle DAC,\ D\in BC\ \Longrightarrow\ \frac{BD}{DC}=\frac{AB}{AC}`,
  '先确认 D 在对边内部，用面积的正弦公式比较 ABD 和 ACD，再把面积比换成同高的底比。',
  tex`若 AB=6、AC=9、BC=10，则 \(BD:DC=2:3\)，所以 BD=4、DC=6。`,
  '外角平分线交延长线，需处理外分与符号；把 BD/DC 倒写会交换答案。',
  ['angle bisector', '角平分线', '内心', '边比'], [
    ext('bisector-length', '内角平分线长度', 'Length of an internal angle bisector', '知道三边时，可将边比代入 Stewart 定理，或结合面积求出角平分线长度。', tex`l_a^2=bc\left(1-\frac{a^2}{(b+c)^2}\right)`, 'a=BC、b=CA、c=AB，l_a 为 A 出发的内角平分线段 AD。', '只适用于内角平分线段，不是任意劈角射线的长度。'),
  ]);

const menelaus = technique('Menelaus’s theorem', '梅涅劳斯定理',
  '一条直线穿过三角形三边所在直线时，三个分点比例互相制约；用有向比就能把延长线上的点也算进去。',
  '共线对应三个有向分点比的乘积为 −1。',
  tex`D\in BC,\ E\in CA,\ F\in AB:\quad D,E,F\text{ collinear}\iff\frac{\overline{BD}}{\overline{DC}}\frac{\overline{CE}}{\overline{EA}}\frac{\overline{AF}}{\overline{FB}}=-1`,
  '此处 BC、CA、AB 指所在直线，点不与顶点重合。每个比在内分时为正、外分时为负。先确定三点各在哪段，再写循环顺序一致的比例。',
  tex`若 \(BD:DC=1:1\)、\(CE:EA=2:1\) 都是内分，则共线要求 \(\frac{\overline{AF}}{\overline{FB}}=-\frac12\)，所以 F 必在 AB 的延长线上。`,
  'Ceva 判三线共点，Menelaus 判三点共线；使用正长度时还要单独说明外分点的数目为奇数。',
  ['menelaus', '梅涅劳斯', '梅氏', '共线', '截线'], [
    ext('ceva-menelaus', 'Ceva 与 Menelaus 的选择', 'Choosing Ceva or Menelaus', '题目目标是三条线相交，找 Ceva；目标是三个点在一条线上，找 Menelaus。二者都把几何结构压成边上的比例。', '', '先画出目标三角形，别让所选分点来自不同的三角形。', '不要只凭乘积形式相似而混用正负号约定。'),
  ]);

const meanValue = technique('Mean value theorem', '拉格朗日中值定理',
  '一段连续而光滑的路程里，总有某个时刻的瞬时速度等于全程平均速度。',
  '闭区间连续、开区间可导，才能由割线斜率找到某处导数。',
  tex`\exists c\in(a,b):\quad f'(c)=\frac{f(b)-f(a)}{b-a}\quad(a<b)`,
  '先验证 f 在 [a,b] 连续、在 (a,b) 可导。它把两个点的函数值之差转成某个中间点的导数，常用于估计与唯一性。',
  tex`\(f(x)=x^2\) 在 [1,3] 的平均斜率为 4，导数为 2x，在 c=2 处恰好为 4。`,
  'c 的存在不代表已知它具体在哪；绝对值函数跨尖点时不可直接套用。',
  ['mean value', '中值定理', '拉格朗日', 'rolle', '罗尔'], [
    ext('rolle', '罗尔定理与根的个数', "Rolle's theorem", '两端函数值相同，平均斜率为零，所以内部必有水平切线。', tex`f(a)=f(b)\Rightarrow\exists c\in(a,b):f'(c)=0`, '连续可导函数有 k 个不同零点时，相邻零点之间分别有导数零点，所以导数至少有 k−1 个不同零点。', '仍需连续与可导条件；论证根的上界时要把定义区间说清楚。'),
  ]);

const fundamentalCalculus = technique('Fundamental theorem of calculus', '微积分基本定理',
  '积分把局部变化累积起来，求导把累积量的局部变化取出来；满足条件时，这两个操作互相还原。',
  '连续函数的变上限积分导数等于被积函数；定积分用原函数的端点差。',
  tex`\frac d{dx}\int_a^x f(t)\,dt=f(x),\qquad\int_a^b f(x)\,dx=F(b)-F(a)\quad(F'=f)`,
  '在有限区间内确认被积函数连续，先找到原函数，再代入上下限。复合上限还需链式法则。',
  tex`变上限再用链式法则：\(\frac d{dx}\int_1^{x^2}\cos t\,dt=2x\cos(x^2)\)。`,
  '跨越不可积奇点的反常积分不能直接把两端原函数相减；可去间断等更一般情形需另行论证。',
  ['fundamental theorem calculus', '微积分基本定理', '牛顿莱布尼茨', '变上限积分', '原函数'], [
    ext('variable-limits', '双变限积分求导', 'Differentiating variable limits', '上下限都变化时，分别算新增加的上端贡献与被删去的下端贡献。', tex`\frac d{dx}\int_{u(x)}^{v(x)}f(t)\,dt=f(v(x))v'(x)-f(u(x))u'(x)`, 'f 连续、u 和 v 可导即可用这条形式。', '被积函数若也显含 x，通常还会多出一项，不能只算上下限。'),
  ]);

const binomialDistribution = technique('Binomial distribution', '二项分布',
  '固定做 n 次相互独立、成功率相同的试验，成功次数的概率来自“选哪些次成功”再乘每种次序的概率。',
  '固定次数、独立、同成功率，是二项模型的三个条件。',
  tex`P(X=k)=\binom nk p^k(1-p)^{n-k},\quad\mathbb E[X]=np,\quad\operatorname{Var}(X)=np(1-p)`,
  '先验证 n 为固定非负整数、每次独立且成功率 p 不变。概率分布用组合计数，期望可直接用 n 个成功指示变量相加。',
  tex`独立投 4 次公平硬币，恰有 2 次正面的概率为 \(\binom42\left(\frac12\right)^4=\frac38\)。`,
  '不放回抽样通常不独立，应改用超几何计数；p=0 或 1 的端点分布可直接判断。',
  ['binomial distribution', '二项分布', 'bernoulli', '伯努利', '独立重复试验'], [
    ext('geometric-distribution', '几何分布', 'Geometric distribution', '持续独立试验直到第一次成功，前面的每次失败以及最后一次成功决定等待次数。', tex`P(T=k)=(1-p)^{k-1}p,\quad\mathbb E[T]=\frac1p\quad(k\ge1,\ 0<p\le1)`, '这里 T 包含最后成功的那一次试验。', '有些资料把失败次数作为变量，从 0 开始；要先统一定义。'),
  ]);

const additions = {
  'bmo/algebra/identities': [binomialTheorem],
  'bmo/algebra/inequalities': [rearrangement, convexity],
  'bmo/geometry/angles-circles': [triangleTrigonometry],
  'bmo/geometry/similarity': [angleBisector, menelaus],
  'bmo/number-theory/divisibility-gcd': [divisorCount, divisorSum, divisorProduct],
  'bmo/number-theory/modular-arithmetic': [chineseRemainder, multiplicativeOrder],
  'bmt/algebra/equations-polynomials': [binomialTheorem],
  'bmt/calculus/derivatives-optimisation': [meanValue],
  'bmt/calculus/integrals-series': [fundamentalCalculus],
  'bmt/discrete/counting-probability': [binomialDistribution],
  'bmt/discrete/discrete-structures': [divisorCount, divisorSum, divisorProduct, chineseRemainder, multiplicativeOrder],
  'bmt/geometry/euclidean-geometry': [triangleTrigonometry, angleBisector],
};

export function appendKnowledge(collections) {
  const topics = new Map(collections.flatMap((collection) => collection.subjects.flatMap((subject) => subject.topics.map((topic) => [`${collection.id}/${subject.id}/${topic.id}`, topic]))));
  for (const [key, items] of Object.entries(additions)) topics.get(key).bullets.push(...structuredClone(items));
  const copy = (from, name, to) => topics.get(to).bullets.push(structuredClone(topics.get(from).bullets.find((item) => item.name === name)));
  copy('bmt/algebra/sequences-sums', 'Arithmetic and geometric sequences', 'bmo/algebra/sequences-functions');
  copy('bmo/algebra/sequences-functions', 'Recurrence transformations', 'bmt/algebra/sequences-sums');
  copy('bmo/algebra/inequalities', 'AM–GM', 'bmt/algebra/equations-polynomials');
  copy('bmo/algebra/inequalities', 'Cauchy–Schwarz', 'bmt/algebra/equations-polynomials');
  copy('bmo/number-theory/modular-arithmetic', 'Fermat’s little theorem', 'bmt/discrete/discrete-structures');
  topics.get('bmt/algebra/equations-polynomials').title = 'Equations, polynomials & inequalities';
  const practice = [
    { keys: ['bmo/number-theory/divisibility-gcd', 'bmt/discrete/discrete-structures'], problem: {
      id: 'original-divisor-functions-72', title: 'Three views of the same divisors', proof: false,
      question: tex`Find the number, sum, and product of all positive divisors of 72. Explain why the product formula also gives an integer for every positive perfect square.`,
      hint: tex`先写 \(72=2^3\cdot3^2\)。分别考虑指数选择、等比和与因子配对；完全平方时别漏单独的平方根。`,
      solution: [
        tex`Since \(72=2^3\cdot3^2\), its positive divisors are exactly \(2^i3^j\) with \(0\le i\le3\) and \(0\le j\le2\). Hence there are \(4\cdot3=12\) divisors.`,
        tex`Their sum is \((1+2+4+8)(1+3+9)=15\cdot13=195\). Pairing each divisor d with \(\frac{72}{d}\) gives six pairs with product 72, so their total product is \(72^6\).`,
        tex`For a square n, the only self-paired divisor is \(\sqrt n\). The total product is \(n^{\frac{\tau(n)-1}{2}}\sqrt n=(\sqrt n)^{\tau(n)}\), an integer.`,
      ],
    } },
    { keys: ['bmo/number-theory/modular-arithmetic', 'bmt/discrete/discrete-structures'], problem: {
      id: 'original-three-congruences', title: 'Reconstructing an integer', proof: false,
      question: tex`Find the least positive integer x satisfying \(x\equiv2\pmod3\), \(x\equiv3\pmod5\), and \(x\equiv2\pmod7\). Describe all integer solutions.`,
      hint: '先合并模 3 与模 5，写成 x=8+15t，再用模 7 条件确定 t。',
      solution: [
        tex`Write \(x=2+3u\). Reducing modulo 5 gives \(3u\equiv1\pmod5\), so \(u\equiv2\pmod5\) and \(x=8+15t\).`,
        tex`Modulo 7 this becomes \(1+t\equiv2\pmod7\), hence \(t=1+7s\) and \(x=23+105s\), with \(s\in\mathbb Z\).`,
        tex`The moduli 3, 5 and 7 are pairwise coprime, so this is exactly one residue class modulo 105. The least positive solution is 23.`,
      ],
    } },
    { keys: ['bmo/geometry/angles-circles', 'bmt/geometry/euclidean-geometry'], problem: {
      id: 'original-triangle-side-area-radius', title: 'One triangle, three quantities', proof: false,
      question: tex`In triangle ABC, \(AB=4\), \(AC=3\), and \(\angle BAC=60^\circ\). Find BC, the area, and the circumradius.`,
      hint: '两边夹角求第三边用余弦定理；面积用两边夹角；外接圆半径再用扩展正弦定理。',
      solution: [
        tex`The cosine rule gives \(BC^2=4^2+3^2-2\cdot4\cdot3\cos60^\circ=13\), so \(BC=\sqrt{13}\).`,
        tex`The area is \(K=\frac12\cdot4\cdot3\sin60^\circ=3\sqrt3\).`,
        tex`By the extended sine rule, \(2R=\frac{BC}{\sin60^\circ}\), giving \(R=\frac{\sqrt{39}}3\).`,
      ],
    } },
  ];
  for (const { keys, problem } of practice) for (const key of keys) topics.get(key).exercises.push(structuredClone(problem));
}
