<script>
    import Modal from "./Modal.svelte";
    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()
    import { api_url } from "./utils";
    export let open
    
    let product_name,image, details, price=null
    async function handleSubmit(){
        const [name,extension] = image[0].name.split('.')
        const image_name = name+new Date().getTime()+'.'+extension
        const url = `${api_url}/add_item/`
        const headers = {'content-type':'application/json'}
        const method = 'POST'
        
        const body = JSON.stringify({product_name,details,price,image:{name:image_name,base64:await upload(image[0])}})
        const res = await fetch(url,{body,method,headers})
        if(res.status==200){
            dispatch('success')
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
        <input placeholder="Product Name" bind:value={product_name} required>
        <input type="file" placeholder="Pick an image" bind:files={image} required>
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