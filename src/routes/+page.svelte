<script lang="ts">
	import type { PageData } from './$types';
	import foxeline_watch from '$lib/images/foxeline_watch.png';
	import golden from '$lib/images/golden_7C.png';

	export let data: PageData;
</script>

<svelte:head>
	<title>celeste.fantomitechno.dev</title>
	<meta name="description" content="Celeste progression sheet" />
</svelte:head>

<main>
	<section>
		<span>
			<div id="presentation">
				<img src={foxeline_watch} alt="Foxeline watching" />
				<hgroup id="titles">
					<h1>fantomitechno's progression sheet</h1>
					<h2>on Celeste vanilla and modded</h2>
				</hgroup>
			</div>

			<span id="stats">
				<div>
					Out of {data.totalBerries._sum.berries ?? 0} berries, I collected {data.totalBerries._sum
						.berriesGotten ?? 0}
				</div>
				<div>
					I have registred {data.campaignMaps} maps in {data.campaigns} campaigns
				</div>
				<div>
					I have registred {data.standaloneMaps} standalone maps
				</div>
				<div>
					I've collected {data.goldenBerries} golden berries
				</div>
				<div>
					I've cleared {data.clearedMaps} maps and FCed {data.fullClearedMaps} of them
				</div>
			</span>
			<img id="golden" src={golden} alt="7C tree" />
		</span>
	</section>
</main>

<style>
	span {
		width: 100%;
	}

	#titles {
		margin-left: 1rem;
		margin-bottom: 1rem;
	}

	#presentation {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	#golden {
		height: auto;
		width: 100%;
		border-radius: 30px;
	}

	#presentation img {
		max-height: 5rem;
		width: auto;
	}

	#stats div {
		background-color: var(--color-primary);
		border-radius: 5px;
		margin: 0.5em auto;
		padding: 1em;
		width: 20%;
		height: auto;

		text-align: center;
	}

	#stats {
		display: flex;
		flex-wrap: wrap;
		margin: 2em 0;
	}
</style>
