<script>
    import {fade} from 'svelte/transition';
</script>

<div transition:fade class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded shadow-lg text-center w-80 animate-fade-in">
        <h2 class="text-2xl font-bold gradient-text">FeedBack saved!</h2>
        <p class="text-gray-600 mt-2">We appreciate your desire to study.</p>
        <div class="w-12 h-12 gradient-linear rounded-full mt-4 mx-auto flex items-center justify-center animate-tick">
            <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
            >
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7 19.6 5.6z"/>
            </svg>
        </div>
    </div>
</div>

<style>
    .gradient-text {
        background: linear-gradient(90deg, #d60dc1, #4800ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .gradient-linear {
        background: linear-gradient(90deg, #d60dc1, #4800ff);
    }

    .animate-fade-in {
        animation: fade-in 0.5s ease-in-out;
    }

    .animate-tick {
        animation: tick 0.5s ease-in-out;
    }
    @keyframes fade-in {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    @keyframes tick {
        from {
            transform: scale(0);
        }
        to {
            transform: scale(1);
        }
    }
</style>
