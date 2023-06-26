<script lang="ts">
	import { enhance } from "$app/forms";
	import Snackbar from "$lib/Snackbar.svelte";

	export let data;
	$: user = data.user;

	let snackbarMessage: string = "";
	let showSnackbar: boolean = false;
	let snackbarType: "error" | "success" = "error";
</script>

<h2>Add Courses</h2>
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
	<label for="CRNs">CRNs</label>
	<input type="text" name="CRNs" />
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
				<td>
					<button>Edit</button>
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
		margin-top: 0;
	}
</style>
