/** Curated explanations and extensions for the populated competition collections. */
const profiles = new Map();
const tex = String.raw;

function extension(id, nameZh, name, text, formula = '', example = '', pitfall = '', keywords = []) {
  return { id, nameZh, name, text, formula, example, pitfall, keywords: [nameZh, name, ...keywords] };
}

function define(names, explanation, core, keywords, extensions = [], formula) {
  for (const name of [].concat(names)) profiles.set(name, { explanation, core, keywords, extensions, ...(formula === undefined ? {} : { formula }) });
}

const factorisationExtensions = [
  extension('common-factor', '提公因式与分组', 'Common factors and grouping', '先把每项共有的部分提出来；没有全局公因式时，先将能产生相同括号的项放在一组。', tex`ax+ay+bx+by=(a+b)(x+y)`, '把四项看成两组，而不是继续展开。'),
  extension('squares', '平方差与完全平方', 'Difference of squares and perfect squares', '两块平方相减就能拆成和与差；首尾是平方、中间是两倍乘积时，应识别完全平方。', tex`a^2-b^2=(a-b)(a+b),\qquad a^2\pm2ab+b^2=(a\pm b)^2`, '', '先识别整体，例如把某个复杂括号当作 a。'),
  extension('cubes', '立方和与立方差', 'Sum and difference of cubes', '立方差一定含两底数之差；立方和一定含两底数之和。', tex`a^3\pm b^3=(a\pm b)(a^2\mp ab+b^2)`, tex`\(x^6-8=(x^2-2)(x^4+2x^2+4)\)。`, '第二个因式的中间项符号与第一个因式相反。'),
  extension('powers', '高次幂差与奇次幂和', 'Differences of powers and odd sums', '把幂差看成等比数列的求和公式反向使用。n 为正整数；幂和的交错形式要求 n 为奇数。', tex`\begin{aligned}a^n-b^n&=(a-b)\sum_{k=0}^{n-1}a^{n-1-k}b^k,\\a^n+b^n&=(a+b)\sum_{k=0}^{n-1}(-1)^k a^{n-1-k}b^k\quad(n\text{ odd}).\end{aligned}`, '', '偶次幂和通常不能提取 a+b。'),
  extension('perfect-cubes', '完全立方', 'Perfect cubes', '四项符合系数 1、3、3、1 时，尝试把整个式子压成一个立方。', tex`(a\pm b)^3=a^3\pm3a^2b+3ab^2\pm b^3`),
  extension('sophie-germain', '苏菲·热尔曼恒等式', 'Sophie Germain identity', '没有现成平方差时，补出中间项，再减回同一项，把四次幂和变成平方差。', tex`a^4+4b^4=(a^2-2ab+2b^2)(a^2+2ab+2b^2)`, tex`\(5^4+4\cdot2^4=689=13\cdot53\)。因为 \((a^2+2b^2)^2-(2ab)^2=a^4+4b^4\)。`, '分解后若要证明合数，还要确认两个整数因式都大于 1。', ['sophie germain', 'sophie', '苏菲热尔曼', '四次幂和']),
  extension('euler-cube', '欧拉三次恒等式', "Euler's cube identity", '三立方和减三倍乘积，必含三数之和；剩下的二次式又是三组差的平方和的一半。', tex`\begin{aligned}a^3+b^3+c^3-3abc&=(a+b+c)(a^2+b^2+c^2-ab-bc-ca)\\&=\frac12(a+b+c)\big((a-b)^2+(b-c)^2+(c-a)^2\big).\end{aligned}`, tex`若 \(a+b+c=0\)，则 \(a^3+b^3+c^3=3abc\)。`, '在实数范围，第二因式为零当且仅当 a=b=c。', ['euler cube', '三次恒等式', '三立方和']),
  extension('cyclic-difference', '循环差式分解', 'Cyclic difference identity', '两变量相等时式子变成零，提示它含这些变量的差；次数够低时就只差一个常数因子。', tex`a^2(b-c)+b^2(c-a)+c^2(a-b)=(a-b)(a-c)(b-c)`, '先找三个差因式，再代入一组小数值核对正负号。', '交换两个差因子的书写方向会改变整体符号。', ['cyclic difference', 'vandermonde', '循环差', '轮换差', '交错多项式']),
  extension('quadratic-substitution', '降次与配方分解', 'Quadratic substitution and completing the square', tex`偶次幂先令 \(t=x^2\)；缺少因式时尝试补成平方差，或把互为倒数的根配在一起。`, tex`\begin{aligned}x^4+x^2+1&=(x^2+1)^2-x^2=(x^2+x+1)(x^2-x+1),\\x^4+px^2+q&=(x^2+r)(x^2+s)\quad(r+s=p,\ rs=q).\end{aligned}`, '', 'r、s 是否存在取决于所允许的系数范围；在实数中未必都能继续分解。', ['biquadratic', '配方', '降次']),
];

const cauchyExtensions = [
  extension('engel', '分式形式（Titu／Engel）', "Titu's lemma / Engel form", '对正的分母，把分子与分母配成两列，再用柯西：分式平方和至少是分子和的平方除以分母和。', tex`\sum_{i=1}^n\frac{x_i^2}{a_i}\ge\frac{(\sum_i x_i)^2}{\sum_i a_i}\quad(a_i>0)`, tex`\(\frac{x^2}{a}+\frac{y^2}{b}\ge\frac{(x+y)^2}{a+b}\)。取两列 \(\frac{x_i}{\sqrt{a_i}}\) 与 \(\sqrt{a_i}\)。`, tex`等号当且仅当所有 \(\frac{x_i}{a_i}\) 相等。`, ['titu', 'engel', '分式柯西', '分母和']),
  extension('weighted-cauchy', '加权柯西', 'Weighted Cauchy–Schwarz', '每一项的重要程度不同，就把权重的平方根放进两个序列中。', tex`\left(\sum_i w_i x_i\right)^2\le\left(\sum_i w_i\right)\left(\sum_i w_i x_i^2\right)\quad(w_i>0)`, '', '等号要求全部 x_i 相等。权重为零的项可先删去。', ['weighted cauchy', '加权平方和']),
  extension('power-sum', '权方和不等式', 'Weighted power-sum inequality', '分式柯西是幂为 2 的情形。更一般地，把分母归一化成权重，再对凸函数取加权平均。', tex`\sum_i\frac{x_i^r}{a_i^{r-1}}\ge\frac{(\sum_i x_i)^r}{(\sum_i a_i)^{r-1}}\quad(x_i\ge0,\ a_i>0,\ r\ge1)`, tex`取 \(r=2\) 就是分式柯西；取所有 \(a_i=1\) 得 \(\sum x_i^r\ge n^{1-r}(\sum x_i)^r\)。`, tex`\(r>1\) 时等号要求 \(\frac{x_i}{a_i}\) 全相等；\(r=1\) 恒等。非整数幂尤其要保留非负性。`, ['权方和', 'weighted power sum', 'radon', '拉东不等式']),
  extension('power-means', '幂平均与均值链', 'Power means', '较大的幂更强调较大的数据，所以幂平均随幂次增大而不减。柯西直接给出平方平均不小于算术平均；一般结论可用凸性或 Hölder 推出。', tex`M_r=\left(\frac1n\sum_{i=1}^n x_i^r\right)^{\frac1r},\qquad M_r\ge M_s\quad(r>s>0,\ x_i>0)`, tex`对正数有 \(H\le G\le A\le Q\)。这里 H、G、A、Q 分别是调和、几何、算术、平方平均。`, '严格不同幂次下等号当且仅当所有 x_i 相等；不要把一般幂平均说成一次柯西代换。', ['power mean', '幂平均', '均值链', 'rms', 'qm am']),
  extension('holder', '赫尔德不等式', 'Hölder inequality', '柯西把两个平方和联系起来；Hölder 把指数推广为一对共轭指数。', tex`\sum_i|x_i y_i|\le\left(\sum_i|x_i|^p\right)^{\frac1p}\left(\sum_i|y_i|^q\right)^{\frac1q},\quad p,q>1,\ \frac1p+\frac1q=1`, tex`\(p=q=2\) 恢复柯西。`, tex`等号要求 \(|x_i|^p\) 与 \(|y_i|^q\) 两列成比例；使用前先核对共轭指数。`, ['holder', 'hölder', '赫尔德']),
];

const fermatExtensions = [
  extension('euler-totient', '欧拉函数与欧拉定理', "Euler's totient theorem", '费马小定理背后是“乘法会重排可逆剩余类”。素数模数有 p−1 个可逆类；一般模数有 φ(m) 个，因此把 p−1 换成 φ(m)。', tex`\begin{aligned}\varphi(m)&=m\prod_{p\mid m}\left(1-\frac1p\right),\\a^{\varphi(m)}&\equiv1\pmod m\quad(\gcd(a,m)=1,\ m\ge2).\end{aligned}`, tex`\(\varphi(12)=4\)，所以 \(5^4\equiv1\pmod{12}\)。素数 p 满足 \(\varphi(p)=p-1\)，即费马小定理。`, '这里准确名称是欧拉定理，不是复数中的欧拉公式。a 与 m 不互质时不能直接用 φ(m) 缩减指数。', ['欧拉公式', '欧拉定理', '欧拉函数', 'euler theorem', 'totient', 'phi']),
  extension('multiplicative-order', '乘法阶与最短周期', 'Multiplicative order', '欧拉定理给出一个回到 1 的指数；乘法阶是最小的正指数，因此更适合找真正周期。', tex`d=\operatorname{ord}_m(a)\ \Longrightarrow\ \big(a^k\equiv1\pmod m\iff d\mid k\big),\quad d\mid\varphi(m)`, tex`\(2^3\equiv1\pmod7\)，且 1、2 次幂不为 1，所以 \(\operatorname{ord}_7(2)=3\)。`, '必须先有 gcd(a,m)=1；周期通常只是 φ(m) 的因子，而非一定等于 φ(m)。', ['order', '乘法阶', '幂周期']),
  extension('non-coprime-powers', '不互质时先拆素数幂', 'Non-coprime bases', '底数与模数共享素因子时，先用赋值判断幂是否已被某个素数幂整除，再在其余互质部分使用欧拉定理，最后合并同余。', tex`v_p(a^k)=k\,v_p(a)`, tex`求 \(2^{10}\pmod{12}\)：模 4 为 0，模 3 为 1，合并得余数 4。`, '不能写成指数对 φ(m) 取余后直接代入；例如 2 的幂模 8 存在先到零的阶段。'),
];

