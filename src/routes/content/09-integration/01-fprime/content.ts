import { align, alignStar, display, gatherStar, math, newParagraph } from 'mathlifier';
import { Polynomial, Expression, Term, factorizeQuadratic } from 'mathlify';
import { generateInequalitiesAnswer } from '$lib/qnGen/01-eqns/generateInequalitiesAnswer';

const title = `${math(`f'(x)`)} formulas`;

const formulas = `${alignStar(`&(1) && \\int \\frac{f'(x)}{f(x)} \\; \\mathrm{d}x = \\ln \\lvert f(x) \\rvert + c
  \\\\ &(2) && \\int f'(x) \\left( f(x) \\right)^n \\; \\mathrm{d}x = \\frac{\\left( f(x) \\right)^{n+1}}{n+1} + c, \\quad \\textrm{ for } n \\neq -1
  \\\\ &(3) && \\int f'(x) \\; \\mathrm{e}^{f(x)} \\; \\mathrm{d}x = \\mathrm{e}^{f(x)} + c
`)}`;
const mobileFormulas = `${alignStar(`&(1) && \\int \\frac{f'(x)}{f(x)} \\; \\mathrm{d}x 
  \\\\ &&& \\qquad = \\ln \\lvert f(x) \\rvert + c
\\\\ &(2) && \\int f'(x) \\left( f(x) \\right)^n \\; \\mathrm{d}x 
  \\\\ &&& \\qquad = \\frac{\\left( f(x) \\right)^{n+1}}{n+1} + c, \\quad \\textrm{ for } n \\neq -1
\\\\ &(3) && \\int f'(x) \\; \\mathrm{e}^{f(x)} \\; \\mathrm{d}x 
  \\\\ &&& \\qquad = \\mathrm{e}^{f(x)} + c
`)}`;

// (3x-7)/(x-1) > 1-x
const a = 3,
	b = -7,
	c = -1,
	d = 1,
	e = -1,
	sign = '>';
const num1 = new Polynomial([a, b]);
const den = new Polynomial([1, c]);
const rhs = new Polynomial([d, e], { ascending: true });
// move to rhs
const lhs1 = new Expression(`\\frac{${num1}}{${den}}`, -d, new Term(-e, 'x'));
// combine
const num2 = `${num1} + (${rhs.negative()})(${den})`;
const num3 = num1.minus(rhs.times(den));
// factorise
const [factor1, factor2, roots] = factorizeQuadratic(num3);
// number line
const ans = generateInequalitiesAnswer(roots[0], roots[1], -c);

const title1 = `The logarithm formula`;
const body1 = `<p>The logarithm formula ${math(`(1)`)}
  ${display(
		`(1) \\quad \\int \\frac{f'(x)}{f(x)} \\; \\mathrm{d}x = \\ln \\lvert f(x) \\rvert + c`,
	)}
  if useful for fractions.
  <h4>Examples</h4>
    ${display(`\\int \\frac{2x}{x^2 - 1} \\; \\mathrm{d}x`)}
    fits the formula where ${math(`f(x) = x^2-1`)} and
    ${math(`f'(x)=2x.`)} Obtaining the answer is thus a straightforward
    application of the formula to get
    ${display(`\\ln \\lvert x^2 - 1 \\rvert + c.`)}
  <h4>Modifying with numbers</h4>
  <p>
    If we are off from the formula by just a constant, we can apply the following
    tricks
  ${alignStar(`& \\int \\frac{6x}{x^2-1} \\; \\mathrm{d}x
    \\\\ &= 3 \\int \\frac{2x}{x^2-1} \\; \\mathrm{d}x
    \\\\ &= 3 \\ln \\lvert x^2 - 1 \\rvert + c
  `)}
  ${alignStar(`& \\int \\frac{x}{x^2-1} \\; \\mathrm{d}x
    \\\\ &= \\frac{1}{2} \\int \\frac{2x}{x^2-1} \\; \\mathrm{d}x
    \\\\ &= \\frac{1}{2} \\ln \\lvert x^2 - 1 \\rvert + c
  `)}
`;

const title2 = `The power formula`;
const body2 = `<p>The power formula ${math(`(2)`)}
  ${display(
		`(2) \\quad \\int f'(x) \\left( f(x) \\right)^n \\; \\mathrm{d}x = \\frac{\\left( f(x) \\right)^{n+1}}{n+1} + c`,
	)}
  is the next formula, where we have to identify the power
  ${math(`n`)} in addition to ${math(`f(x).`)}
  <h4>Examples</h4>
    ${display(`\\int \\frac{2x}{(x^2 - 1)^2} \\; \\mathrm{d}x`)}
    does not fit the logarithm formula. However, by letting
    ${math(`n=-2,`)} we can then use formula ${math(`(2)`)}
    to get
    ${alignStar(`  `)}
  <h4>Modifying with numbers</h4>
  <p>
    If we are off from the formula by just a constant, we can apply the following
    tricks
  ${alignStar(`& \\int \\frac{6x}{x^2-1} \\; \\mathrm{d}x
    \\\\ &= 3 \\int \\frac{2x}{x^2-1} \\; \\mathrm{d}x
    \\\\ &= 3 \\ln \\lvert x^2 - 1 \\rvert + c
  `)}
  ${alignStar(`& \\int \\frac{x}{x^2-1} \\; \\mathrm{d}x
    \\\\ &= \\frac{1}{2} \\int \\frac{2x}{x^2-1} \\; \\mathrm{d}x
    \\\\ &= \\frac{1}{2} \\ln \\lvert x^2 - 1 \\rvert + c
  `)}
`;

const body = `Solve ${display(`\\frac{${num1}}{${den}} ${sign} ${rhs}.`)}`;

const steps = [
	{
		title: title1,
		body: body1,
	},
	{
		title: 'Move terms by addition or subtraction',
		body: `Since cross multiplication is not valid, we will use addition or subtraction to
      move terms around such that one side of the inequality is zero.
      ${newParagraph}
      For our example, this gives us
      ${gatherStar(`\\frac{${num1}}{${den}} ${sign} ${rhs} \\\\
        ${lhs1} ${sign} 0`)}
    `,
	},
	{
		title: 'Combine into a single fraction',
		body: `We then combine the terms into a single fraction
      ${gatherStar(`${lhs1} ${sign} 0 \\\\
      \\frac{${num2}}{${den}} ${sign} 0 \\\\
      \\frac{${num3}}{${den}} ${sign} 0`)}
    `,
	},
	{
		title: 'Factorise everything',
		body: `We proceed with factorization
      ${alignStar(`\\frac{${num3}}{${den}} &${sign} 0 \\\\
      \\frac{(${factor1})(${factor2})}{${den}} &${sign} 0 \\\\
      `)}
    `,
	},
	{
		title: 'The number line approach',
		body: `The factors ${math(`(${factor1}),`)}
    ${math(`(${factor2})`)} and
    ${math(`(${den})`)} have corresponding roots
    ${math(`${roots[0]}, ${roots[1]}`)} and ${math(`${-c}`)}.
    Let's plot them out on a number line
    ${newParagraph}
    NUMBERLINE
    ${newParagraph}    
    We notice that the number line is now broken up into 4 regions which we
    name ${math(`A,B,C`)} and ${math(`D.`)}
    ${newParagraph}
    Now consider region ${math(`A`)} on the right. That happens when
    ${math(`x`)} is bigger than ${math(`2.`)} Under such a case,
    our fraction ${math(`\\frac{(${factor1})(${factor2})}{${den}}`)} is positive
    because, individually
    ${math(`(${factor1}),`)}
    ${math(`(${factor2})`)} and
    ${math(`(${den})`)} will be positive when ${math(`x > 2.`)}
    ${newParagraph}
    Now consider region ${math(`B,`)} where ${math(`1 < x < 2.`)}
    Now ${math(`(x-2)`)} will be negative while
    ${math(`(x+3)`)} and ${math(`(x-1)`)} will still be positive so our overall fraction
    ${math(`\\frac{(x+3)(x-2)}{x-1}`)} will be negative.
    ${newParagraph}
    Repeating this analysis over regions ${math(`C`)}
    and ${math(`D`)} gives us the following picture:
    ${newParagraph}
    NUMBERLINE2
    ${newParagraph}`,
		info: `An alternative method to the analysis above will be a "test point" method, where
      we substitute test values (e.g. ${math(`x=3`)} for region ${math(`A`)} and ${math(
			`x=1.5`,
		)} for region ${math(`B`)})
      into the fraction to check if the result is positive or negative.`,
	},
	{
		title: 'The final answer',
		body: `We are now ready to solve our inequality. We want
      ${display(`\\frac{(x+3)(x-2)}{x-1} > 0`)}
      so that means the answers are located in the positive regions
      ${math(`C`)} and ${math(`A.`)}
      ${newParagraph}
      This gives us our final answer
      ${ans}
    `,
	},
];

export const content = {
	title,
	formulas,
	mobileFormulas,
	body,
	steps,
};
