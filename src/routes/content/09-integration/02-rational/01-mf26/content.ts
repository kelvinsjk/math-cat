import { alignStar, math,  } from 'mathlifier';

const title = 'Formulas in List MF26';

const formula1 = `${alignStar(`&(1) && \\int \\frac{1}{x^2 + a^2} \\, \\mathrm{d}x = \\frac{1}{a} \\tan^{-1} \\left( \\frac{x}{a} \\right) + c
  \\\\ &(2) && \\int \\frac{1}{\\sqrt{a^2-x^2}} \\, \\mathrm{d}x = \\sin^{-1} \\left( \\frac{x}{a} \\right) + c, \\quad \\textrm{ for } \\lvert x \\rvert < a
  \\\\ &(3*) && \\int \\frac{1}{x^2-a^2} \\, \\mathrm{d}x = \\frac{1}{2a} \\ln \\left( \\frac{x-a}{x+a} \\right) + c, \\quad \\textrm{ for } x > a
  \\\\ &(4*) && \\int \\frac{1}{a^2-x^2} \\, \\mathrm{d}x = \\frac{1}{2a} \\ln \\left( \\frac{a+x}{a-x} \\right) + c, \\quad \\textrm{ for } \\lvert x \\rvert < a`
)}`;
const formula2 = `${alignStar(`&(3) && \\int \\frac{1}{x^2-a^2} \\, \\mathrm{d}x = \\frac{1}{2a} \\ln \\left \\lvert \\frac{x-a}{x+a} \\right \\rvert + c
  \\\\ &(4) && \\int \\frac{1}{a^2-x^2} \\, \\mathrm{d}x = \\frac{1}{2a} \\ln \\left \\lvert \\frac{a+x}{a-x} \\right \\rvert + c `
)}`;

const formulaM = `${alignStar(`&(1) && \\int \\frac{1}{x^2 + a^2} \\, \\mathrm{d}x
  \\\\ &&& \\qquad = \\frac{1}{a} \\tan^{-1} \\left( \\frac{x}{a} \\right) + c
  \\\\ &(2) && \\int \\frac{1}{\\sqrt{a^2-x^2}} \\, \\mathrm{d}x 
  \\\\ &&& \\qquad = \\sin^{-1} \\left( \\frac{x}{a} \\right) + c, \\quad \\textrm{ for } \\lvert x \\rvert < a
  \\\\ &(3*) && \\int \\frac{1}{x^2-a^2} \\, \\mathrm{d}x
  \\\\ &&& \\qquad = \\frac{1}{2a} \\ln \\left( \\frac{x-a}{x+a} \\right) + c, \\quad \\textrm{ for } x > a
  \\\\ &(4*) && \\int \\frac{1}{a^2-x^2} \\, \\mathrm{d}x 
  \\\\ &&& \\qquad = \\frac{1}{2a} \\ln \\left( \\frac{a+x}{a-x} \\right) + c, \\quad \\textrm{ for } \\lvert x \\rvert < a
`)}`;
const formulaM2 = `${alignStar(`&(3) && \\int \\frac{1}{x^2-a^2} \\, \\mathrm{d}x 
  \\\\ &&& \\qquad = \\frac{1}{2a} \\ln \\left \\lvert \\frac{x-a}{x+a} \\right \\rvert + c
  \\\\ &(4) && \\int \\frac{1}{a^2-x^2} \\, \\mathrm{d}x 
  \\\\ &&& \\qquad = \\frac{1}{2a} \\ln \\left \\lvert \\frac{a+x}{a-x} \\right \\rvert + c`
)}`;

const formulas = `The following 4 formulas are provided in the list of
  formulas MF26.
  ${formula1}
  For formulas ${math(`(3*)`)} and ${math(`(4*),`)}
  the domain restriction on ${math(`x`)} is potentially troublesome so using the following two updated formulas is recommended instead
  ${formula2}
`
const mobileFormulas = `The following 4 formulas are provided in the list of
  formulas MF26.
  ${formulaM}
  For formulas ${math(`(3*)`)} and ${math(`(4*),`)}
  the domain restriction on ${math(`x`)} is potentially troublesome so using the following two updated formulas is recommended instead
  ${formulaM2}
`;

//! Examples
const examples = `Using formulas ${math(`(1), (2)`)}
	and ${math(`(3),`)}
	${alignStar(`&\\int \\frac{1}{x^2 + 3^2} \\, \\mathrm{d}x = \\frac{1}{3} \\tan^{-1} \\left( \\frac{x}{3} \\right) + c \\; \\blacksquare
		\\\\ &\\int \\frac{1}{\\sqrt{4-x^2}} \\, \\mathrm{d}x = \\sin^{-1} \\left( \\frac{x}{2} \\right) + c \\; \\blacksquare
		\\\\ &\\int \\frac{1}{x^2 - 3} \\, \\mathrm{d}x = \\frac{1}{2\\sqrt{3}} \\ln \\left\\lvert \\frac{x-\\sqrt{3}}{x+\\sqrt{3}} \\right\\rvert + c \\; \\blacksquare
	`)}
`;

const coeffExample = `When the coefficient of ${math(`x^2`)} is not one, many forget to use the chain rule in addition to
	applying the formulas above. To avoid this mistake, we recommend taking the coefficient out of the integral first, as in
	the following example using formula ${math(`(4)`)}
	${alignStar(`& \\int \\frac{1}{9-4x^2} \\, \\mathrm{d}x
		\\\\ & = \\frac{1}{4} \\int \\frac{1}{\\frac{9}{4} - x^2} \\, \\mathrm{d}x
		\\\\ &= \\frac{1}{4} \\left( \\frac{1}{2 \\left( \\frac{3}{2} \\right)} \\right) \\ln \\left\\lvert \\frac{\\frac{3}{2} + x}{\\frac{3}{2} - x} \\right\\rvert + c
		\\\\ &= \\frac{1}{12} \\ln \\left\\lvert \\frac{3 + 2x}{3 - 2x} \\right\\rvert + c \\; \\blacksquare
	`)}
`

export const content = {
	title,
	examples,
	coeffExample,
  formulas,
  mobileFormulas,
};
