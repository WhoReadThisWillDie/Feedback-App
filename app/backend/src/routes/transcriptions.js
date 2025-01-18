import express from 'express';
import * as transcriptionController from "../controllers/transcription-controller.js"
import {upload} from "../middleware/multer.js";

const router = express.Router();

router.post("/", upload.single('file'), transcriptionController.postTranscription);

export default router;