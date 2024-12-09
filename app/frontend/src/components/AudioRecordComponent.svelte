<script>
    import Button from "./Button.svelte";
    import RecordButton from "./RecordButton.svelte";
    import AudioFile from "./AudioFile.svelte";

    let audioFile;
    let extension;

    // Update recording explicitly when a new file is recorded
    function handleRecordingUpdate(event) {
        audioFile = ''; // Reset before updating
        audioFile = event.detail.recording;
        extension = event.detail.extension;
    }
</script>

<div>
    {#if audioFile}
<!--        <audio controls class="mt-4">-->
<!--            <source src={audioFile} type={`audio/${extension}`}/>-->
<!--            Your browser does not support the audio element.-->
<!--        </audio>-->
        <AudioFile url="{audioFile}"/>
    {/if}
</div>
<h2 class="font-medium">Transcript feedback</h2>
<textarea
        placeholder="Type here..."
        class="w-full p-2 bg-gray-800 rounded-lg resize-none min-h-32"
/>
<RecordButton on:recording-change={handleRecordingUpdate}/>
