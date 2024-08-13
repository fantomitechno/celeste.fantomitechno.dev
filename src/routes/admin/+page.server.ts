import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	return { connected: locals.user?.connected ?? false };
};
