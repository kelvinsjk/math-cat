<script lang="ts">
  const topics = [
    {
      title: 'Equations and inequalities',
      sections: [
        {
          title: 'Rational inequalities',
          url: '01-eqns/01-inequalities'
        },
        { 
          title: 'GC methods',
          url: '01-eqns/02-gc'
        },
        {
          title: 'Miscellaneous',
          url: '01-eqns/03-misc'
        }
      ]
    },
    // others
    {
      title: 'Complex numbers',
      sections: [
        {
          title: 'Cartesian basics',
          url: '14-complex/01-cartesian'
        },
        {
          title: 'Solving polynomials',
          url: '14-complex/02-polynomials'
        },
        {
          title: 'Polar form',
          url: '14-complex/03-polar'
        }
      ]
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
  {#each topics as topic}
  <div class="collapse collapse-arrow bg-base-200">
    <input type="radio" name="topics-accordion" />
    <div class="collapse-title font-bold">{topic.title}</div>
    <div class="collapse-content bg-base-100 text-sm">
      <ul class="steps steps-vertical">
        {#each topic.sections as section}
        <li class="step step-secondary"><a href={`/content/${section.url}`}>{section.title}</a></li>
        {/each}
      </ul>
    </div>
  </div>
  {/each}
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
</style>
