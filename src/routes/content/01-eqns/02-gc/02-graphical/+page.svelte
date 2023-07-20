<script lang="ts">
  import { fly, scale, crossfade } from 'svelte/transition';
  import { content } from './content';
  import {goto} from '$app/navigation';
  import {page} from '$app/stores';
	import { browser } from '$app/environment';
  
  const {title, body,steps} = content;
  let learnActive = true;
  function setLearnActive(active: boolean) {
    learnActive = active;
  }

  const x1 = bisection((x)=>Math.exp(-x)-5/(x**2+1)+1, -1, 0);
  const x2 = bisection((x)=>Math.exp(-x)-5/(x**2+1)+1, 1, 2);
  const x3 = bisection((x)=>Math.exp(-x)-5/(x**2+1)+1-3*x, -1, 0);

  // practice
  import { vars } from './variables';
  import { bisection, getRandomInt } from 'mathlify';
  import { qnGen } from '$lib/qnGen/01-eqns/q010102';
	import { tick } from 'svelte';
	import { display, math } from 'mathlifier';
  let variables = getNewVars();
  $: [qn, ans, soln] = qnGen(variables);

  type Variables = typeof vars[0];
  function getNewVars(): Variables {
    const variables =  vars[getRandomInt(0, vars.length - 1)];
    if (browser){
      goto(`${$page.route.id}?vars=${variables.id}`, {replaceState: true, noScroll: true, keepFocus: true});
    }
    return variables
  }

  const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 1200),
	});
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>


