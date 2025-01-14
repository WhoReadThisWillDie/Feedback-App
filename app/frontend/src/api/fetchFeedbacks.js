export async function fetchFeedbacks() {
    const response = await fetch("http://localhost:3000/feedbacks", {
        method: 'GET'
    })

    return await response.json()
}