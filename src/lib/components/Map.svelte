<script lang="ts">
	import berry from '$lib/images/berries/Strawberry_idle.webp';
	import moonBerry from '$lib/images/berries/moonBerry.gif';
	import ghostBerry from '$lib/images/berries/ghostBerry.gif';
	import gberry from '$lib/images/berries/goldBerry.gif';
	import ghostGBerry from '$lib/images/berries/ghostGoldBerry.gif';
	import sberry from '$lib/images/berries/silverBerry.gif';
	import ghostSBerry from '$lib/images/berries/ghostSilverBerry.gif';
	import pberry from '$lib/images/berries/platBerry.gif';
	import ghostPBerry from '$lib/images/berries/ghostPlatBerry.gif';
	import dot from '$lib/images/journal/dot.png';
	import clear from '$lib/images/journal/clear.png';
	import fullclear from '$lib/images/journal/fullclear.png';
	import flagCP from '$lib/images/FlagCP.gif';

	import type { Campaign, Map } from '@prisma/client';
	import { isFullCleared } from '$lib/clear';

	export let map: Map;
	export let campaign: Campaign | null = null;

	let deathlessBerry: string = '';
	let deathlessGhostBerry: string = '';
	let deathlessBerryName: string = '';
	switch (map.deathlessType) {
		case 'GOLDEN':
			deathlessBerry = gberry;
			deathlessGhostBerry = ghostGBerry;
			deathlessBerryName = 'Golden';
			break;

		case 'PLATINUM':
			deathlessBerry = pberry;
			deathlessGhostBerry = ghostPBerry;
			deathlessBerryName = 'Platinum';
			break;

		case 'SILVER':
			deathlessBerry = sberry;
			deathlessGhostBerry = ghostSBerry;
			deathlessBerryName = 'Silver';
			break;

		default:
			break;
	}
</script>

<a href={'/map/' + map.id} class="map">
	{map.name}
	{#if map.mapper}
		- by {map.mapper}
	{:else if campaign?.mapper}
		- by {campaign.mapper}
	{/if}
	<span>
		{#if map.containsBerries || map.collectedMoonBerry}
			<div>
				<img
					src={map.containsBerries <= map.collectedberries ? berry : ghostBerry}
					alt="A strawberry"
				/>
				Got {map.collectedberries} out of {map.containsBerries}
			</div>
		{/if}
		<div>
			{#if map.deathlessOn}
				<img src={deathlessBerry} alt={`A ${deathlessBerryName} strawberry`} />
				Got the {deathlessBerryName} berry on {map.deathlessOn.toDateString()}
			{:else if map.deathlessPb && map.numberOfRooms}
				<img id="flag" src={flagCP} alt="A Flag Checkpoint" />
				Reached room {map.deathlessPb} out of {map.numberOfRooms}
			{:else}
				<img src={deathlessGhostBerry} alt={`A ${deathlessBerryName} strawberry`} />
				Still haven't tried getting the {deathlessBerryName} berry
			{/if}
		</div>

		<div>
			{#if map.clearedOn}
				<img src={isFullCleared(map) ? fullclear : clear} alt="A flag" />
				Cleared on {map.clearedOn.toDateString()}
			{:else}
				<img src={dot} alt="A dot" />
				Still haven't cleared
			{/if}
		</div>
	</span>
</a>

<style>
	.map {
		position: relative;
		z-index: 1;
		border: 0.2em solid var(--color-primary);
		border-radius: 0.5em;
		padding: 0.5em 1em 0.9em;
		margin: 1em 0;
		background-color: var(--color-bg-2);
		display: block;
		flex-grow: 7;
	}

	.map:hover {
		border: 0.2em solid var(--color-secondary);
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

	#flag {
		padding-right: 0.6em;
		padding-left: 0.4em;
		width: 1.2em;
	}
</style>
