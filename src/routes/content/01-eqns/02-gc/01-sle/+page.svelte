<script lang="ts">
  import { crossfade, scale, slide } from 'svelte/transition';
  import { content } from './content';
	import { align, math } from 'mathlifier';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
	import { browser } from '$app/environment';
  
  const { title, examples } = content;
  // 0: Learn, 1: Example 1, 2: Practice 1, 3: Example 2, 4: Practice 2
  let activeState = 0;
  function setActiveState(active: number) {
    activeState = active;
  }

  // practice
  import { vars1, vars2 } from './variables';
  import { getRandomInt } from 'mathlify';
  import { qnGen1, qnGen2 } from '$lib/qnGen/01-eqns/q010201';
  type Variables = typeof vars1[0];
  type Variables2 = typeof vars2[0];
  let variables1: Variables, variables2: Variables2;
  variables1 = getNewVars1();
  variables2 = getNewVars2();
  $: [qn, _, ans, soln] = qnGen1(variables1);
  $: [qn2, __, ans2, soln2] = qnGen2(variables2);
  $: qns = [qn, qn2];
  $: solns = [soln, soln2];
  $: answers = [ans, ans2];

  function getNewVars1(): Variables {
    const variables =  vars1[getRandomInt(0, vars1.length - 1)];
    if (browser && variables1 && variables2){
      goto(`${$page.route.id}?vars1=${variables.id}&vars2=${variables2.id}`, {replaceState: true, noScroll: true, keepFocus: true});
    }
    return variables
  }
  function getNewVars2(): Variables2 {
    const variables =  vars2[getRandomInt(0, vars2.length - 1)];
    if (browser && variables1 && variables2){
      goto(`${$page.route.id}?vars1=${variables.id}&vars2=${variables2.id}`, {replaceState: true, noScroll: true, keepFocus: true});
    }
    return variables
  }

  const tabs = [
    {id: 0, title: 'Learn',},
    {id: 1, title: 'Example 1',},
    {id: 2, title: 'Practice 1',},
    {id: 3, title: 'Example 2',},
    {id: 4, title: 'Practice 2'},
  ]
	import { tick } from 'svelte';
	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 1200),
	});
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>


