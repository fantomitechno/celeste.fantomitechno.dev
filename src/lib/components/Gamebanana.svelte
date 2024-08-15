<script lang="ts">
	import gamebanana from '$lib/images/gamebanana.png';
	export let link: string;
</script>

<a href={link} target="_blank" rel="noreferrer">
	<img src={gamebanana} alt="Gamebana icon" />
	<span>Download on GameBanana</span>
</a>

<style>
	a {
		text-decoration: none;
		color: var(--color-text);
		display: flex;
		align-items: center;
		justify-items: center;
		gap: 0.3em;
		max-width: 9.2em;
		height: 3em;
		border: 0.2em solid var(--color-primary);
		border-radius: 0.5em;
		padding: 0.3em;
		background-color: var(--color-bg-0);
		overflow-wrap: break-word;

		align-self: flex-end;
	}
	img {
		image-rendering: pixelated;
		height: 2em;
	}
</style>
