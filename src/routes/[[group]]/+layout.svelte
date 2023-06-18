<script>
	import SavedGroups from "./savedGroups.svelte";
</script>

<header>
	<img src="src/assets/buzz.png" alt="Buzz" />
	<h1>Schedule Sharing</h1>
</header>

<section><SavedGroups /></section>
<main>
	<slot />
</main>

<style lang="scss">
	header {
		height: 2.5rem;

		img {
			height: 100%;
		}

		h1 {
			margin: 0;
			font-size: 2.5rem;
			font-weight: 600;
			line-height: 1;
		}
	}

	header,
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
