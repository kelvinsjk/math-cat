import { Polynomial, Expression, Term, Fraction } from 'mathlify';
import { math, alignStar } from 'mathlifier';
import type { Question, Part, Answer } from '$lib/components/types';

export function qnGen(vars: {
	case1: number;
	a1: number;
	b1: number;
	c1: number;
	signCase1: number;
	case2: number; 	
	a2: number;
	b2: number;
	n: number;
	case3: number;
	a3: number; 
	b3: number; 
	signCase3: number,
	permute: number,
}): [Question, Answer, Answer] {
	// case 1: f'(x) / f(x)
	// 0: ln x, 1: x^a + b, 2: ax^2 + bx + c
	// case 2: f'(x) ( f(x) )^n
	// 0: ln x, 1: x^a + b, 2: trig
	// case 3: f'(x) exp( f(x) )
	// 1: x^a + b, 2: trig
	const { case1, a1, b1, c1, signCase1, case2, a2, b2, n, case3, a3, b3, signCase3, permute } = vars;
	const [qn1, ans1, soln1] = case1Gen(case1, a1, b1, c1, signCase1);
	const [qn2, ans2, soln2] = case2Gen(case2, a2, b2, n);
	const [qn3, ans3, soln3] = case3Gen(case3, a3, b3, signCase3);

	const permutes = [[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]];
	const parts: Part[] = [];
	const ansParts: Part[] = [];
	const solnParts: Part[] = [];
	const qns = [qn1, qn2, qn3];
	const answers = [ans1, ans2, ans3];
	const solns = [soln1, soln2, soln3];
	for (let i = 0; i < 3; i++){
		parts.push({body: qns[permutes[permute][i]]});
		ansParts.push({body: answers[permutes[permute][i]]});
		solnParts.push({body: solns[permutes[permute][i]]});
	}
	const qn = {body: `Integrate the following`,parts};
	const ans = {parts: ansParts};
	const soln = {parts: solnParts};
	return [qn, ans, soln];
}

function case1Gen(case1: number,
	a1: number,
	b1: number,
	c1: number,
	signCase1: number,): [string, string, string] {
	// case 1: f'(x) / f(x)
	// 0: ln x, 1: x^a + b, 2: ax^2 + bx + c
	if (case1===0){
		const ans = math(`\\ln \\lvert \\ln x \\rvert + c`);
		const soln = alignStar(`& \\int \\frac{1}{x \\ln x} \\, \\mathrm{d}x
			\\\\ &= \\int \\frac{\\frac{1}{x}}{\\ln x} \\, \\mathrm{d}x
			\\\\ &= \\ln \\lvert \\ln x \\rvert + c \\; \\blacksquare
		`)
		return [math(`\\displaystyle \\int \\frac{1}{x \\ln x} \\, \\mathrm{d}x`), ans, soln]
	}
	if (case1===1){
		const xA = `x^{${a1}}`;
		const fx = signCase1===0 ? new Expression(xA, b1)
			: signCase1===1 ? new Expression(xA, -b1)
			: new Expression(b1, new Term(-1, xA));
		const fPrime = a1===2 ? `x` : `x^{${a1-1}}`;
		const qn = math(`\\displaystyle \\int \\frac{${fPrime}}{${fx}} \\, \\mathrm{d}x`);
		const ans = math(`\\frac{1}{${a1}} \\ln ${modulus(`${fx}`, a1, signCase1)} + c`);
		const soln = alignStar(`& \\int \\frac{${fPrime}}{${fx}} \\, \\mathrm{d}x
			\\\\ &= \\frac{1}{${a1}} \\int \\frac{${a1}${fPrime}}{${fx}} \\, \\mathrm{d}x
			\\\\ &= \\frac{1}{${a1}} \\ln ${modulus(`${fx}`, a1, signCase1)} + c \\; \\blacksquare
		`)
		return [qn, ans, soln];
	}
	// case 2: ax^2 + bx + c
	const fx = new Polynomial([a1,b1,c1]);
	const fPrime = fx.differentiate()
	const fPrimeSimplified = fPrime.simplify();
	const multiple = fPrimeSimplified.coeffs[0].divide(fPrime.coeffs[0]);
	const qn = math(`\\displaystyle \\int \\frac{${fPrimeSimplified}}{${fx}} \\, \\mathrm{d}x`);
	const alwaysPositive = new Fraction(b1).square().minus(new Fraction(4).times(a1).times(c1)).isLessThan(0) ? 0 : 1;
	const lnTerm = new Term(multiple, `\\ln ${modulus(`${fx}`,2,alwaysPositive)}`);
	const ans = math(`${lnTerm} + c`);
	const multipleLine = multiple.isEqualTo(1) ? '' : `\\\\ &= ${multiple.reciprocal()} \\int \\frac{${fPrime}}{${fx}} \\, \\mathrm{d}x`;
	const soln = alignStar(`& \\int \\frac{${fPrimeSimplified}}{${fx}} \\, \\mathrm{d}x
		${multipleLine}
		\\\\ &= ${lnTerm} + c \\; \\blacksquare
	`)
	return [qn, ans, soln];
}

