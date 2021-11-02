<script>
    export let product_name,details,price,image
    let new_image
    import Modal from "./Modal.svelte";
    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()
    import { api_url } from "./utils";
    export let open
    let new_image_picked = false    
    async function handleSubmit(){
        let body = {product_name,details,price}
        if(new_image_picked){
            const [name,extension] = new_image[0].name.split('.')
            const image_name = name+new Date().getTime()+'.'+extension
            body.image = {name:image_name,base64:await upload(new_image[0])}
        }
        const url = `${api_url}/item/${product_name}`
        const headers = {'content-type':'application/json'}
        const method = 'PUT'
        
        const res = await fetch(url,{body:JSON.stringify(body),method,headers})
        if(res.status==200){
            dispatch('edit_done')
            open = false
        }else{
            alert('Something went wrong!Try Later')
        }        
    }
    async function upload(file) {
        const base64 = await new Promise((resolve) =>{
            var reader = new FileReader();
            reader.onload = (event) => {
                const data = event.target.result.replace("data:"+ file.type +";base64,", '')
                resolve(data)
            }
            reader.readAsDataURL(file);   
        })
        return base64    
    }

</script>
<Modal  header="Add new item!" bind:open show_cancel_button={true}>
    <form class="mx-4 mt-3" on:submit|preventDefault={handleSubmit}>
        <input placeholder="Product Name" bind:value={product_name} required disabled>
        {#if new_image_picked==false}
        <a href="{api_url}/{image}" target="_blank" class="text-blue-500 p-2 my-2 block">Curent Image</a>
        {/if}
        <input type="file" placeholder="Pick new image" bind:files={new_image} on:change={()=>new_image_picked = true}>
        <textarea type="details" placeholder="Details" bind:value={details} required></textarea>
        <input type="number" placeholder="Price" bind:value={price} required>
        <div class="flex justify-center">
        <button type="submit" class="bg-blue-500 text-white p-2 rounded-lg m-3  block">Submit</button>
        </div>
    </form>
</Modal>

<style>
    input,textarea{
        @apply shadow-lg rounded-lg w-full focus:outline-none p-4 mt-3;
    }
</style>