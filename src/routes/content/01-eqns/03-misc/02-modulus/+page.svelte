<script lang="ts">
  import { scale, } from 'svelte/transition';
  import { content } from './content';
  import {goto} from '$app/navigation';
  import {page} from '$app/stores';
	import { browser } from '$app/environment';
  import { send, receive } from '$lib/utils/crossfade';
  import { vars } from './variables';
  import { bisection, getRandomInt } from 'mathlify';
	import { tick } from 'svelte';
	import { align, display, math } from 'mathlifier';
  //! change below
  import { qnGen } from '$lib/qnGen/01-eqns/q010302';
  //! change above

  
  const { title, question, steps, nextSection, nextSectionTitle } = content;
  let learnActive = true;
  function setLearnActive(active: boolean) {
    learnActive = active;
  }

  const eqns = math(`x-1 &= 2
    \\\\ -(x-1) &= 2
  `)

  const x1 = bisection((x)=>Math.exp(-x)-5/(x**2+1)+1, -1, 0);
  const x2 = bisection((x)=>Math.exp(-x)-5/(x**2+1)+1, 1, 2);
  const x3 = bisection((x)=>Math.exp(-x)-5/(x**2+1)+1-3*x, -1, 0);

  // practice
  
  let variables = getNewVars();
  $: [qn, ans, _, soln] = qnGen(variables);

  type Variables = typeof vars[0];
  function getNewVars(): Variables {
    const variables =  vars[getRandomInt(0, vars.length - 1)];
    if (browser){
      goto(`${$page.route.id}?vars=${variables.id}`, {replaceState: true, noScroll: true, keepFocus: true});
    }
    return variables
  }
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
            The modulus function,
            {@html math(`|x|,`)} is a function
            that makes a number or variable "positive"
            (non-negative if we want to be precise).
            For example,
            {@html math(`|3| = 3`)} and
            {@html math(`\\lvert -3 \\rvert  = 3`)}.
          </p>
          <p>
            The algebraic way to approach
            {@html math(`|x|`)} is to consider two cases:
            if {@html math(`x`)} is positive or zero, then
            {@html math(`|x| = x.`)} On the other hand, if
            {@html math(`x`)} is negative, then
            {@html math(`-x`)} will be positive so
            {@html math(`|x| = -x`)}.
          </p>
          <p>
            Applying the modulus function to
            {@html math(`f(x),`)} the aforementioned
            behavior is summarized by
          </p>
            {@html display(`\\lvert f(x) \\rvert = \\begin{cases} f(x) & \\textrm{if } f(x) \\geq 0 \\\\ -f(x) & \\textrm{if } f(x) < 0 \\end{cases}`)}
          <div class="alert">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div>
              The modulus function is sometimes also called
              the <b>absolute</b> value function.
              You can key it in a TI-84 class graphing calculator
              under <kbd class="kbd kbd-sm">MATH</kbd>,
              scrolling right to <kbd class="kbd kbd-sm">NUM</kbd>
              and selecting <kbd class="kbd kbd-sm">1: abs(</kbd>.
            </div>
          </div>
          <!--Equations-->
          <h2>Solving equations involving the modulus</h2>
          <p>
            We will use the positive and negative cases to
            solve equations involving the modulus function.
          </p>
          <p>
            For example, to solve the equation
          </p>
            {@html display(`|x-1| = 2,`)}
          <div>
            we consider two cases: 
          </div>
            {@html align(`x-1 &= 2
              \\\\ -(x-1) &= 2
            `)}
          <div>
            giving us the final solution of
            {@html math(`x = 3`)} or {@html math(`x = -1.`)}
          </div>
          <!--Inequalities-->
          <h2>Solving inequalities involving the modulus</h2>
          <p>
            To solve inequalities involving the modulus function,
            we will use the earlier technique of using
            <a class="link" href="../02-gc/02-graphical">
              graphical methods.
            </a>
            Find the intersection between the graphs will be necessary.
            We can use our GC for most cases, but for cases where an
            algebraic method is necessary (eg. for exact solutions of 
            solutions involving unknowns), we will use the
            method involving positive and negative cases shown above.            
          </p>
          <p>
            We will illustrate the combination of these techniques with
            the following example.
          </p>
          <h2>Example with comments</h2>
          <h3>Question</h3>
          {@html question}
          <h3>Solution</h3>
          {#each steps as step,i}
          <h4>Step {i+1}. {@html step.title}</h4>
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
  <h2>End of chapter</h2>
  <p>
    {nextSection}
  </p>
  <div class="flex gap-2 flex-wrap">
    <a class="btn btn-primary btn-outline" href="/">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
      Home
    </a>
    <a class="btn btn-primary" href="/content/02-functions">
      {nextSectionTitle}
      <img src="/icons/next-white.svg" class="h-6 w-6 my-0 text-white" alt="next"/>
    </a>
  </div>
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