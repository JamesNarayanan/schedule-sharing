<script lang="ts">
	import { goto } from "$app/navigation";
	import HeaderTitle from "$lib/HeaderTitle.svelte";

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
	<a href="/my-courses" class="ul">My Courses</a>
	<a href="/group" class="ul">Groups</a>
	<button on:click={signOut}>Sign Out</button>
</HeaderTitle>
<main>
	<slot />
</main>

<style lang="scss">
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
