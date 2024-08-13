import { prisma } from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const goldens = await prisma.map.findMany({
		where: {
			goldenedOn: {
				not: null
			}
		}
	});

	return { goldens };
};
