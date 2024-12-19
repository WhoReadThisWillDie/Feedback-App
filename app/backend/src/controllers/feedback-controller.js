import * as feedbackQuery from "../db-query/database-feedback-query.js"

export async function uploadAudio(req, res) {
    const {file} = req;

    if(!file){
        return res.status(400).json({ error: "No file uploaded"});
    }

    const filePath = file.path;

    try{
        res.status(201).json({ message: 'File uploaded successfully.', filePath });
    } catch (error){
        res.status(500).json({ error: 'Failed to upload audio.' });
    }
}

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

export async function addFeedback(req, res) {
    const { audioFilePath, transcript } = req.body;
    if (!audioFilePath || !transcript) {
        return res.status(400).json({ error: "audioFilePath and transcript are required." });
    }

    try {
        const feedbackId = await feedbackQuery.createFeedback(audioFilePath, transcript);
        res.status(201).json({ message: "Feedback created successfully.", feedbackId });
    } catch (error) {
        res.status(500).json({ error: "Failed to create feedback." });
    }
}

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
