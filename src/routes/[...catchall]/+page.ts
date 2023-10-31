import { error, redirect } from "@sveltejs/kit";

export async function load({ url }) {
	if (url.pathname === "/") {
		throw redirect(307, "/my-courses");
	} else {
		throw error(404, "Page not found");
	}
}
