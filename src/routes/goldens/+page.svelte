<script lang="ts">
	import GoldenedMap from './GoldenedMap.svelte';
	import type { PageData } from './$types';
	import GoldeningMap from './GoldeningMap.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>fantomitechno's Golden List</title>
	<meta name="description" content={`${data.goldens.length} golden collected`} />
</svelte:head>

<main>
	<hgroup><h1>Maps I'm working on goldening</h1></hgroup>
	{#if data.goldening.length == 0}
		I'm not goldening any map currently
	{:else}
		<span>
			{#each data.goldening.sort((a, b) => b.goldenPb! / b.numberOfRooms! - a.goldenPb! / a.numberOfRooms!) as map}
				<GoldeningMap {map} />
			{/each}
		</span>
	{/if}
	<hgroup><h1>Maps I've goldened</h1></hgroup>
	{#if data.goldens.length == 0}
		I goldened no maps
	{:else}
		<span>
			{#each data.goldens as map}
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
