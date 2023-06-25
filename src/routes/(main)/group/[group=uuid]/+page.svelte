<script lang="ts">
	import type { groupType } from "$lib/types";
	import { groupStore } from "$stores/groupStore";

	export let data;
	let group: groupType;

	console.log("group id:", data.group.id);

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
</div>

<style>
	h1 {
		margin: 0;
		text-align: center;
	}
</style>
