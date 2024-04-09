import express from 'express'
import multer from 'multer';


import {createReservation } from '../controller/reservationController.js'
import upload from '../middleware/multerMidlware.js';
const router =express.Router();


router.post('/create',  upload.single('identificationCardPic'), createReservation);

export default router;