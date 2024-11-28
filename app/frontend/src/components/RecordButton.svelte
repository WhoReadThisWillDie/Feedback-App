<script>
  import { Icon, Play, Pause } from "svelte-hero-icons";

  import Button from "./Button.svelte";

  let isRecording = false;

  let gumStream;
  let recorder;
  let extension;
  let chunks = [];
  let recordingsList;
  let formats;

  // check what file type the audio file needs to be.
  if (MediaRecorder.isTypeSupported('audio/mp4;codecs=mp4a.40.2')) {
    extension = "mp4";
  } else if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
    extension = "webm";
  } else if (MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')) {
    extension = "ogg";
  } else if (MediaRecorder.isTypeSupported('audio/mpeg')) {
    extension = "mp3";
  } else {
    console.error("No supported audio MIME types available in this browser.");
    alert("Your browser does not support audio recording.");
  }

  async function toggleRecording() {
    isRecording = !isRecording;
    if (isRecording) {
      // Start recording logic
      startRecording();
    } else {
      // Stop recording logic
      stopRecording();
    }
  }

  function startRecording() {
    let constraints = { audio: true };

    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      console.log("Initializing media recording");
      gumStream = stream;
      chunks = [];

      const options = {
        mimeType: `audio/${extension}`
      };

      if (formats) {
        formats.textContent = `MIME: audio/${extension}`;
      }

      recorder = new MediaRecorder(stream, options);

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
        if (recorder.state === 'inactive') {
          const blob = new Blob(chunks, { type: `audio/${extension}` });
          createDownloadLink(blob);
        }
      };

      recorder.onerror = (error) => {
        console.error("Recording error:", error);
      };

      recorder.start(1000);
    }).catch((err) => {
      console.error("getUserMedia error:", err);
      alert("Microphone access denied or not supported.");
    });
  }

  function stopRecording() {
    if (recorder && recorder.state !== 'inactive') {
      recorder.stop();
      gumStream.getAudioTracks()[0].stop();
    }
  }

  function createDownloadLink(blob) {
    const url = URL.createObjectURL(blob);
    const au = document.createElement('audio');
    const li = document.createElement('li');
    const link = document.createElement('a');

    au.controls = true;
    au.src = url;

    link.href = url;
    link.download = `recording-${new Date().toISOString()}.${extension}`;
    link.textContent = `Download ${link.download}`;

    li.appendChild(au);
    li.appendChild(link);
    recordingsList.appendChild(li);
  }
</script>

<div class="flex justify-center">
  <Button
    className="!rounded-full !p-0 w-16 h-16 flex items-center justify-center"
    on:click={toggleRecording}
  >
    <Icon src={!isRecording ? Play : Pause} solid class="text-white size-10" />
  </Button>
</div>
