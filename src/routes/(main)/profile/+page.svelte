<script lang="ts">
	export let data;

	$: user = data.user;
</script>

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

<style lang="scss">
	h2 {
		font-size: 2rem;
		margin-top: 0;
	}
</style>
