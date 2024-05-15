import express from 'express'
import {saveRoom,fetchAll, freeToday,deleteRoom ,fetchRoomData,searchRoom,reservedRoom,changeRoomStatus} from '../controller/roomController.js'
import multer from 'multer'
import path from 'path'
import upload from '../middleware/multerMidlware.js'
const router =express.Router();
router.post('/save',upload.fields([
  { name: 'image0', maxCount: 1 },
  { name: 'image1', maxCount: 2 },
  { name: 'image2', maxCount: 3 },
  { name: 'image3', maxCount: 4 }
]), saveRoom)
router.post('/searchroom',searchRoom)
router.get('/fetchall',fetchAll)
router.delete('/deleteroom:id',deleteRoom)
router.get('/userdata',fetchRoomData)
router.get('/searchreservedroom',reservedRoom)
router.post('/changeRoomStatus',changeRoomStatus)
router.get('/freeToday',freeToday);
export default router;
