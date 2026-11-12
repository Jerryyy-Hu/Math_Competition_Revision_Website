/** Official BMO problems, independently restated, with original worked solutions. */
const tex = String.raw;
const paper = (year, fileYear, number, title, question, hint, solution, round = 'BMO1') => ({
  id: `${round.toLowerCase()}-${year}-q${number}`,
  title, question, hint, solution, proof: true,
  source: {
    competition: 'BMO', round, year, question: `Q${number}`, restated: true,
    url: `https://bmos.ukmt.org.uk/home/${round.toLowerCase()}-${fileYear}.pdf`,
  },
});

const primeFactors = paper(2006, 2007, 1, 'Four small prime divisors',
  tex`Identify four primes below \(100\) that divide \(3^{32}-2^{32}\). Justify each divisibility.`,
  '连续使用平方差，直到出现可以直接分解的小因子。', [
    tex`Repeated difference-of-squares factorisation gives factors \(3+2=5\), \(3^2+2^2=13\), \(3^4+2^4=97\), and \(3^8+2^8=6817=17\cdot401\). Each is a factor of \(3^{32}-2^{32}\).`,
    tex`Consequently \(5,13,17,97\) are four required divisors. They are prime: trial division by primes up to their respective square roots verifies this.`,
  ]);

const fourthPowers = paper(2007, 2008, 1, 'A fourth-power quotient',
  tex`Evaluate exactly \[\frac{1^4+2007^4+2008^4}{1^2+2007^2+2008^2}.\]`,
  '注意第三个数是前两个数之和；先对一般的三个数建立恒等式。', [
    tex`For \(c=a+b\), expansion gives \[a^4+b^4+c^4=2(a^2+ab+b^2)^2,\qquad a^2+b^2+c^2=2(a^2+ab+b^2).\]`,
    tex`Taking \(a=1\) and \(b=2007\), the quotient is \(1+2007+2007^2=4\,030\,057\).`,
  ]);

const heronBound = paper(2006, 2007, 5, 'A product bounded by squares',
  tex`For \(a,b,c>0\), establish \[(a^2+b^2)^2\ge(a+b+c)(a+b-c)(b+c-a)(c+a-b).\]`,
  '把右边先写成两个平方差，目标会变成两个非负平方的和。', [
    tex`Write \(H\) for the product on the right. Pairing its factors gives \[H=((a+b)^2-c^2)(c^2-(a-b)^2)=4a^2b^2-(a^2+b^2-c^2)^2.\]`,
    tex`Therefore \[(a^2+b^2)^2-H=(a^2-b^2)^2+(a^2+b^2-c^2)^2\ge0.\] This identity proves the claim even when one of the original factors is negative. Equality occurs precisely when \(a=b\) and \(c=\sqrt2\,a\).`,
  ]);

const rootBounds = paper(1995, 1995, 3, 'Locate three roots',
  tex`Real numbers \(a<b<c\) satisfy \(a+b+c=6\) and \(ab+bc+ca=9\). Prove \(0<a<1<b<3<c<4\).`,
  '考虑以这三个数为根的三次多项式，比较它在 0、1、3、4 处的符号。', [
    tex`For any one of the numbers \(t\), let \(u,v\) be the other two. The hypotheses imply \((u-v)^2=3t(4-t)>0\). Thus all three numbers lie strictly between \(0\) and \(4\).`,
    tex`Set \(P(x)=(x-a)(x-b)(x-c)=x(x-3)^2-abc\). We have \(P(0)=P(3)=-abc<0\), while \(P(1)=P(4)>0\), the latter because all roots are below \(4\).`,
    tex`The intermediate value theorem produces one root in each of \((0,1)\), \((1,3)\), and \((3,4)\). A cubic has at most three distinct roots; their order identifies these roots as \(a,b,c\).`,
  ], 'BMO2');

