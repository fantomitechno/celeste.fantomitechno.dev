<script lang="ts">
	import berry from '$lib/images/Strawberry_idle.webp';
	import moonBerry from '$lib/images/moonBerry.gif';
	import ghostBerry from '$lib/images/ghostBerry.gif';
	import gberry from '$lib/images/Goldberry_Idle.webp';
	import ghostGBerry from '$lib/images/ghostGoldBerry.gif';
	import redHeart from '$lib/images/RedHeart.gif';
	import yellowHeart from '$lib/images/YellowHeart.gif';
	import ghostHeart from '$lib/images/GhostHeart.gif';
	import flagCP from '$lib/images/FlagCP.gif';

	import type { Campaign, Map } from '@prisma/client';
	import { isFullCleared } from '$lib/clear';

	export let map: Map;
	export let campaign: Campaign | null = null;
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
					src={map.collectedMoonBerry
						? moonBerry
						: map.containsBerries <= map.collectedberries
							? berry
							: ghostBerry}
					alt="A strawberry"
				/>
				Got {map.collectedberries} out of {map.containsBerries}
			</div>
		{/if}
		<div>
			{#if map.deathlessOn}
				<img src={gberry} alt="A golden strawberry" />
				Goldened on {map.deathlessOn.toDateString()}
			{:else if map.deathlessPb && map.numberOfRooms}
				<img id="flag" src={flagCP} alt="A Flag Checkpoint" />
				Reached room {map.deathlessPb} out of {map.numberOfRooms}
			{:else}
				<img src={ghostGBerry} alt="A golden strawberry" />
				Still haven't tried goldening
			{/if}
		</div>

		<div>
			{#if map.clearedOn}
				<img src={isFullCleared(map) ? yellowHeart : redHeart} alt="A heart" />
				Cleared on {map.clearedOn.toDateString()}
			{:else}
				<img src={ghostHeart} alt="A heart" />
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
