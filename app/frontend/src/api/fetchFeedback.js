export async function fetchFeedback(formedData) {
    try {
        const response = await fetch('http://localhost:3000/feedbacks', {
            method: 'POST',
            body: formedData
        });

        if (response.ok) {
            showSuccessBox()
        } else {
            console.error('Failed to upload audio file', await response.text());
        }

    } catch (error) {
        console.error('Failed to upload audio file', error);
    }
}
