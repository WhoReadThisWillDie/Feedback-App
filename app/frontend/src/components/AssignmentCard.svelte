<script>
  import page from "page";

  import Card from "./Card.svelte";
  import Button from "./Button.svelte";

  export let assignment;
</script>

<Card>
  <p class="text-lg font-medium text-textColor">{assignment.title}</p>
  <p class="text-gray-400">{assignment.description}</p>

  <Button
    className="mt-4"
    on:click={() => page(`/assignments/${assignment.id}`)}
  >
    Give feedback
  </Button>
</Card>
