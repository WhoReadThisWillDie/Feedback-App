import * as feedbackQuery from "../db-query/database-feedback-query.js"
import fs from "fs";

//Uploads the audio file to the backend
export async function uploadAudio(req, res) {
    const {file, body} = req;

    if(!file && !body.transcript){
        return res.status(400).json({ error: "No file or transcript uploaded"});
    }

    const filePath = file ? file.path : null;
    const transcript = body.transcript || null;
    let audioFile= filePath ? fs.readFileSync(filePath) : null;

    try{
        const feedbackId = await feedbackQuery.insertFeedback(audioFile, filePath, transcript);
        res.status(201).json({ message: 'File uploaded and saved to database', id: feedbackId });
    } catch (error){
        res.status(500).json({ error: 'Failed to upload audio.' });
    }
}

//Returns all the feedbacks
export async function getAllFeedbacks(req, res) {
    try {
        const feedbacks = await feedbackQuery.getAllFeedbacks();
        const result = feedbacks.map(feedback => ({
            audioFilePath: feedback.audio_file_path ? `http://localhost:3000/static/${feedback.audio_file_path}` : null,
            transcript: feedback.transcript,
            createdAt: feedback.created_at,
        }))

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch feedbacks."})
    }
}
