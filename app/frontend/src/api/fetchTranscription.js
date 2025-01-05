export const fetchTranscription = async () => {
    const response = await fetch("http://localhost:3000/feedbacks");
    return await response.json();
}
