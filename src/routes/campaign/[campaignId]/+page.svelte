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
	import Gamebanana from '$lib/components/Gamebanana.svelte';

	export let data: PageData;

	const { campaign, goldenedMaps, clearedMaps, fullClearedMaps, totalBerries } = data;
</script>

<svelte:head>
	<title>{campaign?.name ?? '404'}</title>
	<meta name="description" content={campaign ? `Informations on ${campaign.name}` : ''} />
	<meta name="theme-color" content="#2e1e45" />
</svelte:head>

<main>
	{#if !campaign}
		404: This campaign does not exist
	{:else}
		<span id="title">
			<hgroup>
				<h1>
					{campaign.name}
				</h1>
				{#if campaign.mapper}
					<h2>by {campaign.mapper}</h2>
				{/if}
			</hgroup>
			{#if campaign.link && campaign.link != ''}
				<Gamebanana link={campaign.link} />
			{/if}
		</span>
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
					src={(totalBerries._sum.berries ?? 0) <= (totalBerries._sum.berriesGotten ?? 0) &&
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
								<Map {map} {campaign} />
							{/each}
						</ul>
						{#if data.connected}
							<form action="?/deleteCategory" method="POST" id="delete">
								<input name="id" type="text" value={category.id} hidden />
								<button>Delete</button>
							</form>
						{/if}
					</li>
				{/each}
				{#if campaign.maps.find((m) => !m.categoryId)}
					{#each campaign.maps.filter((m) => !m.categoryId) as map}
						<Map {map} {campaign} />
					{/each}
				{/if}
			</ul>
		</div>
		{#if data.connected}
			<form action="?/edit" method="POST" id="edit">
				<span>
					<div>
						<label>
							Name
							<input name="name" type="text" value={campaign.name} required />
						</label>
						<label>
							Mapper
							<input name="mapper" type="text" value={campaign.mapper} />
						</label>
					</div>
					<div>
						<label>
							Gamebana link
							<input name="link" type="url" value={campaign.link} />
						</label>
					</div>
				</span>

				<span>
					<button>Submit</button>
					<button formaction="?/delete">Delete</button>
					<button formaction="?/deleteAll">Delete everything</button>
				</span>
			</form>
		{/if}
	{/if}
</main>

<style>
	#title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

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
		justify-content: space-around;
	}

	.stats span {
		background-color: var(--color-primary);
		border-radius: 5px;
		margin: 0.5em 0;
		padding: 1em;
		width: 25%;
		height: auto;

		display: flex;
		align-items: center;
	}

	#edit {
		display: flex;
		flex-direction: column;
		align-self: center;
		border: 0.2em solid var(--color-primary);
		border-radius: 1em;
		padding: 1em;
		background-color: var(--color-bg-0);
		width: calc(100% - 2.4em);
	}

	#edit span {
		display: flex;
		flex-direction: row;
	}

	#edit div {
		width: 45%;
		margin: 0 auto;

		display: flex;
		flex-direction: column;
	}

	#edit input:not([type='checkbox']):not([type='color']) {
		width: 100%;
	}

	#edit button {
		width: 30%;
		margin: 1em auto 0;
	}

	#edit label {
		margin: 0.5em 0;
	}
</style>
