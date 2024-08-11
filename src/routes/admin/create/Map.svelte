<script lang="ts">
	import type { Campaign, Category } from '@prisma/client';
	import Search from '../../Search.svelte';

	let filteredCategories: Category[] = [];
	let filteredCampaign: Campaign[] = [];

	$: checkedCategory = {} as { [category: string]: boolean };
	$: checkedCampaign = {} as { [campaign: string]: boolean };
</script>

<form method="POST" action="?/map">
	<label>
		Name
		<input name="name" type="text" required />
	</label>
	<label>
		Berry count
		<input name="berries" type="number" />
	</label>
	<label>
		Room count
		<input name="rooms" type="number" />
	</label>
	<label>
		Gamebana link
		<input name="link" type="url" />
	</label>

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
							bind:checked={checkedCategory[category.id]}
						/>
						{category.id.toUpperCase()}
					</li>
				{/each}
			</ul>
		{/if}
		{#if Object.values(checkedCategory).filter((v) => v).length == 0}
			No category selected
		{:else}
			{Object.entries(checkedCategory)
				.filter(([_, v]) => v)
				.map(([k, _]) => k.toUpperCase())
				.join(', ')}
		{/if}
	</label>

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
			{Object.entries(checkedCampaign)
				.filter(([_, v]) => v)
				.map(([k, _]) => k)
				.join(', ')}
		{/if}
	</label>

	<button
		disabled={Object.values(checkedCampaign).filter((v) => v).length > 1 ||
			Object.values(checkedCategory).filter((v) => v).length > 1}>Submit</button
	>
</form>
