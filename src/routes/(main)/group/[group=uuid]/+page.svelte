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
	 * subject + number: name
	 */
	const courseNames: Record<string, string> = {};
	/**
	 * Contains the subject names for each subject abbreviation
	 *
	 * abbreviation: name
	 */
	const subjectNames: Record<string, string> = {};

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
				subjectNames[subject] = section.courses?.subjects?.name || "";

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

	const toggleSubject = (subject: string) => {
		const expander = document.querySelector(`.expander-${subject}`);
		const toggle = document.querySelector(`.toggle-${subject}`);

		if (!expander || !toggle) return;

		expander.classList.toggle("expanded");
		toggle.classList.toggle("toggled");
	};
</script>

<svelte:head>
	<title>{group.name} • GT Schedule Sharing</title>
</svelte:head>

{#if currSemester > 0}
	<div class="group-page">
		{#if Object.keys(tableData).length > 0}
			{#each Object.entries(tableData).sort( ([subA, _A], [subB, _B]) => subA.localeCompare(subB) ) as [subject, courses]}
				<button class="subject-wrapper" on:click={() => toggleSubject(subject)}>
					<div class="toggle-{subject}">&#9654;</div>
					<h3>{subject} {"\u2013"} {subjectNames[subject]}</h3>
				</button>
				<div class="expander-{subject}">
					<table class="table courses">
						{#each Object.entries(courses).sort( ([courseNumA, _A], [courseNumB, _B]) => courseNumA.localeCompare(courseNumB) ) as [courseNumber, sections]}
							<tr>
								<th class="course-details" rowspan="2">
									<h3>{courseNumber}</h3>
									<span class="tooltip"
										>{courseNames[subject + courseNumber]}</span
									>
								</th>
								{#each Object.entries(sections).sort( ([secNameA, _A], [secNameB, _B]) => secNameA.localeCompare(secNameB) ) as [sectionName, users]}
									<th colspan={users.length}>{sectionName}</th>
								{/each}
							</tr>
							<tr>
								{#each Object.entries(sections).sort( ([secNameA, _A], [secNameB, _B]) => secNameA.localeCompare(secNameB) ) as [_sectionName, users]}
									{#each users.sort( (userA, userB) => userA.name.localeCompare(userB.name) ) as user}
										<td>{user.name}</td>
									{/each}
								{/each}
							</tr>
						{/each}
					</table>
				</div>
			{/each}
		{:else}
			<h1>No data to display</h1>
		{/if}
	</div>
{/if}

<style lang="scss">
	.group-page {
		--trans-dur: 0.2s;

		.subject-wrapper {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			margin-top: 1rem;
			font-size: 2rem;
			background: none;

			// Show outline only when tabbing
			&:focus:not(:focus-visible) {
				outline: none;
			}

			[class|="toggle"] {
				font-size: 1.25rem;
				transition: transform var(--trans-dur);

				&.toggled {
					transform: rotate(90deg);
				}
			}

			h3 {
				margin: 0;
			}
		}
		[class|="expander"] {
			display: grid;
			grid-template-rows: 0fr;
			transition: grid-template-rows var(--trans-dur);
			overflow: hidden;

			&.expanded {
				grid-template-rows: 1fr;
			}

			table.courses {
				text-align: center;
				overflow: hidden;

				.course-details {
					position: relative;

					.tooltip {
						--padding-top: 0.75rem;
						position: absolute;
						max-width: 150px;
						top: 60px;
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
			}
		}
	}
</style>
