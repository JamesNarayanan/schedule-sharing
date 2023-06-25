<script>
	import { page } from "$app/stores";
	import HeaderTitle from "$lib/HeaderTitle.svelte";
</script>

<HeaderTitle>
	<a href="/profile" class="button">Profile</a>
</HeaderTitle>
<main>
	<h2>Error {$page.status}</h2>
	<p>{$page.error?.message}</p>
</main>

<style lang="scss">
	.button {
		align-self: center;
	}

	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;

		h2 {
			margin: 0;
			font-size: 2.5rem;
		}
		p {
			margin: 0;
		}
	}
</style>
