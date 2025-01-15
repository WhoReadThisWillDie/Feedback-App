<script>
    import AudioFile from "./AudioFile.svelte";
    import {fetchFeedbacks} from "../api/fetchFeedbacks.js";

    export let feedbacks = [];

    let isVisible = false;

    function toggleVisibility() {
        if (!isVisible && feedbacks.length === 0) feedbacks = fetchFeedbacks();
        isVisible = !isVisible;
    }
</script>
<div class="fixed bottom-0 left-1/2 transform -translate-x-1/2 text-center p-4 w-[90%] md:w-[55%]">
    <!-- Button and line container -->
    <div class="flex flex-col items-center">
        <button class="text-lg text-textColor font-medium flex items-center justify-center gap-2 mx-auto" on:click={toggleVisibility}>
            My Feedbacks
            <span class={`transition-transform transform duration-500 ${ isVisible ? 'rotate-180' : 'rotate-0'}`}>▼</span>
        </button>
        <!-- Line under the button, visible only when isVisible is true -->
    </div>
    <div class={`overflow-hidden transition-[max-height] duration-1000 ease-in-out ${ isVisible ? 'max-h-64' : 'max-h-0' }`}>
    <!-- List container -->
        <div class="w-full h-[1px] bg-gray-300 mt-1"></div>
        <ul class="mt-2 space-y-2 h-[200px] overflow-y-auto p-2">
            {#await feedbacks}
                <p>Loading feedbacks...</p>
            {:then feedbackList}
                {#each feedbackList as feedback}
                    <!-- Item template -->
                    <li class="p-2 text-textColor bg-gray-100 rounded-lg shadow-sm flex justify-between">
                        <div class="mr-16">
                            <p class="ml-5 text-textColor">{feedback.createdAt}</p>
                            {#if feedback.audioFilePath}
                                <AudioFile width="300" url="{feedback.audioFilePath}"/>
                            {/if}
                        </div>
                        <div class="mr-5 flex items-center">
                            {#if feedback.transcript}
                                <p class="text-textColor text-[15px] text-centert">{feedback.transcript}</p>
                            {/if}
                        </div>
                    </li>
                {/each}
            {:catch error}
                <p>Error: {error.message}</p>
            {/await}
        </ul>
    </div>
</div>
