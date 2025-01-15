<script>
    import Button from "./Button.svelte";
    import SubmitAnimation from "./animations/SubmitAnimation.svelte";
    import {postFeedback} from "../api/postFeedback.js";
    import {createEventDispatcher} from "svelte";

    let showSuccess = false;
    export let audioBlob;
    export let text;

    const dispatch = createEventDispatcher();

    async function exportToDatabase() {

        if (!audioBlob && !text) {
            alert("No audio or text specified.")
            return
        }

        const formData = new FormData();

        if (audioBlob) {
            formData.append('audio', audioBlob, `recording.wav`);
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

<div class="absolute pt-[400px] left-1/2 transform -translate-x-1/2">
    <Button on:click={exportToDatabase}>Submit</Button>
</div>

{#if showSuccess}
    <SubmitAnimation/>
{/if}
