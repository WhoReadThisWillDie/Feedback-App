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
<div class="fixed bottom-0 left-1/2 transform -translate-x-1/2 text-center p-4 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] bg-white shadow-lg rounded-t-lg">
    <!-- Button and line container -->
    <div class="flex flex-col items-center">
        <button class="text-lg text-textColor font-medium flex items-center justify-center gap-2"
                on:click={toggleVisibility}>
            My Feedbacks
            <span class={`transition-transform transform duration-500 ${ isVisible ? 'rotate-180' : 'rotate-0'}`}>▼</span>
        </button>
        <!-- Line under the button, visible only when isVisible is true -->
    </div>
    <!-- List container -->
    <div class={`overflow-hidden transition-[max-height] duration-1000 ease-in-out ${ isVisible ? 'max-h-64' : 'max-h-0' }`}>
        <div class="w-full h-[1px] bg-gray-300 mt-1"></div>
        <ul class="mt-2 space-y-2 h-[200px] overflow-y-auto p-2">
            {#await feedbacks}
                <p>Loading feedbacks...</p>
            {:then feedbackList}
                {#each feedbackList as feedback}
                    <!-- Item template -->
                    <li class="p-2 text-textColor bg-gray-100 rounded-lg shadow-sm flex flex-col md:flex-row justify-between">
                        <div class="mb-2 md:mb-0 md:mr-16">
                            <p class="text-sm text-textColor">{feedback.createdAt}</p>
                            {#if feedback.filePath}
                                {#if feedback.fileType === 'audio'}
                                    <AudioFile width="250" url="{feedback.filePath}"/>
                                {:else if feedback.fileType === 'video'}
                                    <video src={feedback.filePath} controls
                                           class="w-[15rem] h-[10rem] object-cover border-solid border-gray-50 rounded-md"></video>
                                {/if}
                            {/if}
                        </div>
                        <div class="mr-5 flex items-center">
                            {#if feedback.transcript}
                                <p class="text-textColor text-[15px] text-center">{feedback.transcript}</p>
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
