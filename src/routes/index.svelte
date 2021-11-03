<script context="module">
    export async function load({fetch}){
        const url = `${api_url}/product_list/?page=1`
        const res = await fetch(url)
        const data = await res.json()
        return {
            props :{
                ...data,
                page:1
            }
        }
    }
</script>
<script>
export let result=[],page_count,current_page,page
import AddItem from "$lib/AddItem.svelte";
import Display from "$lib/Display.svelte";
import Search from "$lib/Search.svelte";
import Topbar from "$lib/Topbar.svelte";
import { api_url } from "$lib/utils";
import 'virtual:windi.css'

let open=false
async function addItem(){
    open = true
}

async function get_product(url){
    const res = await fetch(url)
    const data = await res.json()
    result = data?.result
    page_count = data?.page_count
    current_page = data?.current_page
}

function handleSearch(event) {
    const url = event.detail.url
    get_product(url)
}
</script>
{#if open}
    <AddItem bind:open on:success={()=>get_product(`${api_url}/product_list/?page=1`)}/>
{/if}

<Topbar on:add_click={addItem} />
<div class="mx-1.5 sm:mx-10">
    <Search on:search={handleSearch}/>
    <Display {result} {page_count} {current_page} bind:page on:page_change={()=>get_product(`${api_url}/product_list/?page=${page}`)} on:delete={()=>get_product(`${api_url}/product_list/?page=${page}`)} on:edit_done={()=>get_product(`${api_url}/product_list/?page=${page}`)}/>
</div>
