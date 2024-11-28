<script>
    import {onMount} from 'svelte';

    let text;
    let items = [];

    onMount(() => {
        loadItems();
    });

    const loadItems = async () => {
        const assigment = await fetch('https://www.w3.org/TR/WCAG10-HTML-TECHS/html-techniques.txt');
        text = await assigment.text();
        items = text.split('\n\n');
    };

</script>
    <div class="max-h-[550px] overflow-y-auto p-4 border-[1px] border-[solid] border-[#ccc] rounded-lg">
        {#each items as item}
            <p>{item}</p>
        {/each}
    </div>