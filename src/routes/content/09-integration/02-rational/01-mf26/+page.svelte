<script lang="ts">
  import { scale } from 'svelte/transition';
  import { content } from './content';
	import { alignStar, math } from 'mathlifier';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
	import { browser } from '$app/environment';
  import { send, receive } from '$lib/utils/crossfade';
  
  const { title, examples, coeffExample, formulas, mobileFormulas } = content;
  let learnActive = true;
  function setLearnActive(active: boolean) {
    learnActive = active;
  }

  // practice
  import { vars } from './variables';
  import { getRandomInt } from 'mathlify';
  import { qnGen } from '$lib/qnGen/01-eqns/q010301';
	import { tick } from 'svelte';
  let variables = getNewVars();
  $: [qn, _, ans, soln] = qnGen(variables);

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
  <!--!Tabs-->
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
  <!--!Content-->
  <div class="body">
    <label class="swap swap-flip w-full place-content-stretch">
      <input type="checkbox" disabled checked={learnActive} />
      <!--!Learn Tab-->
      <div class="swap-on">
        {#if learnActive}
        <div>
          <h2 class="mt-2">Formulas</h2>
          <div class="formulas">
            {@html formulas}
          </div>
          <div class="mobile-formulas">
            {@html mobileFormulas}
          </div>
          <h2>Examples</h2>
          {@html examples}
          <h2>Coefficient of {@html math(`x^2`)}</h2>
          {@html coeffExample}
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
            on:click={()=>{variables = getNewVars(); setTimeout(() => document.getElementById('practice-tab')?.scrollIntoView(), 0);}}
          >
            Generate new question
            <img src="/icons/edit.svg" class="h-6 w-6 my-0" alt="practice"/>
          </button>
        </div>
      </div>
    </label>
  </div>
  <h2>Extensions</h2>
  <h3>Combination of techniques</h3>
  <p>
    We can combine the current technique with
    the <a href="../01-f-prime">previous technique about {@html math(`f'(x)`)}</a>.
  </p>
  <p>
    For example,
  </p>
  {@html alignStar(`& \\int \\frac{2x+1}{x^2+1} \\, \\mathrm{d}x
    \\\\ & = \\int \\frac{2x}{x^2+1} \\, \\mathrm{d}x + \\int \\frac{1}{x^2+1} \\, \\mathrm{d}x
    \\\\ &= \\ln (x^2 + 1) + \\tan^{-1} x + c \\; \\blacksquare
  `)}
  <h2>Next technique</h2>
  <p>
    The next technique will tackle integrals that require
    completing the square before we can use the formulas here.
  </p>
  <a class="btn btn-primary" href="./02-complete-square">
    Completing the square
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
  @media only screen and (min-width:500px){
    .mobile-formulas {
      display: none
    }
  }
  @media only screen and (max-width:499px){
    .formulas {
      display: none
    }
  }
</style>