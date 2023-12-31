<script lang="ts">
	import { enhance } from "$app/forms";
	import FloatingInput from "$lib/FloatingInput.svelte";
	import Loading from "$lib/Loading.svelte";
	import Snackbar from "$lib/Snackbar.svelte";
	import { semesterStore } from "$stores/semesterStore";

	export let data;
	$: ({ supabase, user, semesters } = data);
	$: currSemester = $semesterStore;
	$: currSemesterName = semesters?.find(sem => sem.id == currSemester)?.name;
	$: currSections = user?.sections.filter(section => section.semesters?.id === currSemester);

	let snackbarMessage: string = "";
	let showSnackbar: boolean = false;
	let snackbarType: "error" | "success" = "error";

	let loadingNewCourses: boolean = false;
	let loadingDelete: number[] = [];

	async function unregisterSection(section_id: number) {
		if (section_id === -1 || !user.id) return;

		loadingDelete = [...loadingDelete, section_id];

		const { error } = await supabase
			.from("users_sections")
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

			user.sections = user.sections.filter(section => section.id !== section_id);
		}
		loadingDelete = loadingDelete.filter(id => id !== section_id);
	}
</script>

<div class="section-wrapper">
	<div>
		<h1>My Courses</h1>
		<section class="semester">
			<h2>Semester:</h2>
			<select
				bind:value={$semesterStore}
				tabindex={1}
				disabled={currSemester === 0}
				class="custom-select"
			>
				{#if currSemester < 1}
					<option value={-1} disabled selected>Select Semester</option>
				{/if}
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
				use:enhance={({ formData }) => {
					loadingNewCourses = true;
					formData.append("semester_id", currSemester.toString());
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
					<Loading />
				{:else}
					<button tabindex={3}>Add Courses</button>
				{/if}
			</form>
			{#if currSemester == 0}
				<div class="loading-table"><Loading size={35} /></div>
			{:else if currSemester == -1}
				<h3>Select a semester above to view your courses!</h3>
			{:else}
				<h2>My {currSemesterName} Courses</h2>
				<table class="table">
					<thead>
						<tr>
							<th>Course</th>
							<th>Section</th>
							<th>CRN</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{#if !currSections}
							<tr>
								<td colspan="5"><Loading /></td>
							</tr>
						{:else}
							{#each currSections as section}
								<tr>
									<td>
										{section.courses?.subjects?.abbreviation}
										{section.courses?.course_number}: {section.courses?.name}
									</td>
									<td>{section.name}</td>
									<td>{section.crn}</td>
									<td>
										{#if loadingDelete.includes(section.id)}
											<Loading />
										{:else}
											<button
												on:click={() => unregisterSection(section.id || -1)}
											>
												Delete
											</button>
										{/if}
									</td>
								</tr>
							{/each}
							{#if currSections.length === 0}
								<tr>
									<td colspan="5">No courses found for selected semester!</td>
								</tr>
							{/if}
						{/if}
					</tbody>
				</table>
			{/if}
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

		h1 {
			text-align: center;
			margin: 0;
			font-size: 3rem;
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

				.custom-select {
					font-size: 1.25rem;
				}
			}

			h2 {
				font-size: 2rem;
				margin: 0;
				font-weight: 600;
			}

			h3 {
				font-size: 1.75rem;
				margin: 0;
				font-weight: 600;
				text-align: center;
			}

			.loading-table {
				display: flex;
				justify-content: center;
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

	:global(table td > .wrapper) {
		margin: 0 auto;
	}
</style>