function modulus(x: string, a: number, signCase: number): string {
	return (signCase===0 && a%2===0) ? `\\left( ${x} \\right)` : `\\lvert ${x} \\rvert`; 
}

function case2Gen(case2: number, a2: number, b2: number, n: number): [string, string, string] {
	// case 2: f'(x) ( f(x) )^n
	// 0: ln x, 1: x^a + b, 2: trig
	if (case2===0){
		const qnString = n===1 ? `\\displaystyle \\int \\frac{\\ln x}{x} \\, \\mathrm{d}x`
			: n>1 ? `\\displaystyle \\int \\frac{(\\ln x)^{${n}}}{x} \\, \\mathrm{d}x`
			: `\\displaystyle \\int \\frac{1}{x (\\ln x)^{${-n}}} \\, \\mathrm{d}x`;
		const ansString = n>0 ? `\\frac{(\\ln x)^{${n+1}}}{${n+1}} + c`
			: n === -2 ? `-\\frac{1}{\\ln x} + c`
			: `-\\frac{1}{${-n-1}(\\ln x)^{${-n-1}}} + c`;
		let solnString = `& ${qnString.slice(13)}`; // get rid of displaystyle
		if (n===1){
			solnString += `\n\\\\ &= \\int \\frac{1}{x} \\ln x \\, \\mathrm{d}x`
		} else if (n>0) {
			solnString += `\n\\\\ &= \\int \\frac{1}{x} (\\ln x)^{${n}} \\, \\mathrm{d}x`
		} else {
			solnString += `\n\\\\ &= \\int \\frac{1}{x} (\\ln x)^{${n}} \\, \\mathrm{d}x
				\\\\ &= \\frac{(\\ln x)^{${n+1}}}{${n+1}}
			`;
		}
		solnString += `\n\\\\ &= ${ansString} \\; \\blacksquare`
		return [math(qnString), math(ansString), alignStar(solnString)];
	}
	if (case2===1){
		// (x^a + b)^n
		const xA = `x^{${a2}}`;
		const fx = new Expression(xA, b2);
		const fPrime = a2===2 ? `x` : `x^{${a2-1}}`;
		// qn
		const qnString = n > 0 ? `\\displaystyle \\int ${fPrime} (${fx})^{${n}} \\, \\mathrm{d}x`
			: `\\displaystyle \\int \\frac{${fPrime}}{(${fx})^{${-n}}} \\, \\mathrm{d}x`;
		let den = a2*(n+1);
		let multiple: number|Fraction = 1;
		if (den < 0){
			multiple = -1;
			den = -den;
		}
		let ansTerm: Term;
		if (n > 0 || n===-2){
			multiple = new Fraction(multiple, den);
			const fxBrackets = multiple.den === 1 ? `${fx}` : `(${fx})`;
			const fxDen = new Term(multiple.den, fxBrackets);
			ansTerm = n > 0 ? new Term(multiple, `(${fx})^{${n+1}}`)
			: new Term(multiple.sign(), `\\frac{${multiple.abs().num}}{${fxDen}}`)
		} else {
			ansTerm = new Term(multiple, `\\frac{1}{${den}(${fx})^{${-n-1}}}`);
		}
		const ansString = `${ansTerm} + c`;
		// soln
		let solnString = `& ${qnString.slice(13)}`; // get rid of displaystyle
		if (n>0){
			solnString += `\n\\\\ &= \\frac{1}{${a2}} \\int ${a2} ${fPrime} (${fx})^{${n}} \\, \\mathrm{d}x
				\n\\\\ &= \\frac{1}{${a2}} \\left( \\frac{(${fx})^{${n+1}}}{${n+1}} \\right) + c
			`;
		} else {
			solnString += `\\\\ &= \\int ${fPrime} (${fx})^{${n}} \\, \\mathrm{d}x
				\\\\ &= \\frac{1}{${a2}} \\int ${a2} ${fPrime} (${fx})^{${n}} \\, \\mathrm{d}x
				\\\\ &= \\frac{1}{${a2}} \\left( \\frac{(${fx})^{${n+1}}}{${n+1}} \\right) + c
			`
		}
		solnString += `\\\\ &= ${ansString} \\; \\blacksquare`
		return [math(qnString), math(ansString), alignStar(solnString)];
	}
	// case 2: trig
	const fx = a2===0 ? `\\sin` : `\\cos`;
	const fPrime = a2===0 ? `\\cos x` : `\\sin x`;
	const qn = math(`\\displaystyle \\int ${fPrime} ${fx}^{${n}} x \\, \\mathrm{d}x`);
	const multiple = a2===0 ? 1 : -1;
	const ansTerm = new Term(multiple, `\\frac{${fx}^{${n+1}} x}{${n+1}}`);
	const ans = math(`${ansTerm} + c`);
	const negativeLine = a2===0 ? '' : `\n \\\\ &= - \\int (-${fPrime}) ${fx}^{${n}} x \\, \\mathrm{d}x`;
	const soln = alignStar(`&\\int ${fPrime} ${fx}^{${n}} x \\, \\mathrm{d}x
		${negativeLine}
		\\\\ &= ${ansTerm} + c \\; \\blacksquare
	`);
	return [qn, ans, soln];
}

