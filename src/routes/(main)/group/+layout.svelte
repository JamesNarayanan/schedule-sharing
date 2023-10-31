<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { groupStore } from "$stores/groupStore";
	import { semesterStore } from "$stores/semesterStore";
	import CreateGroup from "../CreateGroup.svelte";

	export let data;
	let selectedGroupId: string | null = null;
	$: groups = $groupStore;
	let { semesters } = data;
	$: currSemester = $semesterStore;

	$: {
		selectedGroupId = $page.url.pathname.substring(7);
	}

	function changeGroup(event: Event) {
		const select = event.target as HTMLSelectElement;
		const groupId = select.value;
		if (groupId) {
			goto(`/group/${groupId}`);
		}
	}
</script>

<section>
	<div class="wrapper">
		<select on:change={changeGroup} class="custom-select">
			{#if !groups.some(group => group.id === selectedGroupId)}
				<option value="" disabled selected> Select Group </option>
			{/if}
			{#each groups as group}
				<option value={group.id} selected={group.id === selectedGroupId}>
					{group.name}
				</option>
			{/each}
		</select>
		<select bind:value={$semesterStore} disabled={currSemester === 0} class="custom-select">
			{#if currSemester < 1}
				<option value={-1} disabled selected>Select Semester</option>
			{/if}
			{#each semesters as semester}
				<option value={semester.id}>
					{semester.name}
				</option>
			{/each}
		</select>
		<CreateGroup />
	</div>
</section>
<section>
	<slot />
</section>

<style>
	section:first-child {
		margin-bottom: 1rem;
	}

	div.wrapper {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1.5rem;
	}
</style>
