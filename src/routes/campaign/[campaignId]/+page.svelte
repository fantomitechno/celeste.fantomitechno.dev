<script lang="ts">
	import berry from '$lib/images/berries/Strawberry_idle.webp';
	import ghostBerry from '$lib/images/berries/ghostBerry.gif';
	import gberry from '$lib/images/berries/goldBerry.gif';
	import ghostGBerry from '$lib/images/berries/ghostGoldBerry.gif';
	import dot from '$lib/images/journal/dot.png';
	import clear from '$lib/images/journal/clear.png';
	import fullclear from '$lib/images/journal/fullclear.png';
	import time from '$lib/images/journal/time.png';
	import skullBlue from '$lib/images/journal/skullBlue.png';
	import rainbowBerry from '$lib/images/berries/rainbowBerry.gif';
	import ghostRainbowBerry from '$lib/images/berries/ghostRainbowBerry.gif';

	import Map from '$lib/components/Map.svelte';

	import type { PageData } from './$types';
	import Gamebanana from '$lib/components/Gamebanana.svelte';
	import { fromTime } from '$lib/time';
	import { isRainbowCleared } from '$lib/clear';

	export let data: PageData;

	const { campaign, goldenedMaps, clearedMaps, fullClearedMaps, totals } = data;
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
					src={fullClearedMaps == clearedMaps ? fullclear : clearedMaps == 0 ? dot : clear}
					alt="A heart"
				/>
				Cleared {clearedMaps} map{clearedMaps > 1 ? 's' : ''} out of {campaign.maps.length}
			</span>
			<span>
				<img
					src={(totals._sum.containsBerries ?? 0) <= (totals._sum.collectedberries ?? 0) &&
					totals._sum.collectedberries != 0
						? berry
						: ghostBerry}
					alt="A strawberry"
				/>
				Collected {totals._sum.collectedberries ?? 0} out of {totals._sum.containsBerries} berrie{(totals
					._sum.containsBerries ?? 0) > 1
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
			<span>
				<img src={time} alt="A Clock from Celeste" />
				Time in the campaign: {fromTime(totals._sum.time)}
			</span>
			<span>
				<img src={skullBlue} alt="A blue skull" />
				Total deaths: {totals._sum.deaths}
			</span>
		</div>

		<div class="campaign">
			<ul>
				{#each campaign.categories as category}
					<li class="category" style={`--color-border: ${category.color}`}>
						{category.name}
						{#if category.containsRainbow}
							<div id="rainbow">
								{#if isRainbowCleared(category)}
									<img src={rainbowBerry} alt="A rainbow strawberry" />
									Got the Rainbow Berry
								{:else}
									<img src={ghostRainbowBerry} alt="A rainbow strawberry" />
									Did not get the Rainbow Berry
								{/if}
							</div>
						{/if}
						<ul>
							{#each category.maps as map}
								<li class="map-order">
									<Map {map} {campaign} />
									{#if data.connected}
										<form action="?/editMapOrder" method="POST" class="order">
											<input name="id" type="text" value={map.id} hidden />
											<label for="order"> Order </label>
											<select name="order" id="order">
												{#each category.maps as _, index}
													<option selected={map.order == index} value={index}>{index}</option>
												{/each}
											</select>
											<button>Submit</button>
										</form>
									{/if}
								</li>
							{/each}
						</ul>
						{#if data.connected}
							<form action="?/editCategoryOrder" method="POST" class="order">
								<input name="id" type="text" value={category.id} hidden />
								<label for="order"> Order </label>
								<select name="order" id="order">
									{#each campaign.categories as _, index}
										<option selected={category.order == index} value={index}>{index}</option>
									{/each}
								</select>
								<label>
									Contains Rainbow Berry
									<input
										name="containsRainbow"
										type="checkbox"
										checked={category.containsRainbow}
									/>
								</label>
								<button>Submit</button>
								<button formaction="?/deleteCategory">Delete</button>
							</form>
						{/if}
					</li>
				{/each}
				{#if campaign.maps.find((m) => !m.categoryId)}
					{#each campaign.maps.filter((m) => !m.categoryId) as map}
						<li class="map-order">
							<Map {map} {campaign} />
							{#if data.connected}
								<form action="?/editMapOrder" method="POST" class="order">
									<input name="id" type="text" value={map.id} hidden />
									<label for="order"> Order </label>
									<select name="order" id="order">
										{#each campaign.maps.filter((m) => !m.categoryId) as _, index}
											<option selected={map.order == index} value={index}>{index}</option>
										{/each}
									</select>
									<button>Submit</button>
								</form>
							{/if}
						</li>
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
		width: 4em;
		align-self: center;
	}

	.stats {
		display: flex;
		flex-wrap: wrap;
		margin: 2em 0;
		justify-content: space-evenly;
	}

	.stats span {
		background-color: var(--color-primary);
		border-radius: 5px;
		margin: 0.5em 0;
		padding: 1em;
		width: 27%;
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

	.order {
		display: flex;
		flex-direction: column;
		align-self: center;
		flex-grow: 1;
		border: 0.2em solid var(--color-primary);
		border-radius: 0.5em;
		padding: 0.5em 1em 0.9em;
		margin: 1em 0;
		background-color: var(--color-bg-2);
		height: 100%;
		gap: 0.5em;
	}

	.order select,
	.order option {
		height: 100%;
		font: inherit;
	}

	.map-order {
		display: flex;
		flex-direction: row;
		gap: 1em;
	}

	#rainbow {
		padding-left: 0.2em;
		display: flex;
		align-items: center;

		border-left: 0.2em solid var(--color-primary);
	}

	#rainbow > img {
		padding-right: 0.2em;
		width: 2em;
		align-self: center;
	}
</style>
