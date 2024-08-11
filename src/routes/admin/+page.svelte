<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main>
	{#if !data.connected}
		<a href="/api/login">Signin</a>
	{:else}
		Boop da fox

		<a href="/admin/create">Create</a>
		<a href="/admin/update">Update</a>
	{/if}
</main>

<style>
</style>
