import { alignStar, display, equation, newline, math, newParagraph, gatherStar } from 'mathlifier';
import { Polynomial, Expression, Fraction, completeSquare, solveLinear, Term } from 'mathlify';

// working
const prevTechnique = `<a href="./01-factorisable">previous technique,</a>`;

// qn
const a = 1,
	b = -10,
	c = 33,
	e = 3,
	d = -5;
const num = new Polynomial([a, b, c]);
const den = new Polynomial([e, d], { ascending: true });
const sign = '<';
// step 1
const square = new Polynomial([a, new Fraction(b, 2 * a)]);
const offset = new Fraction(b, 2).abs();
const squareExp = `(${square})^2`;
const completeSquareWorking = new Expression(squareExp, new Term(-1, `${offset}^2`), c);
const completedSquare = completeSquare(num);
const signAns = '>';
const root = solveLinear(den);

const body = `Solve
  ${display(`\\frac{${num}}{${den}} ${sign} 0.`)}
`;

const step0 = `Just like in the
${prevTechnique}
we make one side of our inequality zero by addition
or subtraction.
${newParagraph}
The right side is already zero for this current example so let's
move on to the next step.
`;

const step1 = `We observe that our numerator cannot be factorized because
it has no real roots. We will then complete the square.
${alignStar(`\\frac{${num}}{${den}}       &${sign} 0 \\\\
\\frac{${completeSquareWorking}}{${den}}  &${sign} 0 \\\\
\\frac{${completedSquare}}{${den}}        &${sign} 0
`)}
`;
const step2 = `Upon completing the square, we are able to observe
  that our expression on the numerator is always positive.
  ${newParagraph}
  In our ${prevTechnique} we cautioned against "cross-multiplication" as
  inequality signs change depending on whether an expression is positive or
  negative. Now that our numerator is always positive,
  we can now divide both sides of our inequality by it.
  ${equation(`\\frac{${completedSquare}}{${den}} ${sign} 0`)}
  Since ${math(`${squareExp} \\geq 0`)} for all real values of ${math(`x,`)}
  ${newline}${math(`${completedSquare}`)} is always positive.
  ${newParagraph}From ${math(`(1),`)}
  ${display(`\\frac{1}{${den}} ${sign} 0`)}
`;

const step3 = `We now use the regular number line approach to complete 
  solving the question.
  ${newParagraph}
  ${display(`x ${signAns} ${root} \\; \\blacksquare`)}
`;
//! Number line

function frac(num: string, den: string, flip = false): string {
	if (flip) {
		[num, den] = [den, num];
	}

	return den === '1' ? `${num}` : `\\frac{${num}}{${den}}`;
}

const title = 'Quadratics that are always positive';

const steps = [
	{
		title: 'Make one side zero',
		body: step0,
	},
	{
		title: 'Complete the square',
		body: step1,
	},
	{
		title: 'Prove that the quadratic is alway positive',
		body: step2,
	},
	{
		title: 'Get final answer via the number line approach',
		body: step3,
	},
];

export const content = {
	title,
	body,
	steps,
};
