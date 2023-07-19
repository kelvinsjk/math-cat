import { alignStar, display, } from "mathlifier"

const title = 'GC methods';

const body = `In this section, we will learn how to solve equations and inequalities
with the help of a graphing calculator. They include systems of linear equations
such as ${alignStar(`x+y+z &= 2 \\\\ 2x - 3y + z &= -1 \\\\ x - y + 2z &= 0`)} and
solving inequalities such as
${display(`2\\ln x + 1 > x`)}
graphically.
`;

const techniques = [
  {
    title: 'System of linear equations',
    url: '01-sle'
  },
  { 
    title: 'Graphical equations and inequalities',
    url: '02-graphical'
  }
];

export const content = {
  title,
  body,
  techniques
}