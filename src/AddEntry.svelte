<script>
	import Rating from './Rating.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	
	let entry = {
		name: "",
		rating: 0
	};

	let addEntry = () => {
		let newEntry = {
			name: entry.name, 
			rating: entry.rating
		}
		dispatch('addentry', newEntry);
		entry.name = "";
		entry.rating = 0;
	};

	let onRating = (event) => {
		entry.rating = event.detail;
	};
</script>

<div class="container">
	<input type="text" placeholder="Name of professor" bind:value={entry.name}/>
	<Rating on:rating={onRating} rating={entry.rating}/>
	<button on:click={addEntry}>Add</button>
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
		margin-top: 16px;
		margin-bottom: 32px;
	}

	input {
		padding: 8px;
	}
</style>