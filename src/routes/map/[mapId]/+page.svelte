<script lang="ts">
	// Berries
	import defaultBerry from '$lib/images/berries/Strawberry_idle.webp';
	import defaultGhostBerry from '$lib/images/berries/ghostBerry.gif';
	import defaultMoonBerry from '$lib/images/berries/moonBerry.gif';
	import defaultGhostMoonBerry from '$lib/images/berries/ghostMoonBerry.gif';
	import gberry from '$lib/images/berries/goldBerry.gif';
	import ghostGBerry from '$lib/images/berries/ghostGoldBerry.gif';
	import sberry from '$lib/images/berries/silverBerry.gif';
	import ghostSBerry from '$lib/images/berries/ghostSilverBerry.gif';
	import pberry from '$lib/images/berries/platBerry.gif';
	import ghostPBerry from '$lib/images/berries/ghostPlatBerry.gif';

	// CLear status
	import dot from '$lib/images/journal/dot.png';
	import clear from '$lib/images/journal/clear.png';
	import fullclear from '$lib/images/journal/fullclear.png';

	// Stats
	import time from '$lib/images/journal/time.png';
	import fasttime from '$lib/images/journal/fasttime.png';
	import skullBlue from '$lib/images/journal/skullBlue.png';
	import skullGold from '$lib/images/journal/skullGold.png';

	// Golden status
	import flagCP from '$lib/images/FlagCP.gif';

	// Collectibles
	import cassette from '$lib/images/cassette.gif';
	import cassetteGhost from '$lib/images/cassetteGhost.gif';
	import blueHeart from '$lib/images/hearts/BlueHeart.gif';
	import yellowHeart from '$lib/images/hearts/YellowHeart.gif';
	import redHeart from '$lib/images/hearts/RedHeart.gif';
	import orangeHeart from '$lib/images/hearts/OrangeHeart.gif';
	import purpleHeart from '$lib/images/hearts/PurpleHeart.gif';
	import normalGhostHeart from '$lib/images/hearts/GhostHeart.gif';
	import collabBlueHeart from '$lib/images/hearts/CollabBlueHeart.gif';
	import collabYellowHeart from '$lib/images/hearts/CollabYellowHeart.gif';
	import collabRedHeart from '$lib/images/hearts/CollabRedHeart.gif';
	import collabOrangeHeart from '$lib/images/hearts/CollabOrangeHeart.gif';
	import collabPurpleHeart from '$lib/images/hearts/CollabPurpleHeart.gif';
	import collabGhostHeart from '$lib/images/hearts/CollabGhostHeart.gif';

	import type { Campaign, Category } from '@prisma/client';
	import type { PageData } from './$types';

	import Search from '$lib/components/Search.svelte';
	import Gamebanana from '$lib/components/Gamebanana.svelte';
	import VideoEmbed from './VideoEmbed.svelte';
	import { fromTime } from '$lib/time';
	import { isFullCleared } from '$lib/clear';

	export let data: PageData;

	const { map } = data;

	let filteredCategories: (Category & { Campaign: Campaign })[] = [];
	let filteredCampaign: Campaign[] = [];

	let checkedCategory = {} as { [category: string]: boolean };
	let checkedCampaign = {} as { [campaign: string]: boolean };

	if (map?.Campaign) {
		checkedCampaign[map.Campaign.name] = true;
		if (map?.Category) checkedCategory[`${map.Category.name} - ${map.Campaign.name}`] = true;
	}

	let deathlessBerry: string = '';
	let deathlessGhostBerry: string = '';
	let deathlessBerryName: string = '';
	switch (map?.deathlessType) {
		case 'GOLDEN':
			deathlessBerry = gberry;
			deathlessGhostBerry = ghostGBerry;
			deathlessBerryName = 'Golden';
			break;

		case 'PLATINUM':
			deathlessBerry = pberry;
			deathlessGhostBerry = ghostPBerry;
			deathlessBerryName = 'Platinum';
			break;

		case 'SILVER':
			deathlessBerry = sberry;
			deathlessGhostBerry = ghostSBerry;
			deathlessBerryName = 'Silver';
			break;

		default:
			break;
	}
	if (map?.customGhostDeathlessBerry) {
		deathlessGhostBerry = map.customGhostDeathlessBerry;
	}
	if (map?.customDeathlessBerry) {
		deathlessBerry = map.customDeathlessBerry;
	}

	let heart: string = '';
	let ghostHeart: string = '';
	switch (map?.heartType) {
		case 'BLUE':
			heart = blueHeart;
			ghostHeart = normalGhostHeart;
			break;

		case 'YELLOW':
			heart = yellowHeart;
			ghostHeart = normalGhostHeart;
			break;

		case 'RED':
			heart = redHeart;
			ghostHeart = normalGhostHeart;
			break;

		case 'ORANGE':
			heart = orangeHeart;
			ghostHeart = normalGhostHeart;
			break;

		case 'PURPLE':
			heart = purpleHeart;
			ghostHeart = normalGhostHeart;
			break;

		case 'COLLAB_BLUE':
			heart = collabBlueHeart;
			ghostHeart = collabGhostHeart;
			break;

		case 'COLLAB_YELLOW':
			heart = collabYellowHeart;
			ghostHeart = collabGhostHeart;
			break;

		case 'COLLAB_RED':
			heart = collabRedHeart;
			ghostHeart = collabGhostHeart;
			break;

		case 'COLLAB_ORANGE':
			heart = collabOrangeHeart;
			ghostHeart = collabGhostHeart;
			break;

		case 'COLLAB_PURPLE':
			heart = collabPurpleHeart;
			ghostHeart = collabGhostHeart;
			break;

		default:
			break;
	}
	if (map?.customGhostHeart) {
		ghostHeart = map.customGhostHeart;
	}
	if (map?.customHeart) {
		heart = map.customHeart;
	}

	const moonBerry = map?.customMoonBerry ?? defaultMoonBerry;
	const ghostMoonBerry = map?.customGhostMoonBerry ?? defaultGhostMoonBerry;

	const berry = map?.customBerry ?? defaultBerry;
	const ghostBerry = map?.customGhostBerry ?? defaultGhostBerry;

	const readFileForTransfer = (upload: FileList) => {
		const file = upload[0];
		return new Promise((resolve, _) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result as string);
			reader.readAsDataURL(file);
		}) as Promise<string>;
	};

	let customGhostHeartUpload: FileList;
	let customGhostHeartBase64 = map?.customGhostHeart ?? '';

	let customHeartUpload: FileList;
	let customHeartBase64 = map?.customHeart ?? '';

	let customGhostDeathlessBerryUpload: FileList;
	let customGhostDeathlessBerryBase64 = map?.customGhostDeathlessBerry ?? '';

	let customDeathlessBerryUpload: FileList;
	let customDeathlessBerryBase64 = map?.customDeathlessBerry ?? '';

	let customGhostBerryUpload: FileList;
	let customGhostBerryBase64 = map?.customGhostBerry ?? '';

	let customBerryUpload: FileList;
	let customBerryBase64 = map?.customBerry ?? '';

	let customGhostMoonBerryUpload: FileList;
	let customGhostMoonBerryBase64 = map?.customGhostMoonBerry ?? '';

	let customMoonBerryUpload: FileList;
	let customMoonBerryBase64 = map?.customMoonBerry ?? '';
