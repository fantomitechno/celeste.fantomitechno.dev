<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { campaign } = data;
</script>

<main>
	{#if !campaign}
		404: This campaign does not exist
	{:else}
		<hgroup>
			<h1>
				{campaign.name}
			</h1>
			<h2>
				{campaign.maps.length} map{campaign.maps.length > 1 ? 's' : ''} played!
			</h2>
		</hgroup>
		<ul>
			{#each campaign.categories as category}
				<li class="category">
					{category.id.toUpperCase()}
					<ul>
						{#each category.maps as map}
							<li class="map">
								{map.name}
							</li>
						{/each}
					</ul>
				</li>
			{/each}
			{#if campaign.maps.find((m) => !m.categoryId)}
				<li class="map">
					{#each campaign.maps.filter((m) => !m.categoryId) as map}
						{map.name}
					{/each}
				</li>
			{/if}
		</ul>
	{/if}
</main>