const polynomialCount = paper(1997, 1997, 3, 'A quadratic factor',
  tex`How many degree-five polynomials with six distinct coefficients chosen from \(\{1,\ldots,8\}\) have \(x^2-x+1\) as a factor?`,
  '先计算每个幂除以二次式的余式；再把系数条件理解为三组互不相交、差相同的数对。', [
    tex`Write \(P(x)=\sum_{i=0}^5 a_i x^i\). Modulo \(x^2-x+1\), the powers \(x^2,x^3,x^4,x^5\) become \(x-1,-1,-x,1-x\). The remainder vanishes exactly when \[a_0-a_3=a_2-a_5=a_4-a_1=d.\] Distinct coefficients force \(d\ne0\).`,
    tex`For \(d>0\), choose three disjoint edges from the graph on \(1,\ldots,8\) joining numbers whose difference is \(d\). The numbers of three-edge matchings for \(d=1,2,3,4,5,6,7\) are respectively \(10,6,4,4,1,0,0\).`,
    tex`To check these counts: for \(d=1\) the graph is a path with eight vertices, giving \(\binom53=10\). For \(d=2\), two four-vertex paths give the coefficient of \(t^3\) in \((1+3t+t^2)^2\), namely \(6\). For \(d=3\), use \((1+2t)^2(1+t)\), giving \(4\). For \(d\ge4\) all edges are disjoint, so use \(\binom{8-d}{3}\).`,
    tex`Assign the three edges to the three displayed differences in \(3!\) ways, and double for negative \(d\). The answer is \(2\cdot3!\cdot(10+6+4+4+1)=300\).`,
  ], 'BMO2');

const functionalEquation = paper(2009, 2010, 5, 'Associativity forces linearity',
  tex`Determine every function \(f:\mathbb R\to\mathbb R\) satisfying \(f(x)f(y)=f(x+y)+xy\) for all real \(x,y\).`,
  '用两种方式计算三个函数值的乘积，再令其中一个变量为 1。', [
    tex`Putting \(y=0\) gives \(f(x)(f(0)-1)=0\). The identically zero function fails the original equation, so \(f(0)=1\).`,
    tex`Expand \(f(x)f(y)f(z)\) by combining either the first two or the last two factors. Equality gives \[xyf(z)+(x+y)z=yzf(x)+x(y+z),\] hence \(x(f(z)-1)=z(f(x)-1)\) after setting \(y=1\).`,
    tex`Take \(z=1\). Then \(f(x)=1+cx\), where \(c=f(1)-1\). Substitution into the original equation forces \(c^2=1\). Both \(f(x)=1+x\) and \(f(x)=1-x\) satisfy it for every real pair, so these are exactly the solutions.`,
  ]);

const rationalOrbit = paper(2008, 2009, 5, 'Rational orbits that repeat',
  tex`A sequence satisfies \(a_{n+1}=2a_n^2-1\) for \(n\ge0\), with rational \(a_0\). Classify the sequences in which two terms are equal.`,
  '先限制首项的范围，再令新变量等于原变量的两倍，观察既约分母如何变化。', [
    tex`A repeated term makes the deterministic orbit eventually periodic and therefore bounded. If \(a_0>1\), then \(2a_0^2-1>a_0\), and the subsequent increasing orbit cannot repeat. If \(a_0<-1\), the next term exceeds \(1\). Thus \(-1\le a_0\le1\).`,
    tex`Put \(b_n=2a_n\); then \(b_{n+1}=b_n^2-2\). If \(b_n=\frac pq\) is in lowest terms with \(q>0\), its successor has numerator \(p^2-2q^2\) and denominator \(q^2\), still coprime. Repetition forces \(q=1\).`,
    tex`Consequently \(b_0\) is an integer in \([-2,2]\), so \(a_0\in\{-1,-\frac12,0,\frac12,1\}\). These all work: \(-1\mapsto1\mapsto1\), \(0\mapsto-1\), \(-\frac12\mapsto-\frac12\), and \(\frac12\mapsto-\frac12\). These initial values, together with the recurrence, determine all required sequences.`,
  ]);

