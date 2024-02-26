import express from 'express'
import {guestPage} from '../controller/pagesController.js'

const router =express.Router();

router.get('/guesthome',guestPage)


export default router;