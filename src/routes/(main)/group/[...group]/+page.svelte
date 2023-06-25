<script lang="ts">
	import { page } from "$app/stores";

	$: notFound = $page.url.searchParams.has("not-found") || $page.url.pathname != "/group";
</script>

<svelte:head>
	<title>Groups • GT Schedule Sharing</title>
</svelte:head>

<div>
	{#if notFound}
		<h2>Group not found!</h2>
	{/if}
	<h2>Select or create a group to start!</h2>
</div>

<style>
	h2 {
		margin: 0;
		text-align: center;
		font-size: 2rem;
	}
</style>
