<script lang="ts">
	import { math } from "mathlifier";

  import { sections as section1 } from "./content/01-eqns/content";
  import { sections as section9 } from "./content/09-integration/content";
  const topics = [
    {
      title: 'Equations and inequalities',
      slug: '01-eqns',
      sections: section1
    },
    //
    {
      title: 'Integration',
      slug: '09-integration',
      sections: section9
    }
  ]
</script>

<svelte:head>
  <title>Math Cat</title>
</svelte:head>

<main class="prose">
  <h1>Welcome to SvelteKit</h1>
  <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

  <h2>Topics</h2>
  <div class="join join-vertical w-full">
    {#each topics as topic}
    <div class="collapse collapse-arrow join-item bg-base-200 border border-base-100">
      <input type="radio" name="topics-accordion" />
      <div class="collapse-title font-bold">{topic.title}</div>
      <div class="collapse-content bg-base-100 text-sm">
        <ul class="steps steps-vertical outer">
          {#each topic.sections as section}
          <li class="step step-secondary outer">
            <div class="self-start">
              <div>
                <a href={`/content/${topic.slug}/${section.slug}`}>{@html section.title}</a>
              </div>
              {#if section.techniques.length > 1}
              <div>
                <ul class="steps steps-vertical">
                  {#each section.techniques as technique}
                  <li class="step step-primary">
                    <a href={`/content/${topic.slug}/${section.slug}/${technique.slug}`}>{@html technique.title}</a>
                  </li>
                  {/each}
                </ul>
              </div>
              {/if}
            </div>
            
          </li>
          {/each}
        </ul>
      </div>
    </div>
    {/each}
  </div>
</main>

<style>
  main {
    padding: 0.5rem;
    margin-inline: auto;
  }
  .steps {
    margin: 0;
    padding: 0;
  }
  .steps .step {
    text-align: start;
  }
  .step.outer::after {
    place-self: start;
    border: 1px hsl(var(--p) / 75%) solid;
  }
  .step.outer::before {
    content: '';
    background-color: hsl(var(--s) / var(--tw-bg-opacity));
    height: 100%;
    transform: translate(-50%, 10%);
    border: 1px hsl(var(--p) / 75%) solid;
  }
  .step.outer:last-child::before {
    height: 95%;
    transform: translate(-50%, 0%);
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  }
  li.step {
    margin: 0rem;
  }
  ul > li.step:first-child {
    margin-top: 0.5rem;
  }
  li.step.outer>div>div:first-child {
    margin-top:6.875px;
  }
  .steps-vertical.outer {
    grid-auto-rows: auto;
  }
  input[type="radio"]:checked + .collapse-title {
    background-color: hsl(var(--p) / var(--tw-bg-opacity));
    color: white;
  }
  
</style>
