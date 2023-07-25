import { Polynomial, solveLinear, Fraction } from 'mathlify';
import { display, math, align, alignStar } from 'mathlifier';

export function qnGen(vars: {
	a: number;
	b: number;
	x1: number;
	x2: number;
	signCase: number;
}): [string, string, string, string, 
	//[string, string]
] {
	// | ax + b | sign mx + c
	// sign: 0: <, 1: <=, 2: >, 3: >=
	// a: 1-3, b: 1-5, ++, +-, -+
	// k: 9 if a=1, 4 if a=2, 3 if a=3
	// x1 left of -b/a such that x1 >= max(-9, ceil(-b/a - k))
	// x2 right of -b/a such that x2 <= min(9, floor(-b/a + k))
	// c is gradient of line (x1, y1), (x2, y2)
	// d is y-intercept of line (x1, y1), (x2, y2) 
	const { a, b, x1, x2, signCase } = vars;
	const axPlusB = a < 0 ? new Polynomial([b,a], {ascending: true}) : new Polynomial([a,b]);
	const y1 = axPlusB.subIn(x1).abs();
	const y2 = axPlusB.subIn(x2).abs();
	const m = y2.minus(y1).divide(x2-x1);
	// y - y1 = c(x - x1)
	const c = m.times(x1).negative().plus(y1);
	const cxPlusD = (m.isLessThan(0) && c.isGreaterThan(0)) ? new Polynomial([c,m], {ascending: true}) : new Polynomial([m,c]);
	const signs = ['<', '\\leq', '>', '\\geq'];
	const sign = signs[signCase];
	
	//! generate question
	const qn = `Solve the inequality
	${display(`| ${axPlusB} |  ${sign} ${cxPlusD}.`)}
	`;
	
	//! solve question
	const x1Solve = solveLinear(axPlusB.minus(cxPlusD));
	const x2Solve = solveLinear(axPlusB.plus(cxPlusD));
	const [x1SolveFinal, x2SolveFinal] = x1Solve.isGreaterThan(x2Solve) ? [x2Solve, x1Solve] : [x1Solve, x2Solve];
	const sign2 = signCase % 2 === 0 ? '<' : '\\leq';
	const ansGenString = signCase < 2
		? `${x1SolveFinal} ${sign} x ${sign} ${x2SolveFinal}`
		: `x ${sign2} ${x1SolveFinal} \\; \\textrm{ or } \\; x ${sign} ${x2SolveFinal}`;
	const ans = signCase < 2
		? math(`${x1} ${sign} x ${sign} ${x2}`)
		: math(`x ${sign2} ${x1} \\; \\textrm{ or } \\; x ${sign} ${x2}`);
	const ansGen = math(ansGenString);
	
	//! generate solution
	// working
	const coeff1 = new Fraction(a).minus(m);
	const rhs1 = c.minus(b);
	const lhs1 = new Polynomial(coeff1);
	const x1Solve2 = rhs1.divide(coeff1);
	const line3 = coeff1.isEqualTo(1) ? '' : `\\\\ x &= ${x1Solve2}`;
	// soln
	const soln = `At intersection points,
		${align(`${axPlusB} &= ${cxPlusD}
			\\\\ -(${axPlusB}) &= ${cxPlusD}
		`)}
		Considering equation ${math(`(1),`)}
		${alignStar(`${axPlusB} &= ${cxPlusD}
			\\\\ ${lhs1} &= ${rhs1}
			${line3}
		`)}
		Considering equation ${math(`(2),`)}
		${alignStar(`-(${axPlusB}) &= ${cxPlusD}
			\\\\ x &= ${x2Solve}
		`)}
		By observing the graph, solution to the inequality is
		${display(`${ansGenString} \\; \\blacksquare`)}
	`;

	return [qn, ans, ansGen, soln,
		//[axPlusB.toString(), `y=${cxPlusD.toString()}`]
	];
}