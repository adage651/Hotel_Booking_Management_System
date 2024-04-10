import db from '../database/db.js'
import path from 'path'
import fs from 'fs'
import { query } from 'express'
import { error } from 'console'

export const createReservation = async(req, res) => {
  const {roomId,guestId,checkinDate,checkoutDate,withBreakfast,price}=req.body
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
      const reservationQuery = `INSERT INTO reservation (roomId, guestId, checkinDate, checkoutDate, 	withBreackfast, price, identificationCardPic)
        VALUES (?, ?, ?, ?, ?, ?, ?);`;
      console.log(roomId, guestId, checkinDate, checkoutDate, withBreakfast, price, identificationCardPic.filename)
      db.query(
        reservationQuery,
        [roomId, guestId, checkinDate, checkoutDate, withBreakfast, price, identificationCardPic.filename],
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
const quryString=`select rv.id,r.roomNumber,g.firstName,g.lastName,rv.identificationCardPic,rv.checkinDate,rv.checkoutDate
from reservation rv ,guest g,rooms r 
where rv.guestId=g.id and rv.roomId=r.id `
db.query(quryString,[],(error,result)=>{
  if(error){
  return  res.status(500).json({message:'there is an eror while get the reservations'})
  }
  return res.status(200).json(result)
})
}