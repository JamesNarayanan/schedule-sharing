<script lang="ts">
	import { groupStore } from "$stores/groupStore";
	import { semesterStore } from "$stores/semesterStore";

	export let data;
	let { group } = data;
	$: ({ users } = data);
	$: currSemester = $semesterStore;
	/** 
		Contains the formatted section data in the following format:

		subject: {
			course: {
				section: [users]
			}
		}
	*/
	let tableData: Record<string, Record<string, Record<string, { name: string }[]>>> = {};
	/**
	 * Contains the course names for each course number
	 *
	 * number: name
	 */
	const courseNames: Record<string, string> = {};

	$: {
		group = data.group;
		groupStore.addGroup(group);

		// Reformat the data so that it can be properly displayed in the table
		tableData = {};
		for (let user of users) {
			for (let section of user.sections) {
				const subject = section.courses?.subjects?.abbreviation;
				const courseNumber = section.courses?.course_number;
				const sectionName = section.name;
				const semester = section.semesters;

				if (
					!subject ||
					!courseNumber ||
					!semester ||
					(currSemester > 0 && semester.id !== currSemester)
				)
					continue;

				courseNames[subject + courseNumber] = section.courses?.name || "";

				if (!tableData[subject]) {
					tableData[subject] = {};
				}
				if (!tableData[subject][courseNumber]) {
					tableData[subject][courseNumber] = {};
				}
				if (!tableData[subject][courseNumber][sectionName]) {
					tableData[subject][courseNumber][sectionName] = [];
				}

				tableData[subject][courseNumber][sectionName].push({
					name: user.name
				});
			}
		}
	}
</script>

<svelte:head>
	<title>{group.name} • GT Schedule Sharing</title>
</svelte:head>

{#if currSemester > 0}
	<div>
		{#if Object.keys(tableData).length > 0}
			<table class="table course-data">
				<tbody>
					{#each Object.entries(tableData).sort( ([subA, _A], [subB, _B]) => subA.localeCompare(subB) ) as [subject, courses]}
						<tr>
							<th>{subject}</th>
							{#each Object.entries(courses).sort( ([courseNumA, _A], [courseNumB, _B]) => courseNumA.localeCompare(courseNumB) ) as [courseNumber, sections]}
								<td>
									<div class="course-details">
										<h3>{courseNumber}</h3>
										<span class="tooltip"
											>{courseNames[subject + courseNumber]}</span
										>
									</div>
									<table class="table section-data">
										{#each Object.entries(sections).sort( ([secNameA, _A], [secNameB, _B]) => secNameA.localeCompare(secNameB) ) as [sectionName, users]}
											<tr>
												<th>{sectionName}</th>
												{#each users.sort( (userA, userB) => userA.name.localeCompare(userB.name) ) as user}
													<td>{user.name}</td>
												{/each}
											</tr>
										{/each}
									</table>
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<h1>No data to display</h1>
		{/if}
	</div>
{/if}

<style lang="scss">
	table.course-data {
		text-align: center;

		td {
			padding: 0;

			.course-details {
				position: relative;

				h3 {
					margin: 0;
					padding: 0 0.5rem;
					border-bottom: 2px solid var(--med-alpha);
				}
				.tooltip {
					--padding-top: 0.75rem;
					position: absolute;
					max-width: 150px;
					top: 26px;
					padding: 0.5rem var(--padding-top);
					border-radius: 0.5rem;
					transform: translateX(-50%);
					font-size: 0.8rem;
					color: var(--text);
					background-color: var(--bg);
					z-index: 2;

					opacity: 0;
					transition: opacity 0.2s;
					pointer-events: none;

					&::before {
						content: "";
						position: absolute;
						left: 50%;
						transform: translate(-50%, calc(-1 * var(--padding-top) + 2px))
							rotate(45deg);
						background-color: var(--bg);
						padding: 4px;
						z-index: 1;
					}
				}

				h3:hover + .tooltip {
					opacity: 1;
				}
			}

			table.section-data {
				width: 100%;
				border-radius: 0;
				background-color: transparent;

				tr {
					display: table-cell;

					&:not(:last-child) {
						border-right: 2px solid var(--med-alpha);
					}

					td,
					th {
						display: block;

						padding: 0.25rem 0.5rem;
						border: none;
						border-radius: 0;
						background: none;
					}

					th {
						border-bottom: 2px solid var(--med-alpha);
					}

					td:not(:last-child) {
						border-bottom: 1px solid var(--med-alpha);
					}
				}
			}
		}
	}
</style>
