import {transcribeAudio} from "../audio-transcription.js";

export async function postTranscription(req, res) {
    if (!req.body.audioFilePath) {
        return res.status(400).json({error: "audioFilePath is required."});
    }

    try {
        const result = {
            transcript: await transcribeAudio(req.body.audioFilePath)
        }
        return res.status(200).json(result);
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error.message})
    }
}