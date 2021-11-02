<script>
    export let result,page_count,current_page,page
    import {createEventDispatcher} from 'svelte'
    import { api_url } from "$lib/utils";
    import EditItem from "./EditItem.svelte";
    import Pagination from "./Pagination.svelte";

    const dispatch = createEventDispatcher()

    async function handleDelete(product_name){
        const url = `${api_url}/item/${product_name}`
        const headers = {'content-type':'application/json'}
        const method = 'DELETE'
        const res = await fetch(url,{method,headers})
        if(res.status==200){
            dispatch('delete')
        }else{
            alert('Something went wrong!Try Later')
        }        
    }

    function  handleEdit(el) {
        product_name = el.product_name
        details = el.details
        price = el.price
        image = el.image
        open = true
    }
    let product_name,details,price,image
    let open = false
</script>
{#if open}
    <EditItem {product_name} {details} {price} {image} bind:open on:edit_done/>
{/if}
<div class="m-2 flex ">
    {#each result as el}
    <div class="shadow-lg rounded-lg p-5 bg-green-100 m-5">
        <header class="font-bold capitalize p-2">{el.product_name}</header>
        <h3 class="p-2">Cost : Rs. {el.price}</h3>
        <h3 class="p-2">Details : {el.details}</h3>
        <h3 class="text-blue-500 underline p-2"><a href="{api_url}/{el.image}" target="_blank">Image URL </a></h3>
        <div class="flex justify-between text-blue-500">
            <h3 on:click={handleEdit(el)}>Edit</h3>
            <h3 on:click={handleDelete(el.product_name)}>Delete</h3>
        </div>
    </div>
    {/each}
</div>
{#if result.length>0}
<Pagination {page_count} bind:page_val={page} {current_page} on:page_change/>   
{/if}