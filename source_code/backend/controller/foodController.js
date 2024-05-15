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

  const foodId =req.params.id
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
export const availableFood=(req,res)=>{
const query = `SELECT * from foods`
db.query(query,(error , results)=>{
  if(error){
    res.status(403).json({error:'Internal Server error foods '})
  }
 return res.status(200).json({foods:results})
})
}

export const updateValue=(req,res)=>{
const {field,value,id} =req.body
console.log(field,value,id)
  const query=`update foods set ${field}=${value} where id=?`
  db.query(query,[id],(error,results)=>{
    if(error){
      return res.status(500).json({error:"Internal Server Error"})
    }
   return  res.status(200).json({message:'update Success'})
  })

}
export const fetchOwnFoodOrder =(req,res)=>{
 const query='SELECT id as orderId,f.foodName,f.price,f.id,f.foodImage,f.rating FROM  orders INNER JOIN foods f on foodId=f.id WHERE guestId=?'
 const {id}=req.body
 db.query(query,[id],(error,results)=>{
  if(error){
  return res.status(500).json({error:'Internal Server Error'})
  }
  return res.status(200).json({foods:results})
 })
}
export const saveOrder = (req, res) => {
  const { id, foodId, userSession } = req.body;
  console.log('104', id, foodId, userSession);

  // Assuming your table name is 'orders'
  const query = `INSERT INTO orders (guestId, foodId, sessionId) VALUES (?, ?, ?)`;

  db.query(query, [id, foodId, userSession], (error, result) => {
    if (error) {
      console.log('108 error', error);
      return res.status(500).json({ error: 'Internal Server Errors' });
    }
    return res.status(200).json({ message: 'Order is placed successfully' });
  });
};
export const fetchOrders =(req,res)=>{
  const query=`SELECT g.firstName,g.lastName,orders.date,
  f.foodName,f.foodImage, orders.orderId,orders.status 
  FROM orders 
  INNER JOIN guest g on orders.guestId=g.id 
  INNER JOIN foods f on orders.foodId=f.id`

  db.query(query,(error,results)=>{
    if(error){
      return res.status(500).json({error:'INternal Server Error'})
    }
    res.status(200).json({food:results})
  })


}
export const changeFoodStatus=(req,res)=>{
const data=req.body
  const query=`UPDATE  orders  SET status = ? WHERE orderId = ?`;
  db.query(query,[data.status,data.orderId],(error,results)=>{
    if(error){
      return res.status(500).json({error:'Internal Server Error While Updating Food Order'})
    }
    res.status(200).json({message:'Order Status Updated Successfully'})
  })
}