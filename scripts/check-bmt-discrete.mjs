/** Check archive completeness, navigation, official answer transcription and independent finite computations. */
import assert from 'node:assert/strict';
import { bmtDiscreteProblems as problems } from '../site/dist/bmt-discrete-problems.js';
import { collections, topicMap } from '../site/dist/library.js';
import { subjectPage, topicPage } from '../site/dist/views.js';
import { richText } from '../site/dist/math.js';

const subject = collections.find((entry) => entry.id === 'bmt').subjects.find((entry) => entry.id === 'discrete');
const preferences = { saved: [], read: [], markedTechniques: [], reviewedProblems: [] };
const official = {
  2020: [['96','3','50','82','2024','2','15','27','76','54'], ['648','313','49']],
  2021: [['18','101','13','5/84','233','93','377','10/19','5','23/24'], ['0','11','104']],
  2022: [['18','11','25/72','932','397','111/128','689/45','3010','1355','648'], ['90','31','19']],
  2023: [['171','90','1111','182','6/11','51','11/18','232','544','970'], ['40/343','41','7']],
  2024: [['939','26400','11','44','5/81','6020','2/5','2160','81','20616'], []],
  2025: [['1/3','5','60','59/1500','2131','360','845','13328','51','1998'], ['76','663','675']],
};
const plainAnswer = (text) => text.replace(/\\frac(?:\{(\d+)\}|(\d))(?:\{(\d+)\}|(\d))/g, (_, a,b,c,d) => `${a || b}/${c || d}`).replace(/\\[()]/g, '').trim();
assert.equal(problems.length, 75);
assert.equal(subject.topics.length, 10);
assert.equal(new Set(problems.map((problem) => problem.id)).size, 75);
const index = subjectPage(collections[1], subject, preferences);
assert.equal((index.match(/data-archive-year=/g) || []).length, 6);
assert.equal((index.match(/class="archive-answer"/g) || []).length, 75);
assert(!/<details class="archive-(?:year|answer)"[^>]*\bopen\b/.test(index));
for (const [year, rounds] of Object.entries(official)) {
  for (const [round, answers] of rounds.entries()) {
    const selected = problems.filter((problem) => problem.source.year === Number(year) && (problem.source.round === 'Discrete' ? 0 : 1) === round);
    assert.equal(selected.length, answers.length, `Complete ${year} round ${round}`);
    for (const [i, problem] of selected.entries()) {
      assert.equal(problem.source.question, `Q${i + 1}`);
      assert.equal(plainAnswer(problem.answer), answers[i], `${problem.id}: official answer`);
      assert(index.includes(`?problem=${problem.id}`));
      assert(richText(problem.answer));
      assert.equal(new URL(problem.source.url).hostname, 'berkeley.mt');
      assert.equal(new URL(problem.source.solutionUrl).hash, `#page=${problem.source.solutionPage}`);
      assert(/[\u3400-\u9fff]/u.test(problem.hint) && problem.solution.every((step) => step.length >= 20), problem.id);
    }
  }
}
assert.equal(subject.topics.flatMap((topic) => topic.exercises).length, 75);
for (const topic of subject.topics) {
  const html = topicPage(topicMap.get(`bmt/discrete/${topic.id}`), preferences, []);
  assert(topic.bullets.length >= 4 && topic.exercises.length >= 2);
  assert.equal((html.match(/class="exercise /g) || []).length, topic.exercises.length);
  for (const problem of topic.exercises) {
    assert(html.includes(`id="problem-${problem.id}"`));
    assert.equal(problem.category, topic.id);
  }
  for (const problem of topic.relatedExercises) {
    assert(problem.related.includes(topic.id) && problem.category !== topic.id);
    assert(html.includes(`?problem=${problem.id}`));
  }
}

const computed = [];
function check(name, actual, expected) { assert.deepEqual(actual, expected, name); computed.push(name); }
const gcd = (a,b) => b ? gcd(b,a%b) : a;
const count = (n,predicate,start=0) => { let result=0; for(let i=start;i<n;i++) result+=Number(predicate(i)); return result; };
const factorial = (n) => { let result=1n; for(let i=2n;i<=BigInt(n);i++) result*=i; return result; };
const choose = (n,k) => k<0 || k>n ? 0n : factorial(n)/(factorial(k)*factorial(n-k));
function* permutations(items) {
  if (!items.length) { yield []; return; }
  for(let i=0;i<items.length;i++) for(const tail of permutations(items.filter((_,j)=>j!==i))) yield [items[i],...tail];
}
const digitSum = (n) => [...String(n)].reduce((a,b)=>a+Number(b),0);
const reverse = (n) => Number([...String(n)].reverse().join(''));
const bitCount = (n) => n ? 1+bitCount(n&(n-1)) : 0;
const powerMod = (a,n,m) => { let value=1n; a=BigInt(a); n=BigInt(n); m=BigInt(m); for(;n;n>>=1n,a=a*a%m) if(n&1n)value=value*a%m; return Number(value); };
let favourable=0;
for(let a=1;a<=100;a++)for(let b=a+1;b<=100;b++)favourable+=Number(a*b%4===0);
check('2020 Q2: all unordered pairs', favourable, 2475);
let lightTotal=0;
for(let a=0;a<3;a++)for(let b=0;b<3;b++)for(let c=0;c<3;c++) lightTotal+=bitCount([3,7,6][a]^[3,7,6][b]^[3,7,6][c]);
check('2020 Q4: all switch histories',lightTotal,55);
let subsets=2n**2020n-2n**1000n, valuation=0;
while(subsets%3n===0n){valuation++;subsets/=3n;}
check('2020 Q6: exact three-adic valuation',valuation,2);
let triples=0;
for(let a=1;a<=13;a++)for(let b=1;b<=13;b++)for(let c=1;c<=13;c++)triples+=Number(a+b+c+a*b+b*c+a*c===a*b*c+1);
check('2020 Q7: all triples inside the proved bound',triples,15);
let fixed=0;
for(let x=0;x<76;x++)for(let y=0;y<76;y++)fixed+=Number((34*x+20*y)%76===0&&(20*x+14*y)%76===0);
check('2020 Q9: rational lattice representatives',fixed,76);
let imageSum=0;
for(let i=0;i<=4;i++)for(let j=0;j<=4;j++){const n=3**i*5**j;imageSum+=new Set(Array.from({length:n},(_,x)=>(x*x+x)%n)).size;}
check('2020 Q10: direct images for every requested modulus',imageSum,7**3*47);
let growth=0;
for(let code=0;code<729;code++){let n=code,frequencies=[0,0,0];for(let i=0;i<6;i++,n=Math.floor(n/3))frequencies[n%3]++;growth+=Number(frequencies[0]>=2&&frequencies[1]>=2&&frequencies[2]>=1);}
check('2020 TB2: all histories',growth,210);
check('2021 Q5: direct reversal sums',count(1000,n=>String(n+reverse(n))===[...String(n+reverse(n))].reverse().join(''),100),233);
const selfPowers=[];
for(let n=1;n<=324;n++){let remaining=n,tau=1;for(let p=2;p<=remaining;p++){let e=0;while(remaining%p===0){remaining/=p;e++;}if(e)tau*=n*e+1;}if(tau===325)selfPowers.push(n);}
check('2021 Q6: all candidates up to the divisor-count bound',selfPowers,[12,81]);
let reachable=new Set([1]),frontier=new Set([1]);
for(let depth=0;depth<12;depth++){const next=new Set();for(const n of frontier)for(const candidate of [2*n,n-1])if(candidate>=1&&!reachable.has(candidate)){reachable.add(candidate);next.add(candidate);}frontier=next;}
check('2021 Q7: reverse breadth-first search',reachable.size,377);
let numerator=0n;
for(let k=1;k<=10;k++)numerator+=factorial(k)*factorial(101-k);
check('2021 Q9: exact factorial numerator',Number(numerator%101n),5);
check('2021 TB1: direct modular scan',count(2021,n=>(n*n+1)%2020===0,1),0);
let tupleDp=[1,0,0,0,0,0,0,0];
for(let i=0;i<150;i++){const next=Array(8).fill(0);for(let a=0;a<8;a++)for(const x of i<99?[2,3,5,7,11]:[2,4,6,8])next[(a+x)%8]=(next[(a+x)%8]+tupleDp[a])%1000;tupleDp=next;}
check('2021 TB3: independent eight-state DP',tupleDp[0],104);
check('2022 Q2: every divisor candidate',new Set(Array.from({length:36},(_,i)=>2**Math.floor(i/6)*5**(i%6)).filter(n=>!String(n).includes('0'))).size,11);
let diceWins=0;
for(let a=1;a<=6;a++)for(let b=1;b<=6;b++)for(const x of [2,4])for(const y of [2,4])diceWins+=Number(a+b>x*y);
check('2022 Q3: all dice/coin outcomes',diceWins,50);
check('2022 Q4: all binary winner strings',count(1024,n=>{const s=n.toString(2).padStart(10,'0');return 1+count(10,i=>s[i]!==s[i-1],1)>3;}),932);
let quadratic=0;
for(let a=0;a<8;a++)for(let b=0;b<8;b++)for(let c=0;c<8;c++){const x=2**a,y=2**b,z=2**c;quadratic+=Number(x*x>4*y*z||y*y>4*x*z||z*z>4*x*y);}
check('2022 Q6: all ordered coefficient samples',quadratic,444);
let an=3,bn=1;
for(let i=0;i<32;i++)[an,bn]=[(3*an+bn)%31,((3*bn-an)%31+31)%31];
check('2022 Q8: direct recurrence',100*an+bn,3010);
let boxCount=0n;
for(let k=0;k<=42;k+=2)boxCount+=choose(42,k)*choose(42,42-k);
check('2022 Q9: direct even-size binomial convolution',Number(boxCount%1763n),1355);
let normPairs=0;
for(let a=-1904;a<=1904;a++)for(let b=-1904;b<=1904;b++){const n=a*a+b*b;if(n&&3628800%n===0)normPairs++;}
check('2022 Q10: integer lattice scan',normPairs,648);
check('2022 TB1: digit-sum scan',count(1000,n=>digitSum(n)%10===0,100),90);
check('2022 TB2: doubled-digit scan',count(2023,n=>/^[02468]+$/.test(String(n))&&/^[02468]+$/.test(String(2*n)),1),31);
let product=1n;
for(let n=1;n<1000;n++)if(n%10===7||Math.floor(n/100)===7)product*=BigInt(n);
check('2022 TB3: exact product before division',Number(product/101n%101n),19);
check('2023 Q3: all four-digit-range additions',count(10000,n=>String(n+1).split('4').length>String(n).split('4').length,1),1111);
check('2023 Q4: direct nested remainder scan',count(500,n=>((n%11)%5)%2===1,1),182);
let gcdCases=0;
for(let x=1;x<210*2023;x++){const a=gcd(x,1734),b=gcd(x+17,x+1732);gcdCases+=Number(2023%(a*b/gcd(a,b))===0);}
check('2023 Q6: every integer in the specified interval',gcdCases,2**7*3*17**2);
const divisors=[1,2,3,5,6,10,15,30];let divisorDp=new Map(divisors.map(n=>[n,1]));
for(let i=0;i<30;i++)divisorDp=new Map(divisors.map(n=>[n,divisors.filter(d=>n%d===0).reduce((s,d)=>(s+d*divisorDp.get(d))%1001,0)]));
check('2023 Q8: direct divisor recursion',divisorDp.get(30),232);
const increasing=a=>a.every((x,i)=>i===0||a[i-1]<x), decreasing=a=>a.every((x,i)=>i===0||a[i-1]>x);
let shelves=0;
for(const a of permutations([1,2,3,4,5,6,7])){let valid=false;for(let i=0;i<=7&&!valid;i++)for(let j=i;j<=7;j++)if(increasing(a.slice(0,i))&&decreasing(a.slice(i,j))&&increasing(a.slice(j)))valid=true;shelves+=Number(valid);}
check('2023 Q9: every permutation and divider pair',shelves,544);
let u0=2,u1=3;for(let n=2;n<=1000;n++)[u0,u1]=[u1,(3*u1+2*u0)%997];
check('2023 Q10: integer recurrence without field extensions',(u1+996)%997,970);
check('2023 Q10: quadratic nonresidue power',powerMod(17,498,997),996);
let shoes=0;for(let a=0;a<=5;a++)for(let x=0;x<=5-a;x++)for(let y=0;y<=7-a;y++)shoes+=Number(x!==y&&x+y>2*a&&x+y>12-2*a-x-y);
check('2023 TB2: all allocations',shoes,41);
check('2024 Q4: all cyclic binary assignments',count(255,n=>{const bits=Array.from({length:8},(_,i)=>(n>>i)&1);return bits.every((b,i)=>b===bits[(i+1)%8]||b===bits[(i+7)%8]);},1),44);
let largest=0;for(const digits of permutations([1,2,3,4,5])){const n=digits.reduce((a,b)=>6*a+b,0);if(n%43===0)largest=Math.max(largest,n);}
check('2024 Q6: all base-six digit permutations',largest,6020);
check('2024 Q7: all multiset strings',count(2048,n=>bitCount(n)===4&&n.toString(2).padStart(11,'0').replaceAll('1','G').replaceAll('0','I').includes('GIGI')),132);
let exponentialSum=0;for(let k=1;k<=82;k++)exponentialSum=(exponentialSum+powerMod(4,k*k,83))%83;
check('2024 Q9: direct modular powers',exponentialSum**2%83,81);
const edges=[];for(let i=0;i<9;i++){if(i%3<2)edges.push([i,i+1]);if(i<6)edges.push([i,i+3]);}
let grids=0,doubleModes=0;
for(const grid of permutations([1,2,3,4,5,6,7,8,9])){const sums=Array(18).fill(0);for(const [a,b]of edges)sums[grid[a]+grid[b]]++;if(Math.max(...sums)===4){grids++;if(sums.filter(n=>n===4).length===2)doubleModes++;}}
check('2024 Q10: all 362880 labelled grids',grids,20616);
check('2024 Q10: double-counted modes',doubleModes,120);
check('2025 Q4: all four-digit substrings',count(10000,n=>{const s=String(n);return [0,1,2].every(i=>Number(s.slice(i,i+2))%3===0);},1000),354);
check('2025 Q6: every nonempty subset',count(4096,n=>{const types=Array.from({length:12},(_,i)=>i+1).filter(i=>n&(1<<(i-1))).map(i=>i%3===0);return types.every((x,i)=>i===0||x!==types[i-1]);},1),360);
function reseat(i=0,used=0){if(i===14)return 1;let total=0;for(const seat of [(i+13)%14,i,(i+1)%14])if(!(used&(1<<seat)))total+=reseat(i+1,used|(1<<seat));return total;}
check('2025 Q7: direct legal seat assignments',reseat(),845);
let oddFiltered=0;
for(let a=0;a<=4;a++)for(let b=0;b<=27;b++)for(let c=0;c<=5;c++){let parity=0;for(let i=0;i<=a;i++)for(let j=0;j<=b;j++)for(let k=0;k<=c;k++)if((i+1)*(j+1)*(k+1)%2===0)parity^=1;oddFiltered+=parity;}
check('2025 Q8: direct odd-divisor filtering',56*oddFiltered,13328);
function integerSqrt(n){if(n<2n)return n;let x=n,y=(x+1n)/2n;while(y<x){x=y;y=(x+n/x)/2n;}return x;}
const squareTriples=[];
for(let p=0;p<=12;p++)for(let q=0;q<=12;q++)for(let r=0;r<=18;r++){const n=3n**BigInt(p)*21n**BigInt(q)+9n*2n**BigInt(r),root=integerSqrt(n);if(root*root===n)squareTriples.push([p,q,r]);}
check('2025 Q10: bounded square search (not a completeness proof)',squareTriples.length,9);
check('2025 Q10: weighted sum of bounded solutions',squareTriples.reduce((s,[p,q,r])=>s+100*p+10*q+r,0),1998);
check('2025 TB2: direct reversed sums that are cubes',Array.from({length:900},(_,i)=>i+100).filter(n=>Math.round(Math.cbrt(n+reverse(n)))**3===n+reverse(n)),[122,221,320]);
console.log(JSON.stringify({officialProblems:75,mainProblems:60,tiebreakerProblems:15,categories:10,teachingTechniques:subject.topics.reduce((sum,topic)=>sum+topic.bullets.length,0),independentFiniteChecks:computed.length,checks:'passed',limits:'Finite computations corroborate results; unbounded and extremal completeness arguments are provided in the worked solutions.'},null,2));
