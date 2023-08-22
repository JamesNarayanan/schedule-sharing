<script lang="ts">
	import { goto, invalidateAll } from "$app/navigation";
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
		if (!currSemester) {
			semesterStore.set(0);
		}
	}

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
		<select on:change={changeGroup}>
			{#if !groups.some(group => group.id === selectedGroupId)}
				<option value="" disabled selected> Select Group </option>
			{/if}
			{#each groups as group}
				<option value={group.id} selected={group.id === selectedGroupId}>
					{group.name}
				</option>
			{/each}
		</select>
		<select bind:value={$semesterStore} disabled={currSemester === -1}>
			{#if currSemester < 1}
				<option value={0} disabled selected>Select Semester</option>
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

		--font-size: 1.5rem;
	}

	select {
		background: url("/src/assets/arrow-down-dark.svg") no-repeat var(--low-alpha);
		background-size: var(--font-size);
		background-position: calc(100% - 0.5rem) center;

		padding: 0.5rem 2.5rem 0.5rem 0.75rem;
		border: none;
		border-radius: 10px;

		font-size: var(--font-size);
		font-weight: 600;
		transition: background-color 0.2s ease-in-out;

		-moz-appearance: none; /* Firefox */
		-webkit-appearance: none; /* Safari and Chrome */
		appearance: none;

		&:not(:disabled):hover {
			background-color: var(--med-alpha);
		}

		@media (prefers-color-scheme: dark) {
			background-image: url("/src/assets/arrow-down.svg");
		}
	}
</style>
