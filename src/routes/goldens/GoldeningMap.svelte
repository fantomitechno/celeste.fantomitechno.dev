<script lang="ts">
	import ghostGBerry from '$lib/images/ghostGoldBerry.gif';
	import redHeart from '$lib/images/RedHeart.gif';
	import yellowHeart from '$lib/images/YellowHeart.gif';
	import type { Campaign, Category, Map } from '@prisma/client';

	export let map: Map & { Campaign: Campaign | null; Category: Category | null };
</script>

<a href={'/map/' + map.id} class="map">
	<hgroup>
		<h1>
			{map.name}
			{#if map.mapper}
				- by {map.mapper}
			{:else if map.Campaign?.mapper}
				- by {map.Campaign.mapper}
			{/if}
		</h1>
		{#if map.Campaign}
			<h2>
				<!-- svelte-ignore node_invalid_placement_ssr -->
				Map from <a href={`/campaign/${map.Campaign.id}`}>{map.Campaign.name}</a>
				{#if map.Category}
					- <b style:color={map.Category.color}>{map.Category.name}</b>
				{/if}
			</h2>
		{:else}
			<h2>Standalone map</h2>
		{/if}
	</hgroup>
	<span>
		<div>
			<img src={ghostGBerry} alt="A golden strawberry" />
			Reached room {map.goldenPb} out of {map.numberOfRooms}
		</div>

		<div>
			<img
				src={map.berries <= map.berriesGotten && map.berriesGotten != 0 ? yellowHeart : redHeart}
				alt="A heart"
			/>
			Cleared on {map.clearedOn?.toDateString()}
		</div>
	</span>
</a>

<style>
	h1 {
		margin: 0;
		background-image: linear-gradient(to right, var(--color-primary), var(--color-primary));
	}

	.map {
		border: 0.2em solid var(--color-primary);
		border-radius: 0.5em;
		padding: 0.5em 1em 0.9em;
		margin: 1em auto;
		background-color: var(--color-bg-2);
		display: block;
		width: 45%;
	}

	.map:hover {
		border: 0.2em solid var(--color-secondary);
	}

	span {
		margin-top: 1em;
	}

	div {
		padding-left: 0.2em;
		display: flex;
		align-items: center;

		border-left: 0.2em solid var(--color-primary);
	}

	div > img {
		padding-right: 0.2em;
		width: 2em;
		align-self: center;
	}

	a,
	a:hover {
		text-decoration: none;
		color: var(--color-text);
	}

	hgroup {
		a {
			color: var(--color-primary);
		}
		a:hover {
			color: var(--color-secondary);
		}
	}
</style>
