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
	import time from '$lib/images/time.png';
	import fasttime from '$lib/images/fasttime.png';
	import skullBlue from '$lib/images/skullBlue.png';
	import skullGold from '$lib/images/skullGold.png';

	import type { Campaign, Category } from '@prisma/client';
	import type { PageData } from './$types';
	import Search from '$lib/components/Search.svelte';
	import Gamebanana from '$lib/components/Gamebanana.svelte';
	import VideoEmbed from './VideoEmbed.svelte';
	import { fromTime } from '$lib/time';

	export let data: PageData;

	const { map } = data;

	let filteredCategories: (Category & { Campaign: Campaign })[] = [];
	let filteredCampaign: Campaign[] = [];

	let checkedCategory = {} as { [category: string]: boolean };
	let checkedCampaign = {} as { [campaign: string]: boolean };

	if (map?.Campaign) {
		checkedCampaign[map.Campaign.name] = true;
		if (map?.Category) checkedCategory[`${map.Category.name} - ${map.Campaign.name}`] = true;
	}
</script>

<svelte:head>
	<title>{map?.name ?? '404'}</title>
	<meta name="description" content={map ? `Informations on ${map.name}` : ''} />
	<meta name="theme-color" content="#2e1e45" />
</svelte:head>

<main>
	{#if !map}
		404: This map does not exist
	{:else}
		<span id="title">
			<hgroup>
				<h1>
					{map.name}
				</h1>
				{#if map.Campaign}
					<h2>
						Map from <a href={`/campaign/${map.Campaign.id}`}>{map.Campaign.name}</a>
						{#if map.Category}
							- <b style:color={map.Category.color}>{map.Category.name}</b>
						{/if}
					</h2>
				{:else}
					<h2>Standalone map</h2>
				{/if}
				{#if map.mapper}
					by {map.mapper}
				{:else if map.Campaign?.mapper}
					by {map.Campaign.mapper}
				{/if}
			</hgroup>
			{#if map.link && map.link != ''}
				<Gamebanana link={map.link} />
			{:else if map.Campaign?.link && map.Campaign.link != ''}
				<Gamebanana link={map.Campaign.link} />
			{/if}
		</span>
		<div class="stats">
			<span>
				<img
					src={map.berries <= map.berriesGotten && map.goldenedOn
						? yellowHeart
						: map.clearedOn
							? redHeart
							: ghostHeart}
					alt="A heart"
				/>
				{map.clearedOn ? `Cleared the ${map.clearedOn.toDateString()}` : `Map still not cleared`}
			</span>
			{#if map.berriesGotten || map.berries || map.moonBerry}
				<span>
					<img
						src={map.moonBerry
							? moonBerry
							: map.berries <= map.berriesGotten && map.berries != 0
								? berry
								: ghostBerry}
						alt="A strawberry"
					/>
					Collected {map.berriesGotten} out of {map.berries} berrie{map.berries > 1 ? 's' : ''}
					{#if map.moonBerry}
						<br />
						Collected Moon Berry
					{/if}
				</span>
			{/if}
			<span>
				{#if map.goldenedOn}
					<img src={gberry} alt="A golden strawberry" />
					Golden berry collected {map.goldenedOn.toDateString()}
				{:else if map.goldenPb && map.numberOfRooms}
					<img id="flag" src={flagCP} alt="A Flag Checkpoint" />
					Reached room {map.goldenPb} out of {map.numberOfRooms}
				{:else}
					<img src={ghostGBerry} alt="A golden strawberry" />
					Golden berry still waiting for me
				{/if}
			</span>
			<span>
				<img src={time} alt="A Clock from Celeste" />
				Time in the map: {fromTime(map.time)}
			</span>
			<span>
				<img src={skullBlue} alt="A blue skull" />
				Total deaths: {map.deaths}
			</span>
			{#if map.fastestClear}
				<span>
					<img src={fasttime} alt="A Clock from Celeste (edited to be orange)" />
					Fastest clear: {fromTime(map.fastestClear)}
				</span>
			{/if}
			{#if map.lowDeath}
				<span>
					<img src={skullGold} alt="A gold skull" />
					Lowest death run: {map.lowDeath}
				</span>
			{/if}
		</div>

		{#if map.video}
			<VideoEmbed video={map.video} />
		{/if}

		{#if data.connected}
			<form action="?/edit" method="POST" id="edit">
				<span>
					<div>
						<label>
							Name
							<input name="name" type="text" value={map.name} required />
						</label>
						<label>
							Mapper
							<input name="mapper" type="text" value={map.mapper} />
						</label>
					</div>
					<div>
						<label>
							Search category
							<Search type="category" bind:results={filteredCategories} />
							{#if filteredCategories.length != 0}
								<ul>
									{#each filteredCategories as category}
										<li>
											<input
												type="checkbox"
												name="category"
												value={category.id}
												bind:checked={checkedCategory[
													`${category.name} - ${category.Campaign.name}`
												]}
											/>
											{category.name} - {category.Campaign.name}
										</li>
									{/each}
								</ul>
							{/if}
							{#if Object.values(checkedCategory).filter((v) => v).length == 0}
								No category selected
							{:else}
								Selected: {Object.entries(checkedCategory)
									.filter(([_, v]) => v)
									.map(([k, _]) => k)
									.join(', ')}
							{/if}
						</label><label>
							Search campaign
							<Search type="campaign" bind:results={filteredCampaign} />
							{#if filteredCampaign.length != 0}
								<ul>
									{#each filteredCampaign as campaign}
										<li>
											<input
												type="checkbox"
												name="campaign"
												value={campaign.id}
												bind:checked={checkedCampaign[campaign.name]}
											/>
											{campaign.name}
										</li>
									{/each}
								</ul>
							{/if}
							{#if Object.values(checkedCampaign).filter((v) => v).length == 0}
								No campaign selected
							{:else}
								Selected: {Object.entries(checkedCampaign)
									.filter(([_, v]) => v)
									.map(([k, _]) => k)
									.join(', ')}
							{/if}
						</label>
					</div>
				</span>
				<hr class="separator" />
				<span>
					<div>
						<label>
							Berry count
							<input name="berries" type="number" value={map.berries} />
						</label>
						<label>
							Berries collected
							<input name="berriesCollected" type="number" value={map.berriesGotten} />
						</label>
						<label>
							Moon Berry collected
							<input name="moonBerry" type="checkbox" checked={map.moonBerry} />
						</label>
					</div>
					<div>
						<label>
							Room count
							<input name="rooms" type="number" value={map.numberOfRooms} />
						</label>
						<label>
							Golden PB
							<input name="goldenPb" type="number" value={map.goldenPb} />
						</label>
					</div>
				</span>
				<hr class="separator" />
				<span>
					<div>
						<label>
							Time passed
							<input name="time" type="text" value={fromTime(map.time)} />
						</label>
						<label>
							Total deaths
							<input name="deaths" type="number" value={map.deaths} />
						</label>
						<label>
							Cleared the
							<input
								name="cleared"
								type="date"
								value={map.clearedOn?.toISOString().split('T')[0]}
							/>
						</label>
					</div>
					<div>
						<label>
							Fast clear
							<input name="fastClear" type="text" value={fromTime(map.fastestClear)} />
						</label>
						<label>
							Lowest deaths
							<input name="lowDeaths" type="number" value={map.lowDeath} />
						</label>
						<label>
							Goldened the
							<input
								name="goldened"
								type="date"
								value={map.goldenedOn?.toISOString().split('T')[0]}
							/>
						</label>
					</div>
				</span>

				<hr class="separator" />
				<span>
					<div>
						<label>
							Gamebana link
							<input name="link" type="url" value={map.link} />
						</label>
					</div>
					<div>
						<label>
							Video link
							<input name="video" type="url" value={map.video} />
						</label>
					</div>
				</span>

				<span>
					<button
						disabled={Object.values(checkedCampaign).filter((v) => v).length > 1 ||
							Object.values(checkedCategory).filter((v) => v).length > 1 ||
							(Object.values(checkedCategory).filter((v) => v).length == 1 &&
								Object.values(checkedCampaign).filter((v) => v).length != 1)}>Submit</button
					>
					<button formaction="?/delete">Delete</button>
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

	a {
		text-decoration: none;
	}

	a:hover {
		color: var(--color-secondary);
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

	input:not([type='checkbox']):not([type='color']) {
		width: 100%;
	}

	#edit button {
		width: 45%;
		margin: 1em auto 0;
	}

	#edit label {
		margin: 0.5em 0;
	}

	#edit li {
		display: flex;
		flex-direction: row;
	}

	#edit ul {
		padding: 0;
	}

	.separator {
		border: none;
		background-color: var(--color-primary);
		width: 100%;
		height: 0.2em;
		margin: 1em 0;
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

	#flag {
		padding: 0 0.7em;
		width: 3em;
	}
</style>
