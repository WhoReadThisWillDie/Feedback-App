<script>
    import AudioFile from "./AudioFile.svelte";

    let isVisible = false;

    function toggleVisibility() {
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
    <!-- List container -->
    <div class={`overflow-hidden transition-[max-height] duration-1000 ease-in-out ${ isVisible ? 'max-h-64' : 'max-h-0' }`}>
        <div class="w-full h-[1px] bg-gray-300 mt-1"></div>
        <ul class="mt-2 space-y-2 h-[200px] overflow-y-auto p-2">
            <!-- Item template -->
            <li class="p-2 text-textColor bg-gray-100 rounded-lg shadow-sm flex justify-between">
                <div class="mr-16">
                    <p class="ml-5 text-textColor">01.12.2025</p>
                    <AudioFile width="300" url="PLACE_URL_HERE"/>
                </div>
                <div class="mr-5">
                    <p class="text-textColor text-[15px] text-centert">This is a text from a transcription.
                        It is not connected tot the backend yet, but will soon.
                        This is just a demonstration of a list I created lol.
                        I don't know what else I can write it to make it longer so la-la-la-la-la-la</p>
                </div>
            </li>
            <li class="p-2 text-textColor bg-gray-100 rounded-lg shadow-sm flex justify-between">
                <div class="mr-16">
                    <p class="ml-5 text-textColor">01.12.2025</p>
                    <AudioFile width="300" url="PLACE_URL_HERE"/>
                </div>
                <div class="mr-5">
                    <p class="text-textColor text-[15px] text-centert">This is a text from a transcription.
                        It is not connected tot the backend yet, but will soon.
                        This is just a demonstration of a list I created lol.
                        I don't know what else I can write it to make it longer so la-la-la-la-la-la</p>
                </div>
            </li>
            <li class="p-2 text-textColor bg-gray-100 rounded-lg shadow-sm flex justify-between">
                <div class="mr-16">
                    <p class="ml-5 text-textColor">01.12.2025</p>
                    <AudioFile width="300" url="PLACE_URL_HERE"/>
                </div>
                <div class="mr-5">
                    <p class="text-textColor text-[15px] text-centert">This is a text from a transcription.
                        It is not connected tot the backend yet, but will soon.
                        This is just a demonstration of a list I created lol.
                        I don't know what else I can write it to make it longer so la-la-la-la-la-la</p>
                </div>
            </li>
            <li class="p-2 text-textColor bg-gray-100 rounded-lg shadow-sm flex justify-between">
                <div class="mr-16">
                    <p class="ml-5 text-textColor">01.12.2025</p>
                    <AudioFile width="300" url="PLACE_URL_HERE"/>
                </div>
                <div class="mr-5">
                    <p class="text-textColor text-[15px] text-centert">This is a text from a transcription.
                        It is not connected tot the backend yet, but will soon.
                        This is just a demonstration of a list I created lol.
                        I don't know what else I can write it to make it longer so la-la-la-la-la-la</p>
                </div>
            </li>
            <li class="p-2 text-textColor bg-gray-100 rounded-lg shadow-sm flex justify-between">
                <div class="mr-16">
                    <p class="ml-5 text-textColor">01.12.2025</p>
                    <AudioFile width="300" url="PLACE_URL_HERE"/>
                </div>
                <div class="mr-5">
                    <p class="text-textColor text-[15px] text-centert">This is a text from a transcription.
                        It is not connected tot the backend yet, but will soon.
                        This is just a demonstration of a list I created lol.
                        I don't know what else I can write it to make it longer so la-la-la-la-la-la</p>
                </div>
            </li>
        </ul>
    </div>
</div>
