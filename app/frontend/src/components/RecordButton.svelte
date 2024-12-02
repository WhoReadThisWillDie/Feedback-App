<script>
  import { createEventDispatcher } from 'svelte';
  import Button from './Button.svelte';
  import { Icon, Pause, Play } from 'svelte-hero-icons';

  let recording;
  let extension = 'webm';
  let isRecording = false;
  let gumStream, recorder, chunks = [];
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
    isRecording = !isRecording;
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }

  function startRecording() {
    let constraints = { audio: true };

    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      gumStream = stream;
      chunks = [];
      recorder = new MediaRecorder(stream, { mimeType: `audio/${extension}` });

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
        if (recorder.state === 'inactive') {
          const blob = new Blob(chunks, { type: `audio/${extension}` });
          recording = URL.createObjectURL(blob);

          // Log and emit the event
          console.log('Dispatching recording-change with', { recording, extension });
          dispatch('recording-change', { recording, extension });
        }
      };

      recorder.start();
    }).catch((err) => {
      console.error('Microphone access denied or not supported:', err);
    });
  }

  function stopRecording() {
    if (recorder && recorder.state !== 'inactive') {
      recorder.stop();
      gumStream.getAudioTracks()[0].stop();
    }
    dispatch('recording-change');
  }

</script>

<div class="flex flex-col items-center">
  <Button
          className="!rounded-full !p-0 w-16 h-16 flex items-center justify-center"
          on:click={toggleRecording}
  >
    <Icon src={!isRecording ? Play : Pause} solid class="text-white size-10"/>
  </Button>
</div>
