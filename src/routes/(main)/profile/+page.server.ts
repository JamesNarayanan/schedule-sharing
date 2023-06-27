import { error } from "@sveltejs/kit";
import * as cheerio from "cheerio";

export async function load({ locals: { supabase } }) {
	const { data: userData, error: userError } = await supabase.auth.getUser();
	if (userError) {
		console.error(userError);
		throw error(404, "User not found");
	}

	const { data: sectionData, error: sectionError } = await supabase
		.from("user_sections")
		.select("sections (id, name, crn, courses (name), semesters (name))")
		.eq("user_id", userData.user.id);
	if (sectionError) {
		console.error(sectionError);
		throw error(500, sectionError.message);
	}

	return {
		user: { ...userData.user, sections: sectionData }
	};
}

export const actions = {
	default: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw error(401, { message: "Unauthorized" });
		}
		// we are save, let the user create the post
		const formData = await request.formData();
		const semester_id = "202308";
		const CRNs = formData.get("CRNs");
		if (!CRNs || CRNs.length < 5) {
			throw error(400, { message: "Invalid CRNs" });
		}
		const CRNArray = CRNs.toString()
			.replaceAll(/[^\d,]/g, "")
			.split(",");

		await Promise.all(
			CRNArray.map(async CRN => {
				if (CRN.length != 5) return;

				const response = await fetch(
					`https://oscar.gatech.edu/bprod/bwckschd.p_disp_detail_sched?term_in=${semester_id}&crn_in=${CRN}`
				);
				const html = await response.text();
				const $ = cheerio.load(html);
				const text = $("th.ddlabel").first().text();
				if (!text) return;

				const split = text.split(" - ");
				if (split.length != 4) return;

				const [course_name, crn, course, section_name] = split;
				const [subject_abbrev, course_number] = course.split(" ");

				const { error: registerError, status } = await supabase.rpc("register_class", {
					course_name,
					course_number: parseInt(course_number),
					crn: parseInt(crn),
					section_name,
					subject_abbrev,
					semester_id: parseInt(semester_id),
					user_id: session.user.id
				});
				if (registerError) {
					console.error(registerError);
					throw error(status, { message: registerError.message });
				}
			})
		);
	}
};