import { prisma } from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const goldens = await prisma.map.findMany({
		where: {
			deathlessOn: {
				not: null
			}
		},
		include: {
			Campaign: true,
			Category: true
		},
		orderBy: [
			{
				deathlessOn: 'desc'
			}
		]
	});

	const goldening = await prisma.map.findMany({
		where: {
			deathlessPb: {
				not: null
			},
			numberOfRooms: {
				not: null
			},
			deathlessOn: null
		},
		include: {
			Campaign: true,
			Category: true
		}
	});

	return { goldens, goldening };
};
