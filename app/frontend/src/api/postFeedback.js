export async function postFeedback(formedData) {
    const response = await fetch('http://localhost:3000/feedbacks', {
        method: 'POST',
        body: formedData
    });

    if (!response.ok) {
        console.error('Failed to upload audio file', await response.text());
        return false
    }

    return true;
}
