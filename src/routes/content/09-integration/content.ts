import { display, math } from "mathlifier"

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

import { techniques as techniques2 } from './02-rational/content';
//import { techniques as techniques2 } from './02-gc/content';
//import { techniques as techniques3 } from './03-misc/content';

export const sections = [
  { 
    title: `${math(`f'(x)`)} formulas`,
    slug: '01-f-prime',
    techniques: []
  },
  { 
    title: 'Rational-like integrals',
    slug: '02-rational',
    techniques: techniques2
  },
  {
    title: 'Trigonometric integrals',
    slug: '03-trigo',
    techniques: []
  },
  {
    title: 'Integration by parts',
    slug: '04-by-parts',
    techniques: []
  },
  {
    title: 'Substitution',
    slug: '05-substitution',
    techniques: []
  }
]