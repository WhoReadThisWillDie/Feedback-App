<script>
    import FormComponent from "../components/FormComponent.svelte";
    import FeedbackListComponent from "../components/FeedbackListComponent.svelte";
    import {fetchFeedbacks} from "../api/fetchFeedbacks.js";

    let feedbacks = []

    async function handleFeedbackSubmission() {
        feedbacks = await fetchFeedbacks();
    }
</script>

<div class="flex flex-col items-center justify-center">
    <div class="flex flex-col gap-4 w-2/3">
        <FormComponent on:submit-feedback={handleFeedbackSubmission}/>
        <FeedbackListComponent feedbacks={feedbacks}/>
    </div>
</div>
