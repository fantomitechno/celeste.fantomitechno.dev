<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let searchValue = '';
</script>

<main>
	<hgroup>
		<h1>Maps</h1>
		<h2>that I've played</h2>
	</hgroup>
	<input type="text" bind:value={searchValue} />
	<ul>
		{#each data.campaigns.filter((c) => !searchValue.length || c.categories.find((c) => c.id.search(new RegExp(searchValue, 'ig')) != -1) || c.maps.find((m) => m.name.search(new RegExp(searchValue, 'ig')) != -1) || c.name.search(new RegExp(searchValue, 'ig')) != -1) as campaign}
			<li>
				{campaign.name}
				<ul>
					{#each campaign.categories.filter((c) => !searchValue.length || c.maps.find((m) => m.name.search(new RegExp(searchValue, 'ig')) != -1) || c.id.search(new RegExp(searchValue, 'ig')) != -1 || campaign.name.search(new RegExp(searchValue, 'ig')) != -1) as category}
						<li>
							{category.id.toUpperCase()}
							<ul>
								{#each category.maps.filter((m) => !searchValue.length || m.name.search(new RegExp(searchValue, 'ig')) != -1 || category.id.search(new RegExp(searchValue, 'ig')) != -1 || campaign.name.search(new RegExp(searchValue, 'ig')) != -1) as map}
									<li>{map.name}</li>
								{/each}
							</ul>
						</li>
					{/each}
					{#if campaign.maps.find((m) => !m.categoryId && (!searchValue.length || m.name.search(new RegExp(searchValue, 'ig')) != -1))}
						<li>
							{#each campaign.maps.filter((m) => !m.categoryId && (!searchValue.length || m.name.search(new RegExp(searchValue, 'ig')) != -1)) as map}
								{map.name}
							{/each}
						</li>
					{/if}
				</ul>
			</li>
		{/each}
	</ul>
</main>
