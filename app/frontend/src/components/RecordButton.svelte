<script>
    import {createEventDispatcher} from 'svelte';
    import Button from './Button.svelte';
    import {Icon, Pause, Stop, Microphone} from 'svelte-hero-icons';
    import { fade } from 'svelte/transition';

    let recording;
    let extension = 'webm';
    let isRecording = false;
    let isPaused = false;
    let showSuccess = false;
    let isLoading = false;
    let gumStream, recorder, chunks = [];
    let timer = 0;
    let timerInterval;
    let audioBlob = null;
    const dispatch = createEventDispatcher();

    if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
        extension = 'webm';
    } else if (MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')) {
        extension = 'ogg';
    } else if (MediaRecorder.isTypeSupported('audio/mpeg')) {
        extension = 'mp3';
    } else {
        console.error('No supported audio MIME types available in this browser.');
        alert('Your browser does not support audio recording.');
    }

    async function toggleRecording() {
        if (!isRecording) {
            startRecording();
        } else if (recorder && recorder.state === 'recording') {
            pauseRecording();
        } else if (recorder && recorder.state === 'paused') {
            resumeRecording();
        }
    }

    function startRecording() {
        let constraints = {audio: true};

        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
            gumStream = stream;
            chunks = [];
            recorder = new MediaRecorder(stream, {mimeType: `audio/${extension}`});

            recorder.ondataavailable = (e) => {
                chunks.push(e.data);
                console.log('Recorder state:', recorder.state);
                if (recorder.state === 'inactive') {
                    const blob = new Blob(chunks, {type: `audio/${extension}`});
                    recording = URL.createObjectURL(blob);
                    console.log('Dispatching recording-change with', {recording, extension});
                    dispatch('recording-change', {recording, extension});
                }
            };

            recorder.start();
            isRecording = true;
            isPaused = false;

            startTimer();
        }).catch((err) => {
            console.error('Microphone access denied or not supported:', err);
        });
    }

    function pauseRecording() {
        if (recorder && recorder.state === 'recording') {
            recorder.pause();
            isPaused = true;
            clearInterval(timerInterval);
        }
    }

    function resumeRecording() {
        if (recorder && recorder.state === 'paused') {
            recorder.resume();
            isPaused = false;
            startTimer();
        }
    }

    function stopRecording() {
        if (recorder && recorder.state !== 'inactive') {
            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: `audio/${extension}` });
                console.log("Blob size:", blob.size);
                if (blob.size === 0) {
                    console.error("Blob is empty. Check if recording chunks were captured.");
                    return;
                }
                recording = URL.createObjectURL(blob);
                audioBlob = blob;
                dispatch('recording-change', { recording, extension });
            };

            recorder.stop();
            gumStream.getAudioTracks()[0].stop();
        }
        isRecording = false;
        isPaused = false;

        clearInterval(timerInterval);
        timer = 0;
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            timer++;
        }, 1000);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const formattedSeconds = seconds % 60;
        return `${minutes}:${formattedSeconds < 10 ? '0' : ''}${formattedSeconds}`;
    }

    export function submitAndTranscribeFeedback(){
        isLoading = true
        //FOR SHOW PURPOSE
        setTimeout(() => {
            isLoading = false;
        }, 3000);
        //
    }

    async function exportToDatabase() {
        if(!audioBlob){
            console.error("No audio available to export.");
            return;
        }

        const formData = new FormData();
        formData.append('audio', audioBlob, `recording.wav`);

        try {
            const response = await fetch('http://localhost:3000/feedback/upload', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const {filePath} = await response.json();
                console.log('Uploaded file path: ', filePath);
                showSuccessBox()
            } else {
                console.error('Failed to upload audio file', await response.text());
            }

        } catch (error) {
            console.error('Failed to upload audio file', error);
        }

    }

    function showSuccessBox() {
        showSuccess = true;
        setTimeout(() => {
            showSuccess = false;
        }, 3000);
    }

</script>

<!--<div class="text-l font-semibold m-4">-->
<!--    {isRecording ? `Recording: ${formatTime(timer)}` : "Not Recording"}-->
<!--</div>-->
<div class="flex flex-row items-center">
    <Button
            className="!rounded-full !p-0 w-12 h-12 flex items-center justify-center"
            on:click={toggleRecording}
    >
        <Icon src={!isRecording ? Microphone : isPaused ? Microphone : Pause} solid class="text-textColor size-8"/>
    </Button>
    <Button
            className="!rounded-full !p-0 ml-2 w-12 h-12 flex items-center justify-center"
            disabled={!isRecording && chunks.length === 0} on:click={stopRecording}
    >
        <Icon src="{Stop}" solid class="text-textColor size-8"/>
    </Button>

<!--    <div class="p-4 flex justify-end">-->
<!--        <Button on:click={submitAndTranscribeFeedback}>Transcribe</Button>-->
<!--    </div>-->

    <div class="absolute mt-[10vw] left-1/2 transform -translate-x-1/2">
        <Button on:click={exportToDatabase}>Submit</Button>
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
    {#if showSuccess}
        <div transition:fade class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div class="bg-white p-6 rounded shadow-lg text-center w-80 animate-fade-in">
                <h2 class="text-2xl font-bold gradient-text">FeedBack saved!</h2>
                <p class="text-gray-600 mt-2">We appreciate your desire to study.</p>
                <div class="w-12 h-12 gradient-linear rounded-full mt-4 mx-auto flex items-center justify-center animate-tick">
                    <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-6 h-6 text-white"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                    >
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7 19.6 5.6z" />
                    </svg>
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    .gradient-text {
        background: linear-gradient(90deg, #d60dc1, #4800ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .gradient-linear {
        background: linear-gradient(90deg, #d60dc1, #4800ff);
    }
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
    .animate-fade-in {
        animation: fade-in 0.5s ease-in-out;
    }
    .animate-tick {
        animation: tick 0.5s ease-in-out;
    }
</style>
