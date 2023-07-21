import { display, math, newParagraph, strong } from 'mathlifier';
import { bisection } from 'mathlify';

//! title
const title = 'Graphical methods';

//! qn
const x1 = bisection((x)=>4*Math.log(x)-x,1,2);
const x2 = bisection((x)=>4*Math.log(x)-x,5,10);
const qn = `${newParagraph}
	Solve the inequality
  ${display(`4\\ln x < x.`)}
`;

//! solution steps
const step0 = `We will draw the graphs of
	${math(`y=4\\ln x`)} and ${math(`y=x`)} using our GC.
	Also observe that the graph of ${math(`y=4\\ln x`)}
	has a vertical asymptote ${math(`x=0.`)}
`; //TODO: add graph
const step1 = `We will use the GC intersect solver to obtain the two
	points of intersection. Their ${math(`x\\textrm{-coordinates}`)} are
	${math(`x=${x1.toPrecision(3)}`)} and ${math(`x=${x2.toPrecision(3)}.`)}
`;
const step2 = `To solve the inequality
	${math(`4\\ln x < x,`)} we need to identify the regions in our
	graph such that the graph of ${math(`y=4\\ln x`)} is
	${strong(`below`)} the graph of ${math(`y=x.`)}
	${newParagraph}
	This occurs in the region between the asymptote and the first intersection point,
	and also in the region to the right of the second intersection point.
	${newParagraph}
	This gives us the final answer
	${display(`0 < x < ${x1.toPrecision(3)} \\quad \\textrm{ or }\\quad  x > ${x2.toPrecision(3)} \\; \\blacksquare`)}
`;//TODO: Graph with shading

//! Next section description
const nextSectionTitle = 'Miscellaneous';
const nextSection = `In the next section we will learn how to use the
	discriminant and the modulus function to solve questions.
`;

const steps = [
	{
		title: 'Draw graphs',
		body: step0,
	},
	{
		title: 'Get intersection points',
		body: step1,
	},
	{
		title: 'Solve the inequality',
		body: step2,
	},
];

export const content = {
	title,
	body: qn,
	steps,
	nextSection,
	nextSectionTitle,
};
