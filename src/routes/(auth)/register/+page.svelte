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
	let rePassword: string = "";
	let name: string = "";
	let loading: boolean = false;

	let errorMessage: string = "";
	let showSnackbar: boolean = false;

	async function register(event: Event) {
		loading = true;
		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					name
				}
			}
		});
		if (error) {
			console.error(error);
			errorMessage = error.message;
			showSnackbar = true;
			loading = false;
		} else {
			goto($page.url.searchParams.get("redirect") || "/profile");
		}
	}
</script>

<svelte:head>
	<title>Register • GT Schedule Sharing</title>
</svelte:head>

<h2>Register</h2>
<form on:submit|preventDefault={register}>
	<FloatingInput
		label="Name"
		placeholder={`So your friends can find you!`}
		bind:value={name}
		required
	/>
	<FloatingInput
		label="Email"
		placeholder="user@example.com"
		type="email"
		bind:value={email}
		required
	/>
	<FloatingInput
		label="Password"
		placeholder="6+ chars"
		type="password"
		bind:value={password}
		pattern={`.{6,}`}
		required
	/>
	<FloatingInput
		label="Confirm Password"
		placeholder={`Same as ${String.fromCharCode(0x2191)}`}
		type="password"
		bind:value={rePassword}
		bind:pattern={password}
		required
	/>
	{#if loading}
		<div class="loader-wrapper">
			<Moon color="var(--text)" size={25} />
		</div>
	{:else}
		<button type="submit">Register</button>
	{/if}
</form>
<div class="anchor-wrapper">
	<p>Already have an account?</p>
	<a href="/sign-in" class="button">Sign In</a>
</div>

<Snackbar bind:show={showSnackbar} bind:message={errorMessage} type="error" />

<style lang="scss">
	@import "../auth.scss";
</style>
