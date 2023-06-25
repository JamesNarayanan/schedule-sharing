import { error } from "@sveltejs/kit";

export async function load({ locals: { supabase } }) {
	const { data, error: userError } = await supabase.auth.getUser();

	if (userError) {
		console.error(userError);
		throw error(404, "User not found");
	} else {
		return {
			user: data.user
		};
	}
}
