import {
	Polynomial,
	Expression,
	Term,
	factorizeQuadratic,
	Fraction,
	completeSquare,
	solveLinear,
} from 'mathlify';
import { display, gatherStar, math } from 'mathlifier';
import { generateInequalitiesAnswer } from './generateInequalitiesAnswer';

export function qnGen(vars: {
	a: number;
	b: number;
	c: number;
	d: number;
	e: number;
	B: number;
	signCase: number;
}): [string, string, string] {
	const { a, b, c, d, e, B, signCase } = vars;

	// (x^2 + bx + c)(dx + e) sign 0

	// C = B + ad - b - ac
	// D = bc - Bd
	const sign = signCase === 1 ? '>' : '<';
	const numQn = new Polynomial([1, b, c]);
	const den = d < 0 ? new Polynomial([d, e]) : new Polynomial([e, d], { ascending: true });

	//// generate question
	const qn = `${display(`\\frac{${numQn}}{${den}} ${sign} 0`)}`;

	//// solve question
	// complete square
	// (x+b/2)^2 - (b/2)^2 + e
	const perfectSquare = `(${new Polynomial([1, new Fraction(b, 2)])})^2`;
	const residual = new Fraction(b, 2).abs();
	const exp1a = new Expression(perfectSquare, new Term(-1, `${residual}^2`), e);
	const exp1b = completeSquare(numQn);
	// generate answer
	const signGen = d < 0 ? signCase * -1 : signCase;
	const ansSign = signGen === 1 ? '>' : '<';
	const root = solveLinear(den);
	const ans = math(`x ${ansSign} ${root}`);

	//// generate solution
	let soln = `${gatherStar(`\\frac{${numQn}}{${den}} ${sign} 0
      \\\\ \\frac{${exp1a}}{${den}} ${sign} 0
      \\\\ \\frac{${exp1b}}{${den}} ${sign} 0
    `)}
		Since ${math(`${perfectSquare} \\geq 0`)} for all
		${math(`x \\in \\mathbb{R},`)}
		${math(`${exp1b}`)} is always positive
		${display(`\\frac{1}{${den}} ${sign} 0`)} 
  `;
	// TODO: number line
	soln += ans;
	return [qn, ans, soln];
}

function toggleSign(sign: string): string {
	return sign === '>' ? '<' : '>';
}
function factorBrackets(factor: string): string {
	return factor.length === 1 ? factor : `(${factor})`;
}
function handleFactors(factor1: Polynomial, factor2: Polynomial) {
	const f1 = `${factor1}`;
	const f2 = `${factor2}`;
	return f2.length === 1
		? `${factorBrackets(f2)}${factorBrackets(f1)}`
		: `${factorBrackets(f1)}${factorBrackets(f2)}`;
}
