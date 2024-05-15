import express from 'express'
import {saveUser,getUser,
    fetchAll,resetPassword,handleForgot,deleteUser,
    updateUser ,fetchUserData,
    getNotifications,setNotifications} from '../controller/userController.js'

const router =express.Router();

router.post('/save',saveUser)
router.get('/fetchall',fetchAll)
router.delete('/deleteuser:id',deleteUser)
router.get('/userdata',fetchUserData)

router.post('/updateUser',updateUser)
router.post('/getNotifications',getNotifications)
router.post('/setNotifications',setNotifications)
router.post('/forgot',handleForgot)
router.post('/resetPassword',resetPassword)
router.post('/getUser',getUser)
router.get('/logout',(req,res)=>{
    const {userId}=req.body
    if(req.session.user){
        req.session.user=null
        
    };
    res.status(200).json({logout:true})
})

export default router;

