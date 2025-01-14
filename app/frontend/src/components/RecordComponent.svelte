<script>
    import {createEventDispatcher} from 'svelte';
    import Button from './Button.svelte';
    import {Icon, Pause, Stop, Microphone} from 'svelte-hero-icons';

    let extension = 'webm';
    let isRecording = false;
    let isPaused = false;
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
                if (recorder.state === 'inactive') {
                    audioBlob = new Blob(chunks, {type: `audio/${extension}`});
                    dispatch('recording-change', {audioBlob});
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
                audioBlob = new Blob(chunks, {type: `audio/${extension}`});
                if (audioBlob.size === 0) {
                    console.error("Blob is empty. Check if recording chunks were captured.");
                    return;
                }
                dispatch('recording-change', {audioBlob});
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
</script>

<div class="flex items-center gap-2">
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
</div>
