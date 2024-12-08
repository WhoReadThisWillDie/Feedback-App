<script>
  import AssignmentCard from "../components/AssignmentCard.svelte";

  export let params;

  const assignments = [
    {
      id: 1,
      title: "Assignment 1",
      description: "This is the first assignment...",
    },
    {
      id: 2,
      title: "Assignment 2",
      description: "This is the second assignment...",
    },
    {
      id: 3,
      title: "Assignment 3",
      description: "This is the third assignment...",
    },
    {
      id: 4,
      title: "Assignment 4",
      description: "This is the fourth assignment...",
    },
    {
      id: 5,
      title: "Assignment 5",
      description: "This is the fifth assignment...",
    },
    {
      id: 6,
      title: "Assignment 6",
      description: "This is the sixth assignment...",
    },
  ];
</script>

<div class="flex flex-col grid-cols-2 gap-4 lg:grid text-textColor">
  {#each assignments as assignment}
    <AssignmentCard {assignment} />
  {/each}
</div>
