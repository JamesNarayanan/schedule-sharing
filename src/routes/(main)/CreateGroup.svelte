<script lang="ts">
	import * as focusTrap from "focus-trap";
	import { onMount } from "svelte";
	import { cubicInOut } from "svelte/easing";
	import { fade, fly } from "svelte/transition";

	let modalOpen = false;
	let plus: HTMLDivElement | undefined;
	let transitioning = false;
	const modalTransDur = 300;
	let trap: focusTrap.FocusTrap;

	function toggleModal() {
		if (!plus || transitioning) return;
		plus.style.transitionDuration = `${modalTransDur}ms`;
		const pos = plus.getBoundingClientRect();
		if (!modalOpen) {
			modalOpen = true;
			trap.activate();
			plus.style.position = "fixed";
			plus.style.top = `${pos.y}px`;
			plus.style.left = `${pos.x}px`;
			document.body.style.overflow = "hidden";
		} else {
			modalOpen = false;
			transitioning = true;
			trap.deactivate();
			document.body.style.overflow = "";
			setTimeout(() => {
				if (!plus) return;
				transitioning = false;
				creationState = "start";
				plus.style.top = "";
				plus.style.left = "";
				plus.style.position = "relative";
				plus.style.transitionDuration = "0s";
			}, modalTransDur);
		}
	}
	onMount(() => {
		window.addEventListener("keydown", (event: KeyboardEvent) => {
			if (modalOpen && event.key === "Escape") {
				toggleModal();
			}
		});
		trap = focusTrap.createFocusTrap(plus!, {
			allowOutsideClick: true
		});
	});

	let creationState: "start" | "join" | "create" = "start";
	const flyTransDur = 250;
	const flyTransDist = 30;
	function flyIn(node: HTMLElement) {
		const sign = creationState === "start" ? -1 : 1;
		return fly(node, {
			delay: flyTransDur / 2,
			duration: flyTransDur / 2,
			easing: cubicInOut,
			x: sign * flyTransDist,
			y: 0
		});
	}
	function flyOut(node: HTMLElement) {
		const sign = creationState === "start" ? 1 : -1;
		return fly(node, {
			duration: flyTransDur / 2,
			easing: cubicInOut,
			x: sign * flyTransDist,
			y: 0
		});
	}
</script>

<div class="plus" class:modalOpen class:transitioning bind:this={plus}>
	{#if !modalOpen}
		<div
			class="content closed"
			in:fade={{ delay: modalTransDur / 2, duration: modalTransDur / 2 }}
			out:fade={{ duration: modalTransDur / 2 }}
		>
			<button on:click={toggleModal}>+</button>
		</div>
	{:else}
		<div
			class="content open"
			in:fade={{ delay: modalTransDur / 2, duration: modalTransDur / 2 }}
			out:fade={{ duration: modalTransDur / 2 }}
		>
			{#if creationState === "start"}
				<div class="form-content" in:flyIn out:flyOut>
					<button on:click={() => (creationState = "join")}>Join Group</button>
					<button on:click={() => (creationState = "create")}>Create Group</button>
				</div>
			{:else if creationState === "join"}
				<div class="form-content" in:flyIn out:flyOut>
					<h2>Join Group</h2>
					<input type="text" placeholder="Group Code" />
					<div>
						<button on:click={() => (creationState = "start")}>&larr;</button>
						<button>Join</button>
					</div>
				</div>
			{:else if creationState === "create"}
				<div class="form-content" in:flyIn out:flyOut>
					<h2>Create Group</h2>
					<input type="text" placeholder="Group Name" />
					<div>
						<button on:click={() => (creationState = "start")}>&larr;</button>
						<button>Create</button>
					</div>
				</div>
			{/if}
			<button class="close" on:click={toggleModal}>&#x2715;</button>
		</div>
	{/if}
</div>
{#if modalOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="backdrop"
		on:click={toggleModal}
		in:fade={{ duration: modalTransDur / 2 }}
		out:fade={{ duration: modalTransDur / 2, delay: modalTransDur / 2 }}
	/>
{/if}

<style lang="scss">
	.plus {
		position: relative;
		border-radius: 50%;
		height: calc(var(--font-size) * 1.25 + 1rem);
		width: calc(var(--font-size) * 1.25 + 1rem);

		background-color: var(--low-alpha);

		transition: all ease-in-out;

		.content {
			width: 100%;
			height: 100%;
			position: absolute;

			display: flex;
			align-items: center;
			justify-content: center;

			&.closed button {
				background-color: transparent;
				width: 100%;
				height: 100%;
				padding: 0;
				border: none;
				border-radius: 50%;

				font-size: calc(var(--font-size) * 1.25);
				line-height: calc(var(--font-size) * 1.3);
			}

			&.open {
				button.close {
					position: absolute;
					top: 0.5rem;
					right: 0.5rem;
					z-index: 1;
				}

				.form-content {
					position: absolute;
					width: 100%;
					height: 100%;

					display: flex;
					flex-direction: column;
					gap: 0.5rem;
					justify-content: center;
					align-items: center;

					h2 {
						margin: 0 0 0.5rem 0;
						font-size: 2.5rem;
						font-weight: 600;
					}
				}
			}
		}

		&.modalOpen {
			position: fixed;
			top: 50% !important;
			left: 50% !important;
			transform: translate(-50%, -50%);
			width: min(600px, 90%);
			height: 300px;
			border-radius: 10px;
			background-color: var(--bg);
			z-index: 999;
		}

		&.transitioning {
			z-index: 999;
		}
	}

	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 1;
		background-color: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(2px);
	}
</style>
