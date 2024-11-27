<script>
  import { Icon, Play, Pause } from "svelte-hero-icons";

  import Button from "./Button.svelte";

  let isRecording = false;

  const toggleRecording = () => {
    isRecording = !isRecording;
    if (isRecording) {
      // Start recording...
    } else {
      // Stop recording...
    }
  };
</script>

<div class="flex justify-center">
  <Button
    className="!rounded-full !p-0 w-16 h-16 flex items-center justify-center"
    on:click={toggleRecording}
  >
    <Icon src={!isRecording ? Play : Pause} solid class="text-white size-10" />
  </Button>
</div>
