<script>
    import {createEventDispatcher} from 'svelte';
    import Button from './Button.svelte';
    import {Icon, Pause, Play} from 'svelte-hero-icons';

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
                if (recorder.state === 'inactive') {
                    const blob = new Blob(chunks, {type: `audio/${extension}`});
                    recording = URL.createObjectURL(blob);

                    // Log and emit the event
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
            recorder.stop();
            gumStream.getAudioTracks()[0].stop();
        }
        isRecording = false;
        isPaused = false;

        clearInterval(timerInterval);
        timer = 0;

        dispatch('recording-change');
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

</script>

<div class="flex flex-col items-center">
    <div class="text-xl font-semibold mb-2">
        {isRecording ? `Recording: ${formatTime(timer)}` : "Not Recording"}
    </div>
    <Button
            className="!rounded-full !p-0 w-16 h-16 flex items-center justify-center"
            on:click={toggleRecording}
    >
        <Icon src={!isRecording ? Play : isPaused ? Play : Pause} solid class="text-white size-10"/>
    </Button>
    <div class="p-4">
        <Button
                on:click={stopRecording}
        >Submit
        </Button>
    </div>
</div>
