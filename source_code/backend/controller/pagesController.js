import db from '../database/db.js'
export const user=(req,res)=>{
    const id=req.session.user.id
    console.log(id)
    db.query(`SELECT
  account.id,
  account.username,
  account.password,
  'guest' AS user_type,
  guest.userName,
  guest.firstName,
  guest.lastName,
  guest.emailAddress
FROM
  account
  JOIN guest ON guest.account_id = account.id
WHERE
  account.id = ?

UNION ALL

SELECT
  account.id,
  account.username,
  account.password,
  'receptionist' AS user_type,
  receptionist.name,
  receptionist.email,
  NULL AS department,
  NULL AS team_name
FROM
  account
  JOIN receptionist ON receptionist.account_id = account.id
WHERE
  account.id = ?

UNION ALL

SELECT
  account.id,
  account.username,
  account.password,
  'manager' AS user_type,
  manager.name,
  manager.email,
  manager.department,
  NULL AS team_name
FROM
  account
  JOIN manager ON manager.account_id = account.id
WHERE
  account.id = ?

UNION ALL

SELECT
  account.id,
  account.username,
  account.password,
  'staff_member' AS user_type,
  staff_member.name,
  staff_member.email,
  staff_member.department,
  NULL AS team_name
FROM
  account
  JOIN staff_member ON staff_member.account_id = account.id
WHERE
  account.id = ?

UNION ALL

SELECT
  account.id,
  account.username,
  account.password,
  'maintenance_team' AS user_type,
  maintenance_team.name,
  maintenance_team.email,
  NULL AS department,
  maintenance_team.team_name
FROM
  account
  JOIN maintenance_team ON maintenance_team.account_id = account.id
WHERE
  account.id = ?;`,[id,id,id,id,id],(error,results)=>{
    if(error){
    console.log('Error while querying the database'+error)
return res.json({error:"Internal server error"})
}

if (results.length === 0) {
      return res.json({ error: 'Fetching the user data faild' });
    }
 return  res.status(200).json(results[0])
  })
}