import { alignStar, display, math } from 'mathlifier';

const title = `${math(`f'(x)`)} formulas`;

const formulas = `${alignStar(`&(1) && \\int \\frac{f'(x)}{f(x)} \\, \\mathrm{d}x = \\ln \\lvert f(x) \\rvert + c
  \\\\ &(2) && \\int f'(x) \\left( f(x) \\right)^n \\, \\mathrm{d}x = \\frac{\\left( f(x) \\right)^{n+1}}{n+1} + c, \\quad \\textrm{ for } n \\neq -1
  \\\\ &(3) && \\int f'(x) \\operatorname{e}^{f(x)} \\, \\mathrm{d}x = \\mathrm{e}^{f(x)} + c
`)}`;
const mobileFormulas = `${alignStar(`&(1) && \\int \\frac{f'(x)}{f(x)} \\, \\mathrm{d}x 
  \\\\ &&& \\qquad = \\ln \\lvert f(x) \\rvert + c
\\\\ &(2) && \\int f'(x) \\left( f(x) \\right)^n \\, \\mathrm{d}x 
  \\\\ &&& \\qquad = \\frac{\\left( f(x) \\right)^{n+1}}{n+1} + c, \\quad \\textrm{ for } n \\neq -1
\\\\ &(3) && \\int f'(x) \\, \\mathrm{e}^{f(x)} \\, \\mathrm{d}x 
  \\\\ &&& \\qquad = \\mathrm{e}^{f(x)} + c
`)}`;

const title1 = `The logarithm formula`;
const body1 = `<p>The logarithm formula ${math(`(1)`)}
  ${display(
		`(1) \\quad \\int \\frac{f'(x)}{f(x)} \\, \\mathrm{d}x = \\ln \\lvert f(x) \\rvert + c`,
	)}
  if useful for fractions.
  <h4>Examples</h4>
    ${display(`\\int \\frac{2x}{x^2 - 1} \\, \\mathrm{d}x`)}
    fits the formula where ${math(`f(x) = x^2-1`)} and
    ${math(`f'(x)=2x.`)} Obtaining the answer is thus a straightforward
    application of the formula to get
    ${display(`\\ln \\lvert x^2 - 1 \\rvert + c.`)}
  <h4>Modifying with numbers</h4>
  <p>
    If we are off from the formula by just a constant, we can apply the following
    tricks
  ${alignStar(`& \\int \\frac{6x}{x^2-1} \\, \\mathrm{d}x
    \\\\ &= 3 \\int \\frac{2x}{x^2-1} \\, \\mathrm{d}x
    \\\\ &= 3 \\ln \\lvert x^2 - 1 \\rvert + c
  `)}
  ${alignStar(`& \\int \\frac{x}{x^2-1} \\, \\mathrm{d}x
    \\\\ &= \\frac{1}{2} \\int \\frac{2x}{x^2-1} \\, \\mathrm{d}x
    \\\\ &= \\frac{1}{2} \\ln ( x^2 + 1) + c
  `)}
  Note that we dropped to modulus for the last example because
  ${math(`x^2 + 1`)} is always positive.
`;

const title2 = `The power formula`;
const body2 = `<p>The power formula ${math(`(2)`)}
  ${display(
		`(2) \\quad \\int f'(x) \\left( f(x) \\right)^n \\, \\mathrm{d}x = \\frac{\\left( f(x) \\right)^{n+1}}{n+1} + c`,
	)}
  is the next formula, where we have to identify the power
  ${math(`n`)} in addition to ${math(`f(x).`)}
  <h4>Example</h4>
    ${display(`\\int \\frac{2x}{(x^2 - 1)^2} \\, \\mathrm{d}x`)}
    does not fit the logarithm formula. However, by letting
    ${math(`n=-2,`)} we can then use formula ${math(`(2)`)}
    to get
    ${alignStar(`& \\int \\frac{2x}{(x^2 - 1)^2} \\, \\mathrm{d}x
      \\\\ &= \\int 2x (x^2 - 1)^{-2} \\, \\mathrm{d}x
      \\\\ &= \\frac{(x^2 - 1)^{-1}}{-1} + c
      \\\\ &= - \\frac{1}{x^2 - 1} + c
    `)}
`;

const title3 = `The exponential formula`;
const body3 = `<h4>Example</h4>
    ${alignStar(`& \\int x \\operatorname{e}^{x^2 - 1}  \\operatorname{d}\\!x
      \\\\ &= \\frac{1}{2} \\int 2x \\operatorname{e}^{x^2 - 1}  \\, \\mathrm{d}x
      \\\\ &= \\frac{1}{2} \\operatorname{e}^{x^2 - 1} + c
    `)}
`;

const steps = [
	{
		title: title1,
		body: body1,
	},
	{
    title: title2,
    body: body2,
  },
  {
    title: title3,
    body: body3,
  }
];

export const content = {
	title,
	formulas,
	mobileFormulas,
	steps,
};
