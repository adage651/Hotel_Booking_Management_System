import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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
app.use('/public/uploads',images)
app.use('/pages',pages)
app.use('/auth',auth)
app.use('/users',users)
app.use('/rooms',rooms)


app.listen(8000,(req,res)=>{
    console.log('server is up on port 8000')
})