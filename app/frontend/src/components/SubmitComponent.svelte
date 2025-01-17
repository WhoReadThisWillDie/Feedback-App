<script>
    import Button from "./Button.svelte";
    import SubmitAnimation from "./animations/SubmitAnimation.svelte";
    import {postFeedback} from "../api/postFeedback.js";
    import {createEventDispatcher} from "svelte";

    let showSuccess = false;
    export let blob;
    export let text;

    const dispatch = createEventDispatcher();

    async function exportToDatabase() {

        if (!blob && !text) {
            alert("No audio or text specified.")
            return
        }

        const formData = new FormData();

        if (blob) {
            formData.append('file', blob, `file`);
        }

        if (text) {
            formData.append('transcript', text);
        }

        if (await postFeedback(formData)) {
            showSuccessBox();
        }
        dispatch('submit-feedback')
    }

    function showSuccessBox() {
        showSuccess = true;
        setTimeout(() => {
            showSuccess = false;
        }, 3000);
    }
</script>

<div class="transform">
    <Button on:click={exportToDatabase}>Submit</Button>
</div>

{#if showSuccess}
    <SubmitAnimation/>
{/if}
