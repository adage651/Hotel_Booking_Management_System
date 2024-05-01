import express from 'express'
import {contactData,sendMessage} from '../controller/contactDataController.js'
const router = express.Router();
router.post('/contactData', contactData)
router.post('/sendMessage', sendMessage)

export default router;