<main class="prose">
  <h1>{title}</h1>
  <div class="tabs">
    <button
      class="tab tab-lifted"
      class:tab-active={learnActive}
      on:click={() => setLearnActive(true)}
    >
    {#if learnActive}
      <div class="highlight" in:receive={{key: 0}} out:send={{key: 0}}></div>
    {/if}
      Learn
    </button> 
    <button 
      class="tab tab-lifted"
      class:tab-active={!learnActive}
      on:click={() => setLearnActive(false)}
      id="practice-tab"
    >
    {#if !learnActive}
      <div class="highlight" in:receive={{key: 0}} out:send={{key: 0}}></div>
    {/if}
      Practice
    </button> 
  </div>
  <div class="body">
    <div
      class="swap swap-flip w-full place-content-stretch"
      class:swap-active={learnActive}
    >
      <div class="swap-on">
        {#if learnActive}
        <div>
          <h2 class="mt-2">Overview</h2>
          <p>
            Some equations and inequalities like
            {@html math(`\\mathrm{e}^x = x + 5`)}
            or
            {@html math(`\\ln x > 5 - x`)}
            are impossible or impractical to solve by algebraic methods so
            we use use <b>graphical</b> methods using a GC.
          </p>
          <p>
            This is sometimes also called <b>numerical</b> methods
            as we will be getting numerical answers as opposed to
            algebraic quantities.
          </p>
          <h2>Zero solver</h2>
          <p>
            The "zero" solver helps us find where a curve cuts the
            {@html math(`x\\textrm{-axis}.`)}
          </p>
          <h3>Example</h3>
          <p>
            Solve the equation
          </p>
            {@html display(`e^{-x} - \\frac{5}{x^2+1} + 1 = 0.`)}
          <h3>Solution</h3>
          <p>
            We will use our GC to plot the graph of
            {@html math(`y = e^{-x} - \\frac{5}{x^2+1} + 1.`)}
          </p>
          <p>
            We should see two solutions where the curve cuts the 
            {@html math(`x\\textrm{-axis}.`)} We will get them
            one at a time.
          <p>
            On the TI-84 class of calculators, we will go to
            <kbd class="kbd kbd-sm">calc</kbd> (2nd followed by the
            trace, the fourth button on the top row) and then
            <kbd class="kbd kbd-sm">2: ZERO</kbd>.
          </p>
          <p>
            The calculator will first ask for the lower bound. 
            We will scroll to a point left of the root we want to find.
            Press enter and the calculator will ask for the upper bound.
            Now scroll past the root and to a point to the right of it and
            press enter.
          </p><p>
            Finally, the calculator will ask for a guess. We can
            just click enter immediately as long as the previous two steps are done
            correctly.
          </p>
          <h3>Answers</h3>
          <p>
            See if you are able to find the two answers
            {@html math(`x=${x1.toFixed(3)}`)} and {@html math(`x=${x2.toFixed(2)}`)}
            using your GC.
          </p>
          <h2>Intersect solver</h2>
          <p>
            The "intersect" solver helps us find where two graphs intersect.
          </p>
          <h3>Example</h3>
          <p>
            Solve the equation
          </p>
            {@html display(`e^{-x} - \\frac{5}{x^2+1} + 1 = 3x.`)}
          <h3>Solution</h3>
          <p>
            In addition to our graph of 
            {@html math(`y = e^{-x} - \\frac{5}{x^2+1} + 1`)}
            from the previous example,
            we will also plot the graph of {@html math(`y=3x.`)}
          </p>
          <p>
            We should see one intersection between the two.
          <p>
            On the TI-84 class of calculators, we will go to
            <kbd class="kbd kbd-sm">calc</kbd> (2nd followed by the
            trace, the fourth button on the top row) and then
            <kbd class="kbd kbd-sm">5: INTERSECT</kbd>.
          </p>
          <p>
            The calculator will ask for the first curve. You can scroll up
            and down to select it. But if we only have two curves, the default
            will work so let's press enter. The calculator will then ask for
            the second curve, with our second curve chosen by default.
            Press enter.
          </p><p>
            The calculator will ask for a guess. We can
            scroll left and right to be reasonably close to our desired intersection point
            (useful if there are more than one intersection points) and press enter
            to get the answer.
          </p>
          <h3>Answers</h3>
          <p>
            See if you are able to find answers
            {@html math(`x=${x3.toFixed(3)}`)}
            using your GC.
          </p>
          <h2>Solving inequalities graphically</h2>
          <h3>Question</h3>
          {@html body}
          <h3>Solution</h3>
          {#each steps as step,i}
          <h4>Step {i}. {step.title}</h4>
          <div>
            {@html step.body}
          </div>
          {#if "info" in step}
          <div class="alert">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div>{@html step.info}</div>
          </div>
          {/if}
          {/each}
          <h2>Practice</h2>
          <button 
            class="btn btn-secondary"
            on:click={async () => {setLearnActive(false); await tick(); document.getElementById('practice-tab')?.scrollIntoView();}}
          >
            Try out this technique
            <img src="/icons/edit.svg" class="h-6 w-6 my-0" alt="practice"/>
          </button>
        </div>
        {/if}
      </div>
      <div class="swap-off">
        <div>
          <h2 class="mt-2">Question</h2>
          <div>
            Solve the following inequality
            {#key variables}
            <div in:scale>
              {@html qn}
            </div>
            {/key}
          </div>
          <button 
            class="btn btn-secondary"
            on:click={() => {variables = getNewVars();}}
          >
            Generate new question
            <img src="/icons/edit.svg" class="h-6 w-6 my-0" alt="practice"/>
          </button>
          <h2>Answer</h2>
          {#key variables}
          <div in:scale>
            {@html ans}
          </div>
          {/key}
          <h2>Solution</h2>
          {#key variables}
          <div in:scale>
            {@html soln}
          </div>
          {/key}
          <button 
            class="btn btn-secondary"
            on:click={() => {variables = getNewVars(); setTimeout(() => document.getElementById('practice-tab')?.scrollIntoView(), 0);}}
          >
            Generate new question
            <img src="/icons/edit.svg" class="h-6 w-6 my-0" alt="practice"/>
          </button>
        </div>
      </div>
    </div>
  </div>
  <h2>Next Section</h2>
  <p>
    In the next section, we will learn
    how to solve equations and inequalities with the
    aid of a graphing calculator.
  </p>
  <a class="btn btn-primary" href="../02-gc">
    GC Techniques
    <img src="/icons/next-white.svg" class="h-6 w-6 my-0 text-white" alt="next"/>
  </a>
</main>


<style>
  main {
    padding: 0.5rem;
    margin-inline: auto;
  }
  button.tab {
    position: relative;
  }
  .highlight {
    content: "";
    position: absolute;
    left: 20%;
    bottom: 7px;
    width: 60%;
    height: 10px;
    transform: skew(-30deg);
    background: rgba(254,219,134,0.6);
    transition: all 1s;
  }
  .swap-on, .swap-off {
    padding: 0.5rem;
    border-width: 0 0 0 var(--tab-border, 1px);
    border-left-color: hsl(var(--b3) / var(--tw-bg-opacity, 1));;
  }
  .swap {
    cursor: auto;
    user-select: auto;
  }
</style>