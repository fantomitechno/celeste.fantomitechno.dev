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

		const name = data.get('name')?.valueOf() as string | undefined;

		if (!name) return fail(400);

		const cleared = data.get('cleared')?.valueOf() as string | undefined;
		const goldened = data.get('goldened')?.valueOf() as string | undefined;

		const berriesCollected = data.get('berriesCollected')?.valueOf() as string | undefined;
		const pbRoom = data.get('goldenPb')?.valueOf() as string | undefined;
		const berryCount = data.get('berries')?.valueOf() as string | undefined;
		const rooms = data.get('rooms')?.valueOf() as string | undefined;
		const category = data.get('category')?.valueOf() as string | undefined;
		let campaignId = data.get('campaign')?.valueOf() as string | undefined;
		const link = data.get('link')?.valueOf() as string | undefined;
		const mapper = data.get('mapper')?.valueOf() as string | null;
		const moonBerry = data.has('moonBerry');
		const video = data.get('video')?.valueOf() as string | null;
		const timeRaw = data.get('time')?.valueOf() as string | null;
		const fastTimeRaw = data.get('fastClear')?.valueOf() as string | null;
		const deathsRaw = data.get('deaths')?.valueOf() as string | null;
		const lowDeaths = data.get('lowDeaths')?.valueOf() as string | null;

		let clearedOn: Date | null = null;
		if (cleared) {
			clearedOn = new Date(Date.parse(cleared));
		}

		let goldenedOn: Date | null = null;
		if (goldened) goldenedOn = new Date(Date.parse(goldened));

		let berriesGotten: number | undefined = undefined;
		if (berriesCollected) berriesGotten = Number(berriesCollected);

		let berries: number | undefined = undefined;
		if (berryCount) berries = Number(berryCount);

		let numberOfRooms: number | undefined = undefined;
		if (rooms) numberOfRooms = Number(rooms);

		let categoryId: undefined | number = undefined;
		if (category) categoryId = Number(category);

		let goldenPb: undefined | number = undefined;
		if (pbRoom) goldenPb = Number(pbRoom);

		let time: undefined | number = undefined;
		if (timeRaw) time = toTime(timeRaw);

		let fastestClear: undefined | number = undefined;
		if (fastTimeRaw) fastestClear = toTime(fastTimeRaw);

		let lowDeath: undefined | number = undefined;
		if (lowDeaths) lowDeath = Number(lowDeaths);

		let deaths: undefined | number = undefined;
		if (deathsRaw) deaths = Number(deathsRaw);

		await prisma.map.update({
			where: {
				id: Number(params.mapId)
			},
			data: {
				goldenedOn,
				clearedOn,
				berriesGotten,
				berries,
				campaignId,
				categoryId,
				numberOfRooms,
				link,
				name,
				goldenPb,
				mapper,
				moonBerry,
				video,
				time,
				fastestClear,
				lowDeath,
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
