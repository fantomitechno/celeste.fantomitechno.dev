import { prisma } from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const campaign = await prisma.campaign.findFirst({
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

	const totals = await prisma.map.aggregate({
		where: {
			campaignId: params.campaignId
		},
		_sum: {
			berriesGotten: true,
			berries: true,
			deaths: true,
			time: true
		}
	});

	const moonBerries = await prisma.map.count({
		where: {
			campaignId: params.campaignId,
			moonBerry: true
		}
	});

	return {
		campaign,
		goldenedMaps,
		clearedMaps,
		fullClearedMaps,
		totals,
		moonBerries,
		connected: locals.connected
	};
};

export const actions: Actions = {
	edit: async ({ request, locals, params }) => {
		if (!locals.connected) return fail(401);

		const data = await request.formData();

		const name = data.get('name')?.valueOf() as string | undefined;

		if (!name) return fail(400);
		const link = data.get('link')?.valueOf() as string | undefined;
		const mapper = data.get('mapper')?.valueOf() as string | null;

		await prisma.campaign.update({
			where: {
				id: params.campaignId
			},
			data: {
				link,
				name,
				mapper
			}
		});
	},
	editMapOrder: async ({ request, locals, params }) => {
		if (!locals.connected) return fail(401);

		const data = await request.formData();
		const mapId = data.get('id')?.valueOf() as string | undefined;
		const order = data.get('order')?.valueOf() as string | undefined;
		if (mapId) {
			const id = Number(mapId);
			await prisma.map.update({
				where: {
					id,
					campaignId: params.campaignId
				},
				data: {
					order: Number(order)
				}
			});
		}
	},
	editCategoryOrder: async ({ request, locals, params }) => {
		if (!locals.connected) return fail(401);

		const data = await request.formData();
		const categoryId = data.get('id')?.valueOf() as string | undefined;
		const order = data.get('order')?.valueOf() as string | undefined;
		if (categoryId) {
			const id = Number(categoryId);
			await prisma.category.update({
				where: {
					id,
					campaignId: params.campaignId
				},
				data: {
					order: Number(order)
				}
			});
		}
	},
	delete: async ({ locals, params }) => {
		if (!locals.connected) return fail(401);

		await prisma.map.updateMany({
			where: {
				campaignId: params.campaignId
			},
			data: {
				campaignId: null,
				categoryId: null
			}
		});
		await prisma.category.deleteMany({
			where: {
				campaignId: params.campaignId
			}
		});

		await prisma.campaign.delete({
			where: {
				id: params.campaignId
			}
		});

		return redirect(302, '/list');
	},
	deleteAll: async ({ locals, params }) => {
		if (!locals.connected) return fail(401);
		console.log('deleteAll');

		await prisma.map.deleteMany({
			where: {
				campaignId: params.campaignId
			}
		});
		await prisma.category.deleteMany({
			where: {
				campaignId: params.campaignId
			}
		});

		await prisma.campaign.delete({
			where: {
				id: params.campaignId
			}
		});

		return redirect(302, '/list');
	},
	deleteCategory: async ({ request, locals, params }) => {
		if (!locals.connected) return fail(401);
		const data = await request.formData();
		const categoryId = data.get('id')?.valueOf() as string | undefined;

		if (categoryId) {
			const id = Number(categoryId);

			await prisma.map.updateMany({
				where: {
					categoryId: id,
					campaignId: params.campaignId
				},
				data: {
					categoryId: null
				}
			});

			await prisma.category.delete({
				where: {
					id,
					campaignId: params.campaignId
				}
			});
		}
	}
};
