<script>
    import RecordButton from "./RecordComponent.svelte";
    import AudioFile from "./AudioFile.svelte";
    import { fade } from 'svelte/transition';
    import Button from "./Button.svelte";
    import { fetchTranscription } from "../api/fetchTranscription";
    import LoadingAnimation from "./animations/LoadingAnimation.svelte";
    import SubmitButton from "./SubmitComponent.svelte";

    let audioFile;
    let blob;
    let isLoading = false;
    let transcriptionTextPromise = "";
    let text = "";
    let currentWordIndex = 0;

    let typeWords = () => {
        if (currentWordIndex < transcriptionTextPromise.length) {
            text += transcriptionTextPromise[currentWordIndex];
            currentWordIndex++;
            setTimeout(typeWords, 20);
        }
    };

    // Update recording explicitly when a new file is recorded
    function handleRecordingUpdate(event) {
        blob = event.detail.audioBlob;
        audioFile = URL.createObjectURL(blob);
    }

    async function transcribeAudio() {
        isLoading = true
        transcriptionTextPromise = await fetchTranscription(blob)
        isLoading = false;
        text = text + " ";
        currentWordIndex = 0
        typeWords()
    }



</script>

<h2 class="font-medium text-textColor">Feedback</h2>
<textarea
        transition:fade
        bind:value={text}
        placeholder="Type here..."
        class="text-textColor w-full p-2 bg-white rounded-lg resize-none min-h-32 border-gray-150 border-2"
/>
<div class="flex flex-row">
    <RecordButton on:recording-change={handleRecordingUpdate}/>
    {#if audioFile}
        <AudioFile width="400" url="{audioFile}"/>
        <div class="p-4 flex mx-4">
            <Button on:click={transcribeAudio}>Transcribe</Button>
        </div>
    {/if}
</div>
<SubmitButton audioBlob={blob} text={text}/>

{#if isLoading}
    <LoadingAnimation/>
{/if}
