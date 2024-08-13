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

	return { campaign };
};
