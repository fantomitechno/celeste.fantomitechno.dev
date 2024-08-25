import { prisma } from '$lib/prisma';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { toTime } from '$lib/time';

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
		const link = data.get('link')?.valueOf() as string | undefined;
		const mapper = data.get('mapper')?.valueOf() as string | null;
		const video = data.get('video')?.valueOf() as string | null;

		// Date informations
		const cleared = data.get('cleared')?.valueOf() as string | undefined;
		const deathless = data.get('deathlessOn')?.valueOf() as string | undefined;

		const collectedberriesCount = data.get('collectedberries')?.valueOf() as string | undefined;
		const pbRoom = data.get('deathlessPb')?.valueOf() as string | undefined;
		const containsBerriesCount = data.get('containsBerries')?.valueOf() as string | undefined;
		const roomCount = data.get('numberOfRooms')?.valueOf() as string | undefined;
		const collectedMoonBerry = data.has('collectedMoonBerry');
		const timeRaw = data.get('time')?.valueOf() as string | null;
		const fastTimeRaw = data.get('fastClear')?.valueOf() as string | null;
		const deathsRaw = data.get('deaths')?.valueOf() as string | null;
		const lowDeathsPb = data.get('lowDeaths')?.valueOf() as string | null;

		let clearedOn: Date | null = null;
		if (cleared) {
			clearedOn = new Date(Date.parse(cleared));
		}

		let deathlessOn: Date | null = null;
		if (deathless) deathlessOn = new Date(Date.parse(deathless));

		let collectedberries: number | undefined = undefined;
		if (collectedberriesCount) collectedberries = Number(collectedberriesCount);

		let containsBerries: number | undefined = undefined;
		if (containsBerriesCount) containsBerries = Number(containsBerriesCount);

		let numberOfRooms: number | undefined = undefined;
		if (roomCount) numberOfRooms = Number(roomCount);

		let categoryId: undefined | number = undefined;
		if (category) categoryId = Number(category);

		let deathlessPb: undefined | number = undefined;
		if (pbRoom) deathlessPb = Number(pbRoom);

		let time: undefined | number = undefined;
		if (timeRaw) time = toTime(timeRaw);

		let fastestClear: undefined | number = undefined;
		if (fastTimeRaw) fastestClear = toTime(fastTimeRaw);

		let lowDeaths: undefined | number = undefined;
		if (lowDeathsPb) lowDeaths = Number(lowDeathsPb);

		let deaths: undefined | number = undefined;
		if (deathsRaw) deaths = Number(deathsRaw);

		await prisma.map.update({
			where: {
				id: Number(params.mapId)
			},
			data: {
				deathlessOn,
				clearedOn,
				collectedberries,
				containsBerries,
				campaignId,
				categoryId,
				numberOfRooms,
				link,
				name,
				deathlessPb,
				mapper,
				collectedMoonBerry,
				video,
				time,
				fastestClear,
				lowDeaths,
				deaths
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
