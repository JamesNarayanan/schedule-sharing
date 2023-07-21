<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { groupStore } from "$stores/groupStore";
	import CreateGroup from "./CreateGroup.svelte";

	let selectedGroupId: string | null = null;
	$: groups = $groupStore;

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

<div class="wrapper">
	<select on:change={changeGroup}>
		{#if !groups.some(group => group.id === selectedGroupId)}
			<option value="" disabled selected> Select Group </option>
		{/if}
		{#each groups as group}
			<option value={group.id} selected={group.id === selectedGroupId}>{group.name}</option>
		{/each}
	</select>
	<CreateGroup />
</div>

<style lang="scss">
	div.wrapper {
		display: flex;
		align-items: center;
		gap: 0.5rem;

		--font-size: 2rem;
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

		&:hover {
			background-color: var(--med-alpha);
		}

		@media (prefers-color-scheme: dark) {
			background-image: url("/src/assets/arrow-down.svg");
		}
	}
</style>
