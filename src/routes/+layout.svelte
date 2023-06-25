<script lang="ts">
	import { goto } from "$app/navigation";
	import Snackbar from "$lib/Snackbar.svelte";

	import { invalidate } from "$app/navigation";
	import { onMount } from "svelte";

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((_event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate("supabase:auth");
			}
		});

		return () => subscription.unsubscribe();
	});

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

<header>
	<div>
		<img src="/src/assets/buzz.png" alt="Buzz" />
		<h1>Schedule Sharing</h1>
	</div>
	<button on:click={signOut} tabindex="-1">Sign Out</button>
</header>

<slot />

<Snackbar bind:show={showSnackbar} bind:message={errorMessage} type="error" />

<link rel="stylesheet" href="/src/routes/index.scss" />

<style lang="scss">
	header {
		display: flex;
		justify-content: space-between;
		height: 2.5rem;
		padding: 0.75rem;
		border-bottom: 2px solid var(--med-alpha);
		gap: 0.5rem;

		& > div {
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}

		img {
			height: 100%;
		}

		h1 {
			margin: 0;
			font-size: 2.5rem;
			font-weight: 600;
			line-height: 1;
			white-space: nowrap;
		}
	}
</style>
