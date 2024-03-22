import db from '../database/db.js'
import path from 'path'
import fs from 'fs'
import { query } from 'express'









export const saveRoom=(req,res)=>{
    const room=req.body

      const image1 = req.files;
      const image={...image1}
//   const image2 = req.files['image1'];
//     const image3 = req.files['image2'];
//       const image4 = req.files['image3'];
let roomimg=[]
for(let singleimg in image){
    roomimg.push(image[singleimg][0].filename)
}
const { roomNumber, roomName, roomType, description, price, features, floor, rating, occupacy } = room;
const roomImageString=JSON.stringify(roomimg)
//   const roomTypeString = JSON.stringify(roomType);
  let roomtype=JSON.parse(roomType)
  let typeString='';
  roomtype.map(element => {
    typeString+=element.name
  });

  // Prepare the SQL query
  const query = `INSERT INTO rooms (roomNumber, roomName, roomType, roomImage, description , price, features, floor, rating, occupacy)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [roomNumber, roomName, typeString, roomImageString,description,  price, features, floor, rating, occupacy];

  // Execute the SQL query
  db.query(query, values, (error, results) => {
    if (error) {
      console.error('Error adding object to database:', error);
    } else {
      console.log('Object added to database:', results);
    }
  });

}
export const deleteRoom=(req,res)=>{

  const roomId =req.params.id
  let roomID=roomId.substring(1);

roomID=roomID.split(',')
console.log(roomID)
    const query='delete from rooms where id IN(?)'
    db.query(query,[roomID],(err,result)=>{
if(err){
  return res.status(500).json({error:'Error while deleting the room'})
}

    return res.status(200).json({message:'Room Deleted'})
    })
}
export const fetchAll=async (req,res)=>{
    const query='select * from rooms'
    db.query(query,(err,result)=>{
        res.status(200).json(result)
    })
}
export const fetchRoomData=()=>{}