const digitOrders = paper(2006, 2007, 3, 'One prescribed digit order',
  tex`Count permutations of the digits \(1,\ldots,9\) in which \(1,2,3,4,5\) appear in that relative order but \(1,2,3,4,5,6\) do not.`,
  '先只固定前五个数字的相对顺序，再减去六个数字也恰好有序的情况。', [
    tex`Every possible relative order of five designated digits occurs equally often, so \(\frac{9!}{5!}\) permutations place \(1,\ldots,5\) in increasing relative order.`,
    tex`Among them, exactly \(\frac{9!}{6!}\) also place \(1,\ldots,6\) in increasing relative order. Subtracting gives \(3024-504=2520\).`,
  ]);

const scoreLists = paper(2009, 2010, 3, 'Non-increasing marks',
  tex`Six integer scores, each between \(0\) and \(10\), are listed in non-increasing order. How many different score lists are possible?`,
  '记录每个分数出现几次，而不是直接枚举六个位置。', [
    tex`Let \(c_j\) be the number of scores equal to \(j\), for \(0\le j\le10\). A non-increasing list is uniquely determined by these multiplicities.`,
    tex`Thus we count non-negative integer solutions of \(c_0+\cdots+c_{10}=6\). Stars and bars gives \(\binom{16}{10}=\binom{16}{6}=8008\).`,
  ]);

const hotelRooms = paper(2014, 2015, 3, 'Seven non-adjacent rooms',
  tex`A corridor has ten rooms on each side. Count selections of seven rooms with no two selected rooms adjacent on the same side.`,
  '按一侧选了几间分类；一行不相邻选取可以压缩必须留下的空位。', [
    tex`Selecting \(k\) non-adjacent positions from ten gives \(\binom{11-k}{k}\): for positions \(x_1<\cdots<x_k\), replace \(x_i\) by \(x_i-(i-1)\).`,
    tex`At most five rooms can be selected per side, so one side must contain \(k=2,3,4,5\) selections. The two sides are distinguishable and independent once \(k\) is fixed.`,
    tex`The total is \[\sum_{k=2}^{5}\binom{11-k}{k}\binom{4+k}{7-k}=2\left(\binom92\binom65+\binom83\binom74\right)=4352.\]`,
  ]);

const holiday = paper(2013, 2014, 4, 'A nine-day schedule',
  tex`Each of nine days is assigned surfing, water skiing, or rest. Different water sports may not occupy consecutive days. How many schedules satisfy this rule?`,
  '按最后一天是休息还是某一种水上运动分类，保留足以决定下一天选择的状态。', [
    tex`Let \(T_n\) count valid schedules of length \(n\), and let \(R_n,S_n,W_n\) count those ending in rest, surfing, and water skiing. Symmetry gives \(S_n=W_n\), and \[R_n=T_{n-1},\quad S_n=R_{n-1}+S_{n-1}.\]`,
    tex`For \(n\ge2\), these imply \(T_n=2T_{n-1}+T_{n-2}\), with \(T_0=1\) and \(T_1=3\).`,
    tex`The successive totals are \(1,3,7,17,41,99,239,577,1393,3363\). Therefore there are \(3363\) schedules.`,
  ]);

const bags = paper(2011, 2012, 4, 'Emptying two bags',
  tex`Two bags initially contain \(m,n\) balls respectively, where \(m,n\) are positive integers. A move either removes equally many balls from both or doubles one bag's contents. Can both bags always be emptied? What if doubling is replaced by tripling?`,
  '倍增时尝试模拟辗转相减；三倍时检查两个袋子球数之差的奇偶性。', [
    tex`Doubling always works. If \(m<n\), double the first bag and then remove \(m\) balls from each, obtaining \((m,n-m)\). This keeps both entries positive and decreases their sum. Use the symmetric operation when \(n<m\).`,
    tex`The positive integer sum cannot decrease indefinitely. Eventually the entries are equal; remove all balls from both bags.`,
    tex`With tripling, it need not work. Start from \((1,2)\). Removing equal numbers preserves the parity of the difference, and replacing one entry \(x\) by \(3x\) changes the difference by an even integer. The difference therefore remains odd, whereas the target \((0,0)\) has even difference.`,
  ]);

