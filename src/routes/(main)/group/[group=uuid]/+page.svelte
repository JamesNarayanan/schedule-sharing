<script lang="ts">
	import type { groupType } from "$lib/types";
	import { groupStore } from "$stores/groupStore";

	export let data;
	let group: groupType;
	let { users } = data;
	console.log(users);

	$: {
		group = data.group;
		groupStore.addGroup(group);
	}
</script>

<svelte:head>
	<title>{group.name} • GT Schedule Sharing</title>
</svelte:head>

<div>
	<h1>{group.name}</h1>
	{#each users as user}
		<p>{user?.name}</p>
		<ul>
			{#if user?.sections}
				{#each user.sections as section}
					<li>
						{section.courses?.subjects?.abbreviation}
						{section.courses?.course_number}: {section.courses?.name} &mdash; {section.name}
						({section.crn})
					</li>
				{/each}
			{/if}
		</ul>
	{/each}
</div>

<style>
	h1 {
		margin: 0;
		text-align: center;
	}
</style>
