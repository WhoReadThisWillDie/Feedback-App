<script>
    import RecordButton from "../RecordButton.svelte";
    import AudioFile from "../AudioFile.svelte";
    import { fade } from 'svelte/transition';
    import VideoRecordButton from "./VideoRecordButton.svelte";

    let audioFile;
    let extension;
    // TESTING PURPOSE. In future use this variable to store text that you get from the backend
    let textFromTranscription = "The birch canoe slid on the smooth planks.\n" +
        "Glue the sheet to the dark blue background.\n" +
        "It's easy to tell the depth of a well.\n" +
        "These days a chicken leg is a rare dish.\n" +
        "Rice is often served in round bowls.\n" +
        "The juice of lemons makes fine punch.\n" +
        "The box was thrown beside the parked truck.\n" +
        "The hogs were fed chopped corn and garbage.\n" +
        "Four hours of steady work faced us.\n" +
        "A large size in stockings is hard to sell.";
    let textToAnimate = "";
    let currentWordIndex = 0;
    let typeWord = () => {
        if (currentWordIndex < textFromTranscription.length) {
            textToAnimate += (currentWordIndex === 0 ? "" : "") + textFromTranscription[currentWordIndex];
            currentWordIndex++;
            setTimeout(typeWord, 20);
        }
    };
    typeWord();

    // Update recording explicitly when a new file is recorded
    function handleRecordingUpdate(event) {
        audioFile = event.detail.recording;
        extension = event.detail.extension;
    }
</script>


<h2 class="font-medium text-textColor">Feedback</h2>
<textarea
        transition:fade
        bind:value={textToAnimate}
        placeholder="Type here..."
        class="text-textColor w-full p-2 bg-white rounded-lg resize-none min-h-32 border border-gray-150 border-2"
/>
<div class="flex flex-row">
    <VideoRecordButton on:recording-change={handleRecordingUpdate}/>
    {#if audioFile}
        <AudioFile url="{audioFile}" extension="{extension}"/>
    {/if}
</div>
