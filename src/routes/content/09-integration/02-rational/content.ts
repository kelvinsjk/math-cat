import { gatherStar, } from "mathlifier"

const title = 'Rational-like integrals';

const body = `In this section, we will learn how to integrate fractions
such as ${gatherStar(`\\int \\frac{1}{x^2 \\pm a^2} \\, \\mathrm{d}x
  \\\\ \\int \\frac{1}{\\sqrt{a^2 - x^2}} \\, \\mathrm{d}x
  \\\\ \\int \\frac{1}{a^2 - x^2} \\, \\mathrm{d}x
`)} and
${gatherStar(`\\int \\frac{1}{x^2-x+1} \\, \\mathrm{d}x
  \\\\ \\int \\frac{1}{(x-2)(x^2+1)} \\, \\mathrm{d}x
`)}
`;

export const techniques = [
  {
    title: 'Formulas in List MF26',
    slug: '01-mf26'
  },
  { 
    title: 'Completing the square',
    slug: '02-complete-square'
  },
  {
    title: 'Partial fractions',
    slug: '03-partial-fractions'
  }
];

export const content = {
  title,
  body,
  techniques
}