define('Factorisation', '因式分解就是把“几项相加”改写成“几块相乘”，让零点、符号和整除关系直接露出来。', '先找结构再展开：公共因子、平方差、立方和差、补项配方。', ['因式', '分解因式', 'factorization', 'factorisation', 'identity', '代数恒等式'], factorisationExtensions, tex`\begin{aligned}a^2-b^2&=(a-b)(a+b),\\AB=0&\iff A=0\ \text{or}\ B=0.\end{aligned}`);
define('Symmetric expressions', '交换变量后式子不变，说明它关心的是这组数整体的和与积，而不是哪个数叫 a、哪个叫 b。', '二元对称式优先用 s=a+b、p=ab 表示；保留可实现的范围。', ['symmetric', '对称', '和积', '牛顿和'], [
  extension('power-sums', '幂和递推', 'Newton sums for two variables', 'a、b 都满足同一个二次方程，将它乘上更高次幂再相加，就能逐级求幂和。', tex`S_0=2,\ S_1=s,\qquad S_k=sS_{k-1}-pS_{k-2}\quad(k\ge2)`, tex`\(S_3=s^3-3sp\)，\(S_4=s^4-4s^2p+2p^2\)。`),
  extension('three-variables', '三元基本对称式', 'Elementary symmetric polynomials', '三变量对称式可围绕和、两两乘积之和、三者乘积组织。', tex`a^3+b^3+c^3=s^3-3sq+3r,\quad s=a+b+c,\ q=ab+bc+ca,\ r=abc`, '', '这只减少参数表达，不代表 s、q、r 可独立任意取值。'),
]);
define('Substitution', '换元就是给反复出现的一整块起一个短名字，把复杂结构压成熟悉的式子。', '先写新变量范围，求出候选值后再回代检查。', ['换元', 'substitution', '代换', '倒数'], [
  extension('reciprocal', '倒数对称换元', 'Reciprocal substitution', '同时出现 x 与它的倒数时，和或差通常比 x 本身更简单。', tex`t=x+\frac1x\ \Longrightarrow\ x^2+\frac1{x^2}=t^2-2,\quad t\in(-\infty,-2]\cup[2,\infty)`, '', '范围针对非零实数 x；复数情形不同。'),
  extension('symmetric-substitution', '和差换元', 'Sum and difference substitution', '同时出现和与差时，反过来把和、差当变量。', tex`u=x+y,\ v=x-y\ \Longrightarrow\ x=\frac{u+v}{2},\ y=\frac{u-v}{2}`, '整数问题中 u、v 必须同奇偶。'),
]);
define('Telescoping', '每项都能拆成“前一块减后一块”时，中间块成对抵消，只留下边界。', '写成 F(k)−F(k+1)，把首尾项和上下限保留下来。', ['裂项', '望远镜', 'telescoping', '相消', 'partial fractions'], [
  extension('shifted-telescoping', '跨步相消', 'Shifted telescoping', '相差不止一个指标时，抵消后会留下多项边界。', tex`\frac1{k(k+r)}=\frac1r\left(\frac1k-\frac1{k+r}\right)\quad(r\ne0)`, tex`r=2 时，求和会留下前两项和最后两项。`, '分母不能为零；先展开小规模求和确认边界。'),
  extension('products', '连乘相消', 'Telescoping products', '把每个乘积因子写成相邻项之比，公共分子分母也可以抵消。', tex`\prod_{k=1}^n\frac{k+1}{k}=n+1`, '', '能抵消的分母都必须非零。'),
]);
define('Non-negative squares', '平方不会是负数，所以把目标与一个或多个平方联系起来，就把不等式变成了显然的事实。', '证明“左边−右边”是非负项之和，同时记录等号。', ['sos', '平方和', '配方', 'nonnegative'], [
  extension('lagrange-identity', '拉格朗日恒等式', "Lagrange's identity", '柯西两边之差本身就是一组平方和，因此等号要求每一组交叉差都为零。', tex`\left(\sum a_i^2\right)\left(\sum b_i^2\right)-\left(\sum a_i b_i\right)^2=\sum_{i<j}(a_i b_j-a_j b_i)^2`),
  extension('schur', '三次舒尔不等式', "Schur's inequality", '对非负三变量，先排序，再把轮换和配成符号确定的部分。它适合连接三次幂和、混合项与 abc。', tex`a^3+b^3+c^3+3abc\ge ab(a+b)+bc(b+c)+ca(c+a)\quad(a,b,c\ge0)`, tex`设 \(a\ge b\ge c\)，原差等于 \((a-b)^2(a+b-c)+c(c-a)(c-b)\ge0\)。`, '等号为三数全相等，或一个为零、另外两个相等。', ['schur', '舒尔']),
]);
define('AM–GM', '在总量固定时，数越均匀，乘积越大；反过来，乘积固定时，均匀分配使和最小。', '只对非负数使用；等号要求所比较的全部数相等。', ['am gm', 'amgm', '均值不等式', '算几', '算术几何'], [
  extension('n-amgm', '多元与加权 AM–GM', 'General and weighted AM–GM', '重复出现的项可以用权重表示。权重是正数且总和为 1。', tex`\sum_i w_i a_i\ge\prod_i a_i^{w_i}\quad(a_i>0,\ w_i>0,\ \sum_i w_i=1)`, tex`\(\frac{x+x+y}{3}\ge\sqrt[3]{x^2y}\)。`, '等号仍要求所有 a_i 相等；权重不是随意添加的系数。'),
  extension('splitting', '拆项与凑系数', 'Splitting terms', '为了让乘积刚好产生目标，可把一个项拆成几个正数项，再应用多元均值。', tex`x^2+\frac2x=x^2+\frac1x+\frac1x\ge3\quad(x>0)`, '等号在 x=1 时达到。', '拆项应服务于目标次数与等号条件。'),
]);
define('Cauchy–Schwarz', '两列数逐项相乘后相加，不会超过两列各自“总大小”的乘积；两列方向一致时达到上限。', '找准两列；实数情形等号当且仅当两列线性相关。', ['cauchy', 'schwarz', '柯西', '施瓦茨', '柯西不等式', '柯西施瓦茨', '柯西施瓦茨不等式', 'cauchy schwarz', 'cauchy inequality', '平方和'], cauchyExtensions);
define('Homogeneity', '若把所有变量同时放大，只会让两边乘上相同倍数，那么整体尺度对结论没有影响。', '齐次才可归一化；归一化的量必须非零且符合定义域。', ['homogeneous', '齐次', '归一化', 'normalization', 'normalisation'], [
  extension('simplex', '固定和与边界检查', 'Normalisation and boundary cases', '正变量的齐次比值可把总和设为 1，从无限尺度缩到一个有界区域，再单独检查边界。', tex`x=\frac a{a+b+c},\ y=\frac b{a+b+c},\ z=\frac c{a+b+c},\quad x+y+z=1`, '', '严格正变量的边界可能只能逼近；下确界不一定能取到。'),
]);

define('Factor and remainder theorems', '除以 x−r 时，所有含 x−r 的部分在 x=r 处都消失，所以只剩余数 P(r)。', 'P(r)=0 等价于 x−r 是因式。', ['factor theorem', 'remainder', '因式定理', '余数'], [
  extension('multiple-roots', '重根与导数', 'Multiplicity of roots', '一个因式重复出现，就是重根。可使用求导时，重根也会成为导数的根。', tex`(x-r)^2\mid P(x)\iff P(r)=P'(r)=0`, '', '对实系数或复系数多项式成立；只验 P(r)=0 不能证明二重根。'),
  extension('quadratic-remainder', '二次因式的余数', 'Remainders modulo a polynomial', '除以二次式时余数至多一次；用已知关系降低高次项，而不是硬做长除法。', tex`x^2\equiv-x-1\pmod{x^2+x+1}\ \Longrightarrow\ x^3\equiv1\pmod{x^2+x+1}`, '因此 x 的高次幂可按模 3 的周期求余。'),
]);
define('Vieta’s formulas', '多项式是“首项系数乘所有根因式”；展开后，同次项的系数就是根的对称组合。', '用系数求根的和积，通常不必逐个解出根。', ['vieta', '韦达', '根与系数', 'roots coefficients', '对称式'], [
  extension('general-vieta', '高次韦达与幂和', "Higher-degree Vieta and Newton sums", '根的两两乘积、三三乘积等也由系数读取；幂和可把根方程相加来递推。', tex`a\prod_{i=1}^n(x-r_i)=ax^n+bx^{n-1}+\cdots+c\ \Longrightarrow\ \sum r_i=-\frac ba,\quad\prod r_i=(-1)^n\frac ca`, '', '公式按重数计根，并且包含复根。'),
  extension('vieta-jumping', '韦达跳跃（提高）', 'Vieta jumping', '把整数方程视作一个变量的二次方程：已知一个整数根，韦达可能给出另一个更小的整数根，从而递降。', tex`x^2-Sx+P=0\ \Longrightarrow\ x'=S-x,\quad xx'=P`, '完整证明需要分别验证新根是整数、满足正性、仍满足原方程且更小。', '只找到另一根还不构成递降；并非所有方程都能这样处理。'),
]);
define('Degree and roots', '每多一个不同零点，就要多一个不同的一次因式；非零多项式的次数装不下太多这样的因式。', '次数至多 d 的多项式，在 d+1 个不同点取零就必为零多项式。', ['degree', '多项式恒等', '根的个数', '插值'], [
  extension('lagrange-interpolation', '拉格朗日插值', 'Lagrange interpolation', 'd+1 个不同输入处的值，唯一确定一个次数至多 d 的多项式。每个基函数在自己的点取 1，在其他点取 0。', tex`P(x)=\sum_{i=0}^d P(x_i)\prod_{j\ne i}\frac{x-x_j}{x_i-x_j}`, '', '输入必须两两不同；一般函数不受这个次数限制。'),
]);
define('Integer evaluations', '整数系数让“输入相差多少”和“输出相差多少”保持整除联系，因为每个幂差都含输入之差。', '整数 u≠v 时，u−v 整除 P(u)−P(v)。', ['integer polynomial', '整数系数', '函数值整除', 'polynomial divisibility'], [
  extension('rational-root', '有理根定理', 'Rational root theorem', '最简分数若是整数系数多项式的根，分子必须来自常数项的因子，分母来自首项系数的因子。', tex`P\!\left(\frac pq\right)=0,\ \gcd(p,q)=1\ \Longrightarrow\ p\mid a_0,\quad q\mid a_n`, '', '常数项为零时先提取 x 因式；本定理列出候选根，不保证候选都成立。'),
]);
define('Special inputs', '函数方程要对每一组允许的输入成立，所以可以选最省事的输入，让未知关系自己暴露出来。', '先代零、相同变量、相反数，再把得到的关系用于一般输入。', ['functional equation', '函数方程', '特殊值', '代零'], [
  extension('cauchy-fe', '可加方程与正则性', 'Additive Cauchy equation', '可加性先给出整数与有理数上的线性；要推广到所有实数，还需要连续、单调或局部有界等额外条件。', tex`f(x+y)=f(x)+f(y)\ \Longrightarrow\ f(q)=qf(1)\quad(q\in\mathbb Q)`, '', '不能在没有正则条件时直接断言所有实数解都是 f(x)=cx。'),
]);
define('Injectivity and surjectivity', '单射说“不同输入不会撞到同一输出”；满射说“目标集合里的每个值都能被某个输入打中”。', '相同函数值能否消去 f，取决于是否已证明单射。', ['injective', 'surjective', '单射', '满射', '双射'], [
  extension('finite-functions', '有限集合上的单满等价', 'Finite-set equivalence', '从有限集合到自身的函数，只要不发生碰撞，就一定覆盖全部元素；覆盖全部也意味着没有碰撞。', tex`f:S\to S,\ |S|<\infty\ \Longrightarrow\ (f\text{ injective}\iff f\text{ surjective})`, '', '无限集合中不成立，例如整数上的 f(n)=2n 单射但不满射。'),
]);
define('Recurrence transformations', '复杂递推常只是熟悉递推换了一件外衣；减掉固定值或换成倒数，可以把外衣脱掉。', '找不动点，再研究偏离不动点的量。', ['recurrence', '递推', '不动点', '特征根'], [
  extension('linear-recurrence', '二阶常系数递推', 'Second-order linear recurrence', '猜指数型解后，递推会变成关于底数的二次方程。不同根给出两个指数型分量。', tex`a_{n+2}=pa_{n+1}+qa_n,\quad r^2-pr-q=0`, tex`q≠0 时，两不同根 \(r_1,r_2\) 给出 \(a_n=Ar_1^n+Br_2^n\)；重根 r 时形如 \((A+Bn)r^n\)。`, '常数由初值决定；q=0 先降为一阶递推。非齐次项需另找特解，重根不能照搬两个相同指数。'),
]);
define(['Induction', 'Induction & strong induction'], '归纳法是让第一块骨牌倒下，再证明任意一块倒下都会推倒下一块；强归纳允许使用之前全部已证明情形。', '初始情形和推进步骤缺一不可；假设必须比待证结论更早。', ['induction', '归纳', '强归纳', '递推证明'], [
  extension('strengthen-induction', '加强命题与强归纳', 'Strengthening the induction hypothesis', '若单个结论推不动下一步，把一个始终一起出现的辅助界也放入归纳命题，或同时归纳两个相邻指标。', tex`P(n_0),\quad\big(P(n_0)\land\cdots\land P(n)\big)\Rightarrow P(n+1)`, '证明每个 n≥2 都能分解成素数乘积时，合数 n=ab 的 a、b 均小于 n，适合强归纳。', '加强的命题也必须验证初始情形，不能额外假设尚未证明的性质。'),
]);

