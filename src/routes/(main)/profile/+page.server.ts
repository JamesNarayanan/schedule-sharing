import { error } from "@sveltejs/kit";

export async function load({ locals: { supabase } }) {
	const { data: userData, error: userError } = await supabase.auth.getUser();
	if (userError) {
		console.error(userError);
		throw error(404, "User not found");
	}

	const { data: sectionData, error: sectionError } = await supabase
		.from("user_sections")
		.select("sections (name, crn, courses (name), semesters (name))")
		.eq("user_id", userData.user.id);
	if (sectionError) {
		console.error(sectionError);
		throw error(500, sectionError.message);
	}

	return {
		user: { ...userData.user, sections: sectionData }
	};
}
