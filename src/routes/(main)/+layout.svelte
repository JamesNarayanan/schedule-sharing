<script>
	import SavedGroups from "./savedGroups.svelte";
</script>

<section><SavedGroups /></section>
<main>
	<slot />
</main>

<style lang="scss">
	section {
		display: flex;
		padding: 0.75rem;
		border-bottom: 2px solid var(--med-alpha);
		gap: 0.5rem;
	}

	main {
		padding: 0.5rem;
	}
</style>
