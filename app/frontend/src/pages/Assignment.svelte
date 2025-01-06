<script>
  import AudioRecordComponent from "../components/AudioRecordComponent.svelte";
  import VideoRecordingComponent from "../components/video-recording/VideoRecordingComponent.svelte";

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

  export const audioTracks = [
    { url: 'https://sveltejs.github.io/assets/music/strauss.mp3', feedbackGiver: 'Eelco' },
  ];

</script>

<div class="flex flex-col items-center justify-center">
  <div class="flex flex-col gap-4 w-2/3 max-w-3xl">
    <VideoRecordingComponent />
  </div>
</div>