<main class="prose">
  <!--Title-->
  <h1>{title}</h1>
  <!--Tabs-->
  <div class="tabs" id="practice-tab">
    {#each tabs as tab}
    <button 
      class="tab tab-lifted"
      class:tab-active={activeState===tab.id}
      on:click={() => setActiveState(tab.id)}
    >
      {tab.title}
      {#if activeState===tab.id}
        <div 
          class="highlight"
          in:receive={{key: 0}}
          out:send={{key: 0}}
        >
        </div>
      {/if}
    </button>
    {/each}
  </div>
  <!--Content-->
  <div class="content">
    <!--General Overview-->
    {#if activeState===0}
    <div 
      class="w-full place-content-stretch"
      transition:slide
    >
      <h2 class="mt-2">Overview</h2>
      <p>
        An example of a system of linear equations is the following:
      </p>
      {@html align(`x+y+2z &= -3 \\\\ x-y-z &= 2 \\\\ 2x + 3y -z &= 11`)}
      <p>
        We can solve systems of linear equations such as these with the help
        of our graphing calculator.
      </p>
      <h3>Using the GC</h3>
      <p>
        If you're using the TI-84 class of calculators, we will go to
        <kbd class="kbd kbd-sm">APPS</kbd> and then select
        <kbd class="kbd kbd-sm">PlySmlt2</kbd>.
      </p>
      <p>
        In the main menu, we select
        <kbd class="kbd kbd-sm">2: SIMULT EQN SOLVER</kbd>. For the example above,
        we have 3 equations and 3 unknowns so select those options and click
        <kbd class="kbd kbd-sm">NEXT</kbd> (this is displayed in the right corner so it
        corresponds to the <kbd class="kbd kbd-sm">GRAPH</kbd> button).
      </p>
      <p>
        Enter our coefficients and click solve. If you are following along the example above,
        you should see the solution
        {@html math(`x=1,`)}
        {@html math(`y=2`)}
        and {@html math(`z=-3`)} (as {@html math(`x_1, x_2`)}
        and {@html math(`x_3`)} respectively).
      </p>
      <h2>Common question types</h2>
      <p>We have identified two common question types in this subsection:</p>
      <ul>
        <li>Questions relating to graphs and polynomials</li>
        <li>Word problems involving real life situations</li>
      </ul>
      <p>These are implemented in examples (and practices) 1 and 2 respectively.</p>
      <div class="flex flex-wrap gap-2">
        <button 
          class="btn btn-secondary"
          on:click={async () => {setActiveState(1); document.getElementById('practice-tab')?.scrollIntoView({behavior:'instant'}); }}
        >
          Example 1: Polynomials
          <img src="/icons/edit.svg" class="h-6 w-6 my-0" alt="practice"/>
        </button>
        <button 
          class="btn btn-secondary"
          on:click={() => {setActiveState(3); document.getElementById('practice-tab')?.scrollIntoView({behavior:'instant'});}}
        >
          Example 2: Word Problem 
          <img src="/icons/edit.svg" class="h-6 w-6 my-0" alt="practice"/>
        </button>
      </div>
    </div>
    {/if}
    <!--Examples-->
    {#each [1,3] as i}
    {#if activeState===i}
      <div 
        class="w-full place-content-stretch"
        transition:slide
      >
        <h2 class="mt-2">Example</h2>
        <h3>Question</h3>
        <div>
          {@html examples[(i-1)/2].question}
        </div>
        <h3>Solution</h3>
        {#each examples[(i-1)/2].solution as step,i}
          <h4>Step {i+1}. {step.title}</h4>
          <div>
            {@html step.body}
          </div>
        {/each}
        <h2>Practice</h2>
          <button 
            class="btn btn-secondary"
            on:click={async () => {setActiveState(i+1); document.getElementById('practice-tab')?.scrollIntoView({behavior:'instant'});}}
          >
            Try out this technique
            <img src="/icons/edit.svg" class="h-6 w-6 my-0" alt="practice"/>
          </button>
      </div>
    {/if}
    {/each}
    <!--Practices-->
    {#each [2,4] as i}
    {#if activeState===i}
      <div 
        class="w-full place-content-stretch"
        transition:slide
      >
        <h2 class="mt-2">Question</h2>
        {#key [variables1,variables2]}
        <p in:scale>
          {@html qns[i/2-1]}
        </p>
        {/key}
        <button 
          class="btn btn-secondary"
          on:click={() => {if(i===2){
              variables1 = getNewVars1();
            } else {
              variables2 = getNewVars2();
            };
          }}
        >
          Generate new question
          <img src="/icons/edit.svg" class="h-6 w-6 my-0" alt="practice"/>
        </button>
        <h2>Answer</h2>
        {#key [variables1,variables2]}
        <div in:scale>
          {@html answers[i/2-1]}
        </div>
        {/key}
        <h2>Solution</h2>
        {#key [variables1,variables2]}
        <div in:scale>
          {@html solns[i/2-1]}
        </div>
        {/key}
        <button 
          class="btn btn-secondary"
          on:click={() => {if(i===2){
              variables1 = getNewVars1();
            } else {
              variables2 = getNewVars2();
            };
            setTimeout(() => document.getElementById('practice-tab')?.scrollIntoView(), 0);
          }}
        >
          Generate new question
          <img src="/icons/edit.svg" class="h-6 w-6 my-0" alt="practice"/>
        </button>
        {#if i===2}
        <div class="my-4">
          <button 
            class="btn btn-primary"
            on:click={async () => {setActiveState(3); await tick(); document.getElementById('practice-tab')?.scrollIntoView();}}
          >
            Word Problem Example
            <img src="/icons/next-white.svg" class="h-6 w-6 my-0" alt="practice"/>
          </button>
        </div>
        {/if}
      </div>
    {/if}
    {/each}
  </div>

  <h2>Next technique</h2>
  <p>
    The next technique will tackle the use of graphs
    to solve equations and inequalities.
  </p>
  <a class="btn btn-primary" href="./02-graphical">
    Graphical Methods
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
  .content {
    padding: 0.5rem;
    border-width: 0 0 0 var(--tab-border, 1px);
    border-left-color: hsl(var(--b3) / var(--tw-bg-opacity, 1));;
  }
</style>