define('Disjoint cases & successive choices', '每个对象恰好属于一个类别就把类别数相加；一个对象需要连续做几个决定，就把每步选择数相乘。', '分类不重不漏；分步按实际分支数计算。', ['加法原理', '乘法原理', '分类', '分步', 'product rule'], [
  extension('decision-tree', '决策树与状态', 'Decision trees', '后续选项依赖前面的决定时，画出分支树并逐层求和；只保留决定后续选项所需的状态。', tex`N=\sum_{s\in S}N(s)`, '三位数禁止重复时，首位选 9 种，次位 9 种，末位 8 种；有额外限制时各首位分支可能不同。', '不能把不同分支的选择数平均后随意相乘。'),
]);
define('Complement & inclusion–exclusion', '直接数合法对象很难时，先数全部再剔除坏对象；坏条件重叠的地方，要把多扣的部分加回来。', '容斥是在校正同一对象被重复计入或扣除的次数。', ['inclusion exclusion', '容斥', '补集', '至少一个', '去重'], [
  extension('general-ie', '多事件容斥', 'General inclusion–exclusion', '一个对象落入多少个坏事件，就用交集大小的交替和把它最终算成一次。', tex`\left|\bigcup_{i=1}^n A_i\right|=\sum_{\varnothing\ne S\subseteq\{1,\ldots,n\}}(-1)^{|S|+1}\left|\bigcap_{i\in S}A_i\right|`, '', '交集为空也要作为零处理；不要求事件独立。'),
  extension('derangements', '错排', 'Derangements', '把“第 i 个元素留在原位”作为坏事件，对这些事件做容斥。', tex`D_n=n!\sum_{k=0}^n\frac{(-1)^k}{k!}`, tex`\(D_3=6-6+3-1=2\)。`, '错排要求每个元素都离开原位，而不是排列不完全等于原排列。', ['derangement', '错排']),
]);
define('Double counting', '把同一堆记录，先按一种标签分组，再按另一种标签分组；记录没变，总数就必须一样。', '先定义被数的对象，再给出两种完整数法。', ['double counting', '双计数', '关联', '握手'], [
  extension('binomial-double-count', '带标记的子集', 'Marked subsets', '从 k 元子集中挑一个代表，可先选集合再选代表，也可先选代表再选剩余元素。', tex`k\binom nk=n\binom{n-1}{k-1}\quad(1\le k\le n)`, '同一个对象是“一个 k 元集合及其中指定的一个元素”。'),
  extension('incidence-bound', '贡献与关联计数', 'Incidence bounds', '一边能够给下界、另一边能够给上界时，不必精确计数，也能夹出强限制。', tex`\sum_{a\in A}\#\{b:a\sim b\}=\sum_{b\in B}\#\{a:a\sim b\}`, '如每个人至少参加 r 个小组、每组最多 s 人，则总关联数同时不小于人数乘 r、不大于组数乘 s。'),
]);
define('Bijections & encoding', '换一种记录方式不应改变对象个数：关键是每个原对象都能唯一编码，也能从编码唯一还原。', '同时检查不碰撞、全覆盖和可逆。', ['bijection', 'encoding', '双射', '一一对应', '编码', '格路'], [
  extension('lattice-path', '子集与格路', 'Subsets and lattice paths', '用选中的位置表示向右走，其余表示向上走，子集与格路就成了一一对应。', tex`\#\{\text{paths with }r\text{ right and }u\text{ up steps}\}=\binom{r+u}{r}`, '', '若格路还必须避开边界，要再加入反射或其他限制。'),
  extension('catalan', '反射原理与 Catalan 数（提高）', 'Reflection principle and Catalan numbers', '把第一次越界前的路径反射，坏路径便与另一类无约束路径一一对应。', tex`C_n=\binom{2n}{n}-\binom{2n}{n+1}=\frac1{n+1}\binom{2n}{n}`, '计从 (0,0) 到 (n,n)、始终满足 y≤x 的单位格路。', '必须说明反射的首次越界点和反向恢复规则。', ['catalan', '卡特兰', '反射原理']),
]);
define('Counting with weights', '普通计数每个对象贡献 1；带权计数让对象贡献有用的数值，从总贡献中读出更多信息。', '写清权重代表什么，再解释权重总和如何回答原问题。', ['weighted counting', '带权', '正负配对', '贡献'], [
  extension('sign-involution', '符号反转对合', 'Sign-reversing involutions', '给对象找一个配对伙伴，要求再配一次回到自己，且权重符号相反；成对项就会消掉。', tex`\sum_{S\subseteq\{1,\ldots,n\}}(-1)^{|S|}=(1-1)^n=0\quad(n\ge1)`, '固定一个元素，切换它是否入选，就是无固定点的符号反转配对。', '有固定点时要另外统计未被抵消的贡献。'),
]);
define('Gaps & blocks', '不相邻就先排别人，再把它们放进空隙；必须相邻就先捆成一个对象，再补内部顺序。', '先决定“间隔”还是“整体”；别漏两端或块内排列。', ['插空', '捆绑', 'gaps', 'blocks', '不相邻'], [
  extension('nonadjacent-selection', '不相邻位置的选取', 'Non-adjacent selections', '选 k 个互不相邻位置时，先消去每对相邻被选位置之间强制留下的一个空位。', tex`1\le x_1<\cdots<x_k\le n,\ x_{i+1}\ge x_i+2\ \Longrightarrow\ \#=\binom{n-k+1}{k}`, tex`令 \(y_i=x_i-(i-1)\)，就变成在 n−k+1 个位置普通选 k 个。`, '该公式针对一条线；圆上的首尾相邻要单独处理。'),
]);
define('Stars and bars', '相同物品只需决定每个盒子分到几个；隔板的位置恰好记录了这些数量。', '盒子有标号、物品相同；先平移下界，再处理上界。', ['stars bars', 'stars and bars', '隔板', '整数解', '分配'], [
  extension('lower-upper-bounds', '下界平移与上界容斥', 'Bounds in stars and bars', '下界先扣掉；上界超限时，把超出的那一块平移后用容斥。', tex`\#\{x_i\ge0:\ \sum_{i=1}^k x_i=N,\ x_i\le M\}=\sum_{j=0}^k(-1)^j\binom kj\binom{N-j(M+1)+k-1}{k-1}`, '', '不可能分配的项按零计；此处所有盒子的上界都为同一个非负整数 M。'),
  extension('generating-functions', '生成函数视角', 'Generating functions', '每个盒子的可选数量用一个多项式表示；乘积中目标次幂的系数就是分配数。', tex`[x^N](1+x+\cdots+x^M)^k`, '', '系数计数通常把 x 当形式变量，不需要讨论函数收敛。', ['generating function', '生成函数', '系数提取']),
]);
define('Labelling & multiplicities', '暂时给相同对象编号，容易先数出来；去掉编号时，每个真实结果被数了几次，就除以几。', '统一相除的前提是每个结果的重数相同。', ['multiplicity', '重数', 'multinomial', '重复排列', '多项式系数'], [
  extension('multinomial', '多项式系数', 'Multinomial coefficients', '把 n 个位置分给各类对象，等价于逐类挑位置。', tex`\binom{n}{m_1,\ldots,m_r}=\frac{n!}{m_1!\cdots m_r!},\quad \sum m_i=n`, '这一系数也出现在多项式展开中；例如 AABB 有 6 个不同排列。'),
]);
define('Circular order & symmetry classes', '圆上没有天然起点；若旋转被视为同一种，就应数旋转后的等价类，而不是有编号的座位。', '先声明旋转和反射是否等价；重复元素时不能机械相除。', ['circular', '圆排列', '旋转', 'burnside', '对称'], [
  extension('burnside', 'Burnside 引理（提高）', "Burnside's lemma", '对称类大小不同时，改数每种对称操作固定了多少对象，再取平均。', tex`\#\text{orbits}=\frac1{|G|}\sum_{g\in G}|\operatorname{Fix}(g)|`, '3 个位置的二色项链，只认旋转：恒等操作固定 8 个，两个非平凡旋转各固定 2 个，共 (8+2+2)÷3=4 类。', '必须选择真正作用于对象集合的对称群；加上反射会改变结果。', ['burnside', '伯恩赛德', '轨道']),
]);
define('Pairing & matching', '找到很多合法点对不等于能同时使用它们；匹配要求每个对象最多参加一对。', '同时选出的边必须没有公共端点。', ['matching', '配对', '匹配', 'hall'], [
  extension('hall', 'Hall 婚配定理（提高）', "Hall's marriage theorem", '二分图左边每个对象都要分到一个不同的右边对象；任意一群左边对象必须共同拥有足够多候选。', tex`\exists\text{ matching covering }L\iff |N(S)|\ge|S|\quad\text{for every }S\subseteq L`, '', '检查每个单独对象有候选还不够，必须检查所有子集。', ['hall', '婚配定理', '霍尔']),
]);
define(['Recurrence & state splitting', 'Recurrences and states'], '把大对象按最后一步或末尾状态拆开；只要状态记录了决定后续选择的信息，就能从小规模推到大规模。', '状态要足以决定转移；转移分类互斥且穷尽。', ['状态', '递推计数', 'state', 'recurrence', 'fibonacci'], [
  extension('binary-states', '有限状态与 Fibonacci', 'Finite-state recurrence', '对禁止连续两个 1 的二进制串，按末位是 0 或 1 分类，就只需两个状态。', tex`A_{n+1}=A_n+B_n,\quad B_{n+1}=A_n,\quad T_n=T_{n-1}+T_{n-2}`, tex`取 \(T_0=1\)、\(T_1=2\)，长 2 的合法串为 00、01、10，共 3 个。`, '空对象的初值经常是 1；不要因为长度为零就误写成零。'),
]);
define('Constructive existence', '要证明东西存在，直接给出一个，并逐条核对它满足要求，通常比抽象说明更有力。', '构造规则必须明确，验证必须覆盖全部约束。', ['construction', '构造', '存在性'], [
  extension('greedy-construction', '贪心构造与交换', 'Greedy construction and exchange', '每一步选当前最有利的对象可以成为构造，但要证明这个选择不会让后面无解。', '', '区间调度按最早结束时间选取时，可把任一最优解的首个区间换成它，而不减少剩余空间。', '“看起来最好”不是证明；需要交换论证或始终保留可完成性的性质。'),
]);
define('Deletion–insertion & local repair', '先去掉一个难处理的局部，让问题变小；解完小问题，再把它放回去，必要时只修补附近。', '归纳不仅要能删，还要能合法恢复。', ['deletion insertion', '删除', '插入', '局部修正'], [
  extension('leaf-deletion', '删叶归纳', 'Deleting a leaf', '树总能找到叶子，删去叶子仍是更小的树，所以很多树的性质可这样归纳。', tex`|E(T)|=|V(T)|-1`, '删去一个叶子时，顶点数与边数都减少 1。', '一般连通图任意删点可能失去连通性；“删叶”利用了树的特殊结构。'),
]);
define('Extremal choice & pigeonholes', '若把太多对象放进太少类别，总有一类拥挤；选最大或最小的对象，则能把“再大一点”的可能性排除。', '先说清对象和盒子是什么，再数各有多少。', ['pigeonhole', 'pigeonholes', '抽屉', '极端'], [
  extension('prefix-residues', '前缀和与抽屉', 'Prefix sums modulo n', '把累积和按余数分组：相同余数的两个累积和相减，就得到一段被 n 整除的连续和。', tex`s_j=\sum_{i=1}^j a_i,\quad s_j\equiv s_i\pmod n\ \Longrightarrow\ n\mid(s_j-s_i)`, tex`任意 n 个整数，考虑 \(s_0=0\) 到 \(s_n\) 的 n+1 个余数，即可找到非空连续段的和被 n 整除。`),
]);
define('Checkerboard & modular colouring', '给位置涂色，是把几何位置变成少数几类；每块拼板覆盖哪些颜色，就成了可比较的数量。', '颜色规则应让每次放置或移动产生可计算的颜色贡献。', ['colouring', 'coloring', '染色', '棋盘', '模类'], [
  extension('weighted-colouring', '周期染色与带权染色', 'Periodic and weighted colouring', '黑白不足以区分时，用多种余数颜色或给位置赋正负权；关键是每个允许拼块的总贡献固定。', tex`c(x,y)\equiv x+y\pmod r`, '三连块问题可尝试周期为 3 的染色，但必须检查每种允许朝向的贡献。', '适用于一种朝向的颜色结论未必适用于旋转后的拼块。'),
]);
define('Parity & modular invariants', '复杂数值可能一直在变，但它的奇偶性或模某个数的余数却保持不变；只追踪这部分就够了。', '逐种操作核对变化量是否总被模数整除。', ['parity', '奇偶', 'modular invariant', '同余不变量'], [
  extension('permutation-parity', '排列奇偶性', 'Parity of permutations', '一次交换两个元素会翻转排列奇偶性；若允许操作总等价于偶数次交换，奇偶性就是障碍。', tex`\operatorname{sgn}(\sigma)=(-1)^{\operatorname{inv}(\sigma)}`, '', '不能只看移动了几个元素；一个长度 k 的轮换等价于 k−1 次交换。'),
]);
define('Invariants', '每次操作都可以改很多东西，但只要某个总量始终不变，起点和终点就必须拥有同一个值。', '找到量之后，必须验证它对每一种合法操作都不变。', ['invariant', '不变量', '守恒量'], [
  extension('linear-invariants', '线性不变量', 'Linear invariants', '给各位置找权重，使每种操作带来的加权变化恰好为零。', tex`I=\sum_i w_i x_i,\qquad \sum_i w_i\Delta x_i=0`, '操作若把相邻两格分别加 1、减 1，则总和不变。', '不变量相同通常只是可达的必要条件，不是充分条件。'),
]);
define('Monovariants & termination', '若一个有下界的整数指标每走一步都严格下降，过程不可能无限进行。', '严格变化加离散界，才能推出有限步终止。', ['monovariant', '单调量', '终止', '势函数', 'potential'], [
  extension('lexicographic', '字典序势函数', 'Lexicographic potentials', '一个指标可能暂时不变时，用第二个指标打破平局；先看第一项，再看第二项。', tex`(a,b)\succ(a',b')\iff a>a'\ \text{or}\ (a=a'\ \text{and}\ b>b')`, '若 a、b 都是非负整数，并且每步字典序下降，就不能有无限下降链。', '实数严格下降仍可能无限，如每次减半；必须给出足够的离散性或统一步长。'),
]);
define('Reachability & obstructions', '问“能不能到”时，先找所有合法路径都跨不过的障碍；排除了障碍，再尝试造出路径。', '障碍能证明不能到；想证明能到，还需构造或完整刻画。', ['reachability', '可达', '必要充分', 'obstruction'], [
  extension('state-components', '状态图的连通分量', 'State-graph components', '把每个局面当顶点，一步合法操作当边，可达问题就成了路径问题。', '', '不变量把状态分到不同组；要证明同组内全可达，还需证明组内连通。', '操作不可逆时用有向图，不能把单向可达误当双向可达。'),
]);
define('Graph modelling', '把对象当点、关系当边，就可以用路径、度数和连通性描述原题，而不必一直面对原故事。', '写清点、边以及是否允许方向、重边和自环。', ['graph', '图论', '建图', '点边', '网络'], [
  extension('complement-graph', '补图与 Ramsey 小例子', 'Complement graphs and a Ramsey example', '“有关系”和“没关系”可以在原图与补图之间转换。', tex`\deg_G(v)+\deg_{\overline G}(v)=n-1`, '任意 6 人中，至少有 3 人彼此认识或彼此不认识：从一人看其余 5 人，至少 3 人与他有同类关系，再检查这 3 人之间的边。', '补图的这条度数公式针对无自环、无重边的简单无向图。'),
]);
define('Degrees & the handshake lemma', '每条无向边恰好接触两个端点，所以把每个点的度数相加时，每条边被数了两次。', '度数总和等于边数的两倍；奇度顶点个数为偶数。', ['degree', '度数', '握手', 'handshake'], [
  extension('degree-sequences', '度数约束', 'Degree constraints', '简单图的度数都不超过 n−1，而度数和必须为偶数；这些是候选度数序列的第一轮筛查。', tex`0\le d_i\le n-1,\qquad\sum_i d_i\equiv0\pmod2`, '', '这些条件必要但不充分，例如 3、3、0、0 在四顶点简单图中不能实现。'),
]);
define('Connectivity, paths & cycles', '路径表示能否一步步从一个对象走到另一个；环表示走了一圈回到原点。', '用路径连接，用环识别冗余或循环。', ['connected', '连通', 'path', 'cycle', '路径', '环'], [
  extension('euler-trails', '欧拉路与欧拉回路', 'Euler trails and circuits', '每条边恰好走一次时，进入中间顶点的每次机会都要配上一次离开，所以奇度点只能是起终点。', tex`\#\{v:\deg v\text{ odd}\}=0\ \text{or}\ 2`, '无向图去掉孤立点后连通：全偶度存在闭合欧拉回路；恰有两个奇度点存在以它们为端点的开欧拉路。', '这里走的是每条边一次；不要与每个顶点一次的 Hamilton 路混淆。', ['euler trail', '欧拉回路', '一笔画']),
]);
define('Trees & bipartite graphs', '树是没有多余绕路的连通图；二分图是能把点分成两组、每条边都跨组的图。', '树中两点间唯一路径；二分图恰好没有奇环。', ['tree', '树', 'bipartite', '二分图', '奇环'], [
  extension('tree-equivalences', '树的等价刻画', 'Equivalent characterisations of trees', 'n 个顶点的有限简单图，连通加 n−1 条边足以保证无环；无环加 n−1 条边也足以保证连通。', tex`T\text{ is a tree}\ \Longrightarrow\ |E|=|V|-1`, '非平凡有限树至少有两个叶子，可取最长路径的两端证明。', '单有 n−1 条边不足以说明是树。'),
  extension('bipartite-cycle', '二分染色与奇环', 'Two-colouring and odd cycles', '沿路径交替涂两种颜色；若产生矛盾，冲突边和路径就组成一个奇环。', tex`G\text{ bipartite}\iff G\text{ has no odd cycle}`, '', '每个连通分量都要分别开始染色。'),
]);
define('Directed graphs & matchings', '有向边记录先后或指向；匹配则挑选互不抢占端点的边。这两种限制都必须在模型中保留。', '方向不能随意反转；匹配不能重复使用顶点。', ['directed graph', '有向图', 'matching', '匹配', '拓扑'], [
  extension('dag', '无环有向图与拓扑序', 'Directed acyclic graphs', '没有有向环的有限依赖图，总能找到一个没有前置依赖的顶点，依次删除就得到合法顺序。', '', '有限 DAG 必有入度零的顶点；否则不断追溯前驱最终重复，形成有向环。', '拓扑序只适用于无环有向图；无向图的环是另一概念。', ['dag', 'topological', '拓扑排序']),
]);
define('Averaging & counting bounds', '一组数的平均值不可能比每个数都大，也不可能比每个数都小；因此总能挑出至少和平均一样好的对象。', '至少一个不低于平均，至少一个不高于平均。', ['averaging', '平均值原理', '计数界', '期望法'], [
  extension('probabilistic-existence', '期望推出存在', 'Existence from expectation', '随机选对象并计算其得分期望；一定有某个对象得分不低于期望。', tex`\max X\ge\mathbb E[X]`, '随机把图的每个顶点独立放到两侧，每条边跨侧概率为 1/2，故存在至少含一半边的割。', '应先定义抽样方式和得分，不需要真的随机实验才能证明存在。'),
]);
define('Upper bound + attaining construction', '证明最多多少，只完成了一半；还要给出恰好达到这个数的例子，才能确定最大值。', '上界与达到上界的构造必须吻合。', ['sharp bound', '最值', '上界', '构造', '紧界'], [
  extension('equality-backtracking', '从等号反推构造', 'Building from equality cases', '沿着界的证明回看每一步什么时候取等号，这些条件通常直接提示极值构型。', '', '若最大值证明用到“每个盒子至多两个”，就尝试让每个盒子恰好两个，同时核查全局约束。', '不同步骤的等号可能无法同时实现；这时上界可能不够紧。'),
]);
define('Extremal configuration & local improvement', '在所有合法配置中选一个最优的；若某个坏结构还存在，就局部改一下让它更优，产生矛盾。', '局部修改要保持合法，并严格改善所选指标。', ['extremal', '极端原理', '局部改进', '交换论证'], [
  extension('uncrossing', '解交叉', 'Uncrossing', '几何连线若相交，交换端点常能缩短总长；所以总长最短的匹配往往没有交叉。', '', '两条线段在内部交于 X 时，沿 X 使用三角不等式比较原连线与交换后的连线。', '需保证交换后的配对仍被允许；共线退化情形可能只给不增而非严格缩短。'),
]);
define('Winning & losing states', '轮到你走时，若能把对手送进一个必败局面，你就能赢；若所有走法都送对手进必胜局面，你就会输。', '在有限、无和局的正常制游戏中，从终局向前递推。', ['winning', 'losing', '必胜', '必败', '博弈', 'nim'], [
  extension('subtraction-games', '取石子与周期', 'Subtraction games', '先标小局面，再寻找余数规律，最后证明每个坏余数只能走到好余数，而好余数总能走回坏余数。', tex`\text{Remove }1,\ldots,k,\ \text{last move wins}:\quad n\equiv0\pmod{k+1}\text{ is losing}`, '每次可取 1 到 3 个，留下 4 的倍数给对手。', '若最后一步输、存在和局或允许无限循环，必须重新分析终局和递推。'),
]);
define('Pairing strategy & strategy stealing', '配对策略给对手每步安排一个合法回应；策略偷取则假设对手必胜，再说明自己能借用该策略而矛盾。', '配对后必须始终能回应；偷取策略需要证明额外一步不会有害。', ['pairing strategy', '配对策略', 'strategy stealing', '策略偷取'], [
  extension('symmetry-strategy', '中心对称回应', 'Symmetric responses', '若棋盘和规则有对称性，先处理中心位置，再对对手的每步走对称位置。', '', '在无禁邻限制的格点占位游戏中，若中心固定点已被先手占据，其余位置成对出现，可用中心对称回应。', '存在相邻限制或对称点已不可用时，此策略可能失效；对称本身不是胜利证明。'),
]);

