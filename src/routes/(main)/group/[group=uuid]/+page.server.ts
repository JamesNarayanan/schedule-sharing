import { error, redirect } from "@sveltejs/kit";

export async function load({ params, locals: { supabase } }) {
	const {
		data: { user },
		error: userError
	} = await supabase.auth.getUser();

	if (userError || !user) {
		console.error(userError);
		throw error(500, "Error fetching user data");
	}

	const { data: groups, error: groupError } = await supabase.rpc("join_get_group", {
		group_id: params.group,
		user_id: user.id
	});

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
		group: groups[0],
		users
	};
}
