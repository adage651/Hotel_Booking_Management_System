import db from '../database/db.js'
import path from 'path'
import fs from 'fs'
import { query } from 'express'
import { error } from 'console'

export const createReservation = async(req, res) => {
  const {roomId,guestId,checkinDate,checkoutDate,withBreakfast,price,sessionId}=req.body
  const identificationCardPic = req.file;
  const checkConflictQuery = `SELECT COUNT(*) as count FROM reservation
    WHERE roomId = ? AND
    ((checkinDate <= ? AND checkoutDate > ?) OR
    (checkinDate < ? AND checkoutDate >= ?) OR
    (checkinDate >= ? AND checkoutDate <= ?));`;

  db.query(
    checkConflictQuery,
    [roomId, checkoutDate, checkinDate, checkinDate, checkoutDate, checkinDate, checkoutDate],
    (error, result) => {
      if (error) {
        console.log('Error checking for conflicting reservations', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      const count = result[0].count;

      if (count > 0) {
        console.log('Conflicting reservation exists');
        return res.status(400).json({ message: 'Room is already reserved during the specified date range' });
      }

      // If no conflicting reservations, proceed with creating the reservation
      const reservationQuery = `INSERT INTO reservation (roomId, guestId, checkinDate, checkoutDate, price, identificationCardPic,status,sessionId)
        VALUES (?, ?, ?, ?, ?, ?, ?,?);`;
      console.log(roomId, guestId, checkinDate, checkoutDate, price, identificationCardPic.filename,"CONFIRMED",sessionId)
      db.query(
        reservationQuery,
        [roomId, guestId, checkinDate, checkoutDate, price, identificationCardPic.filename,"CONFIRMED",sessionId],
        (error, result) => {
          if (error) {
            console.log('Reservation is not successful');
            return res.status(500).json({ message: 'Internal Server Error' });
          }
          return res.status(200).json({ message: 'Reservation Created Successfully' });
        }
      );
    }
  );
}

export const fetchAll=(req,res)=>{
const quryString=`select rv.id,r.roomNumber,g.firstName,g.lastName,rv.identificationCardPic,rv.checkinDate,rv.checkoutDate ,rv.status
from reservation rv ,guest g,rooms r 
where rv.guestId=g.id and rv.roomId=r.id `
db.query(quryString,[],(error,result)=>{
  if(error){
  return  res.status(500).json({message:'there is an eror while get the reservations'})
  }
  return res.status(200).json(result)
})
}
export const changeStatus=(req,res)=>{
  console.log(req.body)
  const query=`UPDATE reservation SET status=? WHERE id=?`
  db.query(query,[req.body.status,req.body.id],(error,result)=>{
    if(error){
    return  res.status(500).json({message:'there is an error while changing the status',error:true})
    }
    return res.status(200).json({error:false,data:result})
  })
}



export const fetchAllForCheckout=(req,res)=>{
  const query=`
  SELECT rv.id, r.roomNumber, g.firstName, g.lastName, rv.identificationCardPic, rv.checkinDate, rv.checkoutDate,
  rv.status AS reservationStatus,
  COALESCE(mc.status, 'UNQUALIFIED') AS managecheckoutStatus,
  s.id AS staffId, s.userName, s.profilePicture
FROM reservation rv
INNER JOIN guest g ON rv.guestId = g.id
INNER JOIN rooms r ON rv.roomId = r.id
LEFT JOIN managecheckout mc ON rv.id = mc.reservationId
LEFT JOIN staff s ON mc.staffId = s.id;
`
/*
SELECT rv.id, r.roomNumber, g.firstName, g.lastName, rv.identificationCardPic, rv.checkinDate, rv.checkoutDate,
  rv.status AS reservationStatus,
  COALESCE(mc.status, 'UNQUALIFIED') AS managecheckoutStatus,
  s.id AS staffId, s.userName, s.profilePicture
FROM reservation rv
INNER JOIN guest g ON rv.guestId = g.id
INNER JOIN rooms r ON rv.roomId = r.id
INNER JOIN managecheckout mc ON rv.id = mc.reservationId
INNER JOIN staff s ON mc.staffId = s.id;

*/
db.query(query,[],(error,result)=>{
  if(error){
  return  res.status(500).json({message:'there is an error while geting the reservations',error:true})
  }
  return res.status(200).json({error:false,data:result})
})
}
export const checkoutStaffTable=(req,res)=>{
  const id = req.body
  console.log('65',id)
  const query =` SELECT rv.id, r.roomNumber, g.firstName, g.lastName, rv.identificationCardPic, rv.checkinDate, rv.checkoutDate, mc.status
FROM managecheckout mc
INNER JOIN reservation rv ON mc.reservationId = rv.id
INNER JOIN guest g ON rv.guestId = g.id
INNER JOIN rooms r ON rv.roomId = r.id
WHERE mc.staffId = ?`

db.query(query,[id.id],(error,result)=>{
  if(error){
  return  res.status(500).json({message:'there is an eror while get the reservations'})
  }
  return res.status(200).json(result)
})
}

export const staffStatusChange=(req,res)=>{
  const data=req.body
  console.log('77',data.rowData)
  const query =`update managecheckout set status =? where reservationId =? and staffId =?`;
  db.query(query,[data.rowData.status,data.rowData.reservationId,data.staffId],(error,result)=>{
    if(error){
    return  res.status(500).json({message:'there is an eror while get the reservations',error:true})
    }
    console.log('88',result)
    return res.status(200).json({error:false,message:'Status changed'})
  })
}






export const staffCheckout = async (req, res) => {
  const quryString=`insert into managecheckout(staffId,reservarionId) VALUES (?,?)`;
  db.query(quryString,[req.body.guestId,req.body.reservationId,req.body.status],(error,result)=>{
    if(error){
    return  res.status(500).json({message:'there is an eror while get the reservations'})
    }
    return res.status(200).json(result)
  })
}
export const qualifyGuest =(req,res)=>{

}


export const fetchUsersReservation = async (req,res) =>{
  const data=req.body
  console.log('158',req.body)
  const query = 'SELECT rooms.roomName, rv.id as reservationId, rooms.roomImage, rv.status, rooms.price,rooms.id,rooms.roomNumber, rv.checkinDate FROM rooms INNER JOIN reservation rv ON rooms.id = rv.roomID WHERE rv.guestId=?'
db.query(query,[data.id],(error,results)=>{
  return res.status(200).json({selectedRoom:results})
})

}
export const getReservation=(req,res)=>{
const query=`SELECT g.firstName,g.lastName,g.profilePicture,
            rv.checkinDate,rv.checkoutDate,r.adult + r.children AS numberOfPeople,
            r.roomImage,r.price ,rv.id
            FROM reservation rv 
            INNER JOIN rooms r ON rv.roomId = r.id
            INNER JOIN guest g ON rv.guestId = g.id       
`
db.query(query,(error,results)=>{
if(error){
  return res.status(500).json({error:'Internal Server Error while fetching the reservations'})

}
return res.status(200).json({reservation:results})

})
}

export const report = (req,res) =>{
  const query=`WITH reservation_counts AS (
  SELECT
    COUNT(*) AS totalNumOfReservation,
    SUM(CASE WHEN status = 'Checked In' THEN 1 ELSE 0 END) AS checkedIn,
    SUM(CASE WHEN status = 'Checked Out' THEN 1 ELSE 0 END) AS checkedOut,
    SUM(CASE WHEN status = 'CONFIRMED' THEN 1 ELSE 0 END) AS confirmed
  FROM reservation
)
SELECT * FROM reservation_counts;
`
db.query(query,(error,results)=>{
  if(error){
    return res.status(500).json({error:'Error Internal Server Error'})
  }
  return res.status(200).json({data:results})
})
}