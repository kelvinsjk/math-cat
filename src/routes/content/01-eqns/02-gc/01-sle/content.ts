import { alignStar, display, align, math, newParagraph, gatherStar, equation, } from "mathlifier"
import { Polynomial, Expression, Term, factorizeQuadratic, cramersFrac, Fraction } from "mathlify";


const title = 'System of Linear Equations';

//! Example 1
const x1 = -1, y1 = 8;
const x2 = 1, y2 = -32;
const turningX = -1;
const integral_0_1 = -19;
const [a,b,c,d] = cramersFrac(
  x1**3, x1**2, x1, 1, y1,
  x2**3, x2**2, x2, 1, y2,
  3*turningX**2, 2*turningX, 1, 0, 0,
  new Fraction(1,4), new Fraction(1,3), new Fraction(1,2), 1, integral_0_1
);
const exp1 = new Expression(new Term(x1**3, 'a'), new Term(x1**2, 'b'), new Term(x1, 'c'), new Term(1, 'd'));
const exp2 = new Expression(new Term(x2**3, 'a'), new Term(x2**2, 'b'), new Term(x2, 'c'), new Term(1, 'd'));
const exp3 = new Expression(new Term(3*turningX**2, 'a'), new Term(2*turningX, 'b'), new Term(1, 'c'));
const ans = new Polynomial([a,b,c,d]);

const examples = [
  {
    question: `${math(`f(x)`)} is a cubic polynomial.
      The graph of ${math(`y=f(x)`)} passes through the points
      ${math(`(${x1},${y1})`)} and ${math(`(${x2},${y2}).`)}
      The graph has a turning point at ${math(`x = ${turningX}`)},
      and
      ${math(`\\displaystyle \\int_0^1 f(x) \\; \\mathrm{d}x = ${integral_0_1}.`)}
      ${newParagraph}
      Find an expression for ${math(`f(x)`)} in terms of ${math(`x.`)}
    `,
    solution: [
      { 
        title: 'Set up the polynomial expression',
        body: `Since ${math(`f(x)`)} is a cubic polynomial
          ${display(`f(x) = ax^3 + bx^2 + cx + d`)}
          where ${math(`a,b,c`)} and ${math(`d`)} are constants.
        `
      },
      {
        title: 'Set up the system of equations',
        body: `Since the graph of ${math(`y=f(x)`)} passes through the points
          ${math(`(${x1},${y1})`)} and ${math(`(${x2},${y2}),`)}
          ${alignStar(`a(${x1})^3 + b(${x1})^2 + c(${x1}) + d &= ${y1}
            \\\\ a(${x2})^3 + b(${x2})^2 + c(${x2}) + d       &= ${y2}
          `)}
          Simplifying gives us the first two equations
          ${align(`${exp1} &= ${y1} \\\\ ${exp2} &= ${y2}`)}
          We then find the derivative
          ${gatherStar(`\\frac{\\mathrm{d}y}{\\mathrm{d}x} = 3ax^2 + 2bx + c
            \\\\ \\text{When } x = ${turningX}, \\frac{\\mathrm{d}y}{\\mathrm{d}x} = 0
            \\\\ 3a(${turningX})^2 + 2b(${turningX}) + c = 0
          `)}
          This gives us our third equation
          ${equation(`${exp3} = 0`)}
          Integration will give us our final equation
          ${gatherStar(`\\int_0^1 ax^3 + bx^2 + cx + d \\; \\mathrm{d}x = ${integral_0_1}
            \\\\ \\left[ \\frac{a}{4}x^4 + \\frac{b}{3}x^3 + \\frac{c}{2}x^2 + dx \\right]_0^1 = ${integral_0_1}
          `)}
          ${equation(`\\frac{a}{4} + \\frac{b}{3} + \\frac{c}{2} + d = ${integral_0_1}`)}
        `
      },
      {
        title: 'Solve the system of equations using a GC',
        body: `Solving equations ${math(`(1), (2), (3)`)} and
          ${math(`(4),`)}
          ${display(`a=${a}, \\; b=${b}, \\; c=${c}, \\; d=${d}`)}
          This gives us our final solution
          ${display(`f(x) = ${ans} \\; \\blacksquare`)}
        `
      }
    ]
  }
]

export const content = {
  title,
  examples
}