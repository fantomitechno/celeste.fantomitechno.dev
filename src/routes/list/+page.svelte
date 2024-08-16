<script lang="ts">
	import type { PageData } from './$types';
	import Map from '$lib/components/Map.svelte';

	export let data: PageData;

	let searchValue = '';
</script>

<svelte:head>
	<title>fantomitechno's Map List</title>
	<meta
		name="description"
		content={`${data.campaigns.length} campaigns & ${data.standaloneMaps.length} standalone maps`}
	/>
	<meta name="theme-color" content="#2e1e45" />
</svelte:head>

<main>
	<hgroup>
		<h1>Maps that I'm interested in</h1>
	</hgroup>
	<input type="text" placeholder="Search for map/campaign..." bind:value={searchValue} />
	<ul>
		{#each data.campaigns.filter((c) => !searchValue.length || c.categories.find((c) => c.name.search(new RegExp(searchValue, 'ig')) != -1) || c.maps.find((m) => m.name.search(new RegExp(searchValue, 'ig')) != -1) || c.name.search(new RegExp(searchValue, 'ig')) != -1) as campaign}
			<a href={'/campaign/' + campaign.id}>
				<li class="campaign">
					<hgroup>
						<h1>
							{campaign.name}
						</h1>
					</hgroup>
					<ul>
						{#each campaign.categories.filter((c) => !searchValue.length || c.maps.find((m) => m.name.search(new RegExp(searchValue, 'ig')) != -1) || c.name.search(new RegExp(searchValue, 'ig')) != -1 || campaign.name.search(new RegExp(searchValue, 'ig')) != -1) as category}
							<li class="category" style={`--color-border: ${category.color}`}>
								<h2>{category.name}</h2>
								<ul>
									{#each category.maps.filter((m) => !searchValue.length || m.name.search(new RegExp(searchValue, 'ig')) != -1 || category.name.search(new RegExp(searchValue, 'ig')) != -1 || campaign.name.search(new RegExp(searchValue, 'ig')) != -1) as map}
										<li>
											<Map {map} {campaign} />
										</li>
									{/each}
								</ul>
							</li>
						{/each}
						{#if campaign.maps.find((m) => !m.categoryId && (!searchValue.length || m.name.search(new RegExp(searchValue, 'ig')) != -1))}
							{#each campaign.maps.filter((m) => !m.categoryId && (!searchValue.length || m.name.search(new RegExp(searchValue, 'ig')) != -1)) as map}
								<li>
									<Map {map} {campaign} />
								</li>
							{/each}
						{/if}
					</ul>
				</li>
			</a>
		{/each}
		{#each data.standaloneMaps.filter((m) => !m.categoryId && (!searchValue.length || m.name.search(new RegExp(searchValue, 'ig')) != -1)) as map}
			<li>
				<Map {map} />
			</li>
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
		padding: 0 1em;
		margin-bottom: 1em;
		background-color: var(--color-bg-0);

		h1 {
			background-image: linear-gradient(to right, var(--color-primary), var(--color-primary));
		}
	}

	.campaign:hover {
		border: 0.2em solid var(--color-secondary);

		h1 {
			background-image: linear-gradient(to right, var(--color-secondary), var(--color-secondary));
		}
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
</style>
