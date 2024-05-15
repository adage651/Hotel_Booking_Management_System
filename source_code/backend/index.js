import express, { query } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import path from 'path'

import cookieParser from 'cookie-parser'
import session from 'express-session'
import { fileURLToPath } from 'url';
import {createServer} from 'http'
import { Server } from 'socket.io';
import db from './database/db.js'
import moment from 'moment'
import cron from 'node-cron'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app=express()




app.use(cors({ origin: true,
  methods: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
  allowedHeaders: 'Content-Type,Authorization',
 credentials: true 
}));



 app.options('*', cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(
  session({
    key:'userID',
    secret: 'amanualaddisujumasenessa',
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge:100000*60*60,
      // domain: true,
    //  path: '/; SameSite=None', // Adjust the SameSite option as needed
      secure: false, // Set to true if using HTTPS
    },
  })
);


app.use(cookieParser())
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

const publicFolderPath = path.join(__dirname, 'public');
app.use(express.static(publicFolderPath));

import auth from './routes/auth.js'
import landing from './routes/landing.js'
import pages from './routes/pages.js'
import users from './routes/users.js'
import rooms from './routes/rooms.js'
import images from './routes/images.js'
import upload from './middleware/multerMidlware.js'
import foods from './routes/foods.js';
import feedback from './routes/feedback.js'
import processPayment from './routes/processPayment.js';
import reservation from './routes/reservation.js';
import contactData from './routes/contactData.js';
import { debuglog } from 'util'



app.use('/public/uploads',images)
app.use('/pages',pages)


app.use('/auth',auth)
app.use('/users',users)
app.use('/rooms',rooms)
app.use('/foods',foods)
app.use('/payment',processPayment)
app.use('/reservation',reservation)
app.use('/contact',contactData)
app.use('/feedback',feedback)

// Assuming you have the username stored in a variable called 'username'


let userSockets = []; 
const onlineUsers= new Set();
const server=createServer(app)
const io = new Server(server,{cors: {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }})

io.on('connection', (socket) => {


socket.on('userName', (username) => {
    socket.data.username = username[0];
    console.warn(`Connected User is ${username[0]}`)
  const checkIfUserONline=userSockets.find(sockets=>{
    // console.log('104',sockets)
    if(sockets===undefined){}
    else{
    if(sockets.userName===username[0]){
    return sockets;
    }
  }
  })
  if (!checkIfUserONline){
 userSockets.push({userName:username[0],userType:username[1],socket:socket.server})
    io.emit('newUserAdd',username)    
}

  })
//  userSockets.set(username[0], socket);


  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.data.username);
    io.emit('userLeft',socket.data.username)
   onlineUsers.delete(socket.data.username);
  //  userSockets=userSockets.map(oneSocket=>{
  //   console.log('123',oneSocket)
  //   if(oneSocket.userName!==socket.data.username) return oneSocket;
  //  })
  });


socket.on('sendMessage', (message) => {
  const username = socket.data.username;
  // const userSocket = userSockets.get(username);
  const userSocket=userSockets.map(sockets=>{
    if(sockets.userName===username) return sockets;
  })
  if (userSocket) {
    userSocket.emit('newMessage', 'onlineUsers');
  } else {
    // Handle the case when the user is not found or disconnected
  }
});
socket.on('acceptCheckout',userRoom=>{

 const receptionsitSockets= userSockets.filter(receptSocket=>{
    if(receptSocket.userType==='receptionist') return receptSocket;
  })
  receptionsitSockets.forEach(receptSocket=>{
    console.log('user wants to checkout',userRoom)
    receptSocket.socket.emit('userWantsToLeave',userRoom)
  })

})
socket.on('message', (getMessage) => { 
  const {sender,receiver,message} = JSON.parse(getMessage);
  const userSocket = userSockets.find(sockets=>{
    if(sockets.userName===receiver) return sockets;
  })
  if (userSocket) {
    userSocket.socket.emit('newMessage', JSON.stringify({sender,message}));
  } else {
    // Handle the case when the user is not found or disconnected
    console.log('user not found')
  }
})

socket.on('wantToCheckout',(userRoom)=>{
   const receptionsitSockets= userSockets.filter(receptSocket=>{
    if(receptSocket.userType==='receptionist') return receptSocket;
  })
  receptionsitSockets.forEach(receptSocket=>{
    console.log('user wants to checkout',userRoom)
    receptSocket.socket.emit('userWantsToLeave',JSON.stringify(userRoom))
  })
})
socket.on('getOnlineStaff',(userName)=>{
  console.log('receptionist request for online staff accepted from ',userName)
  const staffSockets= userSockets.filter(staffSocket=>{
    if(staffSocket.userType==='staff'){ 
    console.log(staffSocket)
  return staffSocket;
}
  })
  let queryResults = [];  
const queryFunc = async () => {
const queryPromises = staffSockets.map(staffSocket => {
  const query = 'SELECT id, userName, profilePicture FROM staff WHERE userName = ?';
   return new Promise((resolve, reject) => {
    db.query(query, [staffSocket.userName], (err, result) => {
      if (err) return;//reject(err);
      resolve(result[0]);
console.log('result',result[0])
      queryResults.push(result[0]);
return result[0];
    });
   });
});
const staffDataArray = await Promise.all(queryPromises);
return staffDataArray

  }
const staffDataArray=  queryFunc();
console.log('queryResults',queryResults)
userSockets.forEach(usersocketed=>{
if(usersocketed.userName===userName.userName) {
  console.log('sending online staff',staffDataArray)
  staffDataArray.then(staffData=>{
    console.log('staffData',staffData)
    usersocketed.socket.emit('onlineStaff',staffData)
})
}
})


})

