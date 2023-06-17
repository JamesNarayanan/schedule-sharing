import * as cheerio from "cheerio";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	"https://jqdmyjwznyoszlwriscy.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZG15and6bnlvc3psd3Jpc2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY5NDI1OTksImV4cCI6MjAwMjUxODU5OX0.s-RecUdR8gMBNyiCs5j_dqE_8MnQiFR_a6V_1pGoh-U",
	{ auth: { persistSession: false } }
);

async function scrapeSubjects() {
	const response = await fetch("https://catalog.gatech.edu/coursesaz/");
	const html = await response.text();
	if (!html) {
		throw new Error("Error fetching subjects");
	}
	const $ = cheerio.load(html);
	const text = $("#atozindex li a")
		.map((_, el) => {
			const text = $(el).text();
			const parenIndex = text.indexOf("(");
			return (
				text.substring(parenIndex + 1, text.length - 1) +
				"," +
				text.substring(0, parenIndex - 1)
			);
		})
		.get();
	return text.map(subject => {
		const [abbreviation, name] = subject.split(",");
		return { abbreviation, name };
	});
}

async function uploadSubjects(subjects) {
	const { data, error } = await supabase.from("subjects").upsert(subjects);
	if (error) {
		throw new Error(`Error uploading subjects: ${error.message}`);
	}
	return data;
}

try {
	const subjects = await scrapeSubjects();
	if (process.argv.includes("-v")) {
		console.log(subjects);
	}
	console.log("Subjects fetched successfully");
	await uploadSubjects(subjects);
	console.log("Subjects uploaded successfully");
} catch (error) {
	console.error(error);
}
