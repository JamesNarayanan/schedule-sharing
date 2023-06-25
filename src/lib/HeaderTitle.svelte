<header>
	<div>
		<img src="/src/assets/buzz.png" alt="Buzz" />
		<h1>Schedule Sharing</h1>
	</div>
	<div class="right">
		<slot />
	</div>
</header>

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

			&.right {
				gap: 1rem;
			}
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
