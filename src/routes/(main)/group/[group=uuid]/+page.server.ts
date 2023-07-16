import { redirect } from "@sveltejs/kit";

export async function load({ params, locals: { supabase } }) {
	const { data: group, error: groupError } = await supabase
		.from("groups")
		.select("*")
		.eq("id", params.group)
		.single();

	if (groupError) {
		console.error(groupError);
		throw redirect(303, "/group?not-found");
	}

	const { data: usersData, error: usersError } = await supabase
		.from("users_groups")
		.select(
			"users (*, sections (id, name, crn, courses (name, course_number, subjects (abbreviation)), semesters (id)))"
		)
		.eq("group_id", params.group);

	if (usersError) {
		console.error(usersError);
		throw redirect(303, "/group?not-found");
	}
	const users = usersData.map(user => user.users).filter(Boolean);

	return {
		group,
		users
	};
}
