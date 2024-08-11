<script lang="ts">
	export let type = 'map';

	let search: string;

	export let results: unknown[];

	const makeSearch = async () => {
		if (search == '') return (results = []);

		const req = await fetch(`/api/search?type=${type}&s=${search}`);

		results = await req.json();
	};
</script>

<input type="text" bind:value={search} on:input={makeSearch} />

<style>
	input {
		width: 100%;
	}
</style>
