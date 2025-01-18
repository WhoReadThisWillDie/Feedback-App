<script>
    import RecordingButtons from "./recording/RecordingButtons.svelte";
    import AudioFile from "./AudioFile.svelte";
    import {createEventDispatcher, tick} from "svelte";

    const dispatch = createEventDispatcher();

    let fileIsAudioOnly = true;
    let cameraOn = false;
    let url;
    let videoStream;
    export let isRemoving;
    export let recordedFile;

    function handleCompletedRecording(event) {
        recordedFile = event.detail.blob;
        fileIsAudioOnly = event.detail.isAudioOnly;
        url = URL.createObjectURL(recordedFile);

        dispatch('recording-change', { recordedFile, fileIsAudioOnly });
        stopCamera();
    }

    function handleModeChange(event) {
        cameraOn = !event.detail.isAudioOnly;
        fileIsAudioOnly = event.detail.isAudioOnly;
        recordedFile = null;
        dispatch('mode-change');
    }

    async function startCamera() {
        try {
            videoStream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
            const videoElement = document.querySelector('#camera');
            if (videoElement) {
                videoElement.srcObject = videoStream;
                await videoElement.play();
            }
        } catch (err) {
            console.error('Error accessing camera:', err);
            alert('Failed to access the camera. Please check your permissions.');
        }
    }

    function stopCamera() {
        if (videoStream) {
            const tracks = videoStream.getTracks();
            tracks.forEach((track) => track.stop());
            videoStream = null;
        }
    }

    $: if (!recordedFile && !fileIsAudioOnly) {
        startCamera()
    }

    $: if (fileIsAudioOnly) {
        stopCamera()
    }
</script>

<div class="flex flex-col space-y-6">
    <div class="flex justify-center">
        <RecordingButtons on:recording-complete={handleCompletedRecording} on:mode-change={handleModeChange}/>
    </div>
        <div class="{isRemoving ? 'scale-out-center' : 'scale-in-center'}">
            {#if recordedFile}
                {#if fileIsAudioOnly}
                    <div class="scale-in-center">
                        <AudioFile width="250" url="{url}"></AudioFile>
                    </div>
                {:else}
                    <div class="flex flex-col w-full max-w-56 ml-2">
                        <video src={url} controls class="w-full h-auto border-solid border-gray-50 rounded-md"></video>
                    </div>
                {/if}
            {:else if cameraOn}
                <div class="scale-in-center flex flex-col w-full max-w-56 ml-2">
                    <video id="camera" autoplay muted class="w-full h-auto border-solid border-gray-50 rounded-md"></video>
                </div>
            {/if}
        </div>
</div>

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
