<script lang="ts">
	import FloatingInput from "$lib/FloatingInput.svelte";
	import { supabase } from "$lib/supabaseClient";

	let email: string = "";
	let password: string = "";
	let rePassword: string = "";
	let name: string = "";

	async function register(event: Event) {
		const { data, error } = await supabase.auth.signUp({
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
	<button type="submit">Register</button>
</form>
<div class="anchor-wrapper">
	<p>Already have an account?</p>
	<a href="/sign-in" class="button">Sign In</a>
</div>

<style lang="scss">
	@import "../auth.scss";
</style>
