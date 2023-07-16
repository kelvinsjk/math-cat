import { display, } from "mathlifier"

const title = 'Rational inequalities';

const body = `In this section, we will learn how to solve rational inequalities
such as ${display(`\\frac{x+1}{(x-2)(x+3)} > 0`)} and
${display(`\\frac{x^2 + 5x + 9}{x-1} < 1`)}
algebraically.
`;

const techniques = [
  {
    title: 'Factorisable expressions',
    url: '01-factorisable'
  },
  { 
    title: 'Positive quadratics',
    url: '02-positive'
  }
];

export const content = {
  title,
  body,
  techniques
}