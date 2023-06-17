<script lang="ts">
	import "../../styles/index.scss";
	import type { Database } from "$lib/supabase";

	export let data;
	let { group }: { group: Database["public"]["Tables"]["groups"]["Row"] | null } = data;
</script>

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
