<script lang="ts">
	import Campaign from './Campaign.svelte';
	import Category from './Category.svelte';
	import Map from './Map.svelte';

	let selected = Map;
</script>

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

	:global(form) {
		margin: 1em 0.5em;
		display: flex;
		flex-direction: column;

		width: 25%;
	}

	:global(input:not([type='checkbox']):not([type='color'])) {
		width: 100%;
	}

	:global(form > button) {
		width: 50%;
		align-self: center;
		margin-top: 1em;
	}

	:global(label) {
		margin: 0.5em 0;
	}

	:global(li) {
		display: flex;
		flex-direction: row;
		width: 100%;
	}

	:global(ul) {
		padding: 0;
	}
</style>
