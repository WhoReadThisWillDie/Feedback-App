<script>
    import RecordButton from "./RecordComponent.svelte";
    import AudioFile from "./AudioFile.svelte";
    import { fade } from 'svelte/transition';
    import Button from "./Button.svelte";
    import { fetchTranscription } from "../api/fetchTranscription";
    import LoadingAnimation from "./animations/LoadingAnimation.svelte";
    import SubmitButton from "./SubmitComponent.svelte";
    import { Icon, Trash } from "svelte-hero-icons";
    let audioFile;
    let blob;
    let isLoading = false;
    let transcriptionTextPromise = "";
    let text = "";
    let currentWordIndex = 0;

    function clearAudioAndText() {
        audioFile = null;
        blob = null;
        text = "";
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

<h2 class="font-medium text-textColor text-xl md:text-2xl">Feedback</h2>
<textarea
        transition:fade
        bind:value={text}
        placeholder="Type here..."
        class="text-textColor w-full p-2 bg-white rounded-lg resize-none min-h-[128px] border-gray-150 border-2 focus:outline-none md:min-h-[160px] lg:min-h-[200px]"
/>
<div class="flex flex-col md:flex-row items-center gap-4">
    <RecordButton on:recording-change={handleRecordingUpdate}/>
    {#if audioFile}
        <AudioFile width="350" url="{audioFile}"/>
        <div class="flex items-center gap-2">
            <Button on:click={transcribeAudio}>Transcribe</Button>
            <Button on:click={clearAudioAndText}
                    className="!rounded-full !p-0 w-12 h-12 flex items-center justify-center">
                <Icon src={Trash} solid class="text-textColor size-8" />
            </Button>
        </div>
    {/if}
</div>
<SubmitButton audioBlob={blob} text={text}/>

{#if isLoading}
    <LoadingAnimation/>
{/if}
