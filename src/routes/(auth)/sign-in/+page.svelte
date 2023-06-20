<script lang="ts">
	import FloatingInput from "$lib/FloatingInput.svelte";

	let email: string = "";
	let password: string = "";

	function signIn() {
		console.log(email, password);
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
	<button type="submit">Sign In</button>
</form>
<div class="anchor-wrapper">
	<p>Don't have an account?</p>
	<a href="/register" class="button">Register</a>
</div>

<style lang="scss">
	@import "../auth.scss";
</style>
