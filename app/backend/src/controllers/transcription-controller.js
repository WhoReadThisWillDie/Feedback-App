import {transcribeAudio} from "../audio-transcription.js";

export async function postTranscription(req, res) {
    const {file} = req;
    if (!file) {
        return res.status(400).json({error: "No file uploaded"});
    }

    try {
        const result = {
            transcript: await transcribeAudio(file.path)
        }
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}