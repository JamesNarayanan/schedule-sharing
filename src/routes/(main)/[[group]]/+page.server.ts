export async function load({ params, locals: { supabase } }) {
	const { group } = params;

	if (!group || group.length != 36) {
		return {
			group: undefined
		};
	}

	const { data, error } = await supabase.from("groups").select("*").eq("id", group).single();

	if (error) {
		console.error(error);
		return {
			group: undefined
		};
	} else {
		return {
			group: data
		};
	}
}
