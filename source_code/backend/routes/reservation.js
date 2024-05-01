import express from 'express'
import multer from 'multer';
import {createReservation,changeStatus,fetchAll,staffCheckout,qualifyGuest,checkoutStaffTable,staffStatusChange,fetchAllForCheckout} from '../controller/reservationController.js'
import upload from '../middleware/multerMidlware.js';
const router =express.Router();


router.post('/create',  upload.single('identificationCardPic'), createReservation);
router.get('/fetchall',fetchAll)
router.post('/staffcheckout',staffCheckout)
router.get('/qualifyguest',qualifyGuest)
router.post('/checkoutStaffTable',checkoutStaffTable)
router.patch('/staffStatusChange',staffStatusChange)
router.get('/fetchAllForCheckout',fetchAllForCheckout)
router.post('/changeStatus',changeStatus)
export default router;