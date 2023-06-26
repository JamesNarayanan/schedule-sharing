<script lang="ts">
	import { enhance } from "$app/forms";
	import FloatingInput from "$lib/FloatingInput.svelte";
	import Snackbar from "$lib/Snackbar.svelte";

	export let data;
	$: user = data.user;

	let snackbarMessage: string = "";
	let showSnackbar: boolean = false;
	let snackbarType: "error" | "success" = "error";
</script>

<h2>Add Courses</h2>
<p>
	Paste in your comma-separated list of CRNs from
	<a href="https://www.gt-scheduler.org" target="_blank">GT Scheduler</a>
	here! (Export &rarr; Copy CRNs to clipboard)
</p>
<form
	method="POST"
	use:enhance={() => {
		return async ({ result, update }) => {
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
	<FloatingInput label="CRNs" />
	<button>Submit</button>
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
					<button>Delete</button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<Snackbar bind:show={showSnackbar} bind:message={snackbarMessage} bind:type={snackbarType} />

<style lang="scss">
	h2 {
		font-size: 2rem;
		margin: 0;
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
</style>
