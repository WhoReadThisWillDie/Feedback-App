<script>
    import Button from "../Button.svelte";
    import { Icon, Pause, Stop, Microphone, VideoCamera } from 'svelte-hero-icons';
    import { createEventDispatcher, onDestroy, onMount } from "svelte";

    const dispatch = createEventDispatcher();

    let isAudioOnly = true;
    let mediaRecorder;
    let mediaStream;
    let recordedChunks = [];
    let recordedUrl = '';
    let isRecording = false;
    let isPaused = false;
    let mimeType = '';
    let timer = 0;
    let intervalId;

    function toggleMode() {
        if (isRecording) {
            alert('Stop the current recording before switching modes.');
            return;
        } else if (recordedUrl === '' || confirm('Are you sure that you want to overwrite the current recording?')) {
            resetRecording();
            isAudioOnly = !isAudioOnly;
            detectMimeType();
            dispatch('mode-change', { isAudioOnly });
        }
    }

    function detectMimeType() {
        if (isAudioOnly) {
            if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
                mimeType = 'audio/webm';
            } else if (MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')) {
                mimeType = 'audio/ogg';
            } else if (MediaRecorder.isTypeSupported('audio/mpeg')) {
                mimeType = 'audio/mpeg';
            } else {
                alert('No supported audio MIME types available in this browser.');
            }
        } else {
            if (MediaRecorder.isTypeSupported('video/webm')) {
                mimeType = 'video/webm';
            } else if (MediaRecorder.isTypeSupported('video/mp4')) {
                mimeType = 'video/mp4';
            } else if (MediaRecorder.isTypeSupported('video/ogg')) {
                mimeType = 'video/ogg';
            } else {
                alert('No supported video MIME types available in this browser.');
            }
        }
    }

    async function toggleRecording() {
        if (!isRecording) {
            await startRecording();
        } else if (isPaused) {
            resumeRecording();
        } else {
            pauseRecording();
        }
    }

    async function startRecording() {
        const constraints = isAudioOnly ? { audio: true } : { video: true, audio: true };

        try {
            mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
            recordedChunks = [];
            mediaRecorder = new MediaRecorder(mediaStream, { mimeType });

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(recordedChunks, { type: mimeType });
                recordedUrl = URL.createObjectURL(blob);
                dispatch('recording-complete', { blob, isAudioOnly });
            };

            mediaRecorder.start();
            isRecording = true;

            startTimer();
        } catch (err) {
            console.error('Error accessing media devices:', err);
            alert('Failed to access media devices. Please check your permissions.');
        }
    }

    function pauseRecording() {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.pause();
            isPaused = true;
            stopTimer();
        }
    }

    function resumeRecording() {
        if (mediaRecorder && mediaRecorder.state === 'paused') {
            mediaRecorder.resume();
            isPaused = false;
            startTimer();
        }
    }

    function stopRecording() {
        if (mediaRecorder) {
            mediaRecorder.stop();
            mediaStream.getTracks().forEach((track) => track.stop());
            isRecording = false;
            isPaused = false;
            stopTimer();
            timer = 0;
        }
    }

    function resetRecording() {
        recordedUrl = '';
        recordedChunks = [];
        timer = 0;
        stopTimer();
    }

    function startTimer() {
        if (!intervalId) {
            intervalId = setInterval(() => {
                timer++;
            }, 1000);
        }
    }

    function stopTimer() {
        clearInterval(intervalId);
        intervalId = null;
    }

    onMount(() => {
        detectMimeType();
    });

    onDestroy(() => {
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
        }
        stopTimer();
    });
</script>
<div class="flex flex-col items-center">
    <div class="flex flex-row items-center">
        <Button className="mr-2" on:click={toggleMode}>
            {#if isAudioOnly}
                Switch to Video
            {:else}
                Switch to Audio
            {/if}
        </Button>

        <Button className="!rounded-full !p-0 w-12 h-12 flex items-center justify-center mr-2" on:click={toggleRecording}>
            {#if isAudioOnly}
                <Icon src={!isRecording ? Microphone : isPaused ? Microphone : Pause} solid class="text-textColor size-8" />
            {:else}
                <Icon src={!isRecording ? VideoCamera : isPaused ? VideoCamera : Pause} solid class="text-textColor size-8" />
            {/if}
        </Button>
        <Button className="!rounded-full !p-0 w-12 h-12 flex items-center justify-center" on:click={stopRecording}>
            <Icon src={Stop} solid class="text-textColor size-8" />
        </Button>
    </div>

    {#if isRecording}
        <div class="flex items-center">
            <div class="dot blinking"></div>
            <span class="ml-2 text-textColor">{Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}</span>
        </div>
    {/if}
</div>
<style>
    .dot {
        width: 12px;
        height: 12px;
        background-color: red;
        border-radius: 50%;
    }

    .blinking {
        animation: blink 1s infinite;
    }

    @keyframes blink {
        0%, 50% {
            opacity: 1;
        }
        50.1%, 100% {
            opacity: 0;
        }
    }
</style>
