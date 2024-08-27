import { prisma } from '$lib/prisma';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { toTime } from '$lib/time';
import type { DeathlessBerry, HeartType } from '@prisma/client';

export const load: PageServerLoad = async ({ params, locals }) => {
	const map = await prisma.map.findFirst({
		include: {
			Category: true,
			Campaign: true
		},
		where: {
			id: Number(params.mapId)
		}
	});

	return { map, connected: locals.connected };
};

export const actions: Actions = {
	edit: async ({ request, locals, params }) => {
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

		await prisma.map.update({
			where: {
				id: Number(params.mapId)
			},
			data: {
				name,
				campaignId,
				categoryId,
				link,
				mapper,
				video,

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
				customMoonBerry
			}
		});
	},
	delete: async ({ locals, params }) => {
		if (!locals.connected) return fail(401);

		await prisma.map.delete({
			where: {
				id: Number(params.mapId)
			}
		});
	}
};
