import { redirect } from "@sveltejs/kit";
import { env } from "process";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user?.discord_id !== env.ADMIN_ID) return redirect(301, "/");
};