const redParity = paper(2010, 2011, 4, 'Even and odd red counts',
  tex`Each cell of an \(8\times8\) board receives a red, white, or blue counter. Are there more colourings with an even red count or with an odd red count?`,
  '给格子固定顺序，尝试找到一个可逆的局部换色操作；注意唯一不能操作的情形。', [
    tex`Fix an ordering of the \(64\) cells. In every colouring other than the all-blue colouring, locate the first non-blue counter and swap red with white there.`,
    tex`This operation is its own inverse and changes the parity of the red count. It pairs every such even-red colouring with exactly one odd-red colouring.`,
    tex`The all-blue colouring is unpaired and has zero red counters. There is therefore exactly one more even-red colouring. Equivalently, the two counts are \(\frac{3^{64}+1}{2}\) and \(\frac{3^{64}-1}{2}\).`,
  ]);

const sequenceDifferences = paper(2023, 2024, 2, 'Consecutive endpoints',
  tex`An integer sequence obeys \(a_i\in\{2a_{i-1}-a_{i-2},\,2a_{i-2}-a_{i-1}\}\) for \(i\ge2\). If \(a_{2023}\) and \(a_{2024}\) are consecutive integers, prove the same of \(a_0,a_1\).`,
  '研究相邻差；每一步只能保持它或将它乘以一个固定整数。', [
    tex`Let \(d_i=a_i-a_{i-1}\) for \(i\ge1\). The two permitted rules give respectively \(d_i=d_{i-1}\) and \(d_i=-2d_{i-1}\).`,
    tex`Hence \(|d_{2024}|=2^k|d_1|\) for some non-negative integer \(k\). The left side is \(1\), while \(d_1\) is an integer. This forces \(k=0\) and \(|d_1|=1\), as required.`,
  ]);

const gridStars = paper(2002, 2003, 4, 'A grid without a right-angled triple',
  tex`In an \(m\times n\) grid of points, with \(m,n>1\), colour some points red. No three red points may form a right triangle whose legs follow grid rows and columns. Determine the largest red count.`,
  '将行、列分别作为二分图的两侧。禁止的直角三点会限制一条边两端的度数。', [
    tex`Make a bipartite graph with one vertex per row and per column, and one edge per red point. A prohibited triple exists exactly when some edge has both endpoint degrees at least \(2\).`,
    tex`Thus every nonempty connected component is a star: a path of three edges would violate that condition on its middle edge. If there are at least two components containing edges, the total edge count is at most \(m+n-2\), since a star has one fewer edge than vertices.`,
    tex`If there is just one component containing edges, it is one star and has at most \(\max(m,n)\le m+n-2\) edges.`,
    tex`For equality, colour the points in row \(1\) except column \(1\), and those in column \(1\) except row \(1\). These form two disjoint stars and give \(m+n-2\) red points without a prohibited triple.`,
  ]);

const divisibilityCycles = paper(2024, 2025, 1, 'Divisibility around a circle',
  tex`For which \(3\le n\le12\) can \(n\) distinct positive integers be placed around a circle so that two are comparable by divisibility exactly when they are neighbours?`,
  '把整除关系定向。若出现连续两条同向边，传递性会与非相邻点的限制冲突。', [
    tex`For \(n\ge4\), orient each edge from divisor to multiple. A directed two-edge path would make its endpoints comparable, although they are not neighbours. Each vertex must therefore have both arrows entering or both leaving; these types alternate, forcing \(n\) to be even.`,
    tex`For \(n=3\), use \(1,2,4\). For \(n=4\), use the cyclic order \(2,12,3,18\). All neighbour pairs are comparable and both non-neighbour pairs are incomparable.`,
    tex`For \(n=2k\ge6\), take distinct primes \(p_1,\ldots,p_k\) and alternate \(p_i\) with \(p_i p_{i+1}\), using cyclic indices. A prime divides exactly the two adjacent products; the products are distinct and pairwise incomparable. The answers are \(3,4,6,8,10,12\).`,
  ]);

