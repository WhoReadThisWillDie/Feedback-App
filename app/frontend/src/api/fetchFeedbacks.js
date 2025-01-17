export async function fetchFeedbacks() {
    const response = await fetch("http://localhost:3000/feedbacks", {
        method: 'GET'
    })

    if (!response.ok) {
        console.error('Failed to fetch feedbacks: ', await response.text());
        return
    }

    return await response.json()
}