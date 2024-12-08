import express from 'express';
import * as feedbackController from '../controllers/feedback-controller.js'

const router = express.Router();

router.get("/", feedbackController.getAllFeedbacks);

router.get("/:id", feedbackController.getFeedbackById);

router.post("/", feedbackController.addFeedback);

router.put("/:id", feedbackController.editFeedbackById);

router.delete("/:id", feedbackController.deleteFeedbackById);

export default router;