</script>

<svelte:head>
	<title>{map?.name ?? '404'}</title>
	<meta name="description" content={map ? `Informations on ${map.name}` : ''} />
	<meta name="theme-color" content="#2e1e45" />
</svelte:head>

<main>
	{#if !map}
		404: This map does not exist
	{:else}
		<span id="title">
			<hgroup>
				<h1>
					{map.name}
				</h1>
				{#if map.Campaign}
					<h2>
						Map from <a href={`/campaign/${map.Campaign.id}`}>{map.Campaign.name}</a>
						{#if map.Category}
							- <b style:color={map.Category.color}>{map.Category.name}</b>
						{/if}
					</h2>
				{:else}
					<h2>Standalone map</h2>
				{/if}
				{#if map.mapper}
					by {map.mapper}
				{:else if map.Campaign?.mapper}
					by {map.Campaign.mapper}
				{/if}
			</hgroup>
			{#if map.link && map.link != ''}
				<Gamebanana link={map.link} />
			{:else if map.Campaign?.link && map.Campaign.link != ''}
				<Gamebanana link={map.Campaign.link} />
			{/if}
		</span>
		<div class="stats">
			<span>
				<img src={isFullCleared(map) ? fullclear : map.clearedOn ? clear : dot} alt="A flag" />
				{map.clearedOn ? `Cleared the ${map.clearedOn.toDateString()}` : `Map still not cleared`}
			</span>
			{#if map.containsBerries}
				<span>
					<img
						src={map.containsBerries <= map.collectedberries ? berry : ghostBerry}
						alt="A strawberry"
					/>
					Collected {map.collectedberries} out of {map.containsBerries} berrie{map.containsBerries >
					1
						? 's'
						: ''}
				</span>
			{/if}
			{#if map.containsCassette || map.containsHeart || map.containsMoonBerry}
				<span id="collectibles">
					{#if map.containsCassette}
						<img src={map.collectedCassette ? cassette : cassetteGhost} alt="A cassette" />
					{/if}
					{#if map.containsHeart}
						<img src={map.collectedHeart ? heart : ghostHeart} alt="A heart" />
					{/if}
					{#if map.containsMoonBerry}
						<img src={map.collectedMoonBerry ? moonBerry : ghostMoonBerry} alt="The moon berry" />
					{/if}
				</span>
			{/if}
			<span>
				{#if map.deathlessOn}
					<img src={deathlessBerry} alt={`A ${deathlessBerryName} strawberry`} />
					{deathlessBerryName} berry collected {map.deathlessOn.toDateString()}
				{:else if map.deathlessPb && map.numberOfRooms}
					<img id="flag" src={flagCP} alt="A Flag Checkpoint" />
					Reached room {map.deathlessPb} out of {map.numberOfRooms}
				{:else}
					<img src={deathlessGhostBerry} alt={`A ${deathlessBerryName} strawberry`} />
					{deathlessBerryName} berry still waiting for me
				{/if}
			</span>
			<span>
				<img src={time} alt="A Clock from Celeste" />
				Time in the map: {fromTime(map.time)}
			</span>
			<span>
				<img src={skullBlue} alt="A blue skull" />
				Total deaths: {map.deaths}
			</span>
			{#if map.fastestClear}
				<span>
					<img src={fasttime} alt="A Clock from Celeste (edited to be orange)" />
					Fastest clear: {fromTime(map.fastestClear)}
				</span>
			{/if}
			{#if map.lowDeaths}
				<span>
					<img src={skullGold} alt="A gold skull" />
					Lowest death run: {map.lowDeaths}
				</span>
			{/if}
		</div>

		{#if map.video}
			<VideoEmbed video={map.video} />
		{/if}

		{#if data.connected}
			<form action="?/edit" method="POST" id="edit">
				<span>
					<div>
						<label>
							Name
							<input name="name" type="text" value={map.name} required />
						</label>
						<label>
							Mapper
							<input name="mapper" type="text" value={map.mapper} />
						</label>
					</div>
					<div>
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
												bind:checked={checkedCategory[
													`${category.name} - ${category.Campaign.name}`
												]}
											/>
											{category.name} - {category.Campaign.name}
										</li>
									{/each}
								</ul>
							{/if}
							{#if Object.values(checkedCategory).filter((v) => v).length == 0}
								No category selected
							{:else}
								Selected: {Object.entries(checkedCategory)
									.filter(([_, v]) => v)
									.map(([k, _]) => k)
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
								Selected: {Object.entries(checkedCampaign)
									.filter(([_, v]) => v)
									.map(([k, _]) => k)
									.join(', ')}
							{/if}
						</label>
					</div>
				</span>
				<hr class="separator" />
				<span>
					<div>
						<label>
							Berry count
							<input name="containsBerries" type="number" value={map.containsBerries} />
						</label>
						<label>
							Berries collected
							<input name="collectedberries" type="number" value={map.collectedberries} />
						</label>
						<span>
							<div>
								<label>
									<input name="containsMoonBerry" type="checkbox" checked={map.containsMoonBerry} />
									Contains Moon Berry
								</label>
								<label>
									<input name="containsCassette" type="checkbox" checked={map.containsCassette} />
									Contains Cassette
								</label>
								<label>
									<input name="containsHeart" type="checkbox" checked={map.containsHeart} />
									Contains Heart
								</label>
							</div>
							<div>
								<label>
									<input
										name="collectedMoonBerry"
										type="checkbox"
										checked={map.collectedMoonBerry}
									/>
									Moon Berry collected
								</label>
								<label>
									<input name="collectedCassette" type="checkbox" checked={map.collectedCassette} />
									Collected Cassette
								</label>
								<label>
									<input name="collectedHeart" type="checkbox" checked={map.collectedHeart} />
									Collected Heart
								</label>
							</div>
						</span>
						<span>
							<div>
								<label>
									Custom Heart (Ghost)
									<input
										type="file"
										accept=".png,.jpg,.gif"
										bind:files={customGhostHeartUpload}
										on:change={async () => {
											customGhostHeartBase64 = await readFileForTransfer(customGhostHeartUpload);
										}}
									/>
									<button
										type="button"
										class="upload-delete"
										on:click={() => {
											customGhostHeartBase64 = '';
										}}
									>
										Clear
									</button>
									<input
										type="text"
										name="customGhostHeart"
										hidden
										bind:value={customGhostHeartBase64}
									/>
								</label>
								<img class="upload-preview" src={customGhostHeartBase64} alt="" />
								<label>
									Custom Deathless Berry (Ghost)
									<input
										type="file"
										accept=".png,.jpg,.gif"
										bind:files={customGhostDeathlessBerryUpload}
										on:change={async () => {
											customGhostDeathlessBerryBase64 = await readFileForTransfer(
												customGhostDeathlessBerryUpload
											);
										}}
									/>
									<button
										type="button"
										class="upload-delete"
										on:click={() => {
											customGhostDeathlessBerryBase64 = '';
										}}
									>
										Clear
									</button>
									<input
										type="text"
										name="customGhostDeathlessBerry"
										hidden
										bind:value={customGhostDeathlessBerryBase64}
									/>
								</label>
								<img class="upload-preview" src={customGhostDeathlessBerryBase64} alt="" />
							</div>
							<div>
								<label>
									Custom Heart
									<input
										type="file"
										accept=".png,.jpg,.gif"
										bind:files={customHeartUpload}
										on:change={async () => {
											customHeartBase64 = await readFileForTransfer(customHeartUpload);
										}}
									/>
									<button
										type="button"
										class="upload-delete"
										on:click={() => {
											customHeartBase64 = '';
										}}
									>
										Clear
									</button>
									<input type="text" name="customHeart" hidden bind:value={customHeartBase64} />
								</label>
								<img class="upload-preview" src={customHeartBase64} alt="" />
								<label>
									Custom Deathless Berry
									<input
										type="file"
										accept=".png,.jpg,.gif"
										bind:files={customDeathlessBerryUpload}
										on:change={async () => {
											customDeathlessBerryBase64 = await readFileForTransfer(
												customDeathlessBerryUpload
											);
										}}
									/>
									<button
										type="button"
										class="upload-delete"
										on:click={() => {
											customDeathlessBerryBase64 = '';
										}}
									>
										Clear
									</button>
									<input
										type="text"
										name="customDeathlessBerry"
										hidden
										bind:value={customDeathlessBerryBase64}
									/>
								</label>
								<img class="upload-preview" src={customDeathlessBerryBase64} alt="" />
							</div>
						</span>
					</div>
					<div>
						<label>
							Room count
							<input name="numberOfRooms" type="number" value={map.numberOfRooms} />
						</label>
						<label>
							Deathless PB
							<input name="deathlessPb" type="number" value={map.deathlessPb} />
						</label>
						<label>
							Deathless Berry Type
							<select name="deathlessType" value={map.deathlessType}>
								<option value="GOLDEN">Golden berry</option>
								<option value="SILVER">Silver berry</option>
								<option value="PLATINUM">Platinum berry</option>
							</select>
						</label>
						<label>
							Heart Type
							<select name="heartType" value={map.heartType}>
								<option value="BLUE">Blue heart</option>
								<option value="RED">Red heart</option>
								<option value="YELLOW">Yellow heart</option>
								<option value="ORANGE">Orange heart</option>
								<option value="PURPLE">Purple heart</option>
								<option value="COLLAB_BLUE">Blue Collab heart</option>
								<option value="COLLAB_RED">Red Collab heart</option>
								<option value="COLLAB_YELLOW">Yellow Collab heart</option>
								<option value="COLLAB_ORANGE">Orange Collab heart</option>
								<option value="COLLAB_PURPLE">Purple Collab heart</option>
							</select>
						</label>
						<span>
							<div>
								<label>
									Custom Berry (Ghost)
									<input
										type="file"
										accept=".png,.jpg,.gif"
										bind:files={customGhostBerryUpload}
										on:change={async () => {
											customGhostBerryBase64 = await readFileForTransfer(customGhostBerryUpload);
										}}
									/>
									<button
										type="button"
										class="upload-delete"
										on:click={() => {
											customGhostBerryBase64 = '';
										}}
									>
										Clear
									</button>
									<input
										type="text"
										name="customGhostBerry"
										hidden
										bind:value={customGhostBerryBase64}
									/>
								</label>
								<img class="upload-preview" src={customGhostBerryBase64} alt="" />
								<label>
									Custom Moon Berry (Ghost)
									<input
										type="file"
										accept=".png,.jpg,.gif"
										bind:files={customGhostMoonBerryUpload}
										on:change={async () => {
											customGhostMoonBerryBase64 = await readFileForTransfer(
												customGhostMoonBerryUpload
											);
										}}
									/>
									<button
										type="button"
										class="upload-delete"
										on:click={() => {
											customGhostMoonBerryBase64 = '';
										}}
									>
										Clear
									</button>
									<input
										type="text"
										name="customGhostMoonBerry"
										hidden
										bind:value={customGhostMoonBerryBase64}
									/>
								</label>
								<img class="upload-preview" src={customGhostMoonBerryBase64} alt="" />
							</div>
							<div>
								<label>
									Custom Berry
									<input
										type="file"
										accept=".png,.jpg,.gif"
										bind:files={customBerryUpload}
										on:change={async () => {
											customBerryBase64 = await readFileForTransfer(customBerryUpload);
										}}
									/>
									<button
										type="button"
										class="upload-delete"
										on:click={() => {
											customBerryBase64 = '';
										}}
									>
										Clear
									</button>
									<input type="text" name="customBerry" hidden bind:value={customBerryBase64} />
								</label>
								<img class="upload-preview" src={customBerryBase64} alt="" />
								<label>
									Custom Moon Berry
									<input
										type="file"
										accept=".png,.jpg,.gif"
										bind:files={customMoonBerryUpload}
										on:change={async () => {
											customMoonBerryBase64 = await readFileForTransfer(customMoonBerryUpload);
										}}
									/>
									<button
										type="button"
										class="upload-delete"
										on:click={() => {
											customMoonBerryBase64 = '';
										}}
									>
										Clear
									</button>
									<input
										type="text"
										name="customMoonBerry"
										hidden
										bind:value={customMoonBerryBase64}
									/>
								</label>
								<img class="upload-preview" src={customMoonBerryBase64} alt="" />
							</div>
						</span>
					</div>
				</span>
				<hr class="separator" />
				<span>
					<div>
						<label>
							Time passed
							<input name="time" type="text" value={fromTime(map.time)} />
						</label>
						<label>
							Total deaths
							<input name="deaths" type="number" value={map.deaths} />
						</label>
						<label>
							Cleared the
							<input
								name="cleared"
								type="date"
								value={map.clearedOn?.toISOString().split('T')[0]}
							/>
						</label>
					</div>
					<div>
						<label>
							Fast clear
							<input name="fastClear" type="text" value={fromTime(map.fastestClear)} />
						</label>
						<label>
							Lowest deaths
							<input name="lowDeaths" type="number" value={map.lowDeaths} />
						</label>
						<label>
							Deathless the
							<input
								name="deathlessOn"
								type="date"
								value={map.deathlessOn?.toISOString().split('T')[0]}
							/>
						</label>
					</div>
				</span>

				<hr class="separator" />
				<span>
					<div>
						<label>
							Gamebana link
							<input name="link" type="url" value={map.link} />
						</label>
					</div>
					<div>
						<label>
							Video link
							<input name="video" type="url" value={map.video} />
						</label>
					</div>
				</span>

				<span>
					<button
						type="submit"
						disabled={Object.values(checkedCampaign).filter((v) => v).length > 1 ||
							Object.values(checkedCategory).filter((v) => v).length > 1 ||
							(Object.values(checkedCategory).filter((v) => v).length == 1 &&
								Object.values(checkedCampaign).filter((v) => v).length != 1)}>Submit</button
					>
					<button type="submit" formaction="?/delete">Delete</button>
				</span>
			</form>
		{/if}
	{/if}
</main>

<style>
	#title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	a {
		text-decoration: none;
	}

	a:hover {
		color: var(--color-secondary);
	}

	#edit {
		display: flex;
		flex-direction: column;
		align-self: center;
		border: 0.2em solid var(--color-primary);
		border-radius: 1em;
		padding: 1em;
		background-color: var(--color-bg-0);
		width: calc(100% - 2.4em);
	}

	#edit span {
		display: flex;
		flex-direction: row;
	}

	#edit div {
		width: 45%;
		margin: 0 auto;

		display: flex;
		flex-direction: column;
	}

	input:not([type='checkbox']):not([type='color']),
	select {
		width: 100%;
		font: inherit;
	}

	input[type='text'] {
		width: 98.2%;
	}

	#edit button:not(.upload-delete) {
		width: 45%;
		margin: 1em auto 0;
	}

	#edit label {
		margin: 0.5em 0;
	}

	#edit li {
		display: flex;
		flex-direction: row;
	}

	#edit ul {
		padding: 0;
	}

	.separator {
		border: none;
		background-color: var(--color-primary);
		width: 100%;
		height: 0.2em;
		margin: 1em 0;
	}

	span > img {
		margin: 0 0.2em;
		width: 4em;
		align-self: center;
	}

	.stats {
		display: flex;
		flex-wrap: wrap;
		margin: 2em 0;
		justify-content: space-evenly;
	}

	.stats span {
		background-color: var(--color-primary);
		border-radius: 5px;
		margin: 0.5em 0;
		padding: 1em;
		width: 27%;
		height: auto;

		display: flex;
		align-items: center;
	}

	#collectibles {
		justify-content: space-evenly;
	}

	#collectibles > img {
		height: 4em;
		width: auto;
	}

	#flag {
		padding: 0 0.7em;
		width: 3em;
	}

	.upload-preview {
		width: 3em;
	}
</style>
