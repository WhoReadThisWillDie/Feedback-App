<script>
    import {onDestroy, onMount} from "svelte";
    import Button from "../Button.svelte";
    import {Icon, Pause, Stop, VideoCamera} from "svelte-hero-icons";

    let mediaRecorder;
    let videoStream;
    let recordedChunks = [];
    let recordedVideoUrl = '';
    let isRecording = false;
    let mimeType = ''; // MIME type will be dynamically selected

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

    function detectMimeType() {
        if (MediaRecorder.isTypeSupported('video/webm')) {
            mimeType = 'video/webm';
        } else if (MediaRecorder.isTypeSupported('video/mp4')) {
            mimeType = 'video/mp4';
        } else if (MediaRecorder.isTypeSupported('video/ogg')) {
            mimeType = 'video/ogg';
        } else {
            console.error('No supported video MIME types available in this browser.');
            alert('Your browser does not support video recording.');
        }
    }

    function startRecording() {
        if (videoStream && videoStream.getVideoTracks().length > 0) {
            recordedChunks = [];
            mediaRecorder = new MediaRecorder(videoStream, {mimeType});

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(recordedChunks, {type: mimeType});
                recordedVideoUrl = URL.createObjectURL(blob);
                console.log('Recorded video URL:', recordedVideoUrl);
            };

            mediaRecorder.start();
            isRecording = true;
        } else {
            alert('No video tracks found. Please check your camera.');
        }
    }

    function stopRecording() {
        if (mediaRecorder) {
            mediaRecorder.stop();
            isRecording = false;
        }
    }

    function resetRecording() {
        recordedVideoUrl = '';
        recordedChunks = [];
        startCamera();
    }

    onMount(() => {
        detectMimeType(); // Detect the best MIME type before starting
        startCamera();
    });

    onDestroy(() => {
        if (videoStream) {
            const tracks = videoStream.getTracks();
            tracks.forEach(track => track.stop());
        }
    });

    function transcribeVideo() {

    }

</script>

<div class="flex flex-col align-center w-full max-w-56 m-2">
    {#if recordedVideoUrl}
        <video src={recordedVideoUrl} controls autoplay
               class="w-full h-auto border-solid border-gray-50 rounded-md"></video>
        <div class="my-4">
            <Button on:click={resetRecording}>Record Again</Button>
        </div>
    {:else}
        <video id="camera" autoplay muted class="w-full h-auto border-solid border-gray-50 rounded-md"></video>
        <div class="my-4 flex flex-row w-full">
            {#if !isRecording}
                <Button on:click={startRecording}>Start Recording</Button>
            {:else}
                <Button on:click={stopRecording}>Stop Recording</Button>
            {/if}
            <Button on:click={transcribeVideo}>Transcribe video</Button>

        </div>
    {/if}
</div>

