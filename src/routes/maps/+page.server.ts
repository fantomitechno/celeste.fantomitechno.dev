import { prisma } from '$lib/prisma';
import type { Campaign, Category, Map } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const campaigns = await prisma.campaign.findMany({
		include: {
			maps: true,
			categories: {
				include: {
					maps: true
				}
			}
		}
	});

	return { campaigns } as {
		campaigns: (Campaign & {
			maps: Map[];
			categories: (Category & { maps: Map[] })[];
		})[];
	};
};
