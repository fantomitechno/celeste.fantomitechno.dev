<script lang="ts">
	import { isFullCleared } from '$lib/clear';
	import flagCP from '$lib/images/FlagCP.gif';
	import clear from '$lib/images/journal/clear.png';
	import fullclear from '$lib/images/journal/fullclear.png';
	// Map types
	import greenMap from '$lib/images/maps/green.png';
	import yellowMap from '$lib/images/maps/yellow.png';
	import redMap from '$lib/images/maps/red.png';
	import crackedMap from '$lib/images/maps/cracked.png';
	import heartSide from '$lib/images/maps/heartside.png';
	import type { Campaign, Category, Map } from '@prisma/client';

	export let map: Map & { Campaign: Campaign | null; Category: Category | null };

	let mapType = '';
	switch (map?.mapType) {
		case 'GREEN':
			mapType = greenMap;
			break;
		case 'YELLOW':
			mapType = yellowMap;
			break;
		case 'RED':
			mapType = redMap;
			break;
		case 'CRACKED':
			mapType = crackedMap;
			break;
		case 'HEARTSIDE':
			if (!map.customHeartSide) mapType = heartSide;
			else mapType = map.customHeartSide;
			break;
		default:
			break;
	}
</script>

<span class="map">
	<a href={'/map/' + map.id}> <div class="overlay"></div></a>
	<span>
		<hgroup>
			<span id="title">
				<h1>
					{map.name}
					{#if map.mapper}
						- by {map.mapper}
					{:else if map.Campaign?.mapper}
						- by {map.Campaign.mapper}
					{/if}
				</h1>
				{#if map.mapType}
					<img src={mapType} alt="The Map type" />
				{/if}
			</span>
			{#if map.Campaign}
				<h2>
					Map from
					<a class="campaign-link" href={`/campaign/${map.Campaign.id}`}>{map.Campaign.name}</a>
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
				<img id="flag" src={flagCP} alt="A Flag Checkpoint" />
				Reached room {map.deathlessPb} out of {map.numberOfRooms}
			</div>

			<div>
				<img src={isFullCleared(map) ? fullclear : clear} alt="A flag" />
				Cleared on {map.clearedOn?.toDateString()}
			</div>
		</span>
	</span>
</span>

<style>
	h1 {
		margin: 0;
		background-image: linear-gradient(to right, var(--color-primary), var(--color-primary));
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.campaign-link {
		position: relative;
		z-index: 1;
	}

	.map {
		position: relative;
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

	div:not(.overlay) {
		padding-left: 0.2em;
		display: flex;
		align-items: center;

		border-left: 0.2em solid var(--color-primary);
	}

	div > img {
		margin-right: 0.2em;
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

	#flag {
		padding-right: 0.45em;
		padding-left: 0.25em;
		width: 1.5em;
	}

	#title {
		display: flex;
		align-items: center;
	}

	#title > img {
		margin: 0 0.2em;
		width: 3em;
		align-self: center;
	}
</style>
