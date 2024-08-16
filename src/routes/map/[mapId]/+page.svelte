<script lang="ts">
	import type { Campaign, Category } from '@prisma/client';
	import type { PageData } from './$types';
	import Search from '$lib/components/Search.svelte';
	import Gamebanana from '$lib/components/Gamebanana.svelte';

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

		{#if data.connected}
			<form action="?/edit" method="POST" id="edit">
				<span>
					<div>
						<label>
							Name
							<input name="name" type="text" value={map.name} required />
						</label>
						<label>
							Berry count
							<input name="berries" type="number" value={map.berries} />
						</label>
						<label>
							Room count
							<input name="rooms" type="number" value={map.numberOfRooms} />
						</label>
					</div>
					<div>
						<label>
							Golden PB
							<input name="goldenPb" type="number" value={map.goldenPb} />
						</label>
						<label>
							Berries collected
							<input name="berriesCollected" type="number" value={map.berriesGotten} />
						</label>
						<label>
							Cleared the
							<input
								name="cleared"
								type="date"
								value={map.clearedOn?.toISOString().split('T')[0]}
							/>
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
				<span class="metadata">
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
						</label>
						<label>
							Mapper
							<input name="mapper" type="text" value={map.mapper} />
						</label>
					</div>
					<div>
						<label>
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

						<label>
							Gamebana link
							<input name="link" type="url" value={map.link} />
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

	.metadata {
		margin-top: 1em;
		border-top: 0.2em solid var(--color-primary);
		padding-top: 1em;
	}
</style>
