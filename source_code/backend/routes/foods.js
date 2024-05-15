import express from 'express'
import {saveFood,fetchAll,deleteFood,changeFoodStatus,fetchOrders,saveOrder ,fetchOwnFoodOrder,updateValue ,availableFood,fetchFoodData} from '../controller/foodController.js'
import multer from 'multer'
import path from 'path'
import upload from '../middleware/multerMidlware.js'
import { changeRoomStatus } from '../controller/roomController.js'
const router =express.Router();
router.post('/save',upload.fields([
  { name: 'image0', maxCount: 1 },
  { name: 'image1', maxCount: 2 },
  { name: 'image2', maxCount: 3 },
  { name: 'image3', maxCount: 4 }
]), saveFood)
router.get('/fetchall',fetchAll)
router.delete('/deletefood:id',deleteFood)
router.get('/foodData',fetchFoodData)
router.get('/availableFood',availableFood)
router.post('/updateValue',updateValue)
router.post('/fetchOwnFoodOrder',fetchOwnFoodOrder)
router.post('/saveOrder',saveOrder)
router.get('/fetchOrders',fetchOrders)
router.post('/changeFoodStatus',changeFoodStatus)

export default router;
