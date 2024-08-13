<script lang="ts">
	import type { PageData } from './$types';
	import Map from './Map.svelte';

	export let data: PageData;

	let searchValue = '';
</script>

<main>
	<hgroup>
		<h1>Maps that I've played</h1>
	</hgroup>
	<input type="text" bind:value={searchValue} />
	<ul>
		{#each data.campaigns.filter((c) => !searchValue.length || c.categories.find((c) => c.id.search(new RegExp(searchValue, 'ig')) != -1) || c.maps.find((m) => m.name.search(new RegExp(searchValue, 'ig')) != -1) || c.name.search(new RegExp(searchValue, 'ig')) != -1) as campaign}
			<a href={'/campaign/' + campaign.id}>
				<li class="campaign">
					{campaign.name}
					<ul>
						{#each campaign.categories.filter((c) => !searchValue.length || c.maps.find((m) => m.name.search(new RegExp(searchValue, 'ig')) != -1) || c.id.search(new RegExp(searchValue, 'ig')) != -1 || campaign.name.search(new RegExp(searchValue, 'ig')) != -1) as category}
							<li class="category">
								{category.id.toUpperCase()}
								<ul>
									{#each category.maps.filter((m) => !searchValue.length || m.name.search(new RegExp(searchValue, 'ig')) != -1 || category.id.search(new RegExp(searchValue, 'ig')) != -1 || campaign.name.search(new RegExp(searchValue, 'ig')) != -1) as map}
										<Map {map} />
									{/each}
								</ul>
							</li>
						{/each}
						{#if campaign.maps.find((m) => !m.categoryId && (!searchValue.length || m.name.search(new RegExp(searchValue, 'ig')) != -1))}
							{#each campaign.maps.filter((m) => !m.categoryId && (!searchValue.length || m.name.search(new RegExp(searchValue, 'ig')) != -1)) as map}
								<Map {map} />
							{/each}
							<Map
								map={{
									id: 2,
									name: 'uwu2',
									campaignId: campaign.id,
									categoryId: null,
									clearedOn: new Date(),
									goldenedOn: null,
									berriesGotten: 5,
									berries: 5,
									goldenPb: 2,
									numberOfRooms: 12,
									link: null
								}}
							/>

							<Map
								map={{
									id: 2,
									name: 'uwu2',
									campaignId: campaign.id,
									categoryId: null,
									clearedOn: new Date(),
									goldenedOn: null,
									berriesGotten: 5,
									berries: 6,
									goldenPb: 2,
									numberOfRooms: 12,
									link: null
								}}
							/>
							<Map
								map={{
									id: 2,
									name: 'uwu2',
									campaignId: campaign.id,
									categoryId: null,
									clearedOn: new Date(),
									goldenedOn: null,
									berriesGotten: 5,
									berries: 6,
									goldenPb: 0,
									numberOfRooms: 12,
									link: null
								}}
							/>
						{/if}
					</ul>
				</li>
			</a>
		{/each}
	</ul>
</main>

<style>
	a,
	a:hover {
		text-decoration: none;
		color: var(--color-text);
	}

	.campaign {
		border: 0.2em solid var(--color-primary);
		border-radius: 1em;
		padding-left: 1em;
		padding-top: 1em;
		margin-bottom: 1em;
		background-color: var(--color-bg-0);
	}

	.campaign:hover {
		border: 0.2em solid var(--color-secondary);
	}

	.category {
		border-left: 0.3em solid yellow;
		padding: 1em;
		margin-bottom: 1em;
		background-color: var(--color-bg-1);

		width: calc(100% - 3em);

		ul {
			padding: 0;
		}
	}
	ul {
		padding: 0.5em;
		list-style-type: none;
	}

	li {
		display: block;
	}
</style>
