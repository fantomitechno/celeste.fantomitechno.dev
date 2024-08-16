import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/prisma';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.connected) return redirect(301, '/');
};

export const actions: Actions = {
	map: async ({ request, locals }) => {
		if (!locals.connected) return fail(401);

		const data = await request.formData();

		const name = data.get('name')?.valueOf() as string | null;

		if (!name) return fail(400);

		const berryCount = data.get('berries')?.valueOf() as string | null;
		const rooms = data.get('rooms')?.valueOf() as string | null;
		const link = data.get('link')?.valueOf() as string | null;
		const mapper = data.get('mapper')?.valueOf() as string | null;
		const category = data.get('category')?.valueOf() as string | null;
		let campaignId = data.get('campaign')?.valueOf() as string | null;

		let categoryId: null | number = null;
		if (category) categoryId = Number(category);

		let berries: number | undefined = undefined;
		if (berryCount) berries = Number(berryCount);

		let numberOfRooms: number | undefined = undefined;
		if (rooms) numberOfRooms = Number(rooms);

		await prisma.map.create({
			data: {
				name,
				berries,
				numberOfRooms,
				link,
				categoryId,
				campaignId,
				mapper
			}
		});
	},

	category: async ({ request, locals }) => {
		if (!locals.connected) return fail(401);

		const data = await request.formData();

		const name = data.get('name')?.valueOf() as string | null;
		const campaign = data.get('campaign')?.valueOf() as string | null;

		if (!name || !campaign) return fail(400);

		const color = data.get('color')?.valueOf() as string | undefined;

		await prisma.category.create({
			data: {
				name,
				campaignId: campaign,
				color
			}
		});
	},

	campaign: async ({ request, locals }) => {
		if (!locals.connected) return fail(401);

		const data = await request.formData();

		const name = data.get('name')?.valueOf() as string | null;
		const id = data.get('id')?.valueOf() as string | null;

		if (!name || !id) return fail(400);

		const link = data.get('link')?.valueOf() as string | null;
		const mapper = data.get('mapper')?.valueOf() as string | null;

		await prisma.campaign.create({
			data: {
				id,
				name,
				link,
				mapper
			}
		});
	}
};
