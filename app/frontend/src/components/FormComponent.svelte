<script>
    import RecordComponent from "./RecordComponent.svelte";
    import {fade} from 'svelte/transition';
    import Button from "./Button.svelte";
    import {fetchTranscription} from "../api/fetchTranscription";
    import LoadingAnimation from "./animations/LoadingAnimation.svelte";
    import SubmitButton from "./SubmitComponent.svelte";

    let audioFile;
    let videoFile;
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
        blob = event.detail.recordedFile;
        let fileIsAudioOnly = event.detail.fileIsAudioOnly;
        if (fileIsAudioOnly) {
            audioFile = URL.createObjectURL(blob);
            videoFile = null;
        } else {
            videoFile = URL.createObjectURL(blob);
            audioFile = null;
        }
    }

    async function transcribeAudio() {
        isLoading = true
        transcriptionTextPromise = await fetchTranscription(blob)
        isLoading = false;
        text = text + " ";
        currentWordIndex = 0
        typeWords()
    }

    async function transcribeVideo() {
        isLoading = true;
        // transcribe
        isLoading = false;
        text = text + ' ';
        currentWordIndex = 0;
        typeWords();
    }

    function handleModeChange() {
        audioFile = null;
        videoFile = null;
    }


</script>

<h2 class="font-medium text-textColor">Feedback</h2>
<textarea
        transition:fade
        bind:value={text}
        placeholder="Type here..."
        class="text-textColor w-full p-2 bg-white rounded-lg resize-none min-h-32 border-gray-150 border-2"
/>
<div class="flex flex-row justify-between">
    <div>
        <RecordComponent on:recording-change={handleRecordingUpdate} on:mode-change={handleModeChange}/>
    </div>
    <div class="place-content-center max-h-12">
        {#if audioFile}
            <div>
                <Button on:click={transcribeAudio}>Transcribe</Button>
            </div>
        {:else if videoFile}
            <div>
                <Button on:click={transcribeVideo}>Transcribe</Button>
            </div>
        {/if}
    </div>
</div>
<div>
    <SubmitButton audioBlob={blob} text={text}/>
</div>

{#if isLoading}
    <LoadingAnimation/>
{/if}
