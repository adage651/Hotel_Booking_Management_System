import express from "express";
import {create,getFeedback} from '../controller/feedbackController.js'
const router =express.Router();

router.post('/create',create);
router.get('/getFeedback',getFeedback);
export default router