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

  const searchQuery = `
    SELECT *,
      CASE
        WHEN r.adult < ? THEN 'Insufficient adult count'
        WHEN r.children < ? THEN 'Insufficient children count'
      END AS failureReason
    FROM rooms r
    WHERE r.adult >= ?
      AND r.children >= ?
      AND r.id NOT IN (
        SELECT rv.roomId
        FROM reservation rv
        WHERE rv.checkinDate <= ?
          AND rv.checkoutDate >= ?
      )
  `;

  db.query(searchQuery, [adult, children, adult, children, checkoutDate, checkinDate], (error, result) => {
    if (error) {
      res.status(500).json({ error: true, message: 'Internal Server Error Occurred' });
    }

    result.sort((a, b) => {
      // Sort by fewer occupants first
      const aTotalOccupants = a.adult + a.children;
      const bTotalOccupants = b.adult + b.children;
      if (aTotalOccupants < bTotalOccupants) return -1;
      if (aTotalOccupants > bTotalOccupants) return 1;

      // Sort by roomType, placing user's desired roomType first
      if (a.roomType === userRoomType && b.roomType !== userRoomType) return -1;
      if (a.roomType !== userRoomType && b.roomType === userRoomType) return 1;

      // Sort by floor
      if (a.floor === userFloor && b.floor !== userFloor) return -1;
      if (a.floor !== userFloor && b.floor === userFloor) return 1;

      return 0;
    });

    if (result.length === 0) {
      return res.status(200).json({ rooms: null, noRoom: true });
    }

    res.status(200).json({ rooms: result, noRoom: false });
  });
}
export const reservedRoom = (req, res) => {
  const reservedQuery = `
    SELECT rv.checkinDate, rv.checkoutDate
    FROM reservation rv
    GROUP BY rv.checkinDate, rv.checkoutDate
    HAVING COUNT(DISTINCT rv.roomId) = (SELECT COUNT(*) FROM rooms);
  `;

  db.query(reservedQuery, (error, result) => {
    if (error) {
      res.status(500).json({ error: true, message: 'Internal Server Error Occurred' });
    }

    res.status(200).json(result);
  });
};
export const changeRoomStatus=(req,res)=>{
  const roomData=req.body
   try {
     db.query('UPDATE reservation SET status = ? WHERE id = ?', [roomData.status, roomData.reservationId]);

    console.log('Room status updated successfully.');
  } catch (error) {
    console.error('Error updating room status:', error);
  }
}

export const freeToday =(req,res)=>{
  const query = `SELECT r.*,
       (CASE WHEN MIN(res.checkinDate) IS NULL THEN 
                DATEDIFF(CURDATE(), MAX(res.checkoutDate)) + 1 
            ELSE 
                DATEDIFF(CURDATE(), MIN(res.checkinDate)) - 1 
       END) AS available_today
FROM rooms r
LEFT JOIN reservation res ON r.id = res.roomId
GROUP BY r.id
ORDER BY r.roomNumber;
`
db.query(query,(error,results)=>{
  if(error){
    return res.status(500).json({error:'Error fetching Rooms'})
  }
res.status(200).json({error:false,rooms:results})
})
}

//sgp_a0d7ccb4f752ea73_05a7cd8435b13be18720c1245bc3e0355d85eaa6
