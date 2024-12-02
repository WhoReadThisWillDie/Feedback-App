import express from 'express';
import * as userController from '../controllers/user-controller.js'

const router = express.Router();

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.get("/:id/feedback", userController.getAllFeedbacksForUser)

router.post("/", userController.addUser);

router.put("/:id", userController.editUserById);

router.delete("/:id", userController.deleteUserById);

export default router;
