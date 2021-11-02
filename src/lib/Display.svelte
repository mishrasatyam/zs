<script>
    export let result,page_count,current_page,page
    import { api_url } from "$lib/utils";
    import Pagination from "./Pagination.svelte";
</script>

<div class="m-2 flex ">
    {#each result as el}
    <div class="shadow-lg rounded-lg p-5 bg-green-100 m-5">
        <header class="font-bold capitalize p-2">{el.product_name}</header>
        <h3 class="p-2">Cost : Rs. {el.price}</h3>
        <h3 class="p-2">Details : {el.detail}</h3>
        <h3 class="text-blue-500 underline p-2"><a href="{api_url}/{el.image}" target="_blank">Image URL </a></h3>
    </div>
    {/each}
</div>

<Pagination {page_count} bind:page_val={page} {current_page} on:page_change/>   