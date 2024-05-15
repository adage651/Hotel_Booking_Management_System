import db from '../database/db.js'
import bcrypt from 'bcryptjs'
export const saveUser =(req,res)=>{
  const { firstName, lastName, emailAddress, userName, userType, nationality, password, status } = req.body;

  if (!firstName || !lastName || !emailAddress || !userName || !userType || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
console.log(userType)
  let tableName;
  let permissions='[{"title":"dashboard","path":"/","icon":"ic_analytics"},{"title":"Reservation","path":"user","icon":"reservation1"},{"title":"Manage rooms","path":"products","icon":"ic_cart"},{"title":"Analytics","path":"blog","icon":"ic_blog"},{"title":"Reports","path":"login","icon":"ic_lock"},{"title":"Guest review","path":"404","icon":"ic_disabled"},{"title":"Notification","path":"404","icon":"ic_disabled"},{"title":"Compliments","path":"404","icon":"ic_disabled"}]'
  switch (userType.name) {
    case 'guest':
      tableName = 'guest';
      permissions='[{"title":"Reservation","path":"user","icon":"reservation1"},{"title":"Make Reservation","path":"make-reservation","icon":"ic_add"},{"title":"Update Reservation","path":"update-reservation","icon":"ic_edit"},{"title":"Request Checkout","path":"request-checkout","icon":"ic_exit_to_app"},{"title":"Order Food","path":"order-food","icon":"ic_restaurant"},{"title":"Contact","path":"contact","icon":"ic_contact_mail"},{"title":"Check Room Availability","path":"check-availability","icon":"ic_calendar_today"},{"title":"View Own Booking","path":"view-booking","icon":"ic_search"},{"title":"Track Hotel Location","path":"track-location","icon":"ic_place"}]'
      break;
    case 'receptionist':
      tableName = 'receptionist';
      permissions='[{"title":"Contact","path":"contact","icon":"ic_contact_mail"},{"title":"Process Check-in","path":"checkin","icon":"ic_person_add"},{"title":"Finalize Checkout","path":"checkout","icon":"ic_exit_to_app"},{"title":"Track Reservation","path":"track-reservation","icon":"ic_search"},{"title":"Check Room Availability","path":"check-availability","icon":"ic_calendar_today"},{"title":"Notified By Guest","path":"notifications","icon":"ic_notifications"},{"title":"View User Account","path":"view-account","icon":"ic_account_circle"},{"title":"Mark Room Status","path":"mark-room-status","icon":"ic_check_box"}]'
      break;
    case 'staff':
      tableName = 'staff';
      permissions='[{"title":"Manage Food Order","path":"manageFoodOrder","icon":"foodorder"},{"title":"Request Maintenance","path":"maintenance-request","icon":"ic_build"},{"title":"Process Checkout","path":"checkout","icon":"ic_exit_to_app"},{"title":"Mark Room Status","path":"mark-room-status","icon":"ic_check_box"},{"title":"View User Account","path":"view-account","icon":"ic_account_circle"},{"title":"Notified By Guest","path":"notifications","icon":"ic_notifications"},{"title":"Contact","path":"contact","icon":"ic_contact_mail"}]'
      break;
    case 'maintenance':
      tableName = 'maintenance';
      permissions='[{"title":"Receive Maintenance Requests","path":"maintenance-requests","icon":"ic_build"},{"title":"Request Materials","path":"request-materials","icon":"ic_local_shipping"}]'
      break;
    case 'manager':
      tableName = 'manager';
      break;
    default:
      return res.status(403).json({ error: 'Invalid userType' });
  }

  db.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred while creating the account while Starting' });
    }

    const checkQuery = 'SELECT * FROM account WHERE userName = ?';
    const checkValues = [userName];

    db.query(checkQuery, checkValues, (checkErr, checkResult) => {
      if (checkErr) {
        db.rollback(() => res.status(500).json({ error: 'An error occurred while creating the account while quering the user name is there' }));
        return;
      }

      if (checkResult.length > 0) {
        db.rollback(() => res.status(409).json({ error: 'User already exists' }));
        return;
      }

      bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
        if (hashErr) {
          db.rollback(() => res.status(500).json({ error: 'An error occurred while hashing the password' }));
          return;
        }

        const accountQuery = 'INSERT INTO account (userName, emailAddress, password,user_type,status) VALUES (?, ?, ?, ?,? )';
        const accountValues = [userName, emailAddress, hashedPassword,userType.name,status]

        db.query(accountQuery, accountValues, (accountErr, accountResult) => {
          if (accountErr) {
            db.rollback(() => res.status(500).json({ error: 'An error occurred while creating the account into Account tabel' }));
            return;
          }

          const accountId = accountResult.insertId;

          const userQuery = `INSERT INTO ${tableName} (account_id, userName ,firstName, lastName, emailAddress, nationality,permissions) VALUES (?,?, ?, ?, ?, ?,?)`;
          const userValues = [accountId, userName ,firstName, lastName, emailAddress, nationality,permissions];

          db.query(userQuery, userValues, (userErr, userResult) => {
            if (userErr) {
              console.log(tableName,permissions)
              db.rollback(() => res.status(500).json({ error: 'An error occurred while creating the user' }));
              return;
            }

            db.commit((commitErr) => {
              if (commitErr) {
                db.rollback(() => res.status(500).json({ error: 'An error occurred while creating the final account' }));
                return;
              }

              res.status(200).json({ message: 'Account and user created successfully' });
            });
          });
        });
      });
    });
  });
}






