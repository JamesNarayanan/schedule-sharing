<script lang="ts">
	import { goto } from "$app/navigation";
	import HeaderTitle from "$lib/HeaderTitle.svelte";
	import SavedGroups from "./savedGroups.svelte";

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let showSnackbar: boolean = false;
	let errorMessage: string = "";

	async function signOut() {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
			showSnackbar = true;
			errorMessage = error.message;
		} else {
			goto("/sign-in");
		}
	}
</script>

<HeaderTitle>
	<a href="/profile" class="ul">Profile</a>
	<button on:click={signOut} tabindex="-1">Sign Out</button>
</HeaderTitle>
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
		padding: 1rem;
	}

	a {
		color: var(--text);
		text-decoration: none;
		font-size: 1.25rem;
	}

	button {
		font-size: 1rem;
		align-self: center;
	}
</style>
