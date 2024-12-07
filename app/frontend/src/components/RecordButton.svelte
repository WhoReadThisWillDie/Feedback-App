<script>
    import {createEventDispatcher} from 'svelte';
    import Button from './Button.svelte';
    import {Icon, Pause, Stop, Microphone} from 'svelte-hero-icons';

    let recording;
    let extension = 'webm';
    let isRecording = false;
    let isPaused = false;
    let gumStream, recorder, chunks = [];
    let timer = 0;
    let timerInterval;
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

    function exportToDatabase() {

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
        <Icon src={!isRecording ? Microphone : isPaused ? Microphone : Pause} solid class="text-white size-8"/>
    </Button>
    <Button
            className="!rounded-full !p-0 ml-2 w-12 h-12 flex items-center justify-center"
            disabled={!isRecording && chunks.length === 0} on:click={stopRecording}
    >
        <Icon src="{Stop}" solid class="text-white size-8"/>
    </Button>
    <div class="p-4">
        <Button
                on:click={exportToDatabase}
        >Submit
        </Button>
    </div>
</div>