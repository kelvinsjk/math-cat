<script lang="ts">
	import { content } from './content';
	const {title, body, techniques} = content;
	import {page} from '$app/stores';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<main class="prose">
	<h1>{title}</h1>
	<div class="body">
		{@html body}
	</div>
	<h2>Techniques</h2>
	<ul class="steps steps-vertical">
		{#each techniques as technique}
		<li class="step step-secondary"><a href={`${$page.url}/${technique.slug}`}>{technique.title}</a></li>
		{/each}
	</ul>
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