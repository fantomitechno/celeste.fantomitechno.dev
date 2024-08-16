import { prisma } from '$lib/prisma';
import type { Campaign, Category, Map } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const campaigns = await prisma.campaign.findMany({
		include: {
			maps: {
				orderBy: [
					{
						order: 'asc'
					}
				]
			},
			categories: {
				orderBy: [
					{
						order: 'asc'
					}
				],
				include: {
					maps: {
						orderBy: [
							{
								order: 'asc'
							}
						]
					}
				}
			}
		}
	});

	const standaloneMaps = await prisma.map.findMany({
		where: {
			campaignId: null
		}
	});

	return { campaigns, standaloneMaps } as {
		campaigns: (Campaign & {
			maps: Map[];
			categories: (Category & { maps: Map[] })[];
		})[];
		standaloneMaps: Map[];
	};
};
