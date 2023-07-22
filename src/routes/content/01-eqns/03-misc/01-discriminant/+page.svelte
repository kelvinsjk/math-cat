<script lang="ts">
  import { scale } from 'svelte/transition';
  import { content } from './content';
	import { math } from 'mathlifier';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
	import { browser } from '$app/environment';
  import { send, receive } from '$lib/utils/crossfade';
  
  const { title, question, steps, overview } = content;
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
          <h2 class="mt-2">Overview</h2>
          {@html overview}
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
  <h3>Are there other methods?</h3>
  <p>
    The discriminant method is pretty tedious and we have to work
    algebraically with both {@html math(`x`)} and 
    {@html math(`y.`)}
  </p><p>
    The key words "without using a calculator" forced our hand into
    using this approach. Sometimes, these key words can be
    replaced by "using an algebraic method".
    `,
  </p>
  <h3>The graphical approach</h3>
  <p>
    If the aforementioned key words are not present, then we
    could answer the question about finding the set of values
    {@html math(`y`)} can take with a graphical approach.
    Give that a try to see if you can the same answer above!
  </p>
  <div class="alert">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    <div>
      We may be only able to get a numerical answer correct to
      3 significant figures if we use our GC to solve for the
      turning points. An exact answer like above would require
      differentiation which could end up even more tedious than
      the discriminant approach.
    </div>
  </div>
  <h2>Next technique</h2>
  <p>
    The next technique will tackle working with the modulus
    function {@html math(`| \\cdot |`)}
  </p>
  <a class="btn btn-primary" href="./02-positive">
    Positive Quadratics
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