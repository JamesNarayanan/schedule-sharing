import { redirect } from "@sveltejs/kit";

export async function load({ request, locals: { getSession } }) {
	const session = await getSession();
	if (!session) {
		let redirectUrl = "/register";
		const urlRegex = /\/group\/[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/;
		const matchText = request.url.match(urlRegex);
		if (matchText) {
			redirectUrl += `?redirect=${matchText[0]}`;
		}
		throw redirect(303, redirectUrl);
	}
}
