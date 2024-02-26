import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../database/db.js'

export  const login=(req,res) =>{
const {userName,password}=req.body

db.query('select * from account where userName=?',[userName],(error,results)=>{
if(error){
    console.log('Error while querying the database'+error)
return res.json({error:"Internal server error"})
}

if (results.length === 0) {
      return res.json({ error: 'Invalid username or password' });
    }

    const user = results[0];

    // Compare the provided password with the hashed password from the database
    bcrypt.compare(password, user.password, (bcryptError, isMatch) => {
      if (bcryptError) {
        console.error('Error while comparing passwords:', bcryptError);
        return res.json({ error: 'Internal server error' });
      }

      if (!isMatch) {
        return res.json({ error: 'Invalid username or password' });
      }


      // Generate a JWT token
      // const token = jwt.sign({ id : user.id }, 'amanualaddisujumasenessa', { expiresIn: '1h' });
      // Set the token as a cookie in the response
      // const cookiOpetions={
      //   expires:new Date(Date.now*60*60),
      //   httpOnly:true
      // }
  //     res.cookie('userToken', token, {maxAge: 900000,
  //   httpOnly: true,
  //   domain: 'localhost:3000',
  //   path: '/',
  // });




req.session.userId = user.id
return res.status(200).json({isLogin:true,user_type:user.user_type})
  //res.status(200).json({path:'/'})
})


})
}





export const register =(req,res)=>{
const user=req.body;
//res.status(200).json({message:req.body})
db.query('select * from guest where userName=?',[user.userName],(error,results)=>{
    if (error){
        console.log('error while quering the database'+error)
      return  res.status(500).json({error:'Internal server Error'})
    }
    if (results.length > 0) {
    return   res.status(409).json({ error: 'Username already exists' });
    }
//res.status(200).json({message:user})
   bcrypt.hash(user.password, 10, (bcryptError, hashedPassword) => {
      if (bcryptError) {
        console.error('Error while hashing password:', bcryptError);
       return  res.status(500).json({ error: 'Internal server error' });
      }

      // Insert the new user into the database
      db.query('insert into account (userName,emailAddress,password,user_type) values(?,?,?,?)',[user.userName,user.emailAddress,hashedPassword,'guest'],(error,results)=>{
         if (error) {
          console.error('Error while inserting user into account database:', error);
        return   res.status(500).json({ error: 'Internal server error while inserting the registerd user in the database' });
        }else {
          const account_id=results.insertId
          console.log(account_id)
db.query('insert into guest(account_id,userName,firstName,lastName,emailAddress) values(?,?,?,?,?)',[account_id,user.userName,user.firstName,user.lastName,user.emailAddress], (insertError) => {
        if (insertError) {
          console.error('Error while inserting user into the database:', insertError);
        return   res.status(500).json({ error: 'Internal server error while inserting the registerd user in the database' });
        }


        // Return a success message or redirect to a different route
    return    res.json({ message: 'Registration successful' });
   
})
}
})
     


   })
})
}
export const legal =(req,res) =>{
  if(req.session.userId)
  return res.status(200).json({valid:true,id:req.session.userId})
else 
return res.json({valid:false})
}