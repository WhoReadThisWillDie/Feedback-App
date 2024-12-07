<script>
  import AudioRecordComponent from "../components/AudioRecordComponent.svelte";

  export const audioTracks = [
    { url: 'https://sveltejs.github.io/assets/music/strauss.mp3', feedbackGiver: 'Eelco' },
  ];

</script>

  <div class="flex flex-col grid-cols-2 gap-8 lg:grid">
    <div class="flex flex-col gap-4">
      <AudioRecordComponent/>
    </div>
  </div>

