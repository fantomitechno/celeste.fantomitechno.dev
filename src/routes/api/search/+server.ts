import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/prisma';

export const GET: RequestHandler = async ({ url }) => {
	const search = url.searchParams.get('s');
	const type = url.searchParams.get('type');

	if (!search || !type)
		return error(400, JSON.stringify({ reason: `Missing type or s`, error: true }));

	let results: unknown[];
	switch (type) {
		case 'map':
			results = await prisma.map.findMany({
				where: {
					name: {
						contains: search,
						mode: 'insensitive'
					}
				}
			});
			break;
		case 'category':
			results = await prisma.category.findMany({
				where: {
          OR: [
            {
              name: {
                contains: search,
                mode: 'insensitive'
              }
            },
            {
              Campaign: {
                name: {
                  contains: search,
                  mode: 'insensitive'
                }
              }
            }
          ]
				},
        include: {
          Campaign: true
        }
			});
			break;
		case 'campaign':
			results = await prisma.campaign.findMany({
				where: {
					name: {
						contains: search,
						mode: 'insensitive'
					}
				}
			});
			break;

		default:
			return error(400, JSON.stringify({ reason: `Type ${type} is not suported`, error: true }));
	}

	return new Response(JSON.stringify(results));
};