export const fetchAll =(req,res)=>{
const accountQuery = 'SELECT id, user_type,status FROM account';
const queryResults = [];

db.query(accountQuery, (error, results) => {
  if (error) {
    return res.status(500).send({ error: 'Failed to fetch account data' });
  }

  const userTypes = ['guest', 'receptionist', 'manager', 'maintenance','staff'];
  const queries = [];

  results.forEach((row) => {
    const id = row.id;
    const user_type = row.user_type;
    const status=row.status

    if (userTypes.includes(user_type)) {
      const query = `SELECT * FROM ${user_type} WHERE account_id = ${id}`;

      queries.push(
        new Promise((resolve, reject) => {
          db.query(query, (error, userResults) => {
            if (error) {
              reject(error);
            } else {
              userResults[0]={...userResults[0],user_type,status}
              queryResults.push(userResults[0])
              resolve();
            }
          });
        })
      );
    }
  });

  Promise.all(queries)
    .then(() => {
      return res.status(200).send(queryResults);
    })
    .catch((error) => {
      return res.status(500).send({ error: 'Failed to fetch user data' });
    });
});
}





export const handleForgot =(req,res)=>{
  console.log('dersual')
  const { emailAddress } = req.body;
  const accountQuery = 'SELECT id, user_type FROM account WHERE emailAddress = ?';
  db.query(accountQuery, [emailAddress], (error, results) => {
    if (error) {
      return res.status(500).send({ error: 'Failed to fetch account data' });
    }
    if (results.length === 0) {
      return res.status(404).send({ error: 'Account not found' });
    }
    return res.status(200).send(results[0]);

})
}
export const deleteUser=(req,res)=>{
const accountId=req.params.id
  const accountQuery = `SELECT user_type FROM account WHERE id = ${accountId}`;

db.query(accountQuery, (error, results) => {
  if (error) {
    return res.status(500).send({ error: 'Failed to fetch account data' });
  }

  if (results.length === 0) {
    return res.status(404).send({ error: 'Account not found' });
  }

  const userType = results[0].user_type;

  //  Step 2: Delete the respective user based on the user type
  const deleteQuery = `DELETE FROM ${userType} WHERE account_id = ${accountId}`;

  db.query(deleteQuery, (error, deleteResult) => {
    if (error) {
      return res.status(500).send({ error: 'Failed to delete user' });
    }

    //  Step 3: Delete the account from the account table
    const deleteAccountQuery = `DELETE FROM account WHERE id = ${accountId}`;

    db.query(deleteAccountQuery, (error, deleteAccountResult) => {
      if (error) {
        return res.status(500).send({ error: 'Failed to delete account' });
      }

      return res.status(200).send({ message: 'User and account deleted successfully' });
    });
  });
});
}

