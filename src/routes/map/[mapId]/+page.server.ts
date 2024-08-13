import { prisma } from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const map = await prisma.map.findFirst({
		include: {
			Category: true,
			Campaign: true
		},
		where: {
			id: Number(params.mapId)
		}
	});

	return { map };
};
