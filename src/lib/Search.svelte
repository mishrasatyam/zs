<script>
    import {createEventDispatcher} from 'svelte'
    import {api_url} from '$lib/utils'
    let dispatch = createEventDispatcher()
    let search
    function handleChange() {
        const url = `${api_url}/product_list/?name=${search}`
        dispatch('search',{url})
    }
    $:handleChange(search)
</script>
<div class="mt-5">
    <input class="w-full shadow-lg rounded-lg p-5 focus:outline-none" placeholder="Search with name" bind:value={search}>
</div>