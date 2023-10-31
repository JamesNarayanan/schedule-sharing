<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import FloatingInput from "$lib/FloatingInput.svelte";
	import Snackbar from "$lib/Snackbar.svelte";
	import { Moon } from "svelte-loading-spinners";

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let email: string = "";
	let password: string = "";
	let loading = false;

	let errorMessage: string = "";
	let showSnackbar: boolean = false;

	const redirect = $page.url.searchParams.get("redirect");

	async function signIn() {
		loading = true;
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (error) {
			console.error(error);
			errorMessage = error.message;
			showSnackbar = true;
			loading = false;
		} else {
			goto(redirect || "/my-courses");
		}
	}
</script>

<svelte:head>
	<title>Sign In • GT Schedule Sharing</title>
</svelte:head>

<h2>Sign In</h2>
<form on:submit|preventDefault={signIn}>
	<FloatingInput label="Email" type="email" bind:value={email} required />
	<FloatingInput
		label="Password"
		type="password"
		bind:value={password}
		pattern={`.{6,}`}
		required
	/>
	{#if loading}
		<div class="loader-wrapper">
			<Moon color="var(--text)" size={25} />
		</div>
	{:else}
		<button type="submit">Sign In</button>
	{/if}
</form>
<div class="anchor-wrapper">
	<p>Don't have an account?</p>
	<a href={"/register" + (redirect ? `?redirect=${redirect}` : "")} class="button">Register</a>
</div>

<Snackbar bind:show={showSnackbar} bind:message={errorMessage} type="error" />

<style lang="scss">
	@import "../auth.scss";
</style>
