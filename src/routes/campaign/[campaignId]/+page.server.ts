import { prisma } from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const campaign = await prisma.campaign.findFirst({
		include: {
			maps: true,
			categories: {
				include: {
					maps: true
				}
			}
		},
		where: {
			id: params.campaignId
		}
	});

	const goldenedMaps = await prisma.map.count({
		where: {
			campaignId: params.campaignId,
			goldenedOn: {
				not: null
			}
		}
	});

	const clearedMaps = await prisma.map.count({
		where: {
			campaignId: params.campaignId,
			clearedOn: {
				not: null
			}
		}
	});

	const fullClearedMaps = await prisma.map.count({
		where: {
			campaignId: params.campaignId,
			berries: { equals: prisma.map.fields.berriesGotten, not: 0 }
		}
	});

	const totalBerries = await prisma.map.aggregate({
		where: {
			campaignId: params.campaignId
		},
		_sum: {
			berriesGotten: true,
			berries: true
		}
	});

	return { campaign, goldenedMaps, clearedMaps, fullClearedMaps, totalBerries };
};
