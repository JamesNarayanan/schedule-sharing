<script lang="ts">
	import { enhance } from "$app/forms";
	import { invalidateAll } from "$app/navigation";
	import FloatingInput from "$lib/FloatingInput.svelte";
	import Snackbar from "$lib/Snackbar.svelte";
	import { load } from "cheerio";
	import { onMount } from "svelte";
	import { Moon } from "svelte-loading-spinners";

	export let data;
	$: ({ supabase, user, semesters } = data);

	let snackbarMessage: string = "";
	let showSnackbar: boolean = false;
	let snackbarType: "error" | "success" = "error";

	let loadingNewCourses: boolean = false;
	let loadingDelete: number[] = [];

	async function unregisterSection(section_id: number) {
		if (section_id === -1 || !user.id) return;

		loadingDelete = [...loadingDelete, section_id];

		const { error } = await supabase
			.from("user_sections")
			.delete()
			.match({ section_id, user_id: user.id });
		if (error) {
			snackbarMessage = error.message;
			showSnackbar = true;
			snackbarType = "error";
		} else {
			snackbarMessage = "Successfully deleted section!";
			showSnackbar = true;
			snackbarType = "success";

			user.sections = user.sections.filter(section => section.sections?.id !== section_id);
		}
		loadingDelete = loadingDelete.filter(id => id !== section_id);
	}
</script>

<div class="section-wrapper">
	<div>
		<section class="semester">
			<h2>Semester:</h2>
			<select tabindex={1}>
				{#each semesters as sem}
					<option value={sem.id}>{sem.name}</option>
				{/each}
			</select>
		</section>
		<section>
			<h2>Add Courses</h2>
			<p>
				Paste in your comma-separated list of CRNs from
				<a href="https://www.gt-scheduler.org" target="_blank">GT Scheduler</a>
				here! (Export &rarr; Copy CRNs to clipboard)
			</p>
			<form
				method="POST"
				use:enhance={() => {
					loadingNewCourses = true;
					return async ({ result, update }) => {
						loadingNewCourses = false;
						if (result.type === "error") {
							snackbarMessage = result.error.message;
							showSnackbar = true;
							snackbarType = "error";
							return;
						} else if (result.type === "success") {
							snackbarMessage = "Successfully added courses!";
							showSnackbar = true;
							snackbarType = "success";
						}
						update();
					};
				}}
			>
				<FloatingInput label="CRNs" tabindex={2} />
				{#if loadingNewCourses}
					<Moon color="var(--text)" size={25} />
				{:else}
					<button tabindex={3}>Add Courses</button>
				{/if}
			</form>
			<h2>My Courses</h2>
			<table>
				<thead>
					<tr>
						<th>Course</th>
						<th>Section</th>
						<th>CRN</th>
						<th>Term</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each user.sections as sectionData}
						<tr>
							<td>{sectionData.sections?.courses?.name}</td>
							<td>{sectionData.sections?.name}</td>
							<td>{sectionData.sections?.crn}</td>
							<td>{sectionData.sections?.semesters?.name}</td>
							<td class="action-cell">
								{#if loadingDelete.includes(sectionData.sections?.id ?? -1)}
									<Moon color="var(--text)" size={25} />
								{:else}
									<button
										on:click={() =>
											unregisterSection(sectionData.sections?.id || -1)}
									>
										Delete
									</button>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</section>
	</div>
</div>

<Snackbar bind:show={showSnackbar} bind:message={snackbarMessage} bind:type={snackbarType} />

<style lang="scss">
	.section-wrapper {
		display: flex;
		justify-content: center;

		& > div {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		section {
			display: flex;
			flex-direction: column;

			max-width: 800px;
			padding: 0.5rem;
			border-radius: 10px;
			background-color: var(--low-alpha);

			&.semester {
				flex-direction: row;
				align-items: center;
				gap: 0.5rem;
			}

			h2 {
				font-size: 2rem;
				margin: 0;
				font-weight: 600;
			}

			p {
				margin: 0.5rem 0;
			}

			form {
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
				align-items: start;

				margin-bottom: 2rem;
			}

			table {
				text-align: center;
			}
		}
	}

	:global(table .action-cell > .wrapper) {
		margin: 0 auto;
	}
</style>
