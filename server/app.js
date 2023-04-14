const express=require('express')
const dbconnect=require('./config/dbconnect')
const userRoute=require('./routes/userRoutes')
const app = express();
const cors = require('cors')
const cookieParser =require('cookie-parser')
const path =require('path')


dbconnect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use( cors({ origin: ["http://localhost:3000", ], credentials: true, }));
app.use(cookieParser());
app.use(express.static(path.resolve()+"/public"))
app.use('/',userRoute);
app.listen(5000,()=>{
    console.log("server connected to http://localhost:5000");
})