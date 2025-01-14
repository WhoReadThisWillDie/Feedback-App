<script>
    import RecordingButtons from "./recording/RecordingButtons.svelte";
    import AudioFile from "./AudioFile.svelte";
    import SubmitButton from "./SubmitComponent.svelte";
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    let fileIsAudioOnly;
    let cameraOn = false;
    let recordedFile;
    let url;
    let videoStream;

    function handleCompletedRecording(event) {
        recordedFile = event.detail.blob;
        fileIsAudioOnly = event.detail.isAudioOnly;
        url = URL.createObjectURL(recordedFile);

        console.log(recordedFile, 'isAudioOnly: ', fileIsAudioOnly);

        dispatch('recording-change', { recordedFile, fileIsAudioOnly });
        stopCamera();
    }

    function handleModeChange(event) {
        cameraOn = !event.detail.isAudioOnly;
        recordedFile = '';
        if (cameraOn) {
            startCamera();
        } else {
            stopCamera();
        }
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
</script>

<div class="flex flex-start">
    <div class="flex flex-row items-start">
        <RecordingButtons on:recording-complete={handleCompletedRecording} on:mode-change={handleModeChange}/>
    </div>

    {#if recordedFile && recordedFile !== ''}
        {#if fileIsAudioOnly}
            <AudioFile url={url}></AudioFile>
        {:else}
            <div class="flex flex-col w-full max-w-56 ml-2">
                <video src={url} controls autoplay
                       class="w-full h-auto border-solid border-gray-50 rounded-md"></video>
            </div>
        {/if}
    {:else if cameraOn}
        <div class="flex flex-col w-full max-w-56 ml-2">
            <video id="camera" autoplay muted class="w-full h-auto border-solid border-gray-50 rounded-md"></video>
        </div>
    {/if}

</div>
