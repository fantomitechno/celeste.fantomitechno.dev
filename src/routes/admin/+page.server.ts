import { env } from "$env/dynamic/private";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  return { connected: locals.user?.discord_id === env.ADMIN_ID ? true : false }
};