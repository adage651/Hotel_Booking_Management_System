import express from 'express'
import {user} from '../controller/pagesController.js'

const router =express.Router();

router.get('/',user)


export default router;