import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/prisma';
import { toTime } from '$lib/time';
import type { MapType, HeartType, DeathlessBerry } from '@prisma/client';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.connected) return redirect(301, '/');
};

export const actions: Actions = {
	map: async ({ request, locals }) => {
		if (!locals.connected) return fail(401);

		const data = await request.formData();

		// Metadata
		const name = data.get('name')?.valueOf() as string | undefined;
		if (!name) return fail(400);

		let campaignId = data.get('campaign')?.valueOf() as string | undefined;

		const category = data.get('category')?.valueOf() as string | undefined;
		let categoryId: undefined | number = undefined;
		if (category) categoryId = Number(category);

		const link = data.get('link')?.valueOf() as string | undefined;
		const mapper = data.get('mapper')?.valueOf() as string | null;
		const video = data.get('video')?.valueOf() as string | null;

		let mapType = data.get('mapType')?.valueOf() as MapType | null;
		if (!mapType?.length) mapType = null;

		// Date informations
		const cleared = data.get('cleared')?.valueOf() as string | undefined;
		let clearedOn: Date | null = null;
		if (cleared) {
			clearedOn = new Date(Date.parse(cleared));
		}

		const deathless = data.get('deathlessOn')?.valueOf() as string | undefined;
		let deathlessOn: Date | null = null;
		if (deathless) deathlessOn = new Date(Date.parse(deathless));

		// Collected infos
		const collectedberriesCount = data.get('collectedberries')?.valueOf() as string | undefined;
		let collectedberries: number | undefined = undefined;
		if (collectedberriesCount) collectedberries = Number(collectedberriesCount);

		const collectedMoonBerry = data.has('collectedMoonBerry');
		const collectedHeart = data.has('collectedHeart');
		const collectedCassette = data.has('collectedCassette');

		// Collectibles infos
		const containsMoonBerry = data.has('containsMoonBerry') || collectedMoonBerry;
		const containsCassette = data.has('containsCassette') || collectedCassette;
		const containsHeart = data.has('containsHeart') || collectedHeart;
		const heartType = data.get('heartType')?.valueOf() as HeartType | undefined;

		const containsBerriesCount = data.get('containsBerries')?.valueOf() as string | undefined;
		let containsBerries: number | undefined = undefined;
		if (containsBerriesCount) containsBerries = Number(containsBerriesCount);

		// Deathless informations
		const pbRoom = data.get('deathlessPb')?.valueOf() as string | undefined;
		let deathlessPb: undefined | number = undefined;
		if (pbRoom) deathlessPb = Number(pbRoom);
		const deathlessType = data.get('deathlessType')?.valueOf() as DeathlessBerry | undefined;

		const roomCount = data.get('numberOfRooms')?.valueOf() as string | undefined;
		let numberOfRooms: number | undefined = undefined;
		if (roomCount) numberOfRooms = Number(roomCount);

		// Stats
		const timeRaw = data.get('time')?.valueOf() as string | null;
		let time: undefined | number = undefined;
		if (timeRaw) time = toTime(timeRaw);

		const deathsRaw = data.get('deaths')?.valueOf() as string | null;
		let deaths: undefined | number = undefined;
		if (deathsRaw) deaths = Number(deathsRaw);

		const fastTimeRaw = data.get('fastClear')?.valueOf() as string | null;
		let fastestClear: undefined | number = undefined;
		if (fastTimeRaw) fastestClear = toTime(fastTimeRaw);

		const lowDeathsPb = data.get('lowDeaths')?.valueOf() as string | null;
		let lowDeaths: undefined | number = undefined;
		if (lowDeathsPb) lowDeaths = Number(lowDeathsPb);

		let customGhostHeart = data.get('customGhostHeart')?.valueOf() as string | null;
		if (!customGhostHeart?.length) customGhostHeart = null;

		let customHeart = data.get('customHeart')?.valueOf() as string | null;
		if (!customHeart?.length) customHeart = null;

		let customGhostDeathlessBerry = data.get('customGhostDeathlessBerry')?.valueOf() as
			| string
			| null;
		if (!customGhostDeathlessBerry?.length) customGhostDeathlessBerry = null;

		let customDeathlessBerry = data.get('customDeathlessBerry')?.valueOf() as string | null;
		if (!customDeathlessBerry?.length) customDeathlessBerry = null;

		let customGhostBerry = data.get('customGhostBerry')?.valueOf() as string | null;
		if (!customGhostBerry?.length) customGhostBerry = null;

		let customBerry = data.get('customBerry')?.valueOf() as string | null;
		if (!customBerry?.length) customBerry = null;

		let customGhostMoonBerry = data.get('customGhostMoonBerry')?.valueOf() as string | null;
		if (!customGhostMoonBerry?.length) customGhostMoonBerry = null;

		let customMoonBerry = data.get('customMoonBerry')?.valueOf() as string | null;
		if (!customMoonBerry?.length) customMoonBerry = null;

		let customHeartSide = data.get('customHeartSide')?.valueOf() as string | null;
		if (!customHeartSide?.length) customHeartSide = null;

		await prisma.map.create({
			data: {
				name,
				campaignId,
				categoryId,
				link,
				mapper,
				video,
				mapType,

				clearedOn,
				deathlessOn,

				containsMoonBerry,
				containsCassette,
				containsHeart,
				heartType,
				containsBerries,

				collectedMoonBerry,
				collectedCassette,
				collectedHeart,
				collectedberries,

				deathlessPb,
				deathlessType,
				numberOfRooms,

				time,
				deaths,
				fastestClear,
				lowDeaths,

				customGhostHeart,
				customHeart,
				customGhostDeathlessBerry,
				customDeathlessBerry,
				customGhostBerry,
				customBerry,
				customGhostMoonBerry,
				customMoonBerry,
				customHeartSide
			}
		});
	},

	category: async ({ request, locals }) => {
		if (!locals.connected) return fail(401);

		const data = await request.formData();

		const name = data.get('name')?.valueOf() as string | null;
		const campaign = data.get('campaign')?.valueOf() as string | null;

		if (!name || !campaign) return fail(400);

		const color = data.get('color')?.valueOf() as string | undefined;

		await prisma.category.create({
			data: {
				name,
				campaignId: campaign,
				color
			}
		});
	},

	campaign: async ({ request, locals }) => {
		if (!locals.connected) return fail(401);

		const data = await request.formData();

		const name = data.get('name')?.valueOf() as string | null;
		const id = data.get('id')?.valueOf() as string | null;

		if (!name || !id) return fail(400);

		const link = data.get('link')?.valueOf() as string | null;
		const mapper = data.get('mapper')?.valueOf() as string | null;

		await prisma.campaign.create({
			data: {
				id,
				name,
				link,
				mapper
			}
		});
	}
};
