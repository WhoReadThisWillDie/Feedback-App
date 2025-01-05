import express from 'express';
import * as transcriptionController from "../controllers/transcription-controller.js"

const router = express.Router();

router.post("/", transcriptionController.postTranscription);

export default router;