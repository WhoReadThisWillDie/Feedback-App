<script>
    import RecordComponent from "./RecordComponent.svelte";
    import {fade} from 'svelte/transition';
    import Button from "./Button.svelte";
    import {fetchTranscription} from "../api/fetchTranscription";
    import LoadingAnimation from "./animations/LoadingAnimation.svelte";
    import SubmitButton from "./SubmitComponent.svelte";
    import ConfirmationComponent from "./ConfirmationComponent.svelte";
    import {createEventDispatcher} from "svelte";

    let audioFile;
    let videoFile;
    let blob;
    let isLoading = false;
    let transcriptionTextPromise = "";
    let text = "";
    let currentWordIndex = 0;
    let isRemoving = false;
    let toDeleteChoice;

    const dispatch = createEventDispatcher();

    async function clearAudioAndText() {
        console.log(toDeleteChoice);
        if(toDeleteChoice===undefined){
            toDeleteChoice=null;
            return;
        }
        if(toDeleteChoice===true){
            isRemoving = true; // Start reverse animation
            setTimeout(() => {
                audioFile = null;
                blob = null;
                text = "";
                isRemoving = false; // Reset for future animations
            }, 1000); // Match the animation duration
        }
    }

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
        isLoading = true;
        transcriptionTextPromise = await fetchTranscription(blob);
        isLoading = false;
        text = text + " ";
        currentWordIndex = 0;
        typeWords();
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


    function handleFeedbackSubmission() {
        dispatch('submit-feedback')
    }
</script>

<h2 class="font-medium text-textColor text-xl md:text-2xl">Feedback</h2>
<textarea
        transition:fade
        bind:value={text}
        placeholder="Type here..."
        class="text-textColor w-full p-2 bg-white rounded-lg resize-none min-h-[128px] border-gray-150 border-2 focus:outline-none md:min-h-[160px] lg:min-h-[200px]"
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
    <SubmitButton audioBlob={blob} text={text} on:submit-feedback={handleFeedbackSubmission}/>
</div>

{#if isLoading}
    <LoadingAnimation/>
{/if}

{#if toDeleteChoice===null}
    <ConfirmationComponent bind:toDeleteChoice {clearAudioAndText}/>
{/if}

<style>
    .scale-in-center {
        animation: scale-in-center 1s cubic-bezier(0.25, 1, 0.5, 1) both;
    }

    .scale-out-center {
        animation: scale-out-center 1s cubic-bezier(0.25, 1, 0.5, 1) both;
    }

    @keyframes scale-in-center {
        0% {
            transform: scale(0.8);
            opacity: 0;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    @keyframes scale-out-center {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0.8);
            opacity: 0;
        }
    }
</style>
