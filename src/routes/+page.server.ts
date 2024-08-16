import { prisma } from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const campaignMaps = await prisma.map.count({ where: { campaignId: { not: null } } });
	const campaigns = await prisma.campaign.count();

	const standaloneMaps = await prisma.map.count({ where: { campaignId: null } });

	const totals = await prisma.map.aggregate({
		_sum: {
			berriesGotten: true,
			berries: true,
			deaths: true,
			time: true
		}
	});

	const moonBerries = await prisma.map.count({
		where: {
			moonBerry: true
		}
	});

	const goldenBerries = await prisma.map.count({ where: { goldenedOn: { not: null } } });
	const goldeningBerries = await prisma.map.count({
		where: { goldenPb: { not: null }, numberOfRooms: { not: null } }
	});
	const clearedMaps = await prisma.map.count({ where: { clearedOn: { not: null } } });

	const fullClearedMaps = await prisma.map.count({
		where: { berries: { equals: prisma.map.fields.berriesGotten, not: 0 } }
	});

	return {
		campaignMaps,
		campaigns,
		standaloneMaps,
		totals,
		goldenBerries,
		goldeningBerries,
		clearedMaps,
		fullClearedMaps,
		moonBerries
	};
};