define('Angle chasing', '同一条线、同一圆或同一相似三角形会把许多角联系起来；角追踪就是沿这些关系把已知角传到目标角。', '每次角相等或互补，都写出它来自哪条几何性质。', ['angle chasing', '角追', '角度', '有向角'], [
  extension('directed-angles', '模半周有向角', 'Directed angles modulo 180 degrees', '普通角会因点的位置变化产生补角分支；直线间有向角按模半周计算，可把这些分支统一。', tex`\angle(\ell_1,\ell_3)\equiv\angle(\ell_1,\ell_2)+\angle(\ell_2,\ell_3)\pmod{180^\circ}`, '', '要始终保持直线次序一致；有向角相等不能随意改成普通锐角相等。', ['directed angles', '有向角']),
]);
define('Cyclic quadrilaterals', '四点共圆意味着同一条弦可以从不同顶点看到同一个圆周角；找出这个圆，角关系往往就能连起来。', '对角互补可判共圆；共圆后同弦所对角相等（注意所在弧）。', ['cyclic', '共圆', '圆内接四边形', 'ptolemy', '托勒密'], [
  extension('ptolemy', '托勒密定理', "Ptolemy's theorem", '圆内接四边形的两条对角线乘积，等于两组对边乘积之和。', tex`AC\cdot BD=AB\cdot CD+AD\cdot BC`, '按 A、B、C、D 的圆周顺序标点。矩形中它化为勾股定理。', '长度形式针对凸圆内接四边形；点序不能随意交换。', ['ptolemy', '托勒密']),
  extension('brahmagupta', '婆罗摩笈多面积公式', "Brahmagupta's formula", '圆内接四边形的面积可仅用四条边求出。', tex`K=\sqrt{(s-a)(s-b)(s-c)(s-d)},\quad s=\frac{a+b+c+d}{2}`, '', '一般四边形不能直接使用此式。'),
]);
define('Tangent–chord theorem', '切线可看作割线的极限位置；切线与弦所成的角，能转移为同弦所对的圆周角。', '弦切角等于其所夹弧对应的圆周角；核对角所在侧。', ['tangent chord', '弦切角', '切线'], [
  extension('tangent-lengths', '两切线等长', 'Equal tangents', '从同一圆外点作两条切线，切线长相等，可把切线条件转成边长关系。', tex`PT=PS`, '连接圆心到两切点，得到两组全等的直角三角形。', '等长针对同一圆、同一外点引出的切线段。'),
]);
define('Power of a point', '从同一点穿过圆作不同割线，两段距离的乘积保持一致；这把圆上的位置关系变成长度乘积。', '先固定同一个点，再比较它的割线乘积；外点的切线长平方也相等。', ['power of point', '点幂', '割线', '切割线', 'radical axis'], [
  extension('signed-power', '有向点幂与切线', 'Signed power and tangency', '用圆心距离定义点幂，圆内为负、圆外为正。与有向割线段的乘积对应时，内外情形可统一。', tex`\operatorname{Pow}_{\omega}(P)=OP^2-R^2,\qquad PT^2=\operatorname{Pow}_{\omega}(P)\quad(P\text{ outside})`, '', tex`圆内使用普通正长度 \(PA\cdot PB\) 时，等于 \(R^2-OP^2\)，不能漏掉符号差异。`),
  extension('radical-axis', '根轴与根心（提高）', 'Radical axes', '对两个不同心圆，点幂相等的点组成一条直线；相减两个圆方程时，二次项恰好消掉。', tex`\operatorname{Pow}_{\omega_1}(P)=\operatorname{Pow}_{\omega_2}(P)`, '两圆相交时，根轴就是公共弦所在直线；三圆的两条根轴若相交，交点也在第三条根轴上。', '不同心是得到根轴直线的前提；三条根轴也可能互相平行。', ['radical axis', '根轴', '根心']),
], tex`PA\cdot PB=PC\cdot PD`);
define(['Similar triangles', 'Similarity'], '相似三角形是同一种形状按比例缩放；一旦认出相同的角，对应的边长比就全部连起来。', '先确定顶点对应，再写对应边的比例。', ['similarity', '相似', '比例', 'aa sas sss'], [
  extension('spiral-similarity', '旋转相似（提高）', 'Spiral similarity', '从同一个中心同时旋转并缩放，可把一条线段送到另一条；对应的夹角和长度比一起保持。', tex`\frac{OA}{OB}=\frac{OC}{OD},\quad\angle AOB=\angle COD\ \Longrightarrow\ \triangle AOC\sim\triangle BOD`, '', '角需按一致方向解释，且中心不能与分母涉及的点重合。'),
]);
define('Area ratios', '三角形面积是底乘高的一半；比较面积时，公共的底或高会直接约掉。', '同高面积比等于底比；相似面积比等于边比的平方。', ['area ratio', '面积比', '同底同高'], [
  extension('cevian-area', '面积法求共点与比', 'Cevian area ratios', '把同一个三角形按点或线切开，逐块比较面积，往往能把几何比例转成代数。', tex`D\in BC\ \Longrightarrow\ \frac{[ABD]}{[ACD]}=\frac{BD}{DC}`, '两小三角形到 BC 的高相同，这也是面积法证明 Ceva 的起点。', '此处 D 在边 BC 内部；延长线情形需处理有向量或绝对值。'),
]);
define('Ceva’s theorem', '从三角形三个顶点引出的线是否会交在一点，可由它们在三边分出的比例统一判断。', '内点型：三个同方向边比的乘积为 1，等价于三条线共点。', ['ceva', '塞瓦', '共点', 'cevian'], [
  extension('trig-ceva', '三角形式 Ceva', 'Trigonometric Ceva', '用正弦定理把边比换成顶角两侧的正弦比，适合已知角而非边长的共点问题。', tex`\frac{\sin\angle BAD}{\sin\angle DAC}\cdot\frac{\sin\angle CBE}{\sin\angle EBA}\cdot\frac{\sin\angle ACF}{\sin\angle FCB}=1`, 'D、E、F 分别在 BC、CA、AB 内部，讨论 AD、BE、CF 的共点。', '外分情形需统一有向角和符号约定。'),
]);
define('Auxiliary lines', '辅助线的作用是补出一个熟悉结构，例如相似三角形、等腰三角形或共圆关系。', '先说要补什么结构，再决定连线或作平行垂线。', ['辅助线', 'auxiliary', '平行线', '倍长中线'], [
  extension('reflect-rotate', '反射与旋转构造', 'Reflections and rotations', '反射能把折线长度转成直线距离；旋转能把等长边转成可以拼接的三角形。', '', '动点限制在直线上、两定点位于同侧时，可反射一个定点，再用三角不等式求距离和的最小值。', '构造后还要检查新点所在区域；最短路径交点可能不在允许线段内。'),
]);
define('Coordinate placement', '坐标法把点的位置变成数；坐标选得好，原有的对称、垂直和长度关系就会自动体现在方程里。', '把最强结构放到坐标轴、原点或对称位置上。', ['coordinate', '坐标系', '解析几何', '坐标选取'], [
  extension('normalise-coordinates', '平移旋转与尺度', 'Coordinate normalisation', '平移和旋转不改变长度角度；允许整体缩放时，还可把一个非零长度设为 1。', tex`A=(0,0),\quad B=(1,0),\quad C=(u,v)`, '', '只有题目对尺度不敏感时才可设 AB=1；固定长度数据需同步缩放。'),
]);
define(['Dot products', 'Coordinates and dot products'], '点积只保留一个向量沿另一个方向的分量，因此能同时表达夹角、投影和垂直。', '非零向量垂直当且仅当点积为零。', ['dot product', '点积', '数量积', '垂直', 'projection'], [
  extension('projection', '投影与距离平方', 'Projection and squared distances', '投影系数由点积除以方向向量的长度平方得到；距离平方可直接展开点积。', tex`\operatorname{proj}_{v}u=\frac{u\cdot v}{v\cdot v}v,\qquad |u-v|^2=|u|^2+|v|^2-2u\cdot v`, '', '投影方向 v 必须非零。'),
]);
define('Vector midpoints', '把点视为位置向量，均匀平均两个点得到中点，均匀平均三个顶点得到重心。', '平均的是位置向量；权重之和为 1 时结果与原点选择无关。', ['midpoint', 'centroid', '中点', '重心', '仿射'], [
  extension('section-formula', '内分点与重心坐标', 'Section formula and barycentric coordinates', '分点不是简单平均，而是按照到两端的反向距离给权重。', tex`AP:PB=m:n\ \Longrightarrow\ p=\frac{na+mb}{m+n}`, '三角形重心为三个顶点等权平均，所以在每条中线上把长度分成 2:1。', '外分要用有向比，不能继续使用全正权重。'),
]);
define(['Distance and determinant', 'Determinant area'], '距离来自勾股；二维行列式来自“底乘垂直高度”，它记录了面积大小和方向。', '三角形面积是两边向量行列式绝对值的一半。', ['determinant', '行列式', '面积', '共线', 'distance'], [
  extension('oriented-area', '有向面积与共线', 'Signed area and collinearity', '保留行列式符号即可跟踪点在直线哪侧；行列式为零说明两个方向共线。', tex`\det(B-A,C-A)=0\iff A,B,C\text{ are collinear}`, '', '求普通面积最后取绝对值；B=A 等退化情形也会给零。'),
]);
define('Euclidean algorithm', '从 a 中减去 b 的整数倍不会改变公因子；反复取余，把大问题缩成越来越小的同一个问题。', 'gcd(a,b)=gcd(b,r)，最后一个非零余数就是最大公因数。', ['euclid', 'gcd', '最大公因数', '辗转相除', '欧几里得'], [
  extension('extended-euclid', '扩展欧几里得', 'Extended Euclidean algorithm', '把每一步余数都记成原来 a、b 的整数线性组合，再倒推可得到 Bézout 系数。', tex`d=\gcd(a,b)=ax+by`, tex`\(30=1\cdot18+12\)，\(18=1\cdot12+6\)，故 \(6=2\cdot18-30\)。`),
  extension('gcd-powers', '幂差的 gcd', 'GCD of exponential differences', '对指数也做欧几里得算法，可把两个幂差的公因子问题缩到指数的 gcd。', tex`\gcd(a^m-1,a^n-1)=a^{\gcd(m,n)}-1\quad(a\ge2,\ m,n\ge1)`, '', '这里 a、m、n 都是整数。'),
]);
define('Bézout’s identity', '最大公因数不只是共同的因子，它还是 a、b 的所有整数线性组合中最小的正数。', 'ax+by=c 有整数解，当且仅当 gcd(a,b) 整除 c。', ['bezout', 'bézout', '贝祖', '裴蜀', '线性丢番图'], [
  extension('linear-diophantine', '二元线性方程全部整数解', 'All solutions of a linear Diophantine equation', '找到一个特解后，沿着不改变 ax+by 的方向走，就得到全部整数解。', tex`x=x_0+\frac bd t,\quad y=y_0-\frac ad t,\quad t\in\mathbb Z,\ d=\gcd(a,b)`, '若还要求 x、y 非负，把通解代入不等式给 t 定界。', '公式假定 a、b 非零；为零的系数应先单独处理。'),
], tex`\gcd(a,b)\mid c\iff\exists x,y\in\mathbb Z:\ ax+by=c`);
define('Coprime factors', '互质意味着两部分没有共享素因子，所以一部分不可能替另一部分承担整除所需的质因子。', '若 gcd(a,b)=1 且 a 整除 bc，则 a 整除 c。', ['coprime', '互质', 'euclid lemma', '欧几里得引理'], [
  extension('coprime-perfect-powers', '互质乘积是完全幂', 'Coprime products that are perfect powers', '互质的两部分质因子互不重叠；乘积中的每个指数是 k 的倍数，就说明各自的指数也一样。', tex`\gcd(a,b)=1,\ ab=c^k,\ a,b>0\ \Longrightarrow\ a=u^k,\ b=v^k`, '', '没有互质条件结论不成立，例如 2·8=16。'),
]);
define(['Prime valuations', 'Prime factorisation and valuations'], '质因数赋值就是数一个数含有多少个某个素数；乘法变成指数相加，整除变成逐个比较指数。', 'n 整除 m，当且仅当每个素数 p 的指数都不更大。', ['valuation', '赋值', '质因数', 'prime factorization', 'legendre', 'lte'], [
  extension('legendre', '勒让德公式', "Legendre's formula", tex`阶乘里的 p 因子来自 p 的倍数，再多一个来自 \(p^2\) 的倍数，以此类推。`, tex`v_p(n!)=\sum_{j\ge1}\left\lfloor\frac n{p^j}\right\rfloor`, tex`\(v_2(10!)=5+2+1=8\)。`, '求和在 p 的幂超过 n 后全部为零。', ['legendre', '勒让德', '阶乘指数']),
  extension('lte', '指数提升 LTE（提高）', 'Lifting the exponent', tex`对满足条件的幂差，新增指数 n 会恰好额外贡献 \(v_p(n)\) 个素因子。`, tex`v_p(a^n-b^n)=v_p(a-b)+v_p(n)`, tex`适用条件：p 为奇素数，p 整除 a−b，p 不整除 ab，n 为正整数，且 \(a^n\ne b^n\)。`, tex`p=2 不能照搬：a、b 为奇数且 n 为正偶数时，应为 \(v_2(a-b)+v_2(a+b)+v_2(n)-1\)。`, ['lte', 'lifting exponent', '指数提升']),
], tex`\begin{aligned}v_p(ab)&=v_p(a)+v_p(b),\\v_p(\gcd(a,b))&=\min(v_p(a),v_p(b)),\\v_p(\operatorname{lcm}(a,b))&=\max(v_p(a),v_p(b)).\end{aligned}`);
define(['Residue classes', 'Divisibility and residues'], '只关心除以 m 后的余数时，相差 m 的倍数的数可以当成同一个数，庞大的整数运算就缩成有限几类。', '同余可加、减、乘；除法需要逆元或额外条件。', ['mod', 'modular', '同余', '剩余', '余数', '整除'], [
  extension('safe-cancellation', '同余中的约分', 'Cancellation in congruences', '约掉与模数有公因子的数时，模数也必须缩小。', tex`ax\equiv ay\pmod m\iff x\equiv y\pmod{\frac m{\gcd(a,m)}}`, tex`\(2x\equiv2\pmod6\) 给出 \(x\equiv1\pmod3\)，而不是模 6 只有一解。`, '默认 m 为正整数；若 a 与 m 互质，才能保持原模数约分。'),
]);
define('Quadratic residues', '平方并不是每种余数都能得到；先列出平方可能落入的余数类，就能排除许多整数方程。', '先列平方剩余，再与目标余数比较。', ['quadratic residues', '平方剩余', '二次剩余', '模四', '模八'], [
  extension('small-residue-table', '常用平方余数表', 'Useful square residues', '小模数的平方限制往往比高深定理更省力。', tex`\begin{array}{c|c}m&x^2\bmod m\\\hline3&0,1\\4&0,1\\8&0,1,4\\16&0,1,4,9\end{array}`, '奇数的平方模 8 恒为 1。', '模多个数都无矛盾，只说明还没排除，不能证明有整数解。'),
  extension('euler-criterion', '欧拉判别准则（提高）', "Euler's criterion", '奇素数模数下，可用一个幂判断非零余数是否为平方。', tex`a^{\frac{p-1}{2}}\equiv\begin{cases}1& a\text{ is a quadratic residue},\\-1& a\text{ is a nonresidue}\end{cases}\pmod p`, '', '要求 p 为奇素数且 p 不整除 a；这与一般模数的欧拉定理是不同结论。', ['euler criterion', '勒让德符号', '欧拉判别']),
]);
define('Fermat’s little theorem', '在素数模数下，乘一个非零数只会把非零余数重新排列；把全部余数的乘积约掉，就得到指数 p−1 时回到 1。', 'p 必须是素数；a 不被 p 整除时才可用 p−1 缩减指数。', ['fermat', '费马', '小定理', '费马小定理', '幂取模'], fermatExtensions);
define('Modular inverses', '模逆元是模运算里的“倒数”：乘上它后，结果余 1，因此可以合法完成除法。', 'a 模 m 可逆，当且仅当 gcd(a,m)=1。', ['inverse', '逆元', '模除法', 'modular inverse'], [
  extension('inverse-methods', '求逆元的两种方法', 'Computing inverses', '一般模数用扩展欧几里得；素数模数也可用费马小定理。', tex`ax+my=1\Rightarrow a^{-1}\equiv x\pmod m;\qquad a^{-1}\equiv a^{p-2}\pmod p\quad(p\nmid a)`, tex`\(3^{-1}\equiv5\pmod7\)，因为 3·5=15 余 1。`),
  extension('wilson', '威尔逊定理', "Wilson's theorem", '素数模数下，把每个非零余数与它的逆元配对，只剩 1 和 −1 没有不同的伙伴。', tex`p\text{ prime}\iff(p-1)!\equiv-1\pmod p\quad(p>1)`, tex`奇素数下，自逆元满足 \(x^2\equiv1\pmod p\)，所以只有 1、−1；p=2 直接检查。`, '这是素数的等价判据，但直接计算阶乘通常不是高效素性测试。', ['wilson', '威尔逊', '阶乘同余']),
], tex`a^{-1}\pmod m\text{ exists}\iff\gcd(a,m)=1`);
define('Factor into integer divisors', '整数乘积等于一个固定整数时，每个因子都只能从有限的因子表中选，方程就变成有限枚举。', '先变成 AB=N，再按整除、符号与奇偶筛选因子对。', ['diophantine', '丢番图', '整数方程', '因子对'], [
  extension('simon-factoring', 'SFFT：补乘积', "Simon's favorite factoring trick", 'xy、x、y 同时出现时，补一个常数就能变成两个一次式的乘积。', tex`xy+ax+by=c\iff(x+b)(y+a)=ab+c`, tex`\(xy+x+y=5\iff(x+1)(y+1)=6\)。`, '补进去的常数两边都要处理；x、y 的正性会限制可选因子。', ['sfft', 'simon', '补乘积']),
]);
define('Bounding', '整数彼此隔开；如果把未知整数夹进一个很窄的区间，它就只能取少数几个值，甚至一个都没有。', '利用整数间隔，把不等式转成有限候选。', ['bounding', '界', '整数夹逼', 'consecutive squares'], [
  extension('consecutive-squares', '夹在相邻平方之间', 'Between consecutive squares', '相邻平方之间没有别的整数平方；估计出这个区间即可否定完全平方。', tex`n^2<N<(n+1)^2\ \Longrightarrow\ N\text{ is not a square}`, '', '必须严格在内部；端点本身是平方。'),
]);
define('Congruence obstructions', '整数等式若成立，取任何模数后也必须成立；找一个无法满足的余数条件，就足以推翻所有候选。', '一个同余矛盾就足够；没有矛盾不等于有解。', ['modular obstruction', '同余障碍', '无整数解'], [
  extension('parity-descent', '从同余到递降', 'From congruences to descent', '如果余数限制迫使所有变量都有公因子，除去它后可能又得到同一类方程，从而无限递降。', tex`x^2+y^2\equiv0\pmod4\ \Longrightarrow\ 2\mid x,\ 2\mid y`, '', '只有除去公因子后仍保持原结构，并严格变小，才形成递降。'),
]);
define('Infinite descent', '假设有解，选一个最小的正整数解；若又能从它造出更小的合法解，就与“最小”矛盾。', '新解要保持整数性、全部约束，并严格缩小正整数指标。', ['descent', '递降', '最小反例', '无穷递降'], [
  extension('sqrt-two', '最简分数中的递降', 'Descent via coprimality', '选择约成最简的整数表示后，如果方程又迫使分子分母共享因子，便产生矛盾。', tex`a^2=2b^2\Rightarrow2\mid a\Rightarrow2\mid b`, '若 a、b 互质且 b>0，上式不可能成立，所以根号 2 不是有理数。', '必须先约成最简或明确最小性，否则“双方都是偶数”本身并不矛盾。'),
]);

