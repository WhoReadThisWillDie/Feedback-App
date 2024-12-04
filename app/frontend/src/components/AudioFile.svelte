<script>
    import { Icon, Play, Pause } from "svelte-hero-icons";
    import Button from "./Button.svelte";

    export let url;
    let audioElement;
    let time = 0;
    let duration = 0;
    let paused = true;

    // Format time into mm:ss
    function format(time) {
        if (isNaN(time)) return "--:--";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }

    function togglePlay() {
        if (paused) {
            audioElement.play();
        } else {
            audioElement.pause();
        }
        paused = !paused;
    }

    function onTimeUpdate() {
        time = audioElement.currentTime;
    }

    function onLoadedMetadata() {
        duration = audioElement.duration;
    }

    function seek(e) {
        const { left, width } = e.currentTarget.getBoundingClientRect();
        const clickPosition = e.clientX - left;
        const percentage = clickPosition / width;
        audioElement.currentTime = percentage * duration;
    }
</script>

<div class="mb-4 w-[400px]">
    <audio bind:this={audioElement} src={url} on:timeupdate={onTimeUpdate} on:loadedmetadata={onLoadedMetadata}></audio>
    <div class="flex items-center gap-2 bg-gray-800 p-4 rounded-full gradient-before gradient-border h-12">
        <Button className="!rounded-full !p-0 w-9 h-9 flex items-center justify-center" on:click={togglePlay}>
            <Icon src={!paused ? Pause : Play} solid class="text-white size-6" />
        </Button>
        <!-- Progress Bar -->
        <div class="flex-1 h-2 bg-gray-300 rounded-full relative cursor-pointer" on:click={seek}>
            <div class="h-full bg-purple-500" style="width: {time / duration * 100}%;"></div>
        </div>

        <!-- Time Display -->
        <span class="text-xs">{format(time)} / {format(duration)}</span>
    </div>
</div>
