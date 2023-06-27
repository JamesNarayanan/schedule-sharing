<script lang="ts">
	/**
	 * Label that will float above the input when it is focused or has content.
	 * Acts as a placeholder otherwise.
	 */
	export let label: string;
	/**
	 * Placeholder text that will appear when the input is focused and empty.
	 *
	 * Defaults to label value. If set to an empty string, the label will be stuck floating.
	 */
	export let placeholder: string = label;
	/**
	 * Name of the input (referenced in form actions)
	 *
	 * Defaults to label value
	 */
	export let name: string = label;
	/**
	 * Value to bind to the input
	 *
	 * If using with form actions, leave undefined
	 */
	export let value: string | number | undefined = undefined;
	/**
	 * Type of HTML input
	 *
	 * Defaults to "text"
	 */
	export let type: "text" | "password" | "email" | "number" | "tel" | "url" = "text";
	/**
	 * Regex pattern to validate the input
	 *
	 * Defaults to ".*" (any character, any number of times)
	 */
	export let pattern: string = ".*";
	/**
	 * Whether the input is required for form submission
	 *
	 * Defaults to false
	 */
	export let required: boolean = false;
	/**
	 * Tab Index of the input
	 *
	 * -1 (or any negative value) means it is not focusable. 0 means that it is focusable after all positive indexed elements
	 */
	export let tabindex: number | undefined = undefined;

	const inputId = Math.random().toString(36).substring(2);

	const handleInput = (event: Event & { currentTarget: HTMLInputElement }) => {
		value = (event.target as HTMLInputElement).value;
	};
</script>

<div class="floating-input-container">
	<input
		id={inputId}
		value={value || ""}
		{type}
		{placeholder}
		{name}
		{pattern}
		{required}
		{tabindex}
		on:change={handleInput}
		on:input={handleInput}
	/>
	<label for={inputId}>{label}</label>
</div>

<style lang="scss">
	.floating-input-container {
		--padding: 0.5rem;
		--trans: 0.15s ease-in-out;

		position: relative;
		transition: margin-top var(--trans);

		input {
			padding: var(--padding);
			border: none;
			border-radius: 0.25rem;
			font-size: 1rem;

			&::placeholder {
				transition: color var(--trans);
				color: #999;
			}
			&:not(:focus)::placeholder {
				color: transparent;
			}
		}

		label {
			position: absolute;
			top: var(--padding);
			left: var(--padding);
			font-size: 1rem;
			color: #999;
			transition: all var(--trans);
			pointer-events: none;
		}

		input:focus + label,
		input:not(:placeholder-shown) + label {
			top: -1.25rem;
			font-size: 0.8rem;
			color: var(--text);
		}

		&:has(input:focus),
		&:has(input:not(:placeholder-shown)) {
			margin-top: 1.25rem;
		}
	}
</style>
