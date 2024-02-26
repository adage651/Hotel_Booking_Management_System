import mysql, { createConnection } from 'mysql'
const db=createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'Hotel-reservation-system'
})
db.connect((err,res)=>{{
    if(err){
        console.log('err while connecting to server')
    }
    else{
        //console.log(res)
        console.log('Database connected...')
    }
}
})
export default db;