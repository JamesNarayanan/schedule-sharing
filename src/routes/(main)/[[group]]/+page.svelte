<script lang="ts">
	import type { groupType } from "$lib/types";
	import { groupStore } from "$stores/groupStore";

	export let data;
	let group: groupType | undefined;

	$: {
		group = data?.group;
		if (group) {
			groupStore.addGroup(group);
		}
	}
</script>

<svelte:head>
	<title>{data?.group?.name || "Groups"} • GT Schedule Sharing</title>
</svelte:head>

<div>
	{#if group}
		<h1>{group.name}</h1>
	{:else}
		<h1>Select or create a group to start!</h1>
	{/if}
</div>

<style>
	h1 {
		margin: 0;
		text-align: center;
	}
</style>
