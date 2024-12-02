import express from 'express';
import * as assignmentController from '../controllers/assignment-controller.js'

const router = express.Router();

router.get("/", assignmentController.getAllAssignments);

router.get("/:id", assignmentController.getAssignmentById);

router.get("/:id/feedback", assignmentController.getAllFeedbacksForAssignment);

router.post("/", assignmentController.addAssignment);

router.put("/:id", assignmentController.editAssignmentById);

router.post("/:id", assignmentController.deleteAssignmentById);

export default router;
