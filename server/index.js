const express = require("express");
require("dotenv").config();
const userRoutes = require("./Routes/User");
const cookieParser = require("cookie-parser")
const cors = require("cors");
const database = require("./Config/database");
const app = express();
const PORT = process.env.PORT ||6000;

//database Connect
database.connect();

//middlewares
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  app.use(cors(corsOptions));


//routes
app.use("/api/v1/auth" , userRoutes);

//def route
app.get("/" ,(req, res)=>{
    return res.json({
         success:true,
         Message:"Your server is up and running....."
    }); 
});

app.listen(PORT ,()=>{
    console.log(`App is running at ${PORT}`)
})