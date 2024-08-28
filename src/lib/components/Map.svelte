<script lang="ts">
	// Collectibles
	import defaultBerry from '$lib/images/berries/Strawberry_idle.webp';
	import defaultGhostBerry from '$lib/images/berries/ghostBerry.gif';
	import defaultMoonBerry from '$lib/images/berries/moonBerry.gif';
	import defaultGhostMoonBerry from '$lib/images/berries/ghostMoonBerry.gif';
	import cassette from '$lib/images/cassette.gif';
	import cassetteGhost from '$lib/images/cassetteGhost.gif';

	// Deathless Berries
	import gberry from '$lib/images/berries/goldBerry.gif';
	import ghostGBerry from '$lib/images/berries/ghostGoldBerry.gif';
	import sberry from '$lib/images/berries/silverBerry.gif';
	import ghostSBerry from '$lib/images/berries/ghostSilverBerry.gif';
	import pberry from '$lib/images/berries/platBerry.gif';
	import ghostPBerry from '$lib/images/berries/ghostPlatBerry.gif';
	import flagCP from '$lib/images/FlagCP.gif';

	// Clear informations
	import dot from '$lib/images/journal/dot.png';
	import clear from '$lib/images/journal/clear.png';
	import fullclear from '$lib/images/journal/fullclear.png';

	// Hearts
	import blueHeart from '$lib/images/hearts/BlueHeart.gif';
	import yellowHeart from '$lib/images/hearts/YellowHeart.gif';
	import redHeart from '$lib/images/hearts/RedHeart.gif';
	import orangeHeart from '$lib/images/hearts/OrangeHeart.gif';
	import purpleHeart from '$lib/images/hearts/PurpleHeart.gif';
	import normalGhostHeart from '$lib/images/hearts/GhostHeart.gif';
	import collabBlueHeart from '$lib/images/hearts/CollabBlueHeart.gif';
	import collabYellowHeart from '$lib/images/hearts/CollabYellowHeart.gif';
	import collabRedHeart from '$lib/images/hearts/CollabRedHeart.gif';
	import collabOrangeHeart from '$lib/images/hearts/CollabOrangeHeart.gif';
	import collabPurpleHeart from '$lib/images/hearts/CollabPurpleHeart.gif';
	import collabGhostHeart from '$lib/images/hearts/CollabGhostHeart.gif';

	// Map types
	import greenMap from '$lib/images/maps/green.png';
	import yellowMap from '$lib/images/maps/yellow.png';
	import redMap from '$lib/images/maps/red.png';
	import crackedMap from '$lib/images/maps/cracked.png';
	import heartSide from '$lib/images/maps/heartside.png';

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
	if (map?.customGhostDeathlessBerry) {
		deathlessGhostBerry = map.customGhostDeathlessBerry;
	}
	if (map?.customDeathlessBerry) {
		deathlessBerry = map.customDeathlessBerry;
	}

	let heart: string = '';
	let ghostHeart: string = '';
	switch (map?.heartType) {
		case 'BLUE':
			heart = blueHeart;
			ghostHeart = normalGhostHeart;
			break;

		case 'YELLOW':
			heart = yellowHeart;
			ghostHeart = normalGhostHeart;
			break;

		case 'RED':
			heart = redHeart;
			ghostHeart = normalGhostHeart;
			break;

		case 'ORANGE':
			heart = orangeHeart;
			ghostHeart = normalGhostHeart;
			break;

		case 'PURPLE':
			heart = purpleHeart;
			ghostHeart = normalGhostHeart;
			break;

		case 'COLLAB_BLUE':
			heart = collabBlueHeart;
			ghostHeart = collabGhostHeart;
			break;

		case 'COLLAB_YELLOW':
			heart = collabYellowHeart;
			ghostHeart = collabGhostHeart;
			break;

		case 'COLLAB_RED':
			heart = collabRedHeart;
			ghostHeart = collabGhostHeart;
			break;

		case 'COLLAB_ORANGE':
			heart = collabOrangeHeart;
			ghostHeart = collabGhostHeart;
			break;

		case 'COLLAB_PURPLE':
			heart = collabPurpleHeart;
			ghostHeart = collabGhostHeart;
			break;

		default:
			break;
	}
	if (map?.customGhostHeart) {
		ghostHeart = map.customGhostHeart;
	}
	if (map?.customHeart) {
		heart = map.customHeart;
	}

	const moonBerry = map?.customMoonBerry ?? defaultMoonBerry;
	const ghostMoonBerry = map?.customGhostMoonBerry ?? defaultGhostMoonBerry;

	const berry = map?.customBerry ?? defaultBerry;
	const ghostBerry = map?.customGhostBerry ?? defaultGhostBerry;

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

<a href={'/map/' + map.id} class="map">
	<span id="title">
		{map.name}
		{#if map.mapper}
			- by {map.mapper}
		{:else if campaign?.mapper}
			- by {campaign.mapper}
		{/if}
		{#if map.mapType}
			<img src={mapType} alt="The Map type" />
		{/if}
	</span>
	<span>
		<div>
			{#if map.clearedOn}
				<img src={isFullCleared(map) ? fullclear : clear} alt="A flag" />
				Cleared on {map.clearedOn.toDateString()}
			{:else}
				<img src={dot} alt="A dot" />
				Still haven't cleared
			{/if}
		</div>
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

		{#if map.containsCassette || map.containsHeart || map.containsMoonBerry || map.containsBerries}
			<div id="collectibles">
				Collectibles:
				{#if map.containsCassette}
					<img src={map.collectedCassette ? cassette : cassetteGhost} alt="A cassette" />
				{/if}
				{#if map.containsHeart}
					<img src={map.collectedHeart ? heart : ghostHeart} alt="A heart" />
				{/if}
				{#if map.containsMoonBerry}
					<img src={map.collectedMoonBerry ? moonBerry : ghostMoonBerry} alt="The moon berry" />
				{/if}

				{#if map.containsBerries}
					<img
						src={map.containsBerries <= map.collectedberries ? berry : ghostBerry}
						alt="A strawberry"
					/>
					Got {map.collectedberries} out of {map.containsBerries}
				{/if}
			</div>
		{/if}
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
		margin-right: 0.2em;
		width: 2em;
		align-self: center;
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

	a,
	a:hover {
		text-decoration: none;
		color: var(--color-text);
	}

	#flag {
		margin-right: 0.6em;
		margin-left: 0.4em;
		width: 1.2em;
	}

	#collectibles > img:first-child {
		margin-left: 0.4em;
	}
</style>