define('Linear combinations', '把两个等式按合适倍数加减，可以让不想要的变量消失，只留下目标信息。', '选择系数消元，保留原方程可能出现的特殊分支。', ['linear combination', '线性组合', '消元', 'elimination'], [
  extension('symmetric-elimination', '对称消元', 'Symmetric elimination', '多条循环方程先求总和、作差，常能一次得到和或变量之间的相等关系。', tex`x+y=A,\ y+z=B,\ z+x=C\ \Longrightarrow\ x=\frac{A+C-B}{2}`, '', '若变量为整数，分子还必须是偶数。'),
]);
define('Roots of unity', '单位根就是在复平面上均匀分布、绕若干圈后回到 1 的数；幂次因此按固定周期重复。', tex`n 次单位根满足 \(z^n=1\)；求和可利用等比结构与对称。`, ['roots unity', '单位根', '复数', 'complex', '周期'], [
  extension('root-filter', '单位根筛（提高）', 'Roots-of-unity filter', '把所有单位根的同一次幂相加，只有指数被 n 整除时留下 n，其余全部相消。', tex`\zeta=e^{\frac{2\pi i}{n}},\qquad\sum_{j=0}^{n-1}\zeta^{jk}=\begin{cases}n&n\mid k,\\0&n\nmid k.\end{cases}`, '可从多项式系数中筛出指标落在某个余数类的项。', 'ζ 必须是本原 n 次单位根，k 为整数。'),
  extension('complex-euler', '复指数与欧拉公式', "Euler's formula", '复数乘法的旋转可以用指数统一表达。此处欧拉公式与数论里的欧拉定理不同。', tex`e^{i\theta}=\cos\theta+i\sin\theta,\qquad(\cos\theta+i\sin\theta)^n=\cos(n\theta)+i\sin(n\theta)`, '', '角以弧度计；数论的 φ(m) 定理属于另一个知识点。', ['de moivre', '棣莫弗', '复数欧拉公式']),
]);
define('Arithmetic and geometric sequences', '等差数列每步加同一个数，等比数列每步乘同一个数；求和公式分别来自首尾配对与错位相减。', '先看相邻差和相邻比，再核对首项、项数与公比是否为 1。', ['arithmetic sequence', 'geometric series', '等差', '等比', '数列求和'], [
  extension('weighted-geometric', '差比数列求和', 'Weighted geometric sums', '下标乘幂的和，可整体乘公比后错位相减，把线性系数降成常数。', tex`\sum_{k=1}^n kr^{k-1}=\frac{1-(n+1)r^n+nr^{n+1}}{(1-r)^2}\quad(r\ne1)`, '', 'r=1 时单独使用 1+⋯+n；也可以对有限等比和逐项求导。'),
]);
define('Finite differences', '离散数据没有无限小步长，但可以比较相邻差；多项式每作一次差，次数就降低一次。', '等间距取样的 d 次多项式，其 d 阶差为常数。', ['finite difference', '差分', '数列', 'newton interpolation'], [
  extension('newton-differences', '牛顿差分展开', 'Newton forward differences', '已知各阶首差，可用二项式系数作基底恢复多项式数列。', tex`f(n)=\sum_{k=0}^d\binom nk\Delta^k f(0)\quad(\deg f\le d)`, '', '仅凭有限几个数差分规律，不能证明原数列必然来自该多项式。'),
]);
define('Index pairing', '求和不变但次序可以换；把第 k 项与倒数第 k 项配在一起，复杂变化可能变成一个常数。', '先写变换后的指标与边界，再配对。', ['index pairing', '首尾配对', '求和对称', '换指标'], [
  extension('sum-symmetry', '求和反射', 'Reflection in a finite sum', '正序与倒序是同一和，二者相加后可以出现逐项恒等。', tex`2\sum_{k=0}^n f(k)=\sum_{k=0}^n\big(f(k)+f(n-k)\big)`, '', '配完后记得除以 2；奇数项数的中间项也在两次求和中各出现一次。'),
]);
define('Differentiation rules', '导数衡量局部变化率；复合函数的变化要经过两层传递，所以把每层变化率相乘。', '链式法则必须乘内层导数。', ['derivative', '求导', 'chain rule', '链式法则', 'product rule'], [
  extension('product-quotient', '乘积、商与隐函数', 'Product, quotient and implicit differentiation', '乘积两部分各贡献一次变化；隐函数里 y 的变化也要乘上它对 x 的导数。', tex`(uv)'=u'v+uv',\quad\left(\frac uv\right)'=\frac{u'v-uv'}{v^2}\ (v\ne0)`, tex`\(x^2+y^2=1\Rightarrow 2x+2yy'=0\)，当 y≠0 时 \(y'=-\frac xy\)。`, '隐函数斜率公式分母为零时应重新判断，可能存在竖直切线。'),
]);
define('Monotonicity and optimisation', '导数的正负说明曲线局部向上还是向下；最值可能发生在上升下降的交界，也可能在区间端点。', '候选包括驻点、不可导点与允许的边界，再比较函数值。', ['optimisation', 'optimization', '最值', '单调', 'stationary'], [
  extension('second-derivative', '二阶导数与凸性', 'Second derivatives and convexity', '二阶导数说明斜率如何改变；正二阶导数使曲线向上弯，并在驻点处给出局部极小。', tex`f'(c)=0,\ f''(c)>0\Rightarrow c\text{ is a strict local minimum}`, '', 'f″(c)=0 时不能据此判断；区间全局最值还需检查端点与其他候选。'),
]);
define('Tangency and repeated roots', '两条曲线相切时，不仅高度相同，一阶变化率也相同；多项式相减便出现至少二重的零点。', '先同时解函数值相等与导数相等，再核对切点定义域。', ['tangency', '相切', '重根', 'discriminant', '判别式'], [
  extension('discriminant', '二次判别式与相切', 'Discriminants and tangency', '直线代入圆或抛物线后得到二次方程；两个交点合并成一个，正好对应判别式为零。', tex`Ax^2+Bx+C=0,\ A\ne0:\qquad\Delta=B^2-4AC=0`, '', '先确认代入后确实是非退化二次方程；一般高次曲线可能还存在其他交点。'),
]);
define('Limits and dominant terms', '极限关心的是越来越接近时哪个部分真正支配大小；把共同的主导量提出来，剩余项通常趋向简单值。', '先看定义域与主导阶；等价替换必须保留会抵消的下一阶。', ['limit', '极限', '主项', 'dominant', 'lhopital'], [
  extension('standard-limits', '基本等价与泰勒首项', 'Standard local equivalents', '在零附近，正弦、指数和对数的首个非零项提供最常用的比较尺度。', tex`\sin x\sim x,\quad e^x-1\sim x,\quad\log(1+x)\sim x\quad(x\to0)`, '', '正弦用弧度；相减抵消时不能只保留相同首项，需继续展开。'),
  extension('lhopital', '洛必达法则', "L'Hôpital's rule", '只有零比零或无穷比无穷的未定式，且满足可导等条件时，才可用导数之比求极限。', tex`\lim_{x\to c}\frac{f(x)}{g(x)}=\lim_{x\to c}\frac{f'(x)}{g'(x)}`, '', '需在去心邻域可导、g′不为零，原式是上述未定式，且导数比的极限存在（可为无穷）。不能对任意分式逐项求导。', ['lhopital', '洛必达']),
]);
define('integrals-series::Substitution', '积分换元是把一串复合变化改用中间变量描述；内层导数正好把原来的小长度换成新变量的小长度。', '先配出 du=g′(x)dx；定积分要同步换上下限。', ['integration substitution', '积分换元', 'u substitution'], [
  extension('trig-substitution', '三角换元', 'Trigonometric substitutions', '根号中的平方和差常能借三角恒等式消掉。', tex`\sqrt{a^2-x^2}:\ x=a\sin t;\qquad\sqrt{a^2+x^2}:\ x=a\tan t\quad(a>0)`, '', '为开平方要选好角度区间，保留绝对值与原变量范围。'),
  extension('integral-symmetry', '积分区间的反射对称', 'Symmetry of definite integrals', '换元 x=a+b−t 使区间翻转，可把 f(x) 与镜像项配对。', tex`\int_a^b f(x)\,dx=\int_a^b f(a+b-x)\,dx`, tex`若 \(f(x)+f(a+b-x)=C\)，则积分为 \(\frac{C(b-a)}2\)。`, '需要积分存在；换元后负号与上下限反转要一起处理。'),
]);
define('Integration by parts', '乘积求导会产生两项，反过来积分时，就可以把难积分的一项换成另一项。', '让被求导部分更简单，让被积分部分确实可积。', ['integration by parts', '分部积分', 'product integration'], [
  extension('repeated-parts', '重复分部与递推积分', 'Repeated integration by parts', '多项式乘指数或三角函数时，反复求导让多项式降次；含幂积分常可把次数降 2。', tex`I_n=\int_0^{\frac\pi2}\sin^n x\,dx=\frac{n-1}{n}I_{n-2}\quad(n\ge2)`, tex`\(I_0=\frac\pi2\)，\(I_1=1\)。`, '递推只在给定区间和初始值下成立；定积分的边界项不能省略。'),
]);
define('Piecewise integration and bounds', '积分会把整个区间的贡献加起来；公式或符号在哪变，就在哪切开算，或者用更简单的上下界夹住总贡献。', '绝对值、分段点和不可积点要先识别。', ['piecewise', '分段积分', '绝对值', '积分夹逼', 'bounds'], [
  extension('integral-comparison', '积分比较与和式估计', 'Integral comparison for sums', '单调函数的图像与单位宽矩形可以互相夹住，从而估计有限和或级数。', tex`\int_1^{n+1}f(x)\,dx\le\sum_{k=1}^n f(k)\le f(1)+\int_1^n f(x)\,dx`, '公式要求 f 在 [1,n+1] 非负且单调不增。', '单调方向变了，矩形比较方向也要重新画图判断。'),
]);
define('Series and convergence', '无穷级数不是把无穷多项随意相加，而是看有限部分和是否逼近一个确定值。', '先判收敛，再做求和、换序或逐项运算。', ['series', '级数', 'convergence', '收敛', 'taylor', '幂级数'], [
  extension('convergence-tests', '常用收敛判别', 'Basic convergence tests', '正项级数先比较熟悉级数，指数或阶乘尝试比值判别；交错项可检查绝对值单调趋零。', tex`\sum_{n=1}^\infty\frac1{n^p}\text{ converges}\iff p>1;\qquad L=\lim\left|\frac{a_{n+1}}{a_n}\right|<1\Rightarrow\sum a_n\text{ converges absolutely}`, '', '比值极限为 1 时没有结论；通项趋零只是必要条件。'),
  extension('taylor', '常用 Taylor 展开', 'Taylor series', '用各阶导数确定局部多项式，再判断余项是否足够小或无穷展开是否有效。', tex`e^x=\sum_{n=0}^{\infty}\frac{x^n}{n!},\qquad\log(1+x)=\sum_{n=1}^{\infty}\frac{(-1)^{n+1}x^n}{n}\quad(|x|<1)`, '指数级数对所有实数 x 收敛；对数级数端点需单独判断。', '函数光滑不自动等于自己的 Taylor 级数；逐项微分积分也需在有效区间内。'),
]);
define('Counting with restrictions', '先数无约束的对象，再根据“不相邻、至少一次、不能重复”等限制，选择插空、补集、容斥或状态分类。', '先明确每个对象是否等可能，以及是否被重复计数。', ['counting', '计数', '组合数', '排列', 'restrictions'], [
  extension('binomial-identities', 'Pascal 与 Vandermonde 恒等式', 'Pascal and Vandermonde identities', '按是否选入固定元素分类得到 Pascal；按从第一组取了几人分类得到 Vandermonde。', tex`\binom nk=\binom{n-1}k+\binom{n-1}{k-1},\qquad\sum_j\binom rj\binom s{k-j}=\binom{r+s}k`, '', '不可实现的下标按零计；两组成员互不重叠。'),
  ...profiles.get('Complement & inclusion–exclusion').extensions,
]);
define('Conditional and complementary probability', '条件概率是把样本空间缩到已经知道会发生的事件里；补事件则把难求的“至少一个”换成容易求的“一个都没有”。', '条件化后重新计算分母；互斥与独立是不同性质。', ['conditional probability', '条件概率', 'bayes', '贝叶斯', '补事件', '独立'], [
  extension('bayes', '全概率与 Bayes', "Total probability and Bayes' theorem", '先按互斥且穷尽的原因分组算结果，再把结果反过来用于判断原因。', tex`P(B)=\sum_iP(B\mid A_i)P(A_i),\qquad P(A_j\mid B)=\frac{P(B\mid A_j)P(A_j)}{P(B)}`, '', 'A_i 构成样本空间划分，条件概率需有正的条件概率分母，且 P(B)>0。', ['bayes', '贝叶斯', '全概率']),
  extension('independence', '独立与重复试验', 'Independent trials', '独立意味着得知一件事不会改变另一件事的概率；只有有依据时才能相乘。', tex`P(A\cap B)=P(A)P(B)`, '独立投掷 n 次硬币，至少一次正面的概率为 1−2 的负 n 次幂。', '“事件不同”或“先后发生”都不能作为独立的理由。'),
]);
define('Linearity of expectation', '把总数拆成每个小对象是否贡献一次，再把这些贡献的平均值加起来；即使它们有关联，也可以这样算。', '期望可相加，不需要独立。', ['expectation', '期望', 'indicator', '指示变量', '概率计数'], [
  extension('indicators', '指示变量', 'Indicator variables', '一个事件发生记为 1，否则记为 0；它的期望恰好就是事件发生的概率。', tex`X=\sum_i\mathbf1_{A_i}\ \Longrightarrow\ \mathbb E[X]=\sum_iP(A_i)`, '随机排列 n 个元素，固定点期望为 n·(1/n)=1；各位置是否固定并不独立。'),
  extension('variance', '方差与协方差', 'Variance and covariance', '期望只说明中心；方差说明波动。方差相加时，关联项不能自动忽略。', tex`\operatorname{Var}\!\left(\sum_iX_i\right)=\sum_i\operatorname{Var}(X_i)+2\sum_{i<j}\operatorname{Cov}(X_i,X_j)`, '', '独立可使协方差为零，但“协方差为零”本身一般不推出独立。', ['variance', '方差', '协方差']),
]);
define('Pigeonhole principle and invariants', '把对象分组可以找到重复或拥挤；把操作前后不变的量找出来，则可以排除不可能的终点。', '抽屉要数清盒子；不变量要检查每种操作。', ['pigeonhole', '抽屉', 'invariant', '不变量'], [
  ...profiles.get('Extremal choice & pigeonholes').extensions,
  ...profiles.get('Invariants').extensions,
]);
define('Pythagoras and integer triangles', '直角三角形把两条垂直方向的长度合成斜边；勾股关系同时也是坐标距离公式的来源。', '只有直角三角形才能用两直角边平方和等于斜边平方。', ['pythagoras', '勾股', '整数直角三角形', 'pythagorean triples'], [
  extension('pythagorean-triples', '本原勾股数', 'Primitive Pythagorean triples', '互质整数直角三角形的一条直角边为偶数，另外两边为奇数，可用两个参数完整表示。', tex`a=m^2-n^2,\quad b=2mn,\quad c=m^2+n^2`, '取 m>n≥1、gcd(m,n)=1，且 m、n 一奇一偶；再乘共同正整数得到一般勾股数。', '可能交换 a、b；不满足互质和异奇偶的参数会生成非本原三元组。'),
]);
define('Circle angles, arcs and areas', '弧度把角定义为“弧长除半径”，所以弧长是半径乘角，扇形面积按整圆比例分配。', tex`公式 \(l=r\theta\)、\(A=\frac12r^2\theta\) 中 θ 必须用弧度。`, ['circle', '圆周角', 'arc', '弧度', '扇形'], [
  extension('chord-segment', '弦长与弓形面积', 'Chords and circular segments', '连接两端点与圆心得到等腰三角形；弓形面积等于扇形减去这个三角形。', tex`c=2r\sin\frac\theta2,\qquad A_{\rm segment}=\frac{r^2}{2}(\theta-\sin\theta)\quad(0\le\theta\le\pi)`, '', '此处表示小弓形；大弓形应从整圆面积扣除小弓形。'),
]);
define('Circle equations', '到固定点的距离保持同一个值，就是圆；平方距离展开后成为熟悉的二次方程。', '先配方找圆心和半径，再判断是否是真实非退化圆。', ['circle equation', '圆方程', '配方', '圆心', '半径'], [
  extension('circle-subtraction', '两圆相减与公共弦', 'Subtracting circle equations', tex`两个圆方程都有 \(x^2+y^2\)，相减后得到一次方程，所有公共点都在这条线上。`, tex`x^2+y^2+D_ix+E_iy+F_i=0\quad(i=1,2)`, tex`相减得到 \((D_1-D_2)x+(E_1-E_2)y+F_1-F_2=0\)，再与一个圆联立。`, '同心圆相减可能没有直线；一条根轴也不保证两圆真的相交。'),
]);
define('Lattice geometry', '格点把连续的面积与离散的点数联系起来；Pick 定理用内部点和边界点计出整块多边形的面积。', '简单格点多边形：面积=内部点数+边界点数的一半−1。', ['lattice', '格点', 'pick', '皮克', '边界点'], [
  extension('lattice-boundary', '线段上的格点数', 'Lattice points on a segment', '两端坐标之差的最大公因数，决定这条边能均匀分成多少个最小格点步。', tex`\#\text{points on segment}=\gcd(|\Delta x|,|\Delta y|)+1`, '求多边形总边界点数时，每边只计一端，故 B 等于各边 gcd 之和。', 'Pick 标准形式针对不自交、无孔的格点多边形；曲边和非整数顶点不能直接套用。'),
]);

