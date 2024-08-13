<script lang="ts">
	import type { Campaign } from '@prisma/client';
	import Search from '../../Search.svelte';

	let filteredCampaign: Campaign[] = [];
</script>

<form method="POST" action="?/category">
	<label>
		Name
		<input name="name" type="text" required />
	</label>

	<label>
		Color
		<input name="color" type="color" required />
	</label>
	<label>
		Search campaign
		<Search type="campaign" bind:results={filteredCampaign} />
		{#if filteredCampaign.length == 0}
			No campaign
		{:else}
			<ul>
				{#each filteredCampaign as campaign}
					<li>
						<input type="checkbox" name="campaign" value={campaign.id} />
						{campaign.name}
					</li>
				{/each}
			</ul>
		{/if}
	</label>
	<button>Submit</button>
</form>
