import db from '../database/db.js'
export const contactData =(req,res) => {
    const contactInfo=req.body
const ownerData =contactInfo.owner
const onlineUsersData=contactInfo.chatUserData
console.log(req.body)
  // Retrieve messages from the database
  const sender = ownerData.userName;
  const receiverUsers = onlineUsersData.map(user => user.userName);
  console.log('10',receiverUsers)
  const query = `
    SELECT 
      c.message, 
      c.timestamp, 
      CONCAT(u.firstName, ' ', u.lastName) AS fullName,
      u.profilePicture
    FROM contact AS c
    INNER JOIN (
      SELECT
        userName,
        firstName,
        lastName,
        profilePicture
      FROM staff
      UNION ALL
      SELECT
        userName,
        firstName,
        lastName,
        profilePicture
      FROM guest
      UNION ALL
      SELECT
        userName,
        firstName,
        lastName,
        profilePicture
      FROM receptionist
      UNION ALL
      SELECT
        userName,
        firstName,
        lastName,
        profilePicture
      FROM manager
      UNION ALL
      SELECT
        userName,
        firstName,
        lastName,
        profilePicture
      FROM maintenance
    ) AS u ON c.receiver = u.userName
    WHERE c.sender = ? AND c.receiver IN (?)
    ORDER BY c.timestamp ASC`;
console.log(receiverUsers)
    db.query(query,[sender, ...receiverUsers], (err, results) => {
    if (err) {
      console.error('Error retrieving messages:', err);
      return;
    }
    const messages = {};
    const users = {};

    for (const user of onlineUsersData) {
      const { userName, firstName, lastName } = user;
      messages[userName] = { sendMessage: [], receiveMessage: [] };
      users[userName] = { firstName, lastName , fullName: `${firstName} ${lastName}` };
    }
 
  for (let i = 0; i < results.length; i++) {
    const row = results[i];
      const { message, timestamp, fullName, profilePicture } = row;
      const receiverUserName = Object.keys(messages).find(
        userName => users[userName].fullName === fullName
      );

      if (receiverUserName) {
        const messageType = sender === receiverUserName ? 'sendMessage' : 'receiveMessage';
        messages[receiverUserName][messageType].push({ message, timestamp });
      }
      // users[receiverUserName].profilePicture = profilePicture;
    }
if(results.length===0){
  db.query(` SELECT
  userName,
  firstName,
  lastName,
  profilePicture
FROM (
  SELECT
    userName,
    firstName,
    lastName,
    profilePicture
  FROM staff
  UNION ALL
  SELECT
    userName,
    firstName,
    lastName,
    profilePicture
  FROM guest
  UNION ALL
  SELECT
    userName,
    firstName,
    lastName,
    profilePicture
  FROM receptionist
  UNION ALL
  SELECT
    userName,
    firstName,
    lastName,
    profilePicture
  FROM manager
  UNION ALL
  SELECT
    userName,
    firstName,
    lastName,
    profilePicture
  FROM maintenance
) AS u
WHERE u.userName IN (?);` ,[receiverUsers],(error,resulting)=>{
      if(error){
        console.log('erorr '+error)
      return;
      }
      console.log('result: ',resulting)
     return  res.json( {users:resulting,messages:null} )
    })
}else{
  console.log('result: ',{ messages, users })
  return  res.json({ messages, users });
}
  });
}



export const sendMessage = (req,res)=>{
    const { sender, receiver, message } = req.body;
console.log('142 sendMessage',req.body)
  const query = 'INSERT INTO contact (sender, receiver, message) VALUES (?, ?, ?)';
  db.query(query, [sender, receiver, message], (err, results) => {
    if (err) {
      console.error('Error sending message:', err);
      res.status(500).json({ error: 'Error sending message' });
      return;
    }

    res.status(200).json({ success: true });
  });
}
export const getMessages = (req,res) => {
   
    console.log('156 sender',req.body)
     const { sender, receiver } = req.body;
  const query = `SELECT c.*, CASE WHEN c.sender = ? THEN 'sent' ELSE 'received' END AS message_type FROM contact AS c WHERE (c.sender = ? AND c.receiver = ? ) OR (c.sender = ? AND c.receiver = ?) ORDER BY timestamp ASC; `;
  
  db.query(query,[sender, sender,receiver,receiver,sender],(error,results)=>{
    if(error){
      return res.status(500).json({error:error});
    }

    return res.status(200).json({contactData:results})
  })

  }


// contactInfo.chatUserData.forEach(async user=>{

//          const query = `SELECT firstName,lastName FROM ${user.userType} WHERE userName = ?`;
//       try {
//         const results = await new Promise((resolve, reject) => {
//           db.query(query, [user.userName], (error, results) => {
//             if (error) {
//               reject(error);
//             } else {
//               resolve(results);
//             }
//           });
//         });
//         const query = `SELECT message,timeStamp FROM contact WHERE senderId=? AND receiverId=?`;
     
//         const finalResult = await new Promise((resolve, reject) => {
//           db.query(query, [senderInfo.senderId,results[0].id], (error, value) => {
//             if (error) {
//               reject(error);
//             } else {
//               resolve(value);
//             }
//           });
//         });
        
        
//         queryResult.push({message:value:sender});
//       } catch (error) {
//         console.log('Internal server error', error);
//       }


      

// })

// }

