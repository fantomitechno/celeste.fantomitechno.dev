<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main>
	{#if data.goldens.length == 0}
		I goldened no maps
	{:else}
		{#each data.goldens as gold}
			{gold.name}
		{/each}
	{/if}
</main>
