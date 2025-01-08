<script>
    import RecordButton from "./RecordButton.svelte";
    import AudioFile from "./AudioFile.svelte";
    import { fade } from 'svelte/transition';
    import Button from "./Button.svelte";
    import { fetchTranscription } from "../api/fetchTranscription";

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
        //FOR SHOW PURPOSE
        setTimeout(() => {
            isLoading = false;
        }, 3000);

        transcriptionTextPromise = await fetchTranscription(blob)
        console.log(transcriptionTextPromise)

        text = ""
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
        <AudioFile url="{audioFile}"/>
        <div class="p-4 flex mx-4">
            <Button on:click={transcribeAudio}>Transcribe</Button>
        </div>
    {/if}
</div>
{#if isLoading}
    <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50" transition:fade={{duration: 500}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" preserveAspectRatio="xMidYMid"
             style="shape-rendering:auto;display:block;background:0 0" viewBox="0 0 100 100">
            <rect width="6" height="12" x="47" y="24" fill="#fa38ff" rx="3" ry="6">
                <animate attributeName="opacity" begin="-0.9166666666666666s" dur="1s" keyTimes="0;1" repeatCount="indefinite" values="1;0"/>
            </rect>
            <rect width="6" height="12" x="47" y="24" fill="#fa38ff" rx="3" ry="6" transform="rotate(30 50 50)">
                <animate attributeName="opacity" begin="-0.8333333333333334s" dur="1s" keyTimes="0;1" repeatCount="indefinite" values="1;0"/>
            </rect>
            <rect width="6" height="12" x="47" y="24" fill="#fa38ff" rx="3" ry="6" transform="rotate(60 50 50)">
                <animate attributeName="opacity" begin="-0.75s" dur="1s" keyTimes="0;1" repeatCount="indefinite" values="1;0"/>
            </rect>
            <rect width="6" height="12" x="47" y="24" fill="#fa38ff" rx="3" ry="6" transform="rotate(90 50 50)">
                <animate attributeName="opacity" begin="-0.6666666666666666s" dur="1s" keyTimes="0;1" repeatCount="indefinite" values="1;0"/>
            </rect>
            <rect width="6" height="12" x="47" y="24" fill="#fa38ff" rx="3" ry="6" transform="rotate(120 50 50)">
                <animate attributeName="opacity" begin="-0.5833333333333334s" dur="1s" keyTimes="0;1" repeatCount="indefinite" values="1;0"/>
            </rect>
            <rect width="6" height="12" x="47" y="24" fill="#fa38ff" rx="3" ry="6" transform="rotate(150 50 50)">
                <animate attributeName="opacity" begin="-0.5s" dur="1s" keyTimes="0;1" repeatCount="indefinite" values="1;0"/>
            </rect>
            <rect width="6" height="12" x="47" y="24" fill="#fa38ff" rx="3" ry="6" transform="rotate(180 50 50)">
                <animate attributeName="opacity" begin="-0.4166666666666667s" dur="1s" keyTimes="0;1" repeatCount="indefinite" values="1;0"/>
            </rect>
            <rect width="6" height="12" x="47" y="24" fill="#fa38ff" rx="3" ry="6" transform="rotate(210 50 50)">
                <animate attributeName="opacity" begin="-0.3333333333333333s" dur="1s" keyTimes="0;1" repeatCount="indefinite" values="1;0"/>
            </rect>
            <rect width="6" height="12" x="47" y="24" fill="#fa38ff" rx="3" ry="6" transform="rotate(240 50 50)">
                <animate attributeName="opacity" begin="-0.25s" dur="1s" keyTimes="0;1" repeatCount="indefinite" values="1;0"/>
            </rect>
            <rect width="6" height="12" x="47" y="24" fill="#fa38ff" rx="3" ry="6" transform="rotate(270 50 50)">
                <animate attributeName="opacity" begin="-0.16666666666666666s" dur="1s" keyTimes="0;1" repeatCount="indefinite" values="1;0"/>
            </rect>
            <rect width="6" height="12" x="47" y="24" fill="#fa38ff" rx="3" ry="6" transform="rotate(300 50 50)"><animate attributeName="opacity" begin="-0.08333333333333333s" dur="1s" keyTimes="0;1" repeatCount="indefinite" values="1;0"/>
            </rect>
            <rect width="6" height="12" x="47" y="24" fill="#fa38ff" rx="3" ry="6" transform="rotate(330 50 50)"><animate attributeName="opacity" begin="0s" dur="1s" keyTimes="0;1" repeatCount="indefinite" values="1;0"/>
            </rect>
        </svg>
    </div>
{/if}

<style>
    .fixed {
        transition: opacity 0.5s ease-in-out;
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