export const updateUser=(req,res)=>{
 console.log('191  works',req.body);
  const {id,email,firstName,lastName,identificationCardNum,identificationCardPic,
  image,country,permissions,status,domainUsername,user_type} = req.body;

 
  const query= `UPDATE ${user_type}
SET
  emailAddress = ?,
  firstName = ?,
  lastName = ?,
  profilePicture=?,
  nationality = ?,
  userName = ?
WHERE id = ?;
`

db.query(query,[email,firstName,lastName,image,country,domainUsername,id], (error, result) => {
 if(error){
  console.log('Error 208',error);
  return res.status(500).json({ error: 'Failed to fetch user data' });
 }
 return res.status(200).json({ user: result[0] });

}) 
}

export const getNotifications = async (req, res) => {
  const {userName,userType}=req.body;
   const query=`SELECT * FROM notifications WHERE receiver=?`;
   db.query(query,[userName],(error,result)=>{
    if(error){
      return res.status(500).json({ error: 'Internal Server Error', notifications: null });
    }
    if(!result || result.length === 0){
      const data=result.map(notification=>{
if(notification.type!=='Message From System'){
        const queryString=`SELECT u.firstName,u.lastName,u.profilePicture from ${userType} u where u.userName=${notification.receiver}`;
        db.query(queryString,(error,results)=>{
          if(error){
          console.log(error)
          }
         else notification.userData=results[0]
        })
}
      })
      return res.status(500).json({ error: 'Internal Server Error: No notifications found', notifications: null });
    }
    console.log(data)
          const data=result.map(notification=>{
if(notification.type!=='Message From System'){
        const queryString=`SELECT u.firstName,u.lastName,u.profilePicture from ${userType} u where u.userName=${notification.receiver}`;
        db.query(queryString,(error,results)=>{
          if(error){
          console.log(error)
          }
         else notification.userData=results[0]
        })
}
      })
    return res.status(200).json({ notifications: data });
   })

}

export const setNotifications = async (req, res) => {
const {sender,receiver,message,description,type}=req.body;
  const query=`INSERT INTO Notification (sender,receiver,message,description,type) VALUES (?,?,?,?,?)`;
  db.query(query,[sender,receiver,message,description,type],(error,result)=>{
    if(error){
      return res.status(500).json({ error: 'Internal Server Error'});
    }
    return res.status(200).json({ message: 'Notification sent successfully'});
  })

}



export const fetchUserData = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'You are not authorized to access or your"r session expired', user: null });
  }

  const userAccount = req.session.user;
  db.query(
    `SELECT * FROM ${userAccount.user_type} WHERE userName = ?`,
    [userAccount.userName],
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: 'Internal Server Error', user: null });
      }
      if (!result || result.length === 0) {
        return res.status(500).json({ error: 'Internal Server Error: No user found', user: null });
      }
      const user = { ...result[0], status: userAccount.status,user_type:userAccount.user_type };
      return res.status(200).json({ error:false,message: 'The user was fetched successfully', user });
    }
  );
};

export const resetPassword = async (req, res) => {
  console.log(req.body.newPassword,req.body.userToReset.id)
const query=`UPDATE account SET password =? WHERE id =?`;
db.query(query,[req.body.newPassword,req.body.userToReset.id],(error,result)=>{
  if(error){
    console.log('error',error)
    return res.status(500).json({ error: 'Internal Server Error'});
  }
  return res.status(200).json({ message: 'Password reset successfully'});
})

}


export const getUser =(req,res)=>{
  const {userName} =req.body;
  const queryFirst=`SELECT user_type FROM account WHERE userName =?`;
  let userType;
  db.query(queryFirst,[userName],(error,result)=>{
    if(error){
      return res.status(500).json({ error: 'Internal Server Error'});
    }
    if(!result || result.length === 0){
       res.status(500).json({ error: 'Internal Server Error: No user found'});

  }
  userType=result[0].user_type;
})
  const query =`SELECT u.firstName,u.lastName,u.id,u.profilePicture from ${userType} `
  db.query(query,(error,result)=>{
    if(error){
      return res.status(500).json({ error: 'Internal Server Error'});
    }
    if(!result || result.length === 0){
       res.status(500).json({ error: 'Internal Server Error: No user found'});
    }
    return res.status(200).json({ error:false, user: result });
  })


}