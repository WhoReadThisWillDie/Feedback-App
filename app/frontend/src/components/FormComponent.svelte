<script>
    import RecordButton from "./RecordComponent.svelte";
    import AudioFile from "./AudioFile.svelte";
    import { fade } from 'svelte/transition';
    import Button from "./Button.svelte";
    import { fetchTranscription } from "../api/fetchTranscription";
    import LoadingAnimation from "./animations/LoadingAnimation.svelte";
    import SubmitButton from "./SubmitComponent.svelte";
    import { Icon, Trash } from "svelte-hero-icons";
    import ConfirmationComponent from "./ConfirmationComponent.svelte";

    let audioFile;
    let blob;
    let isLoading = false;
    let transcriptionTextPromise = "";
    let text = "";
    let currentWordIndex = 0;
    let isRemoving = false;
    let toDeleteChoice;

    async function clearAudioAndText() {
        console.log(toDeleteChoice);
        if(toDeleteChoice===undefined){
            console.log("In if case")
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

    function handleRecordingUpdate(event) {
        blob = event.detail.audioBlob;
        audioFile = URL.createObjectURL(blob);
    }

    async function transcribeAudio() {
        isLoading = true;
        transcriptionTextPromise = await fetchTranscription(blob);
        isLoading = false;
        text = text + " ";
        currentWordIndex = 0;
        typeWords();
    }
</script>

<h2 class="font-medium text-textColor">Feedback</h2>
<textarea
        transition:fade
        bind:value={text}
        placeholder="Type here..."
        class="text-textColor w-full p-2 bg-white rounded-lg resize-none min-h-32 border-gray-150 border-2"
/>
<div class="flex items-center gap-4">
    <RecordButton on:recording-change={handleRecordingUpdate}/>
    {#if audioFile}
        {#key isRemoving}
            <div class="ml-[70px] {isRemoving ? 'scale-out-center' : 'scale-in-center'} flex flex-row space-x-[30px]">
                <AudioFile width="400" url="{audioFile}"/>
                <div class="flex items-center gap-2 space-x-[20px]">
                    <Button on:click={transcribeAudio}>Transcribe</Button>
                    <Button on:click={clearAudioAndText}
                            className="!rounded-full !p-0 w-12 h-12 flex items-center justify-center">
                        <Icon src={Trash} solid class="text-textColor size-8" />
                    </Button>
                </div>
            </div>
        {/key}
    {/if}
</div>
<SubmitButton audioBlob={blob} text={text}/>

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
