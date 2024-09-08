<script lang="ts">
	import GoldenedMap from './GoldenedMap.svelte';
	import type { PageData } from './$types';
	import GoldeningMap from './GoldeningMap.svelte';

	export let data: PageData;

	let checkVanilla = false;
</script>

<svelte:head>
	<title>fantomitechno's Golden List</title>
	<meta name="description" content={`${data.goldens.length} golden collected`} />
	<meta name="theme-color" content="#2e1e45" />
</svelte:head>

<main>
	<hgroup>
		<h1>Maps I'm working on goldening</h1>
	</hgroup>
	{#if data.goldening.length == 0}
		I'm not goldening any map currently
	{:else}
		<label>
			<input type="checkbox" bind:checked={checkVanilla} />
			Show vanilla maps
		</label>
		<span>
			{#each data.goldening
				.filter((m) => checkVanilla || m.campaignId != 'vanilla')
				.sort((a, b) => b.deathlessPb! / b.numberOfRooms! - a.deathlessPb! / a.numberOfRooms!) as map}
				<GoldeningMap {map} />
			{/each}
		</span>
	{/if}
	<hgroup><h1>Maps I've goldened</h1></hgroup>
	{#if data.goldens.length == 0}
		I goldened no maps
	{:else}
		<label>
			<input type="checkbox" bind:checked={checkVanilla} />
			Show vanilla maps
		</label>
		<span>
			{#each data.goldens.filter((m) => checkVanilla || m.campaignId != 'vanilla') as map}
				<GoldenedMap {map} />
			{/each}
		</span>
	{/if}
</main>

<style>
	span {
		width: 100%;

		display: flex;
		flex-wrap: wrap;
		margin: 0 auto;
	}
</style>
