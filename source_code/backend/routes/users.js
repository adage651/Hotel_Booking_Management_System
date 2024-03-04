import express from 'express'
import {saveUser,fetchAll,deleteUser ,fetchUserData} from '../controller/userController.js'

const router =express.Router();

router.post('/save',saveUser)
router.get('/fetchall',fetchAll)
router.delete('/deleteuser:id',deleteUser)
router.get('/userdata',fetchUserData)

export default router;
