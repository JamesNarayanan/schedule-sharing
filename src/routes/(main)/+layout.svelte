<script lang="ts">
	import { goto } from "$app/navigation";
	import HeaderTitle from "$lib/HeaderTitle.svelte";
	import GroupSelect from "./groupSelect.svelte";

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
	<button on:click={signOut}>Sign Out</button>
</HeaderTitle>
<section><GroupSelect /></section>
<main>
	<slot />
</main>

<style lang="scss">
	section {
		padding: 1rem;
		padding-bottom: 0;
	}

	main {
		padding: 1rem;
		padding-top: 0;
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
