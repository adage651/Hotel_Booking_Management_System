import express from 'express'
import path from 'path';    
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router=express.Router();

router.get('/:imageName',(req,res)=>{
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, '../public/uploads', imageName);
  console.log('the request accepted...')
  res.sendFile(imagePath);
})
export default router