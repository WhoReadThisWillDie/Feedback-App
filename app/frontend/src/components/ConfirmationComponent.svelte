<script>
    import Button from "./Button.svelte";
    import {fade} from 'svelte/transition';

    export let toDeleteChoice;
    export let clearFileAndText;

    async function toDelete(){
        toDeleteChoice = true;
        clearFileAndText();
        toDeleteChoice=undefined;
    }

    async function toLeave(){
        toDeleteChoice = false;
        clearFileAndText();
        toDeleteChoice=undefined;
    }
</script>

<div transition:fade class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded shadow-lg text-center w-80 animate-fade-in">
            <h2 class="text-2xl font-bold gradient-text">Are you sure you want to delete a recording?</h2>
            <p class="text-gray-600 mt-2"></p>
            <div class="flex justify-center pt-6">
                <div class="pr-8">
                    <Button on:click={toDelete}> Yes </Button>
                </div>
                <div class="pl-8">
                    <Button on:click={toLeave}> No </Button>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .gradient-text {
        background: linear-gradient(90deg, #d60dc1, #4800ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .animate-fade-in {
        animation: fade-in 0.5s ease-in-out;
    }

    @keyframes fade-in {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    @keyframes tick {
        from {
            transform: scale(0);
        }
        to {
            transform: scale(1);
        }
    }
</style>
