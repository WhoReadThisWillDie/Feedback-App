<script>
  import page from "page";

  import Button from "../components/Button.svelte";
  import RecordButton from "../components/RecordButton.svelte";
  import AudioRecordComponent from "../components/AudioRecordComponent.svelte";

  export let params;

  let assignment;
  const fetchAssignment = async () => {
    // Do something
    assignment = {
      title: `Assignment ${params.id} (from server)`,
      description: "This is the assignment...",
    };
  };
  fetchAssignment();
</script>

{#if assignment}
  <div class="flex flex-col grid-cols-2 gap-8 lg:grid">
    <div>
      <div>
        <h1 class="text-xl font-bold">{assignment.title}</h1>
        <p class="text-gray-400">{assignment.description}</p>
      </div>

      <Button className="mt-4" on:click={() => page("/")}>Go back</Button>
    </div>
    <div class="flex flex-col gap-4">
      <AudioRecordComponent/>
    </div>
  </div>
{/if}
