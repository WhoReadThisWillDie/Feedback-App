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
            videoStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
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
            mediaRecorder = new MediaRecorder(videoStream, { mimeType });

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(recordedChunks, { type: mimeType });
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
</script>

<style>
    video {
        width: 100%;
        max-width: 600px;
        border: 1px solid #ccc;
        border-radius: 8px;
    }
    .controls {
        margin-top: 10px;
    }
</style>

<div>
    {#if recordedVideoUrl}
        <h3>Recorded Video:</h3>
        <video src={recordedVideoUrl} controls autoplay></video>
        <div class="controls">
            <Button on:click={resetRecording}>Record Again</Button>
        </div>
    {:else}
        <h3>Live Camera:</h3>
        <video id="camera" autoplay muted></video>
        <div class="controls">
            {#if !isRecording}
                <Button on:click={startRecording}>Start Recording</Button>
            {:else}
                <Button on:click={stopRecording}>Stop Recording</Button>
            {/if}
        </div>
    {/if}
</div>



<!--<script>-->
<!--    import { createEventDispatcher } from 'svelte';-->
<!--    import Button from '../Button.svelte';-->
<!--    import { Icon, Pause, Stop, VideoCamera } from 'svelte-hero-icons';-->
<!--import { fade } from 'svelte/transition';-->

<!--    let recording;-->
<!--    let extension = 'webm';-->
<!--    let isRecording = false;-->
<!--    let isPaused = false;-->
<!--    let showSuccess = false;-->
<!--    let isLoading = false;-->
<!--    let gumStream, recorder, chunks = [];-->
<!--    let timer = 0;-->
<!--    let timerInterval;-->
<!--    const dispatch = createEventDispatcher();-->

<!--    if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {-->
<!--        extension = 'webm';-->
<!--    } else {-->
<!--        console.error('No supported video MIME types available in this browser.');-->
<!--        alert('Your browser does not support video recording.');-->
<!--    }-->

<!--    async function toggleRecording() {-->
<!--        if (!isRecording) {-->
<!--            startRecording();-->
<!--        } else if (recorder && recorder.state === 'recording') {-->
<!--            pauseRecording();-->
<!--        } else if (recorder && recorder.state === 'paused') {-->
<!--            resumeRecording();-->
<!--        }-->
<!--    }-->

<!--    function startRecording() {-->
<!--        let constraints = { video: true, audio: true };-->

<!--        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {-->
<!--            gumStream = stream;-->
<!--            chunks = [];-->
<!--            recorder = new MediaRecorder(stream, { mimeType: `video/${extension}` });-->

<!--            recorder.ondataavailable = (e) => {-->
<!--                chunks.push(e.data);-->
<!--                console.log('Recorder state:', recorder.state);-->
<!--                if (recorder.state === 'inactive') {-->
<!--                    const blob = new Blob(chunks, { type: `video/${extension}` });-->
<!--                    recording = URL.createObjectURL(blob);-->
<!--                    console.log('Dispatching recording-change with', { recording, extension });-->
<!--                    dispatch('recording-change', { recording, extension });-->
<!--                }-->
<!--            };-->

<!--            recorder.start();-->
<!--            isRecording = true;-->
<!--            isPaused = false;-->
<!--            startTimer();-->
<!--        }).catch((err) => {-->
<!--            console.error('Camera or microphone access denied or not supported:', err);-->
<!--        });-->
<!--    }-->

<!--    function pauseRecording() {-->
<!--        if (recorder && recorder.state === 'recording') {-->
<!--            recorder.pause();-->
<!--            isPaused = true;-->
<!--            clearInterval(timerInterval);-->
<!--        }-->
<!--    }-->

<!--    function resumeRecording() {-->
<!--        if (recorder && recorder.state === 'paused') {-->
<!--            recorder.resume();-->
<!--            isPaused = false;-->
<!--            startTimer();-->
<!--        }-->
<!--    }-->

<!--    function stopRecording() {-->
<!--        if (recorder && recorder.state !== 'inactive') {-->
<!--            recorder.onstop = () => {-->
<!--                const blob = new Blob(chunks, { type: `video/${extension}` });-->
<!--                console.log("Blob size:", blob.size);-->
<!--                if (blob.size === 0) {-->
<!--                    console.error("Blob is empty. Check if recording chunks were captured.");-->
<!--                    return;-->
<!--                }-->
<!--                recording = URL.createObjectURL(blob);-->
<!--                dispatch('recording-change', { recording, extension });-->
<!--            };-->

<!--            recorder.stop();-->
<!--            gumStream.getTracks().forEach(track => track.stop());-->
<!--        }-->
<!--        isRecording = false;-->
<!--        isPaused = false;-->

<!--        clearInterval(timerInterval);-->
<!--        timer = 0;-->
<!--    }-->

<!--    function startTimer() {-->
<!--        timerInterval = setInterval(() => {-->
<!--            timer++;-->
<!--        }, 1000);-->
<!--    }-->

<!--    function formatTime(seconds) {-->
<!--        const minutes = Math.floor(seconds / 60);-->
<!--        const formattedSeconds = seconds % 60;-->
<!--        return `${minutes}:${formattedSeconds < 10 ? '0' : ''}${formattedSeconds}`;-->
<!--    }-->

<!--    function submitAndTranscribeFeedback() {-->
<!--        isLoading = true;-->
<!--        setTimeout(() => {-->
<!--            isLoading = false;-->
<!--        }, 3000);-->
<!--    }-->

<!--    function exportToDatabase() {-->
<!--        showSuccessBox();-->
<!--    }-->

<!--    function showSuccessBox() {-->
<!--        showSuccess = true;-->
<!--        setTimeout(() => {-->
<!--            showSuccess = false;-->
<!--        }, 3000);-->
<!--    }-->
<!--</script>-->

<!--<div class="flex flex-row items-center">-->
<!--    <Button-->
<!--            className="!rounded-full !p-0 w-12 h-12 flex items-center justify-center"-->
<!--            on:click={toggleRecording}-->
<!--    >-->
<!--        <Icon src={!isRecording ? VideoCamera : isPaused ? VideoCamera : Pause} solid class="text-textColor size-8" />-->
<!--    </Button>-->
<!--    <Button-->
<!--            className="!rounded-full !p-0 ml-2 w-12 h-12 flex items-center justify-center"-->
<!--            disabled={!isRecording && chunks.length === 0}-->
<!--            on:click={stopRecording}-->
<!--    >-->
<!--        <Icon src="{Stop}" solid class="text-textColor size-8" />-->
<!--    </Button>-->

<!--    <div class="p-4">-->
<!--        <Button on:click={submitAndTranscribeFeedback}>Submit</Button>-->
<!--    </div>-->

<!--    <div class="absolute mt-[30vw] left-1/2 transform -translate-x-1/2">-->
<!--        <Button on:click={exportToDatabase}>Send</Button>-->
<!--    </div>-->

<!--    {#if isLoading}-->
<!--        <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50" transition:fade={{ duration: 500 }}>-->
<!--            &lt;!&ndash; Loading spinner &ndash;&gt;-->
<!--            <div>Loading...</div>-->
<!--        </div>-->
<!--    {/if}-->

<!--    {#if showSuccess}-->
<!--        <div transition:fade class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">-->
<!--            <div class="bg-white p-6 rounded shadow-lg text-center w-80">-->
<!--                <h2 class="text-2xl font-bold gradient-text">Video Saved!</h2>-->
<!--                <p class="text-gray-600 mt-2">Your video has been recorded successfully.</p>-->
<!--            </div>-->
<!--        </div>-->
<!--    {/if}-->
<!--</div>-->

<!--<style>-->
<!--    .gradient-text {-->
<!--        background: linear-gradient(90deg, #d60dc1, #4800ff);-->
<!--        -webkit-background-clip: text;-->
<!--        -webkit-text-fill-color: transparent;-->
<!--    }-->
<!--</style>-->
