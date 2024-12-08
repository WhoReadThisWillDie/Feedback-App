<script>
    import {onMount} from 'svelte';

    let text;
    export let file;
    let items = [];

    onMount(() => {
        loadItems();
    });

     const loadItems = async () => {
        const assigment = await fetch(file);
        text = await assigment.text();
        items = text.split('\n\n');
    };

</script>
    <div class="max-h-[550px] overflow-y-auto p-4 border-[1px] border-[solid] border-[#ccc] rounded-lg text-textColor">
        {#each items as item}
            <p>{item}</p>
        {/each}
    </div>