const endCards = paper(2003, 2004, 3, 'Choosing cards from the ends',
  tex`A row contains \(2n\) visible cards with positive integer values. Alice and Barbara alternately take an end card, Alice first. Prove Alice can ensure that her total is at least Barbara's.`,
  '先比较原位置为奇数和偶数的两组牌之和；Alice 能否始终拿到指定的一组？', [
    tex`Number the original positions \(1,\ldots,2n\). At least one of the odd-position and even-position totals is at least half the overall total. Alice commits to that parity.`,
    tex`Before every Alice turn, the remaining row has even length, so its endpoints have opposite original parities. She takes the endpoint of her chosen parity. The remaining odd-length row has two endpoints of the other parity, so Barbara must take that other parity.`,
    tex`Induction shows Alice receives exactly all cards of her chosen parity. Her total is at least half the overall total and hence at least Barbara's.`,
  ]);

const separatedPermutation = paper(2011, 2012, 2, 'Large gaps in a permutation',
  tex`For \(n\ge2\), rearrange \(1,\ldots,n\) so that every adjacent difference in absolute value is at least \(t\). Determine the greatest achievable integer \(t\).`,
  '用中间大小的数给出上界，再将较小的一半与较大的一半交替排列。', [
    tex`Write \(k=\lfloor\frac n2\rfloor\). If \(n=2k\), the number \(k\) differs from every other number by at most \(k\). If \(n=2k+1\), use \(k+1\) instead. This number has a neighbour in any arrangement, so \(t\le k\).`,
    tex`For \(n=2k\), the order \(k,2k,k-1,2k-1,\ldots,1,k+1\) has every difference at least \(k\).`,
    tex`For \(n=2k+1\), start with \(k+1\), then append the pairs \((j,k+1+j)\) for \(j=1,\ldots,k\). Its adjacent differences are \(k\) or \(k+1\). Thus the optimum is \(\lfloor\frac n2\rfloor\).`,
  ]);

const parallelFeet = paper(2013, 2014, 2, 'Two perpendicular feet',
  tex`In acute triangle \(ABC\), let \(E\) be the foot from \(B\) to \(CA\). The tangent at \(B\) to the circumcircle receives the perpendicular from \(C\) at \(F\). Prove \(EF\parallel AB\).`,
  '先把两个直角放进同一个圆，再用切线弦定理联系需要的角。', [
    tex`Both \(\angle BEC\) and \(\angle BFC\) are right angles, so \(B,E,F,C\) lie on the circle with diameter \(BC\).`,
    tex`Using directed angles modulo \(180^\circ\), cyclicity gives \(\angle CEF=\angle CBF\). The tangent–chord theorem on the original circumcircle gives \(\angle CBF=\angle CAB\).`,
    tex`Since \(CE\) is on \(CA\), the equality \(\angle CEF=\angle CAB\) says that \(EF\parallel AB\).`,
  ]);

const touchingCircles = paper(2012, 2013, 2, 'A tangent and a diameter',
  tex`Two circles touch at \(X\). A common tangent meets them at distinct points \(A,B\). If \(AP\) is a diameter of the first circle, show that \(B,X,P\) are collinear.`,
  '连接两圆圆心，利用相切关系和等腰三角形追角；也可以将共同切线放在坐标轴上。', [
    tex`The circles are externally tangent because their tangent contact points \(A,B\) are distinct. Choose coordinates \(A=(0,0)\), \(B=(d,0)\) and centres \((0,r),(d,s)\), with \(r,s>0\). Reflecting if necessary puts both centres above their common external tangent.`,
    tex`Their centre distance is \(r+s\), and the contact point divides the centre segment in the ratio \(r:s\). Hence \[X=\left(\frac{rd}{r+s},\frac{2rs}{r+s}\right),\qquad P=(0,2r).\]`,
    tex`Now \(X-B=\frac{s}{r+s}(P-B)\). This proves the three required points are collinear.`,
  ]);

