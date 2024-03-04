import express from 'express'
import bodyParser from 'body-parser'

import cors from 'cors'
import cookieParser from 'cookie-parser'
import session from 'express-session'

const app=express()
app.use(cors({
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
}));
app.use(
  session({
    key:'userID',
    secret: 'amanualaddisujumasenessa',
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge:1000*60*60,
    //  domain: 'localhost',
    //  path: '/; SameSite=None', // Adjust the SameSite option as needed
      secure: false, // Set to true if using HTTPS
    },
  })
);
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

import auth from './routes/auth.js'
import landing from './routes/landing.js'
import pages from './routes/pages.js'
import users from './routes/users.js'

app.use('/pages',pages)
app.use('/auth',auth)
app.use('/users',users)


app.listen(8000,(req,res)=>{
    console.log('server is up on port 8000')
})