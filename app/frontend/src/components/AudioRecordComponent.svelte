<script>
    import RecordButton from "./RecordButton.svelte";
    import AudioFile from "./AudioFile.svelte";

    let audioFile;
    let extension;

    // Update recording explicitly when a new file is recorded
    function handleRecordingUpdate(event) {
        audioFile = event.detail.recording;
        extension = event.detail.extension;
    }
</script>


<h2 class="font-medium text-">Feedback</h2>
<textarea
        placeholder="Type here..."
        class="w-full p-2 bg-gray-800 rounded-lg resize-none min-h-32"
/>
<div class="flex flex-row">
    <RecordButton on:recording-change={handleRecordingUpdate}/>
    {#if audioFile}
        <AudioFile url="{audioFile}" extension="{extension}"/>
    {/if}
</div>

