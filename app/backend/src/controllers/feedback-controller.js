import * as feedbackQuery from "../db-query/database-feedback-query.js"
import path from "path";

//Uploads the audio file to the backend
export async function uploadAudio(req, res) {
    const {file, body} = req;

    if(!file && !body.transcript){
        return res.status(400).json({ error: "No file or transcript uploaded"});
    }

    // This can either be absolute or not. I think it's best to not be absolute, but might as well ask the team.
    const filePath = file ? path.resolve(file.path) : null;
    const transcript = body.transcript || null;


    try{
        const feedbackId = await feedbackQuery.insertFeedback(filePath, transcript);
        res.status(201).json({ message: 'File uploaded and saved to database', id: feedbackId });
    } catch (error){
        res.status(500).json({ error: 'Failed to upload audio.' });
    }
}

//Returns all the feedbacks
export async function getAllFeedbacks(req, res) {
    try {
        const feedbacks = await feedbackQuery.getAllFeedback();
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch feedbacks."})
    }
}

export async function getFeedbackById(req, res) {
    const {id} = req.params;
    try {
        const feedback = await feedbackQuery.getFeedbackById(id);
        if(feedback){
            res.status(200).json(feedback);
        } else {
            res.status(404).json({ error: "Feedback not found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch feedback."})
    }
}

//Adds a new feedback
export async function addFeedback(req, res) {
    if (req.body.audioFilePath && req.body.transcript) {
        const queryResult = await feedbackQuery.addFeedback(req.body.audioFilePath, req.body.transcript);
        // const queryResult = 1
        if (queryResult) {
            console.log("It worked!");
            return res.status(201).json({message: "Feedback added successfully."});
        }

        console.log("It didn't work.")
        return res.status(500).json({error: "Failed to add feedback."})
    }

    console.log("It really screwed up.");
    res.status(400).json({error: "audioFilePath and transcript are required."});
}

//Edit an existing feedback
export async function editFeedbackById(req, res) {
    const { id } = req.params;
    const { audioFilePath, transcript } = req.body;

    if (!audioFilePath || !transcript) {
        return res.status(400).json({ error: "audioFilePath and transcript are required." });
    }

    try {
        const updated = await feedbackQuery.updateFeedback(id, audioFilePath, transcript);
        if (updated) {
            res.status(200).json({ message: "Feedback updated successfully." });
        } else {
            res.status(404).json({ error: "Feedback not found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to update feedback." });
    }
}

//Delete a feedback by id
export async function deleteFeedbackById(req, res) {
    const { id } = req.params;

    try {
        const deleted = await feedbackQuery.deleteFeedback(id);
        if (deleted) {
            res.status(200).json({ message: "Feedback deleted successfully." });
        } else {
            res.status(404).json({ error: "Feedback not found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete feedback." });
    }
}
