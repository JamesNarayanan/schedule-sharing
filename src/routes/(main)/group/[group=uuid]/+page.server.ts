import { redirect } from "@sveltejs/kit";

export async function load({ params, locals: { supabase } }) {
	const { data, error } = await supabase
		.from("groups")
		.select("*")
		.eq("id", params.group)
		.single();

	if (error) {
		console.error(error);
		throw redirect(303, "/group");
	} else {
		return {
			group: data
		};
	}
}
