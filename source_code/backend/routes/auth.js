import  express from "express";
import {legal, login ,register} from '../controller/authController.js'
const router=express.Router();

router.post('/',login)
router.post('/register',register)
router.get('/legal',legal)
export default router;