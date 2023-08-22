import { error } from "@sveltejs/kit";

export async function load({ locals: { supabase } }) {
	const { data: semesters, error: semError } = await supabase.from("semesters").select("*");
	if (semError) {
		console.error(semError);
		throw error(500, "Error fetching user data");
	}
	return { semesters };
}
