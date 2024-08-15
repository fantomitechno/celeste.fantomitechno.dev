<script lang="ts">
	import type { Campaign } from '@prisma/client';
	import Search from '$lib/components/Search.svelte';

	let filteredCampaign: Campaign[] = [];
	let checkedCampaign = {} as { [campaign: string]: boolean };
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
	<button disabled={Object.values(checkedCampaign).filter((v) => v).length != 1}>Submit</button>
</form>

<style>
	form {
		margin: 1em 0.5em;
		display: flex;
		flex-direction: column;

		width: 25%;
	}

	input:not([type='checkbox']):not([type='color']) {
		width: 100%;
	}

	form > button {
		width: 50%;
		align-self: center;
		margin-top: 1em;
	}

	label {
		margin: 0.5em 0;
	}

	li {
		display: flex;
		flex-direction: row;
		width: 100%;
	}

	ul {
		padding: 0;
	}
</style>