const midpointArea = paper(1997, 1997, 4, 'The midpoint quadrilateral',
  tex`Join the consecutive side midpoints \(P,Q,R,S\) of a convex quadrilateral \(ABCD\). If \(PQRS\) has area \(1\), prove that \(ABCD\) has area \(2\).`,
  '用中位线把四个角上的小三角形与原来的大三角形比较面积。', [
    tex`The midpoint theorem gives \([APS]=\frac14[ABD]\), \([BPQ]=\frac14[ABC]\), \([CQR]=\frac14[BCD]\), and \([DRS]=\frac14[CDA]\), where brackets denote area.`,
    tex`The first and third large triangles together have area \([ABCD]\), as do the second and fourth. Therefore the four corner triangles have total area \(\frac12[ABCD]\).`,
    tex`The remaining region \(PQRS\) also has area \(\frac12[ABCD]\). Since this area is \(1\), the original quadrilateral has area \(2\).`,
  ]);

const parallelRatios = paper(2007, 2008, 5, 'Three parallels and a ratio product',
  tex`Let \(P\) lie inside triangle \(ABC\). Through \(P\), parallels to \(AB,BC,CA\) meet \(BC,CA,AB\) at \(L,M,N\), respectively. Prove \(\frac{BL}{LC}\frac{CM}{MA}\frac{AN}{NB}\le\frac18\), and locate equality.`,
  '用三个小三角形的面积占比表示 P，再把分母中的和用 AM–GM 估计。', [
    tex`Let \(\alpha,\beta,\gamma\) be the area fractions \(\frac{[PBC]}{[ABC]},\frac{[PCA]}{[ABC]},\frac{[PAB]}{[ABC]}\). They are positive and sum to \(1\). Similar triangles or equal-altitude area ratios give \[\frac{BL}{LC}=\frac{\gamma}{1-\gamma},\quad\frac{CM}{MA}=\frac{\alpha}{1-\alpha},\quad\frac{AN}{NB}=\frac{\beta}{1-\beta}.\]`,
    tex`AM–GM gives \((\alpha+\beta)(\beta+\gamma)(\gamma+\alpha)\ge8\alpha\beta\gamma\). Thus the required product is at most \(\frac18\).`,
    tex`Equality holds exactly when \(\alpha=\beta=\gamma=\frac13\), which means \(P\) is the centroid of \(ABC\).`,
  ]);

const rectangleProjection = paper(2003, 2004, 2, 'A projection in a rectangle',
  tex`In rectangle \(ABCD\), \(P\) is the midpoint of \(AB\), and \(Q\) is the perpendicular projection of \(C\) onto line \(PD\). Prove triangle \(BQC\) is isosceles.`,
  '把长方形两边放在坐标轴上，将 Q 写成直线 PD 上的参数点，再使用点积为零。', [
    tex`Scale and choose \(A=(0,0),B=(2,0),C=(2,h),D=(0,h)\), with \(h>0\). Then \(P=(1,0)\). Write \(Q=(1-t,ht)\).`,
    tex`Since \((C-Q)\cdot(-1,h)=0\), the projection parameter is \(t=\frac{h^2-1}{h^2+1}\). Therefore \[BQ^2=(1+t)^2+h^2t^2=\frac{4h^4+h^2(h^2-1)^2}{(h^2+1)^2}=h^2=BC^2.\]`,
    tex`Thus \(BQ=BC\), establishing the required isosceles triangle. The computation also covers projections onto an extension of segment \(PD\).`,
  ]);

