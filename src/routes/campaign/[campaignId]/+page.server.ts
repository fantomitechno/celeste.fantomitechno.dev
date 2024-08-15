import { prisma } from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
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

	return {
		campaign,
		goldenedMaps,
		clearedMaps,
		fullClearedMaps,
		totalBerries,
		connected: locals.user?.connected
	};
};

export const actions: Actions = {
	edit: async ({ request, locals, params }) => {
		if (!locals.user?.connected) return fail(401);

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
	delete: async ({ locals, params }) => {
		if (!locals.user?.connected) return fail(401);

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
		if (!locals.user?.connected) return fail(401);
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
		if (!locals.user?.connected) return fail(401);
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
