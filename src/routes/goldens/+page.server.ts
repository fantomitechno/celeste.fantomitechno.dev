import { prisma } from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const goldens = await prisma.map.findMany({
		where: {
			goldenedOn: {
				not: null
			}
		},
		include: {
			Campaign: true,
			Category: true
		},
		orderBy: [
			{
				goldenedOn: 'desc'
			}
		]
	});

	const goldening = await prisma.map.findMany({
		where: {
			goldenPb: {
				not: null
			},
			numberOfRooms: {
				not: null
			},
			goldenedOn: null
		},
		include: {
			Campaign: true,
			Category: true
		}
	});

	return { goldens, goldening };
};