socket.on('staffToManageRoom',staffRoom=>{
  console.log('staff wants to manage room',staffRoom)
  const roomDetail=JSON.parse(staffRoom.staffRoom);
  const query = 'select id from reservation where roomId =? and guestId =?';
  db.query(query,[roomDetail.roomId,roomDetail.guestId],(err,result)=>{
    if(err) return;
    
    console.log('204 result',result[0])

    const queryToSetStaffManage=`insert into managecheckout(staffId,reservationId) VALUES (?,?)`
    db.query(queryToSetStaffManage,[staffRoom.staffId,result[0].id],(err,result)=>{
      if(err) console.log('Error while adding staff room checkout manage');
      console.log('staff manage room',result)
      const staffSocket=userSockets.find(sockets=>{
        if(sockets.userName===staffRoom.staffUserName) return sockets;
      })

      if(staffSocket){
        staffSocket.socket.emit('staffManageRoom',staffRoom.staffRoom)
    }
  })
  })
})


socket.on('onlineUsersRequest', async (contactData) => {

  // const userSocket = userSockets.get(contactData[0]);
    const userSocket=userSockets.find(sockets=>{      
     if(sockets.userName===contactData[0]) return sockets;         
  })
  if (userSocket) {
const onlineUserArray=userSockets.filter(onlineUsers=>{
  if(onlineUsers.userName!==userSocket.userName) return onlineUsers;
})

//     const queryResult = [];
//     // for (const [userName, userType] of onlineUsersArray) {
// onlineUserArray.forEach(async user=>{
// if(user!==undefined){
//       const query = `SELECT * FROM ${user.userType} WHERE userName = ?`;
      // try {
      //   const results = await new Promise((resolve, reject) => {
      //     db.query(query, [user.userName], (error, results) => {
      //       if (error) {
      //         reject(error);
      //       } else {
      //         resolve(results);
      //       }
      //     });
      //   });
      //   queryResult.push(results[0]);
      // } catch (error) {
      //   console.log('Internal server error', error);
      // }
//      } else{
//   console.log('no online user found online')
//    } })

    // console.log('188',onlineUserArray)
   const userArray=userSockets.map(onlineuser=>{
    if(onlineuser!==undefined||onlineuser!==null)
      return ({userName:onlineuser.userName,userType:onlineuser.userType})
    })

    userSocket.socket.emit('onlineUsers',JSON.stringify(userArray));
  } else {
    console.log('Your Socket is off');
  }
})

});
const notifiedUsers = new Set();

const checkApproachingCheckouts = () => {
  const currentDate = moment();
  const approachingCheckoutsQuery = `
SELECT guestId, checkoutDate,roomId FROM reservation WHERE ABS(TIMESTAMPDIFF(MINUTE, NOW(), checkoutDate)) >569;

  `;
  //  AND status = 'checkin'
  db.query(approachingCheckoutsQuery, (error, results) => {
    if (error) {
      console.error('Error querying the database:', error);
    } else {
      // console.log(results)
      results.forEach((row) => {
        const checkoutDate = moment(row.checkoutDate);
        if (!notifiedUsers.has(row.guestId)) {
          // Notify guest one hour before checkout
          let theUserToLeft=[];
          db.query('select userName from guest where id=?',[row.guestId],(error,result)=>{
            if(error){
              console.log('Internal server error', error);
            }else {
                    theUserToLeft.push(userSockets.filter(singleSocket=>{
                  if(result.length!==0){
                      if(singleSocket.userName===result[0].userName){
                        row.userName=result[0].userName;
                        console.log('123',row)
                         singleSocket.socket.emit('checkoutApproaching', JSON.stringify(row));
                        return singleSocket;
  }
}
}))

 notifiedUsers.add(row.guestId);
          }
          })
          
        } else  {

  // User has more than 1306 minutes left, remove from notified users set if present
  if (notifiedUsers.has(row.guestId)) {
    notifiedUsers.delete(row.guestId);
  }



}
      });


    }
  });
};
 cron.schedule('*/1 * * * *', checkApproachingCheckouts);
// setInterval(checkApproachingCheckouts, 60000);
server.listen(8000,(req,res)=>{
    console.log('server is up on port 8000')
})