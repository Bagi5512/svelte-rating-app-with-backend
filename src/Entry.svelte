<script>
	import Rating from './Rating.svelte';
	import { tick } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let entry;
	let edit = false;
	let inputElement;
    
	let onRating = (event) => {
		entry.rating = event.detail;
		dispatch('updateentry', entry);
	};

   let removeEntry = () => {
		dispatch('removeentry', entry);
	};

	let toggleEdit = async () => {
		edit = !edit;

		if(edit) {
			await tick();
			inputElement.focus();
		}
		else {
			dispatch('updateentry', entry);
		}
	};
</script>

<div class="container">
	{#if edit}
		<input type="text" placeholder="Name of professor" bind:this={inputElement} bind:value={entry.name} on:blur={toggleEdit}/>
	{:else}
		<div on:click={toggleEdit}>{entry.name}</div>
	{/if}

	<Rating on:rating={onRating} rating={entry.rating}/>
	<button on:click={removeEntry}>Remove</button>
</div>

<style>
	* {
		margin: 0;
		padding: 0;
		border: 0;
	}

	.container {
		display: grid;
		grid-template-columns: 50% 30% 20%;
		margin-top: 8px;
		margin-bottom: 8px;
	}
	div, input {
		padding: 8px;
	}
</style>