import { alignStar, display, math, newParagraph, gatherStar, } from 'mathlifier';
import { Polynomial, Expression, solveQuadraticSurd } from 'mathlify';

const title = 'The Discriminant';
const overview = `The quadratic discriminant
  ${math(`b^2 - 4ac`)} allows us to determine the number
  of distinct roots in a quadratic.
  ${newParagraph}
  This can help us in some questions where we have to
  find the range of values a variable can take (or cannot take).
`;

//! Set up
const a = 1,
	b = -3,
	c = 8,
	d = 1,
	e = -4;
const num = new Polynomial([a, b, c]);
const den = new Polynomial([d, e]);
const B = new Polynomial([b, -d], { variable: 'y', ascending: true });
const C = new Polynomial([c, -e], { variable: 'y', ascending: true });
const quad = new Expression(`x^2`, `(${B})x`, `(${C})`);
const yPoly = B.square().minus(C.times(4)).changeAscending(false);
const [cy, by, ay] = yPoly.coeffs;
const [y1, y2] = solveQuadraticSurd(yPoly);
const [rational, surd] = y2.terms;

//! Question
const question = `It is given that
  ${display(`y = \\frac{${num}}{${den}}`)}
  Without using a calculator, find the set of values that
  ${math(`y`)} can take.
`;

//! Steps
const steps = [
	{
		title: 'Rearrange the equation to get a quadratic',
		body: `Since we are not allowed to use a calculator, we are limited
      in the methods we can use. We will cross multiply and move all
      terms to one side.
      ${gatherStar(`y = \\frac{${num}}{${den}}
        \\\\ y(${den}) = ${num}
        \\\\ ${quad} = 0
      `)}
      We can view this as a quadratic in ${math(`x`)}
      with "coefficients" ${math(`1,`)}
      ${math(`-3-y`)} and ${math(`8+4y`)}
    `,
	},
	{
		title: 'Use the discriminant',
		//TODO: graph
		body: `If we approach this question graphically, we can see that
			the set of values that ${math(`y`)} can take correspond
			to regions where its graph cut a horizontal line
			either once or twice.
			${newParagraph}
			The discriminant is useful in such situations.
			${display(`${quad} = 0`)}
			For the set of values that ${math(`y`)} can take,
			the discriminant
			${gatherStar(`b^2 - 4ac \\geq 0
				\\\\ (${B})^2 - 4(${a})(${C}) \\geq 0
				\\\\ ${yPoly} \\geq 0
			`)}
    `,
	},
	{
		title: `Use the quadratic formula`,
		body: `Unfortunately we are not able to factorize 
		our quadratic ${math(`${yPoly}`)} with integers so we
		will have to use our quadratic formula.
		${newParagraph}
		The roots to ${math(`${yPoly} = 0`)} are 
		${alignStar(`y &= \\frac{-(${by}) \\pm \\sqrt{(${by})^2 - 4(${ay})(${cy})}}{2(${ay})}
		\\\\ &= ${rational} \\pm ${surd}
		`)}
    `,
	},
	{
		//TODO: inequalities graph
		title: `Solve the quadratic inequality in ${math(`y`)}`,
		body: `Solving the quadratic inequality
			${math(`${yPoly} \\geq 0`)}
			gives us
			${display(`y \\leq ${y1} \\; \\textrm{ or } \\; y \\geq ${y2}`)} 
		`,
	},
	{
		//TODO: link to functions
		title: `Final answer in set notation`,
		body: `The question asks us for a set so we will write our inequality
			range from the previous step in set notation. We can use the
			open/close interval notation from the functions topic.
			${newParagraph}
			Final solution:
			${display(
				`\\left(-\\infty, ${y1} \\; \\right] \\cup \\left[ \\; ${y2}, \\infty\\right) \\; \\blacksquare`,
			)}
		`,
	},
];

export const content = {
	title,
	overview,
	question,
	steps,
};
