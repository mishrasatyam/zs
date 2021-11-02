<script>
    let header = 'ZS'
    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()

    async function handleCLick(){
        dispatch('add_click')
    }
</script>
<div class="shadow-lg bg-green-200 flex justify-between">
    <h1 class="p-5 text-2xl font-extrabold">{header}</h1>
    <button class="p-5 text-2xl font-bold shadow-lg bg-green-100 rounded-lg mr-2 mt-1 mb-1" on:click={handleCLick}>+ Add</button>
</div>