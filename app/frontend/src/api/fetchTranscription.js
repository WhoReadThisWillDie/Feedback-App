export const fetchTranscription = async (blob) => {
    const formData = new FormData()
    formData.append('audio', blob, 'recording.wav')

    const response = await fetch("http://localhost:3000/transcriptions", {
        method: 'POST',
        body: formData
    })

    const result = await response.json()
    return result.transcript
}