function case3Gen(case3: number, a3: number, b3: number, signCase3: number): [string, string, string] {
	// case 3: f'(x) exp( f(x) )
	// 1: x^a + b, 2: trig
	if (case3===1){
		const xA = `x^{${a3}}`;
		const fx = signCase3===0 ? new Expression(xA, b3)
			: signCase3===1 ? new Expression(xA, -b3)
			: new Expression(b3, new Term(-1, xA));
		const fPrime = a3===2 ? `x` : `x^{${a3-1}}`;
		const qn = math(`\\displaystyle \\int ${fPrime} \\operatorname{e}^{${fx}} \\, \\mathrm{d}x`);
		const multiple = signCase3===2 ? -1 : 1;
		const coeff = new Fraction(multiple,a3);
		const ansTerm = new Term(coeff, `\\operatorname{e}^{${fx}}`);
		const ans = math(`${ansTerm} + c`);
		const soln = alignStar(`& \\int ${fPrime} \\operatorname{e}^{${fx}} \\, \\mathrm{d}x
			\\\\ &= ${coeff} \\int ${coeff.reciprocal()} ${fPrime} \\operatorname{e}^{${fx}} \\, \\mathrm{d}x
			\\\\ &= ${ansTerm} + c \\; \\blacksquare
		`)
		return [qn, ans, soln];
	}
	// case 3: trig
	let fx: string, fPrime: string;
	let multiple = 1;
	if (a3===0){
		fx = `\\sin x`;
		fPrime = `\\cos x`;
	} else if (a3===1){
		fx = `\\cos x`;
		fPrime = `\\sin x`;
		multiple = -1;
	} else {
		fx = `\\tan x`;
		fPrime = `\\sec^2 x`;
	}
	const qn = math(`\\displaystyle \\int ${fPrime} \\operatorname{e}^{${fx}} \\, \\mathrm{d}x`);
	const ansTerm = new Term(multiple, `e^{${fx}}`);
	const ans = math(`${ansTerm} + c`);
	const soln = a3===1 ? alignStar(`& \\int ${fPrime} \\operatorname{e}^{${fx}} \\, \\mathrm{d}x
	\\\\ &= - \\int (-${fPrime}) \\operatorname{e}^{${fx}} \\, \\mathrm{d}x	
	\\\\ &= ${ansTerm} + c \\; \\blacksquare
	`)
	: alignStar(`& \\int ${fPrime} \\operatorname{e}^{${fx}} \\, \\mathrm{d}x
		\\\\ &= ${ansTerm} + c \\; \\blacksquare
	`)
	return [qn, ans, soln];
}