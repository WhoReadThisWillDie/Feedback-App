<script>
    let isRecording = false;

    async function toggleRecording() {
        isRecording = !isRecording;
        if (isRecording) {
            // Start recording logic
        } else {
            // Stop recording logic
        }
    }
</script>

<div class="flex justify-center">
    <button class="rounded-full pt-4 w-24 h-24 text-white bg-blue-500 flex items-center justify-center"
            on:click={toggleRecording}>
        {#if isRecording}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3333 5.33333H8V26.6667H13.3333V5.33333Z" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M24 5.33333H18.6667V26.6667H24V5.33333Z" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        {:else}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1_193)">
                    <path d="M25.3334 13.3333V16C25.3334 18.4754 24.35 20.8493 22.5997 22.5997C20.8493 24.35 18.4754 25.3333 16 25.3333M16 25.3333C13.5247 25.3333 11.1507 24.35 9.40036 22.5997C7.65002 20.8493 6.66669 18.4754 6.66669 16V13.3333M16 25.3333V30.6667M10.6667 30.6667H21.3334M16 1.33334C14.9392 1.33334 13.9217 1.75476 13.1716 2.50491C12.4214 3.25505 12 4.27247 12 5.33334V16C12 17.0609 12.4214 18.0783 13.1716 18.8284C13.9217 19.5786 14.9392 20 16 20C17.0609 20 18.0783 19.5786 18.8284 18.8284C19.5786 18.0783 20 17.0609 20 16V5.33334C20 4.27247 19.5786 3.25505 18.8284 2.50491C18.0783 1.75476 17.0609 1.33334 16 1.33334Z" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                    <clipPath id="clip0_1_193">
                        <rect width="32" height="32" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        {/if}
    </button>
</div>
