import express from 'express';
import * as feedbackController from '../controllers/feedback-controller.js'
import {upload} from "../middleware/multer.js";

const router = express.Router();

router.get("/", feedbackController.getAllFeedbacks);

router.post("/", upload.single('audio'), feedbackController.uploadAudio);
// router.post("/video", upload.single('video'), feedbackController.uploadVideo);

export default router;
