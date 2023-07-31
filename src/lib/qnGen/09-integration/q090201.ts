import type { Question, Part, Answer } from '$lib/components/types';
import { Polynomial, Fraction, SquareRoot, Term, Expression } from 'mathlify';
import { math, alignStar } from 'mathlifier';


export function qnGen(vars: {
	a1: number,
	b1: number,
	swap1: boolean,
	a2: number,
	b2: number,
	a3: number,
	b3: number,
	a4: number,
	b4: number,
	permute: number,
}): [Question, Answer, Answer] {
	// a is after squaring, b is before squaring
	const { a1,	b1, swap1, a2, b2, a3, b3, a4, b4, permute, } = vars;
	// permutation index for 4 items
	const permutes = [[0,1,2,3], [0,1,3,2], [0,2,1,3], [0,2,3,1], [0,3,1,2], [0,3,2,1],
		[1,0,2,3], [1,0,3,2], [1,2,0,3], [1,2,3,0], [1,3,0,2], [1,3,2,0],
		[2,0,1,3], [2,0,3,1], [2,1,0,3], [2,1,3,0], [2,3,0,1], [2,3,1,0],
		[3,0,1,2], [3,0,2,1], [3,1,0,2], [3,1,2,0], [3,2,0,1], [3,2,1,0]
	];
	const a1Term = swap1 ? new Polynomial([a1,0,b1*b1],{ascending: true}) : new Polynomial([b1*b1,0,a1]);
	const a2Term = new Polynomial([a2,0,-b2*b2],{ascending: true});
	const a4Term = new Polynomial([a4,0,-b4*b4],{ascending: true});
	const a3Term = new Polynomial([b3*b3,0,-a3]);
	const parts = [a1Term, a2Term, a3Term, a4Term];
	const as = [a1, a2, a3, a4];
	const bs = [b1, b2, b3, b4];
	const answers: string[] = [];
	const solns: string[] = [];
	for (let i = 0; i < 4; i++){
		const b = bs[i];
		const a = as[i];
		const actualA2 = new Fraction(a,Math.pow(b,2));
		const actualA = new SquareRoot(actualA2);
		if (i===0){ // arc tan
			// int 1 / (b^2 x^2 + a), where a > 0
			// 1 / (b sqrt{a}) arc tan ( x / sqrt(a) )
			const rootA = new SquareRoot(a);
			const xTerm = rootA.isRational() ? new Term(rootA.reciprocal().times(b), `x`)
				: `\\frac{${new Term(b, 'x')}}{${rootA}}`
			const ansTerm = rootA.isRational() ? new Term(actualA.reciprocal().divide(b*b), `\\tan^{-1} \\left( ${xTerm} \\right)`)
				: `\\frac{1}{${new Term(b, rootA)}} \\tan^{-1} \\left( ${xTerm} \\right)`
			answers.push(math(`${ansTerm} + c`));
			const den = swap1 ? new Polynomial([actualA2,0,1], {ascending: true}) : new Polynomial([1,0,actualA2]);
			const bNotOne = b===1 ? `` : 
				`\\\\ &= \\frac{1}{${b*b}} \\int \\frac{1}{${den}} \\, \\mathrm{d}x
					\\\\ &= \\frac{1}{${b*b}} \\left( \\frac{1}{${actualA}} \\right) \\tan^{-1} \\left( \\frac{x}{${actualA}} \\right) + c
				`;
			solns.push(alignStar(`& \\int \\frac{1}{${parts[i]}} \\, \\mathrm{d}x
				${bNotOne}
				\\\\ &= ${ansTerm} + c \\; \\blacksquare
			`));
		} else if (i===1){ // arc sin
			const rootA = new SquareRoot(a);
			const xTerm = rootA.isRational() ? new Term(rootA.reciprocal().times(b), `x`)
				: `\\frac{${new Term(b, 'x')}}{${rootA}}`;
			const ansTerm = new Term(new Fraction(1,b), `\\sin^{-1} \\left( ${xTerm} \\right)`)
			answers.push(math(`${ansTerm} + c`));
			const den = new Polynomial([actualA2,0,-1],{ascending: true});
			const bNotOne = b===1 ? `` : 
				`\\\\ &= \\int \\frac{1}{\\sqrt{${b*b}} \\sqrt{${den}}} \\, \\mathrm{d}x
					\\\\ &= \\frac{1}{${b}} \\int \\frac{1}{\\sqrt{${den}}} \\, \\mathrm{d}x
					\\\\ &= \\frac{1}{${b}} \\sin^{-1} \\left( \\frac{x}{${actualA}} \\right) + c
				`;
			solns.push(alignStar(`& \\int \\frac{1}{\\sqrt{${parts[i]}}} \\, \\mathrm{d}x
				${bNotOne}
				\\\\ &= ${ansTerm} + c \\; \\blacksquare
			`));
		} else { // ln
			const aRoot = new SquareRoot(a);
			const numPoly = i===2 ? new Expression(new Term(b, 'x'), aRoot.negative()) : new Expression(aRoot, new Term(b, 'x'));
			const denPoly = i===2 ? new Expression(new Term(b, 'x'), aRoot) : new Expression(aRoot, new Term(-b, 'x'));
			const ansTerm = actualA.isRational() ? new Term(actualA.reciprocal().divide(b*b).divide(2), `\\ln \\left \\lvert \\frac{${numPoly}}{${denPoly}} \\right \\rvert`)
			: `\\frac{1}{${new Term(2*b, actualA)}} \\ln \\left \\lvert \\frac{${numPoly}}{${denPoly}} \\right \\rvert`;
			const den = i===2 ? new Polynomial([1,0,actualA2.negative()]) : new Polynomial([actualA2,0,-1],{ascending: true});
			const numPoly2 = i===2 ? new Expression('x', actualA.negative()) : new Expression(actualA, 'x');
			const denPoly2 = i===2 ? new Expression('x', actualA) : new Expression(actualA, new Term(-1, 'x'));
			const bNotOne = b===1 ? `` :
				`\\\\ &= \\frac{1}{${b*b}} \\int \\frac{1}{${den}} \\, \\mathrm{d}x
					\\\\ &= \\frac{1}{${b*b}} \\left( \\frac{1}{2\\left( ${actualA} \\right)} \\right) \\ln \\left \\lvert \\frac{${numPoly2}}{${denPoly2}} \\right \\rvert + c
			`;
			answers.push(math(`${ansTerm} + c`))
			solns.push(alignStar(`& \\int \\frac{1}{${parts[i]}} \\, \\mathrm{d}x
				${bNotOne}
				\\\\ &= ${ansTerm} + c \\; \\blacksquare
			`));
		}
	}
	const qnParts: Part[] = [];
	const ansParts: Part[] = [];
	const solnParts: Part[] = [];
	for (let i = 0; i < 4; i++){
		const question = parts[permutes[permute][i]];
		const body = permutes[permute][i]===1 ? `${math(`\\displaystyle \\int \\frac{1}{\\sqrt{${question}}} \\, \\mathrm{d}x`)}` 
		: `${math(`\\displaystyle \\int \\frac{1}{${question}} \\, \\mathrm{d}x`)}`;
		qnParts.push({body});
		ansParts.push({body: answers[permutes[permute][i]]});
		solnParts.push({body: solns[permutes[permute][i]]});
	}
	const qn = {body: `Integrate the following`, parts: qnParts};
	const ans = {parts: ansParts};
	const soln = {parts: solnParts};
	return [qn, ans, soln];
}