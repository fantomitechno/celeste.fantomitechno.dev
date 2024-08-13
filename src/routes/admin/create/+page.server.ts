import { env } from '$env/dynamic/private';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/prisma';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user?.connected) return redirect(301, '/');
};

export const actions: Actions = {
	map: async ({ request, locals }) => {
		if (locals.user?.connected) return fail(401);

		const data = await request.formData();

		const name = data.get('name')?.valueOf() as string | null;

		if (!name) return fail(400);

		const berries = data.get('berries')?.valueOf() as string | null;
		const rooms = data.get('rooms')?.valueOf() as string | null;
		const link = data.get('link')?.valueOf() as string | null;
		const category = data.get('category')?.valueOf() as string | null;
		const campaign = data.get('campaign')?.valueOf() as string | null;

		let berryCount: number | undefined = undefined;
		if (berries) berryCount = Number(berries);

		let roomCount: number | undefined = undefined;
		if (rooms) roomCount = Number(rooms);

		await prisma.map.create({
			data: {
				name,
				berries: berryCount,
				numberOfRooms: roomCount,
				link,
				categoryId: category,
				campaignId: campaign
			}
		});
	},

	category: async ({ request, locals }) => {
		if (locals.user?.connected) return fail(401);

		const data = await request.formData();

		const id = data.get('name')?.valueOf() as string | null;
		const campaign = data.get('campaign')?.valueOf() as string | null;

		if (!id || !campaign) return fail(400);

		const color = data.get('color')?.valueOf() as string | null;

		await prisma.category.create({
			data: {
				id,
				campaignId: campaign
			}
		});
	},

	campaign: async ({ request, locals }) => {
		if (locals.user?.connected) return fail(401);

		const data = await request.formData();

		const name = data.get('name')?.valueOf() as string | null;
		const id = data.get('id')?.valueOf() as string | null;

		if (!name || !id) return fail(400);

		const link = data.get('link')?.valueOf() as string | null;

		await prisma.campaign.create({
			data: {
				id,
				name,
				link
			}
		});
	}
};
