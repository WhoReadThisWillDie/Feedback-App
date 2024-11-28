<script>
  import page from "page";

  import Button from "../components/Button.svelte";
  import RecordButton from "../components/RecordButton.svelte";
  import AssigmentComponent from "../components/AssigmentTextBox.svelte";

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
        <AssigmentComponent/>
      </div>

      <Button className="mt-4" on:click={() => page("/")}>Go back</Button>
    </div>

    <div class="flex flex-col gap-4">
      <h2 class="font-medium">Transcript feedback</h2>
      <textarea
        placeholder="Type here..."
        class="w-full p-2 bg-gray-800 rounded-lg resize-none min-h-32"
      />
      <RecordButton />
      <div class="flex justify-center">
        <Button>Submit</Button>
      </div>
    </div>
  </div>
{/if}
