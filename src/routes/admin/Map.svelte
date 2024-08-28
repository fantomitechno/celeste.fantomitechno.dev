<script lang="ts">
	import type { Campaign, Category } from '@prisma/client';
	import Search from '$lib/components/Search.svelte';

	let filteredCategories: (Category & { Campaign: Campaign })[] = [];
	let filteredCampaign: Campaign[] = [];

	let checkedCategory = {} as { [category: string]: boolean };
	let checkedCampaign = {} as { [campaign: string]: boolean };

	const readFileForTransfer = (upload: FileList) => {
		const file = upload[0];
		return new Promise((resolve, _) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result as string);
			reader.readAsDataURL(file);
		}) as Promise<string>;
	};

	let customGhostHeartUpload: FileList;
	let customGhostHeartBase64 = '';

	let customHeartUpload: FileList;
	let customHeartBase64 = '';

	let customGhostDeathlessBerryUpload: FileList;
	let customGhostDeathlessBerryBase64 = '';

	let customDeathlessBerryUpload: FileList;
	let customDeathlessBerryBase64 = '';

	let customGhostBerryUpload: FileList;
	let customGhostBerryBase64 = '';

	let customBerryUpload: FileList;
	let customBerryBase64 = '';

	let customGhostMoonBerryUpload: FileList;
	let customGhostMoonBerryBase64 = '';

	let customMoonBerryUpload: FileList;
	let customMoonBerryBase64 = '';

	let customHeartSideUpload: FileList;
	let customHeartSideBase64 = '';
</script>

<form method="POST" action="?/map">
	<span>
		<div>
			<label>
				Name
				<input name="name" type="text" required />
			</label>
			<label>
				Mapper
				<input name="mapper" type="text" />
			</label>
			<label>
				Custom Heart Side
				<input
					type="file"
					accept=".png,.jpg,.gif"
					bind:files={customHeartSideUpload}
					on:change={async () => {
						customHeartSideBase64 = await readFileForTransfer(customHeartSideUpload);
					}}
				/>
				<button
					type="button"
					class="upload-delete"
					on:click={() => {
						customHeartSideBase64 = '';
					}}
				>
					Clear
				</button>
				<input type="text" name="customHeartSide" hidden bind:value={customHeartSideBase64} />
			</label>
			<img class="upload-preview" src={customHeartSideBase64} alt="" />
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
									bind:checked={checkedCategory[`${category.name} - ${category.Campaign.name}`]}
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

			<label>
				Map Type
				<select name="mapType" value={null}>
					<option value="GREEN">Green</option>
					<option value="YELLOW">Yellow</option>
					<option value="RED">Red</option>
					<option value="CRACKED">Cracked</option>
					<option value="HEARTSIDE">Heart Side</option>
					<option value={null}>None</option>
				</select>
			</label>
		</div>
	</span>
	<hr class="separator" />
	<span>
		<div>
			<label>
				Berry count
				<input name="containsBerries" type="number" />
			</label>
			<label>
				Berries collected
				<input name="collectedberries" type="number" />
			</label>
			<span>
				<div>
					<label>
						<input name="containsMoonBerry" type="checkbox" />
						Contains Moon Berry
					</label>
					<label>
						<input name="containsCassette" type="checkbox" />
						Contains Cassette
					</label>
					<label>
						<input name="containsHeart" type="checkbox" />
						Contains Heart
					</label>
				</div>
				<div>
					<label>
						<input name="collectedMoonBerry" type="checkbox" />
						Moon Berry collected
					</label>
					<label>
						<input name="collectedCassette" type="checkbox" />
						Collected Cassette
					</label>
					<label>
						<input name="collectedHeart" type="checkbox" />
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
						<input type="text" name="customGhostHeart" hidden bind:value={customGhostHeartBase64} />
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
								customDeathlessBerryBase64 = await readFileForTransfer(customDeathlessBerryUpload);
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
				<input name="numberOfRooms" type="number" />
			</label>
			<label>
				Deathless PB
				<input name="deathlessPb" type="number" />
			</label>
			<label>
				Deathless Berry Type
				<select name="deathlessType">
					<option value="GOLDEN">Golden berry</option>
					<option value="SILVER">Silver berry</option>
					<option value="PLATINUM">Platinum berry</option>
				</select>
			</label>
			<label>
				Heart Type
				<select name="heartType">
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
						<input type="text" name="customGhostBerry" hidden bind:value={customGhostBerryBase64} />
					</label>
					<img class="upload-preview" src={customGhostBerryBase64} alt="" />
					<label>
						Custom Moon Berry (Ghost)
						<input
							type="file"
							accept=".png,.jpg,.gif"
							bind:files={customGhostMoonBerryUpload}
							on:change={async () => {
								customGhostMoonBerryBase64 = await readFileForTransfer(customGhostMoonBerryUpload);
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
						<input type="text" name="customMoonBerry" hidden bind:value={customMoonBerryBase64} />
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
				<input name="time" type="text" />
			</label>
			<label>
				Total deaths
				<input name="deaths" type="number" />
			</label>
			<label>
				Cleared the
				<input name="cleared" type="date" />
			</label>
		</div>
		<div>
			<label>
				Fast clear
				<input name="fastClear" type="text" />
			</label>
			<label>
				Lowest deaths
				<input name="lowDeaths" type="number" />
			</label>
			<label>
				Deathless the
				<input name="deathlessOn" type="date" />
			</label>
		</div>
	</span>

	<hr class="separator" />
	<span>
		<div>
			<label>
				Gamebana link
				<input name="link" type="url" />
			</label>
		</div>
		<div>
			<label>
				Video link
				<input name="video" type="url" />
			</label>
		</div>
	</span>

	<button
		disabled={Object.values(checkedCampaign).filter((v) => v).length > 1 ||
			Object.values(checkedCategory).filter((v) => v).length > 1}>Submit</button
	>
</form>

<style>
	form {
		margin: 1em 0.5em;
		display: flex;
		flex-direction: column;

		width: 80%;
		align-self: center;
		border: 0.2em solid var(--color-primary);
		border-radius: 1em;
		padding: 1em;
		background-color: var(--color-bg-0);
		width: calc(100% - 2.4em);
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

	form span {
		display: flex;
		flex-direction: row;
	}

	form div {
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

	form button:not(.upload-delete) {
		width: 45%;
		margin: 1em auto 0;
	}

	.separator {
		border: none;
		background-color: var(--color-primary);
		width: 100%;
		height: 0.2em;
		margin: 1em 0;
	}

	.upload-preview {
		width: 3em;
	}
</style>