define('guts::Official format', 'Guts 的关键是按批次提交：当前批次交出后才继续下一批，所以解题与提交节奏会互相影响。', '按页面注明的年份核对官方规则，再决定提交和推进方式。', ['guts rules', 'guts 规则', '赛制', 'format']);
define('Parallel assignment', '把可以独立思考的题分给不同队员，团队才能真正同时推进，而不是所有人堵在同一题上。', '每题明确负责人；保留少量交叉复核。', ['parallel', '分工', '团队', '协作']);
define('Submission checkpoints', '提交前用很短的清单找最容易损失分数的错误，比重新算一遍更高效。', '核对题号、答案形式、单位、符号与边界，再提交。', ['submission', '提交', '检查', '单位']);
define('Time allocation', '团队时间有限，应把下一分钟花在最可能增加得分的地方，并定时重新评估。', '给卡题设回看时间，让可完成的题持续推进。', ['time', '时间分配', 'guts strategy', '策略']);
define('power::Official format', 'Power 更接近共同完成一份有上下文的证明题：先理解新定义，再把小结论连接成后续结论。', '先读共同定义，再按题目依赖组织证明。', ['power rules', 'power 规则', '赛制', 'proof']);
define('Definition and dependency map', '先把新对象是什么意思、结论依赖什么画清楚，就知道哪些工作可并行、哪些必须等待。', '每个符号有定义，每个后续结论有可追溯的前置结果。', ['dependency', '定义', '依赖', '证明地图']);
define('Proof ownership and review', '多人合作写证明时，每一段需要有人负责逻辑完整，另一个人负责找缺口和反例。', '分工按结论划分；交接时写清可用假设与已证内容。', ['proof review', '证明', '复核', '交接']);
define('Points and dependencies', '一道题的价值不只在本题分数，也在于它能否解锁后面的多个问题。', '优先完成可解、得分明确、又能解锁后续的结论。', ['points', '分值', '依赖', 'power strategy']);

export function applyKnowledgeDepth(collections) {
  for (const collection of collections.filter((item) => !item.scaffold)) {
    for (const topic of collection.subjects.flatMap((subject) => subject.topics)) {
      for (const item of topic.bullets) {
        const profile = profiles.get(`${topic.id}::${item.name}`) || profiles.get(item.name);
        if (!profile && !item.explanation) throw new Error(`Missing explanation: ${collection.id}/${topic.id}/${item.name}`);
        if (profile) Object.assign(item, profile);
        item.keywords = [...new Set([item.nameZh, item.name, ...item.keywords])];
        item.extensions ||= [];
      }
      topic.keywords = [...new Set(topic.bullets.flatMap((item) => item.keywords))];
    }
  }
  return collections;
}
