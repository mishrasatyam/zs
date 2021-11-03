<script>
    export let page_count,current_page,page_val;
    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()
</script>
<div class="mt-4 mb-2">
    {#each Array(page_count) as el,i}
        {#if i+1 == current_page}
            <span class="bg-blue-400 text-white p-1 mx-1 rounded-full">{i+1}</span>
        {:else}
            <span class="p-1 mx-1 rounded-lg cursor-pointer" on:click={()=>{page_val=i+1; dispatch('page_change') }}>{i+1}</span>      
        {/if}
    {/each}
</div>