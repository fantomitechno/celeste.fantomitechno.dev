<script lang="ts">
	import Campaign from './Campaign.svelte';
	import Category from './Category.svelte';
	import Map from './Map.svelte';

	let selected = Map;
</script>

<svelte:head>
	<title>Admin page</title>
	<meta name="theme-color" content="#2e1e45" />
</svelte:head>

<main>
	<hgroup>
		<h1>Create datas</h1>
	</hgroup>
	<div class="tabs">
		<button class={selected == Map ? 'selected' : ''} onclick={() => (selected = Map)}>
			Map
		</button>
		<button class={selected == Category ? 'selected' : ''} onclick={() => (selected = Category)}>
			Category
		</button>
		<button class={selected == Campaign ? 'selected' : ''} onclick={() => (selected = Campaign)}>
			Campaign
		</button>
	</div>

	<svelte:component this={selected} />

	<a href="/api/logout">Signout</a>
</main>

<style>
	.tabs button {
		border: none;
		border-radius: 10px;
		margin: auto;
	}

	.tabs .selected {
		background-color: var(--color-secondary);
	}
</style>
