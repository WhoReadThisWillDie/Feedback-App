import express from 'express';
import multer from 'multer';
import * as feedbackController from '../controllers/feedback-controller.js'

const router = express.Router();

//Directory to save recordings
const storage = multer.diskStorage({
    destination: './recordings/',
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({storage});

router.get("/", feedbackController.getAllFeedbacks);

router.get("/:id", feedbackController.getFeedbackById);

router.post("/", upload.single('audio'), feedbackController.uploadAudio);

router.put("/:id", feedbackController.editFeedbackById);

router.delete("/:id", feedbackController.deleteFeedbackById);

export default router;
