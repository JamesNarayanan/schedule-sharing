<script lang="ts">
	import { goto } from "$app/navigation";
	import FloatingInput from "$lib/FloatingInput.svelte";
	import { supabase } from "$lib/supabaseClient";
	import { Moon } from "svelte-loading-spinners";

	let email: string = "";
	let password: string = "";
	let loading = false;

	async function signIn() {
		loading = true;
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (error) {
			console.error(error);
			loading = false;
		} else {
			goto("/");
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
	<a href="/register" class="button">Register</a>
</div>

<style lang="scss">
	@import "../auth.scss";
</style>