const collinearFeet = paper(2010, 2011, 3, 'Three collinear intersection points',
  tex`Triangle \(ABC\) is right-angled at \(A\), and \(L\) is inside segment \(BC\). Circle \(ABL\) meets line \(AC\) again at \(M\), while circle \(CAL\) meets line \(AB\) again at \(N\). Prove \(L,M,N\) are collinear.`,
  '使用直角坐标：过原点的圆方程没有常数项，求第二个轴交点会非常简洁。', [
    tex`Take \(A=(0,0), B=(b,0), C=(0,c)\), with \(b,c>0\). Put \(L=(b(1-t),ct)\), where \(0<t<1\), and let \(K=(b^2+c^2)t-b^2\).`,
    tex`The equation of circle \(ABL\) has the form \(x^2+y^2-bx+vy=0\). Substituting \(L\) gives its second intersection with the \(y\)-axis as \(M=(0,\frac Kc)\). Similarly, circle \(CAL\) has form \(x^2+y^2+ux-cy=0\), giving \(N=(-\frac Kb,0)\).`,
    tex`All three points satisfy \(bx-cy=-K\). For \(L\), this follows from \(b^2(1-t)-c^2t=-K\); for \(M,N\), it is immediate. Hence they lie on one straight line. When \(K=0\), the second intersections coincide with \(A\) by tangency and the same line equation still proves the claim.`,
  ]);

const twinPrimes = paper(2005, 2006, 1, 'A divisibility consequence of twin primes',
  tex`An integer \(n>6\) has both \(n-1\) and \(n+1\) prime. Prove \(720\mid n^2(n^2+16)\). Does that divisibility conversely force both neighbours to be prime?`,
  '将 720 分成互素的素数幂，分别考虑模 16、9、5。', [
    tex`Both primes exceed \(5\), so \(n\) is even and divisible by \(3\): otherwise one neighbour is an even number or a multiple of \(3\) larger than that prime. Thus \(9\mid n^2\). Writing \(n=2k\) gives \(n^2(n^2+16)=16k^2(k^2+4)\).`,
    tex`Modulo \(5\), the residues \(n\equiv1,-1\) are impossible because one neighbour would be a multiple of \(5\) exceeding \(5\). If \(n\equiv0\), the factor \(n^2\) is divisible by \(5\); if \(n\equiv2,-2\), the factor \(n^2+16\) is.`,
    tex`The pairwise coprime numbers \(16,9,5\) therefore divide the product, so their product \(720\) does. The converse fails for \(n=48\): the divisibility holds by these same residue checks, but \(n+1=49\) is composite.`,
  ]);

const primeTriangle = paper(2014, 2015, 2, 'A prime in a Pythagorean triple',
  tex`Positive integers \(p,a,b\) satisfy \(p^2+a^2=b^2\), where \(p>3\) is prime. Prove \(12\mid a\) and that \(2(p+a+1)\) is a square.`,
  '平方差分解后，只能出现一组正因子；然后利用大于 3 的素数的平方模 24。', [
    tex`Since \((b-a)(b+a)=p^2\), the positive factor pair must be \((1,p^2)\). The pair \((p,p)\) would give \(a=0\). Hence \(a=\frac{p^2-1}{2}\) and \(b=\frac{p^2+1}{2}\).`,
    tex`An odd square is \(1\) modulo \(8\), and \(p\ne3\) gives \(p^2\equiv1\pmod3\). Thus \(24\mid p^2-1\), proving \(12\mid a\).`,
    tex`Finally, \(2(p+a+1)=p^2+2p+1=(p+1)^2\).`,
  ]);

