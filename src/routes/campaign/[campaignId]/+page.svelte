<script lang="ts">
	import berry from '$lib/images/Strawberry_idle.webp';
	import ghostBerry from '$lib/images/ghostBerry.gif';
	import gberry from '$lib/images/Goldberry_Idle.webp';
	import ghostGBerry from '$lib/images/ghostGoldBerry.gif';
	import redHeart from '$lib/images/RedHeart.gif';
	import yellowHeart from '$lib/images/YellowHeart.gif';
	import ghostHeart from '$lib/images/GhostHeart.gif';
	import Map from '$lib/components/Map.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { campaign, goldenedMaps, clearedMaps, fullClearedMaps, totalBerries } = data;
</script>

<svelte:head>
	<title>{campaign?.name ?? '404'}</title>
	<meta name="description" content={campaign ? `Informations on ${campaign.name}` : ''} />
</svelte:head>

<main>
	{#if !campaign}
		404: This campaign does not exist
	{:else}
		<hgroup>
			<h1>
				{campaign.name}
			</h1>
		</hgroup>
		<div class="stats">
			<span>
				<img
					src={fullClearedMaps == clearedMaps
						? yellowHeart
						: clearedMaps == 0
							? ghostHeart
							: redHeart}
					alt="A heart"
				/>
				Cleared {clearedMaps} map{clearedMaps > 1 ? 's' : ''} out of {campaign.maps.length}
			</span>
			<span>
				<img
					src={totalBerries._sum.berries == totalBerries._sum.berriesGotten &&
					totalBerries._sum.berriesGotten != 0
						? berry
						: ghostBerry}
					alt="A strawberry"
				/>
				Collected {totalBerries._sum.berriesGotten} out of {totalBerries._sum.berries} berrie{(totalBerries
					._sum.berries ?? 0) > 1
					? 's'
					: ''}
			</span>
			<span>
				<img
					src={goldenedMaps == clearedMaps && goldenedMaps != 0 ? gberry : ghostGBerry}
					alt="A golden strawberry"
				/>
				Goldened {goldenedMaps} map{goldenedMaps > 1 ? 's' : ''}
			</span>
		</div>

		<div class="campaign">
			<ul>
				{#each campaign.categories as category}
					<li class="category" style={`--color-border: ${category.color}`}>
						{category.name}
						<ul>
							{#each category.maps as map}
								<Map {map} />
							{/each}
						</ul>
					</li>
				{/each}
				{#if campaign.maps.find((m) => !m.categoryId)}
					{#each campaign.maps.filter((m) => !m.categoryId) as map}
						<Map {map} />
					{/each}
				{/if}
			</ul>
		</div>
	{/if}
</main>

<style>
	.campaign {
		border: 0.2em solid var(--color-primary);
		border-radius: 1em;
		padding: 0 1em;
		margin-bottom: 1em;
		background-color: var(--color-bg-0);
	}

	.category {
		border-left: 0.3em solid var(--color-border);
		padding: 1em;
		margin-bottom: 1em;
		background-color: var(--color-bg-1);

		ul {
			padding: 0;
		}
	}
	ul {
		padding: 0em;
		list-style-type: none;
	}

	li {
		display: block;
	}

	span > img {
		padding: 0 0.2em;
		width: 2.5em;
		align-self: center;
	}

	.stats {
		display: flex;
		flex-wrap: wrap;
		margin: 2em 0;
	}

	.stats span {
		background-color: var(--color-primary);
		border-radius: 5px;
		margin: 0.5em auto;
		padding: 1em;
		width: 25%;
		height: auto;

		display: flex;
		align-items: center;
	}
</style>
