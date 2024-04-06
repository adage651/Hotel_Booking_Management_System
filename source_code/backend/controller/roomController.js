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
console.log(room)
const { roomNumber, roomName, roomType, description, price, features, floor, rating, occupacy,adult,children,area } = room;
const roomImageString=JSON.stringify(roomimg)
//   const roomTypeString = JSON.stringify(roomType);
  let roomtype=JSON.parse(roomType)
  let typeString='';
  roomtype.map(element => {
    typeString+=element.name
  });

  // Prepare the SQL query
  const query = `INSERT INTO rooms (roomNumber, roomName, roomType, roomImage, description , price, features, floor, rating, occupacy,adult,children,area)  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)`;
  const values = [roomNumber, roomName, typeString, roomImageString,description,  price, features, floor, rating, occupacy,adult,children,area];

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




export const searchRoom=(req,res)=>{
  const search = req.body
  const {adult,children,date,userFloor,userRoomType} = search
 const [checkinDate,checkoutDate]=date

const searchQuery=`SELECT *,
       CASE
           WHEN r.adult < ? THEN 'Insufficient adult count'
           WHEN r.children < ? THEN 'Insufficient children count'
       END AS failureReason
FROM rooms r
WHERE r.adult >= ?
  AND r.children >= ?
  AND NOT EXISTS (
    SELECT 1
    FROM reservation rv
    WHERE rv.roomId = r.id
      AND rv.checkinDate <= ? 
      AND rv.checkoutDate >= ? 
  );`
  db.query(searchQuery,[adult,children,adult,children,checkinDate,checkoutDate],(error,result)=>{
    if(error){
      res.status(500).json({error:true,message:"Internal Server Error Occured"})
    }
 result.sort((a, b) => {
//    fewer occupants first 
      const aTotalOccupants = a.adult + a.children;
      const bTotalOccupants = b.adult + b.children;
      if (aTotalOccupants < bTotalOccupants) return -1;
      if (aTotalOccupants > bTotalOccupants) return 1;
// and then room type Sort by roomType, placing user's desired roomType first
      if (a.roomType === userRoomType && b.roomType !== userRoomType) return -1;
      if (a.roomType !== userRoomType && b.roomType === userRoomType) return 1;
//      and then floor
      if (a.floor === userFloor && b.floor !== userFloor) return -1;
      if (a.floor !== userFloor && b.floor === userFloor) return 1;

      return 0;
    });

if (result.length ===0){
  return res.status(200).json({rooms:null , noRoom:true})

}

 res.status(200).json({rooms:result,noRoom:false})

  })
}
export const reservedRoom=(req,res)=>{
  const reservedQuery=`SELECT rv.checkinDate, rv.checkoutDate
FROM reservation rv
GROUP BY rv.checkinDate, rv.checkoutDate
HAVING COUNT(DISTINCT rv.roomId) = (SELECT COUNT(*) FROM rooms);`
  db.query(reservedQuery,(err,result)=>{
    res.status(200).json(result)
  })


}