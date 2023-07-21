import { alignStar, display, align, math, newParagraph, gatherStar, equation, } from "mathlifier"
import { Polynomial, Expression, Term, cramersFrac, Fraction } from "mathlify";


const title = 'The Discriminant';

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
//! Example 2
const a1 = 11, b1 = 4, c1 = 2, p1 = '144.35';
const a2 = 9, b2 = 8, c2 = 6, p2 = '213.45';
const a3 = 10, b3 = 7, c3 = 2, p3 = '169.40';
const [s,t,p] = cramersFrac(
  a1, b1, c1, new Fraction(Number(p1.slice(4)),100).plus(Number(p1.slice(0,3))),
  a2, b2, c2, new Fraction(Number(p2.slice(4)),100).plus(Number(p2.slice(0,3))),
  a3, b3, c3, new Fraction(Number(p3.slice(4)),100).plus(Number(p3.slice(0,3))),
);


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
  },
  {
    question: `Tickets for a school concert are priced differently depending on whether the attendee is a student, a teacher, or a parent.
      Three groups of people, ${math(`A, B`)} and ${math(`C`)}
      attend the concert.
      ${newParagraph}
      There are ${math(`${a1}`)} students, ${math(`${b1}`)} teachers and ${math(`${c1}`)} parents in group ${math(`A`)}
      and the total cost of their tickets is ${math(`\\$${p1}.`)}
      ${newParagraph}
      There are ${math(`${a2}`)} students, ${math(`${b2}`)} teachers and ${math(`${c2}`)} parents in group ${math(`B`)}
      and the total cost of their tickets is ${math(`\\$${p2}.`)}
      ${newParagraph}
      There are ${math(`${a3}`)} students, ${math(`${b3}`)} teachers and ${math(`${c3}`)} parents in group ${math(`A`)}
      and the total cost of their tickets is ${math(`\\$${p3}.`)}
      ${newParagraph}
      Find the price of each student, teacher and parent ticket.
    `,
    solution: [
      { 
        title: 'Set up the unknowns',
        body: `Let ${math(`s, t`)} and ${math(`p`)} represent the price of each
          student, teacher and parent ticket respectively.
        `
      },
      {
        title: 'Set up the system of equations',
        body: `${align(`${a1}s + ${b1}t + ${c1}p &= ${p1}
            \\\\ ${a2}s + ${b2}t + ${c2}p &= ${p2}
            \\\\ ${a3}s + ${b3}t + ${c3}p &= ${p3}
          `)}
        `
      },
      {
        title: 'Solve the system of equations using a GC',
        body: `Solving equations ${math(`(1), (2)`)} and ${math(`(3)`)} using a GC, 
          ${display(`s=${s.toFixed(2)}, \\; t=${t.toFixed(2)}, \\; p=${p.toFixed(2)} \\; \\blacksquare`)}
        `
      }
    ]
  },

]

export const content = {
  title,
  examples
}