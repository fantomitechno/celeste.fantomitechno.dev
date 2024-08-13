<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { map } = data;
</script>

<main>
	{#if !map}
		404: This map does not exist
	{:else}
		<hgroup>
			<h1>
				{map.name}
			</h1>
		</hgroup>
	{/if}
</main>
