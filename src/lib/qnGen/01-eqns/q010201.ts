import { Polynomial, Expression, Term, Fraction, cramersFrac } from 'mathlify';
import { align, alignStar, display, equation, newParagraph, math, newline } from 'mathlifier';

export function qnGen1(vars: {
	a: number;
	b: number;
	c: number;
	x1: number;
	x2: number;
}): [string, string, string, string] {
	const { a, b, c, x1, x2 } = vars;

	// f(x) = ax^2 + bx + c
	const f = new Polynomial([a, b, c]);
	const fx1 = f.subIn(x1);
	const fx2 = f.subIn(x2);
	const dydx = f.differentiate().subIn(x1);

	//! generate question
	const qn = `The graph of ${math(`y=f(x),`)} where
		${math(`f(x)`)} is a quadratic polynomial, passes through
		the point ${math(`(${x2}, ${fx2})`)}
		and has gradient ${math(`${dydx}`)} at the point ${math(`(${x1}, ${fx1}).`)}
		Find the equation of the graph.
	`;

	//! solve question
	// from variables
	const ans = `${math(`y=${f}`)}`;
	// by solving
	const [aAns, bAns, cAns] = cramersFrac(x1*x1, x1, 1, fx1, x2*x2, x2, 1, fx2, 2*x1, 1, 0, dydx);
	const fAns = new Polynomial([aAns, bAns, cAns]);
	const ansGen = `${math(`y=${fAns}`)}`;
	
	//! generate solution
	// eqn 1
	const lhs1 = new Expression(new Term(x1*x1, 'a'), new Term(x1, 'b'), new Term(1, 'c'));
	const lhs2 = new Expression(new Term(x2*x2, 'a'), new Term(x2, 'b'), new Term(1, 'c'));
	const lhs1w = new Expression(`(${x1})^2a`, `(${x1})b`, 'c');
	const lhs2w = new Expression(`(${x2})^2a`, `(${x2})b`, 'c');
	const lhs3 = new Expression(new Term(2*x1, 'a'), new Term(1, 'b'));
	const soln = `Let ${math(`y=ax^2 + bx + c`)}
		${newline}
		Since the curve passes through ${math(`(${x1}, ${fx1})`)} and ${math(`(${x2}, ${fx2}),`)}
		${alignStar(`${lhs1w} &= ${fx1}
			\\\\ ${lhs2w} &= ${fx2}
		`)}
		${align(`${lhs1} &= ${fx1}
			\\\\ ${lhs2} &= ${fx2}
		`)}
		${display(`\\frac{\\mathrm{d}y}{\\mathrm{d}x} = 2ax + b`)}
		Since the curve has gradient ${math(`${dydx}`)} at ${math(`(${x1}, ${fx1}),`)}
		${equation(`${lhs3} = ${dydx}`)}
		Solving ${math(`(1), (2)`)} and ${math(`(3)`)} simultaneously with a GC,
		${display(`a=${aAns}, \\; b=${bAns}, \\; c=${cAns} \\; \\blacksquare`)}
	`;
	
	return [qn, ans, ansGen, soln];
}

export function qnGen2(vars: {
	a1: number;
	b1: number;
	c1: number;
	a2: number;
	b2: number;
	c2: number;
	x1: number;
	x2: number;
	x3: number;
}): [string, string, string, string] {
	const { a1, b1, c1, a2, b2, c2, x1, x2, x3 } = vars;
	const total = (x1+x2+x3)*100;
	const costPrice = (a1*x1 + b1*x2 + c1*x3)*100;
	const sellingPrice = (a2*x1 + b2*x2 + c2*x3)*100;
	const profit = sellingPrice - costPrice;
	const profitString = profit > 0 ? 'profit' : 'loss';

	//! generate question
	const qn = `Mr. Tan invests in the stock market in January one year, buying
		a total of ${math(`${total}`)} units of shares across three companies,
		${math(`A, B`)} and ${math(`C.`)}
		${newParagraph}
		In January, the share prices of companies ${math(`A, B`)} and ${math(`C`)} are
		${math(`${varToDollar(a1)}, ${varToDollar(b1)}`)}
		and ${math(`${varToDollar(c1)}`)} per unit of share respectively.
		He paid a total of ${math(`\\$${costPrice/2}`)} for the shares.
		${newParagraph}
		In December, the share prices of companies ${math(`A, B`)} and ${math(`C`)} are
		${math(`${varToDollar(a2)}, ${varToDollar(b2)}`)}
		and ${math(`${varToDollar(c2)}`)} per unit of share respectively. He sold all his shares
		in December for a total ${profitString} of
		${math(`\\$${Math.abs(profit)/2}.`)}
		${newParagraph}
		Determine how many units of shares Mr. Tan bought for each company.
	`;

	//! solve question
	// from variables
	const ans = math(`a=${x1*100}, b=${x2*100}, c=${x3*100}.`);
	// by solving
	const [aAns, bAns, cAns] = cramersFrac(
		1, 1, 1, total,
		new Fraction(a1,2), new Fraction(b1,2), new Fraction(c1,2), new Fraction(costPrice,2),
		new Fraction(a2,2), new Fraction(b2,2), new Fraction(c2,2), new Fraction(costPrice+profit,2),
	);
	const ansGen = math(`a=${aAns}, b=${bAns}, c=${cAns}.`);

	//! generate solution
	const lhs2 = new Expression(`${(a1/2).toFixed(2)}a`, `${(b1/2).toFixed(2)}b`, `${(c1/2).toFixed(2)}c`);
	const lhs3 = new Expression(`${(a2/2).toFixed(2)}a`, `${(b2/2).toFixed(2)}b`, `${(c2/2).toFixed(2)}c`);
	const profitWorking = new Expression(costPrice/2, new Term(profit/2, ' '));
	const soln = `Let ${math(`a,b`)} and ${math(`c`)} be the number of units of shares Mr. Tan
		bought for companies ${math(`A, B`)} and ${math(`C`)} respectively.
		${equation(`a+b+c = ${total}`)}
		In January,
		${equation(`${lhs2} = ${costPrice/2}`)}
		Since he made a ${profitString} of ${math(`\\$${Math.abs(profit)/2},`)} the stocks sold for
		${display(`${profitWorking} = ${(costPrice+profit)/2}`)}
		${equation(`${lhs3} = ${(costPrice+profit)/2}`)}
		Solving ${math(`(1), (2)`)} and ${math(`(3)`)} simultaneously with a GC, we get
		${display(`a=${aAns}, \\; b=${bAns}, \\; c=${cAns} \\; \\blacksquare`)}
	`;
	
	return [qn, ans, ansGen, soln];
}

function varToDollar(x: number): string {
	const d = Math.floor(x/2);
	const c = x%2 === 0 ? '00' : '50';
	return `\\$${d}.${c}`;
}