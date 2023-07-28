import { align, display, gatherStar, math, newParagraph, strong } from 'mathlifier';
import { bisection } from 'mathlify';

//! title
const title = 'The modulus function';

//! qn
const x1 = bisection((x)=>4*Math.log(x)-x,1,2);
const x2 = bisection((x)=>4*Math.log(x)-x,5,10);
const question = `Solve the inequality
  ${display(`\\lvert x^2 - a^2 \\rvert > x + a,`)}
	where ${math(`a`)} is a positive constant.
	Leave your answers in terms of ${math(`a.`)}
`;

//! solution steps
const title0 = 'Draw graphs'
const step0 = `We will draw the graphs of
	${math(`y=x^2 - a^2`)} and ${math(`y=x+a.`)}
	Our GC can help us with the shape of the graphs,
	if we choose an
	arbitrary value for ${math(`a.`)} For example,
	we could let ${math(`a=2`)} and draw the graphs
	of ${math(`y=x^2 - 4`)} and ${math(`y=x+2.`)}
`; //TODO: add graph

const title1 = 'Solve for intersection points using plus/minus'
const step1 = `Since the question involves an unknown constant
	${math(`a,`)} we will have to solve for the intersection points
	manually.
	${display(`\\lvert x^2 - a^2 \\rvert = x + a`)}
	${align(`x^2 - a^2 &= x + a
		\\\\ \\textrm{or } \\quad -(x^2 - a^2) &= x + a
	`)}
	Considering equation ${math(`(3),`)}
	${gatherStar(`x^2 -a^2 = x+a
		\\\\ (x+a)(x-a) = x+a
		\\\\ (x+a)(x-a) - (x+a) = 0
		\\\\ (x+a)(x-a-1) = 0
		\\\\ x = -a \\quad \\textrm{ or } \\quad x = a+1
	`)}
	Considering equation ${math(`(4),`)}
	${gatherStar(`-(x^2 -a^2) = x+a
		\\\\ -(x+a)(x-a) = x+a
		\\\\ -(x+a)(x-a) - (x+a) = 0
		\\\\ (x+a)(-x+a-1) = 0
		\\\\ x = -a \\quad \\textrm{ or } \\quad x = a-1
	`)}
	Hence the two graphs intersect at
	${math(`x=-a,`)} ${math(`x=a-1,`)} and ${math(`x=a+1.`)}
`;

const title2 = `Solve the inequality graphically`
const step2 = `We observe that there is only one region
	where the line lies above the curve in between the second and
	third intersection point from the left.
	${newParagraph}
	This gives us the final answer
	${display(`a-1 < x < a+1 \\; \\blacksquare`)}
`;//TODO: Graph with shading

//! Next section description
const nextSectionTitle = 'Functions';
const nextSection = `We have now come to the end of the "Equations and Inequalities"
	chapter. Pick another chapter to continue.
`;

const steps = [
	{
		title: title0,
		body: step0,
	},
	{
		title: title1,
		body: step1,
	},
	{
		title: title2,
		body: step2,
	},
];

export const content = {
	title,
	question,
	steps,
	nextSection,
	nextSectionTitle,
};