const squareQuadratic = paper(2011, 2012, 1, 'A quadratic that is a square',
  tex`Find every integer \(n\) for which \(n^2+20n+11\) is a perfect square.`,
  '先配方，再用平方差；注意 n 可以为负数。', [
    tex`If \(n^2+20n+11=m^2\), with integer \(m\ge0\), then \((n+10)^2-m^2=89\). Put \(u=|n+10|\). Since \(89>0\), we have \(u>m\).`,
    tex`The positive integers \(u-m,u+m\) multiply to the prime \(89\). They must be \(1,89\), so \(u=45\) and \(m=44\).`,
    tex`Thus \(n+10=45\) or \(-45\), giving \(n=35\) or \(n=-55\). Direct substitution yields \(44^2\) in each case, proving sufficiency and completeness.`,
  ]);

const differenceFive = paper(2016, 2017, 3, 'Two squares separated by five',
  tex`Determine all positive integer pairs \((m,n)\) satisfying \(n^2-6n=m^2+m-10\).`,
  '两边同时配方；乘以 4 后，两个平方的差会成为一个很小的素数。', [
    tex`Completing squares gives \[(2m+1)^2-[2(n-3)]^2=5.\] Set \(u=2m+1>0\) and \(v=2(n-3)\). Since \(u^2-v^2=5>0\), both \(u-v\) and \(u+v\) are positive.`,
    tex`Their product is \(5\), so they are \(1,5\) in either order. Consequently \(u=3\), \(v=2\) or \(-2\), and \(m=1,n=4\) or \(2\).`,
    tex`Both pairs \((1,4)\) and \((1,2)\) satisfy the original equation. The factorisation exhausts every possible positive pair.`,
  ]);

const primePatterns = paper(2019, 2020, 1, 'Prime patterns and one modulus',
  tex`Find at least three primes \(p<200\) for which \(p,p+2,p+6,p+8,p+12\) are all prime. Prove there is exactly one prime \(q\) for which \(q,q+2,q+6,q+8,q+12,q+14\) are all prime.`,
  '第二问的六个偏移量模 5 覆盖了所有余数。第一问只需给出并核验三个例子。', [
    tex`The choices \(p=5,11,101\) give the prime lists \((5,7,11,13,17)\), \((11,13,17,19,23)\), and \((101,103,107,109,113)\). Primality is checked using the primes \(2,3,5,7\), since every listed number is below \(121\).`,
    tex`For the second question, the offsets \(0,2,6,8,12,14\) cover all residues modulo \(5\). At least one of the six primes must therefore equal \(5\).`,
    tex`The only positive prime possibilities are \(q=5\) or \(q=3\), coming from \(q=5\) or \(q+2=5\). The latter fails because \(q+6=9\). The former yields \(5,7,11,13,17,19\), all prime. Thus \(q=5\) is unique.`,
  ]);

/** Topic links deliberately repeat a problem only when both methods are central. */
export const bmoPastPapers = {
  'bmo/algebra/identities': [primeFactors, fourthPowers],
  'bmo/algebra/inequalities': [heronBound, parallelRatios],
  'bmo/algebra/polynomials': [rootBounds, polynomialCount],
  'bmo/algebra/sequences-functions': [functionalEquation, rationalOrbit],
  'bmo/combinatorics/counting': [digitOrders, scoreLists],
  'bmo/combinatorics/arrangements': [scoreLists, hotelRooms],
  'bmo/combinatorics/recurrence': [holiday, bags],
  'bmo/combinatorics/invariants': [redParity, sequenceDifferences],
  'bmo/combinatorics/graphs': [gridStars, divisibilityCycles],
  'bmo/combinatorics/extremal-games': [endCards, separatedPermutation],
  'bmo/geometry/angles-circles': [parallelFeet, touchingCircles],
  'bmo/geometry/similarity': [midpointArea, parallelRatios],
  'bmo/geometry/coordinates-vectors': [rectangleProjection, collinearFeet],
  'bmo/number-theory/divisibility-gcd': [twinPrimes, primeTriangle],
  'bmo/number-theory/modular-arithmetic': [twinPrimes, primePatterns],
  'bmo/number-theory/diophantine': [squareQuadratic, differenceFive],
};
