<script lang="ts">
	import type { PageData } from './$types';
	import foxeline_watch from '$lib/images/foxeline_watch.png';
	import golden from '$lib/images/golden_7C.png';

	export let data: PageData;
</script>

<svelte:head>
	<title>celeste.fantomitechno.dev</title>
	<meta name="description" content="Celeste progression sheet" />
	<meta name="theme-color" content="#2e1e45" />
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
					Out of {data.totals._sum.berries ?? 0} berr{(data.totals._sum.berries ?? 0) > 1
						? 'ies'
						: 'y'}, I collected {(data.totals._sum.berriesGotten ?? 0) + data.moonBerries}
				</div>
				<div>
					I have registred {data.campaignMaps} map{data.campaignMaps > 1 ? 's' : ''} accross {data.campaigns}
					campaign{data.campaigns > 1 ? 's' : ''}
				</div>
				<div>
					I have registred {data.standaloneMaps} standalone map{data.standaloneMaps > 1 ? 's' : ''}
				</div>
				<div>
					I've collected {data.goldenBerries} golden berr{data.goldenBerries > 1 ? 'ies' : 'y'}
				</div>
				<div>
					I'm working on {data.goldeningBerries} golden berr{data.goldeningBerries > 1
						? 'ies'
						: 'y'}
				</div>
				<div>
					I've cleared {data.clearedMaps} map{data.clearedMaps > 1 ? 's' : ''} and FCed {data.fullClearedMaps}
					of them
				</div>
				<div>
					I died {data.totals._sum.deaths ?? 0} times
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
		margin: 0.5em 0;
		padding: 1em;
		width: 20%;
		height: auto;

		text-align: center;
	}

	#stats {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		margin: 2em 0;
	}
</style>
