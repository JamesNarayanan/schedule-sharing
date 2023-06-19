<header>
	<img src="src/assets/buzz.png" alt="Buzz" />
	<h1>Schedule Sharing</h1>
</header>

<slot />

<link rel="stylesheet" href="/src/routes/index.scss" />

<style lang="scss">
	header {
		display: flex;
		height: 2.5rem;
		padding: 0.75rem;
		border-bottom: 2px solid var(--med-alpha);
		gap: 0.5rem;

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
