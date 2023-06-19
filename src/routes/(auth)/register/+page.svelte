<script lang="ts">
	import FloatingInput from "$lib/FloatingInput.svelte";

	let email: string = "";
	let password: string = "";
	let rePassword: string = "";

	function register() {
		console.log(email, password, rePassword);
	}
</script>

<h2>Register</h2>
<form on:submit|preventDefault={register}>
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

<style lang="scss">
	h2 {
		font-size: 2rem;
	}
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;

		button {
			margin-top: 0.5rem;
			font-size: 1rem;
		}
	}
</style>
