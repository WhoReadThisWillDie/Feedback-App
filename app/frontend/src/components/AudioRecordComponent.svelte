<script>
    import Button from "./Button.svelte";
    import RecordButton from "./RecordButton.svelte";
</script>


<h2 class="font-medium">Transcript feedback</h2>
<textarea
        placeholder="Type here..."
        class="w-full p-2 bg-gray-800 rounded-lg resize-none min-h-32"
/>
<RecordButton/>
<div class="flex justify-center">
    <Button>Submit</Button>
</div>
