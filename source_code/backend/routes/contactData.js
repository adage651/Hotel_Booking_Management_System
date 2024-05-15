import express from 'express'
import {contactData,sendMessage,getMessages} from '../controller/contactDataController.js'
const router = express.Router();
router.post('/contactData', contactData)
router.post('/sendMessage', sendMessage)
router.post('/getMessages', getMessages)

export default router;