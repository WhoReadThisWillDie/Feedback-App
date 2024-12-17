import * as feedbackQuery from "../db-query/database-feedback-query.js"
import {transcribeAudio} from "../audioTranscription.js";

export async function getAllFeedbacks(req, res) {
    try {
        const feedbacks = await feedbackQuery.getAllFeedback();
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({error: "Failed to fetch feedbacks."})
    }
}

export async function getFeedbackById(req, res) {
    const {id} = req.params;
    try {
        const feedback = await feedbackQuery.getFeedbackById(id);
        if (feedback) {
            res.status(200).json(feedback);
        } else {
            res.status(404).json({error: "Feedback not found."});
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch feedback."})
    }
}

export async function addFeedback(req, res) {
    if (req.body.audioFilePath && !req.body.transcript) {
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

    if (req.body.audioFilePath && req.body.transcript) {
        // const queryResult = await feedbackQuery.addFeedback(req.body.audioFilePath, req.body.transcript);
        const queryResult = 1
        if (queryResult) {
            return res.status(201).json({message: "Feedback added successfully."});
        }

        return res.status(500).json({error: "Failed to add feedback."})
    }

    res.status(400).json({error: "audioFilePath and transcript are required."});
}

export async function editFeedbackById(req, res) {
    const {id} = req.params;
    const {audioFilePath, transcript} = req.body;

    if (!audioFilePath || !transcript) {
        return res.status(400).json({error: "audioFilePath and transcript are required."});
    }

    try {
        const updated = await feedbackQuery.updateFeedback(id, audioFilePath, transcript);
        if (updated) {
            res.status(200).json({message: "Feedback updated successfully."});
        } else {
            res.status(404).json({error: "Feedback not found."});
        }
    } catch (error) {
        res.status(500).json({error: "Failed to update feedback."});
    }
}

export async function deleteFeedbackById(req, res) {
    const {id} = req.params;

    try {
        const deleted = await feedbackQuery.deleteFeedback(id);
        if (deleted) {
            res.status(200).json({message: "Feedback deleted successfully."});
        } else {
            res.status(404).json({error: "Feedback not found."});
        }
    } catch (error) {
        res.status(500).json({error: "Failed to delete feedback."});
    }
}
