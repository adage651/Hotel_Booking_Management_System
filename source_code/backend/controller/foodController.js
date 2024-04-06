import db from '../database/db.js'
import path from 'path'
import fs from 'fs'
import { query } from 'express'









export const saveFood=(req,res)=>{
    const room=req.body

      const image1 = req.files;
      const image={...image1}
//   const image2 = req.files['image1'];
//     const image3 = req.files['image2'];
//       const image4 = req.files['image3'];
let foodimg=[]
for(let singleimg in image){
    foodimg.push(image[singleimg][0].filename)
}
const { foodName, description, price, rating } = room;
const foodImagString=JSON.stringify(foodimg)
//   const roomTypeString = JSON.stringify(roomType);
  // Prepare the SQL query
  const query = `INSERT INTO foods (foodName, foodImage, description , price,rating)
                 VALUES (?, ?, ?, ?, ?)`;
  const values = [foodName, foodImagString,description,  price, 0];

  // Execute the SQL query
  db.query(query, values, (error, results) => {
    if (error) {
      console.error('Error adding object to database:', error);
    } else {
      console.log('Object added to database:', results);
    }
  });

}
export const deleteFood=(req,res)=>{

  const roomId =req.params.id
  let foodID=foodId.substring(1);

foodID=foodID.split(',')
console.log(foodID)
    const query='delete from foods where id IN(?)'
    db.query(query,[foodID],(err,result)=>{
if(err){
  return res.status(500).json({error:'Error while deleting the room'})
}

    return res.status(200).json({message:'Food Deleted'})
    })
}
export const fetchAll=async (req,res)=>{
    const query='select * from foods'
    db.query(query,(err,result)=>{
        if (err){
            res.status(500).json("Server Error")
        }
        res.status(200).json(result)
    })
}
export const fetchFoodData=()=>{}